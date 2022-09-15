import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routers/index'
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(json());
app.use(cors());
app.use(router);


export default app;