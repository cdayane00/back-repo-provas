import {Router} from 'express';
import validateBearerToken from '../middlewares/validationBearerTokenMiddleware';
import  * as categoryController  from '../controllers/categoryController';

const categoryRouter = Router();

categoryRouter.use(validateBearerToken);
categoryRouter.get('/categories', categoryController.findMany);

export default categoryRouter;