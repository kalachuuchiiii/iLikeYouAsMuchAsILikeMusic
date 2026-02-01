import express, { type Express } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import env from "../src/config/env";
import { connectDb } from "../src/config/database";
import appRouter from "../src/routes/app.router";
import { errorHandler } from "../src/middlewares/error.middlewares";

export const createServer = () => {
  const app = express();
  app.use(
    cors({
      origin: env.ORIGIN || "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  connectDb().then(() => {
    console.log("Db connected!");
  });

  app.use("/api", appRouter);
  app.use(errorHandler);

  const PORT = 3000;

  return app;
};
