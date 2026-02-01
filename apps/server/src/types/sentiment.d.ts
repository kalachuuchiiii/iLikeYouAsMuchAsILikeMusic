import type { HydratedDocument, InferSchemaType } from "mongoose";
import type z from "zod";
import type { sentimentSchema } from "../models";


export type SentimentSchema = InferSchemaType<typeof sentimentSchema>;
export type SentimentModel = HydratedDocument<SentimentSchema>;

