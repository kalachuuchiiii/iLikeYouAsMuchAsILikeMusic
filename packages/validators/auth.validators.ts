import z from "zod";
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
} from "../constants/index.js";

export const UsernameSchema = z
  .string()
  .min(USERNAME_MIN)
  .max(USERNAME_MAX)
  .trim();
export const PasswordSchema = z
  .string()
  .min(PASSWORD_MIN)
  .max(PASSWORD_MAX)
  .trim();

export const SignUpFormSchema = z
  .object({
       username: UsernameSchema,
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
  });

export const SignInFormSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
