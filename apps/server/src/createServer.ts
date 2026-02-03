import express, { type Express, type Application } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import { connectDb } from "./config/database.js";
import appRouter from "./routes/app.router.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

export const createServer = () => {
  const app: Application = express();
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
