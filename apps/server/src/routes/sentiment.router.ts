import { Router } from "express";
import { createSentiment, getASingleSentiment, getMySentiments } from "../controllers/sentiment.controllers";
import { catchErrors } from "../middlewares/error.middlewares";
import { verifyAccessToken } from "../middlewares/auth.middlewares";


const sentimentRouter: Router = Router();

sentimentRouter.post('/', catchErrors(createSentiment));
sentimentRouter.get('/me/list', verifyAccessToken, catchErrors(getMySentiments));
sentimentRouter.get('/me/single/:sentimentId', verifyAccessToken, catchErrors(getASingleSentiment));

export default sentimentRouter;