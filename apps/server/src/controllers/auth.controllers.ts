import { SignInFormSchema, SignUpFormSchema } from "@repo/validators";
import type { RequestHandler } from "express";
import User from "../models/user/user.js";
import { ConflictError, NotFoundError } from "../errors/AppErrors.js";
import { runWithSession } from "../helpers/db.helper.js";
import Credential from "../models/credentials/credentials.js";
import jwt, { type Secret } from "jsonwebtoken";
import env from "../config/env.js";
import ms from "ms";
import { ObjectIdSchema } from "../validators/validators.js";
import type { AuthPayload } from "../types/auth";

export const refresh: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  const decoded = (await jwt.verify(
    refreshToken,
    env.JWT_SECRET
  )) as AuthPayload;
  const myId = decoded.userId;
  const user = await User.findById(myId).orFail(
    new NotFoundError("User not found.")
  );
  const accessToken = await jwt.sign(
    { userId: String(user._id) },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_TTL }
  );

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

export const signOut: RequestHandler = async (req, res) => {
  res.cookie("refresh_token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Sign out success!",
  });
};

export const getSession: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  const decoded = (await jwt.verify(
    refreshToken,
    env.JWT_SECRET
  )) as AuthPayload;
  const myId = decoded.userId;
  const user = await User.findById(myId).orFail(
    new NotFoundError("User not found.")
  );
  const accessToken = await jwt.sign(
    { userId: String(user._id) },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TOKEN_TTL }
  );
  return res.status(200).json({
    success: true,
    accessToken,
    user: user.toObject(),
  });
};

export const signIn: RequestHandler = async (req, res) => {
  const { username, password } = SignInFormSchema.parse(req.body.signInForm);
  const user = await User.findOne({ username })
    .orFail(new Error("Incorrect username or password."))
    .lean();
  const credential = await Credential.findOne({
    userId: String(user._id),
  }).orFail(new Error("Incorrect username or password"));
  const isPasswordCorrect = await credential.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect username or password");
  }

  const refreshToken = await jwt.sign({ userId: user._id }, env.JWT_SECRET, {
    expiresIn: env.REFRESH_TOKEN_TTL,
  });
  const maxAge = ms(env.REFRESH_TOKEN_TTL);
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge,
  });

  return res.status(200).json({
    success: true,
    message: "Signed in successfully!",
  });
};

export const signUp: RequestHandler = async (req, res) => {
  const { username, password } = SignUpFormSchema.parse(req.body.signUpForm);
  const doesUserExist = !!(await User.exists({ username }));
  if (doesUserExist) {
    throw new ConflictError("This username is already taken.");
  }
  await runWithSession(async (session) => {
    const newUser = await new User({ username }).save({ session });
    const newCredential = await new Credential({
      password,
      userId: String(newUser._id),
    }).save({ session });
  });

  return res.status(201).json({
    success: true,
    message: "Signed-up successfully!",
  });
};
