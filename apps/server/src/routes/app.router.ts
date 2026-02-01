import { Router } from "express";
import authRouter from "./auth.router";
import sentimentRouter from "./sentiment.router";


const appRouter: Router = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/sentiments', sentimentRouter);

export default appRouter;