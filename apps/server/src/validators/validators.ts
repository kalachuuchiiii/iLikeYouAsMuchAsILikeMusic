import { isValidObjectId } from "mongoose";
import z from "zod";

export const ObjectIdSchema = z.string().refine((val) => isValidObjectId(val));

export const QueryParamSchema = z
  .object({
    limit: z.preprocess((l: string) => parseInt(l), z.number().catch(5)),
    page: z.preprocess((l: string) => parseInt(l), z.number().catch(1)),
  })
  .transform((data) => ({
    ...data,
    skip: (data.page - 1) * data.limit,
  }));
