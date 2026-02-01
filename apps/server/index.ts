
import express, { type Express } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDb } from './src/config/database.js';
import appRouter from './src/routes/app.router';
import { errorHandler } from './src/middlewares/error.middlewares';
import env from './src/config/env';

declare global {
  namespace Express {
    interface Request {
      myId?: string
    }
  }
}

const app: Express = express();
app.use(cors({
    origin: env.ORIGIN || 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());

connectDb().then(() => {
    console.log('Db connected!');
})

app.use('/api', appRouter);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})

export default app;