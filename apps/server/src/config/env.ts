import dotenv from "dotenv";
import type { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";
dotenv.config();

const requiredVars = [
  "PEPPER",
  "JWT_SECRET",
  "MONGO_URI",
  "SALT",
  "ORIGIN",
  "REFRESH_TOKEN_TTL",
  "ACCESS_TOKEN_TTL"
] as const;

type RequiredKey = (typeof requiredVars)[number];

const getValue = (name: RequiredKey) => {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
};

const env = {
  PEPPER: getValue("PEPPER") as string,
  JWT_SECRET: getValue("JWT_SECRET") as Secret,
  MONGO_URI: getValue("MONGO_URI") as string,
  SALT: Number(getValue("SALT")),
  ORIGIN: getValue("ORIGIN") as string,
  REFRESH_TOKEN_TTL: getValue('REFRESH_TOKEN_TTL') as StringValue,
  ACCESS_TOKEN_TTL: getValue('ACCESS_TOKEN_TTL') as StringValue,
} satisfies Record<RequiredKey, unknown>;

export default env;
