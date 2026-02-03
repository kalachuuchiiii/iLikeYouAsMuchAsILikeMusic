import express, { Router } from "express";
import authRouter from "./auth.router.js";
import sentimentRouter from "./sentiment.router.js";


const appRouter:Router = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/sentiments', sentimentRouter);

export default appRouter;