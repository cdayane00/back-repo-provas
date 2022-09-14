import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import router from './routers/index'
dotenv.config();
const app = express();

app.use(json());
app.use(cors());
app.use(router);

export default app;