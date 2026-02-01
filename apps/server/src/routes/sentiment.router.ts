import { Router } from "express";
import { createSentiment, getASingleSentiment, getMySentiments } from "../controllers/sentiment.controllers.js";
import { catchErrors } from "../middlewares/error.middlewares.js";
import { verifyAccessToken } from "../middlewares/auth.middlewares.js";


const sentimentRouter = Router();

sentimentRouter.post('/', catchErrors(createSentiment));
sentimentRouter.get('/me/list', verifyAccessToken, catchErrors(getMySentiments));
sentimentRouter.get('/me/single/:sentimentId', verifyAccessToken, catchErrors(getASingleSentiment));

export default sentimentRouter;