import type { ClientSession } from "mongoose";
import mongoose from "mongoose";

export const runWithSession = async <T>(fn: (session: ClientSession) => T) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const res = await fn(session);
    await session.commitTransaction();
    return res;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  }finally{
    await session.endSession();
  }
};
