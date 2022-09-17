import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import { authSchema } from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(authSchema), authController.signUp);
authRouter.post('/sign-in', validateSchemaMiddleware(authSchema), authController.signIn);
export default authRouter;