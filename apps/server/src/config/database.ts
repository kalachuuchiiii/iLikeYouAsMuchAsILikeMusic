import mongoose from "mongoose";
import env from "./env";

export const connectDb = async () => {
  try {
    return await mongoose.connect(env.MONGO_URI);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
