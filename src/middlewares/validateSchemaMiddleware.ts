import { Schema } from "joi";
import {Request, Response, NextFunction} from 'express';
import appError from "../config/error";

function validateSchemaMiddleware(schema: Schema){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req, {abortEarly: false});
        if(error){
            throw new appError(
                'Invalid input',
                422,
                'Invalid input',
                error.details.map((detail) => detail.message).join(', ')
            );
        }
        next();
    };
}
export default validateSchemaMiddleware;