import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import { authSchema } from "../schemas/authSchema";
import * as authController from "../controllers/authController";
const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(authSchema), authController.signUp);

export default authRouter;