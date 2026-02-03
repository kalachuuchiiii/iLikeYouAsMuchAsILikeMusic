
import { createServer } from './createServer';


declare global {
  namespace Express {
    interface Request {
      myId?: string
    }
  }
}

const app = createServer();

app.listen(3000, () => {
  console.log('listneing');
})


export default app;