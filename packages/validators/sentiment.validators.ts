import z from "zod";
import { SENTIMENT_MAX } from '../constants/index.js';

export const IsSentimentReadSchema = z.preprocess(val => val === 'true' ? true : val === 'false' ? false : null, z.boolean().nullable().catch(null));
export const SentimentSchema = z.object({
    trackId: z.number(),
    sentiment: z.string().max(SENTIMENT_MAX),
})