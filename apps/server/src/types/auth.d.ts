import type { JwtPayload } from "jsonwebtoken";

export type AuthPayload = JwtPayload & {
    userId: string;
}