import type z from "zod";
import type { credentialSchema } from "../models/credentials/credentials.ts";
import type { HydratedDocument } from "mongoose";


export type CredentialSchema = z.infer<typeof credentialSchema>;
export type CredentialMethods = {
    isPasswordCorrect: (pass: string) => Promise<boolean>;
}
export type CredentialModel = HydratedDocument<CredentialSchema, CredentialMethods>;