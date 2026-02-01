import { Router } from "express";
import { catchErrors } from "../middlewares/error.middlewares";
import { getSession, refresh, signIn, signOut, signUp } from "../controllers/auth.controllers";



const authRouter: Router = Router();

authRouter.post('/sign-up', catchErrors(signUp));
authRouter.post('/sign-in', catchErrors(signIn));
authRouter.get('/session', catchErrors(getSession));
authRouter.post('/refresh', catchErrors(refresh));
authRouter.post('/sign-out', catchErrors(signOut));

export default authRouter;