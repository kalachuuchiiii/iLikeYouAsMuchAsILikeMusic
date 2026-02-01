import type { RequestHandler } from "express";
import { catchErrors } from "./error.middlewares";
import jwt from "jsonwebtoken";
import type { AuthPayload } from "../types/auth";
import env from "../config/env";


export const verifyAccessToken: RequestHandler = catchErrors(async(req, res, next) => {
    const headers = await req.headers['authorization'] ?? '';
     const accessToken = headers.split(' ')[1] ?? '';
    const decoded = await jwt.verify(accessToken, env.JWT_SECRET) as AuthPayload;
    req.myId = decoded.userId;
    next();
})
