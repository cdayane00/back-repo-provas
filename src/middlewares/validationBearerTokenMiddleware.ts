import {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../utils/JWT';
import bearerAthorizationSchema from '../schemas/bearerAthorizationSchema';
import appError from '../config/error';

const validateBearerToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {error} = bearerAthorizationSchema.validate(req.headers,{abortEarly: false});

    if(error){
        throw new appError(
            'Invalid authorization header',
			401,
			'Invalid authorization header',
            error.details.map((detail) => detail.message).join(', ')
        );
    }
    try{
        const token = req.headers.authorization?.split(' ')[1] || '';
        const userData = verifyToken(token);
        res.locals.userData = userData;
        next();
    }
    catch(error){
        return res.status(401).send(error);
    }
}

export default validateBearerToken;