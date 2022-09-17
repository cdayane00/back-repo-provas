import {Router} from 'express';
import validateBearerToken from '../middlewares/validationBearerTokenMiddleware';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';
import { testSchema } from '../schemas/testSchema';
import * as testController from '../controllers/testController';

const testRouter = Router();

testRouter.use(validateBearerToken);
testRouter.post('/test',validateSchemaMiddleware(testSchema),testController.insert);

export default testRouter;