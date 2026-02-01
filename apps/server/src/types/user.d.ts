import type z from "zod";
import type { userSchema } from "../models/user/user";
import type { HydratedDocument } from "mongoose";


export type UserSchema = z.infer<typeof userSchema>;
export type UserModel = HydratedDocument<UserSchema>;