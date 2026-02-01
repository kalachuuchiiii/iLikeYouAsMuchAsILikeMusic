
import { createServer } from './createServer';


declare global {
  namespace Express {
    interface Request {
      myId?: string
    }
  }
}

const app = createServer();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})

export default app;