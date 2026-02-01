
import { createServer } from './createServer';


declare global {
  namespace Express {
    interface Request {
      myId?: string
    }
  }
}

const app = createServer();


export default app;