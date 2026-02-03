import { USERNAME_MIN } from "@repo/constants";
import { createServer } from "./src/createServer.js";

declare module "express-serve-static-core" {
  interface Request {
     myId?: string;
  }
}

const app = createServer();


if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}

export default app;