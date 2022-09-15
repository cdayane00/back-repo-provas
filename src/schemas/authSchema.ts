import joi from 'joi';
import { CreateUserData } from '../types/userInterface';

const authBodySchema = joi.object<CreateUserData>({
    email: joi.string().email().required(),
    password: joi.string().required()
}).required();

const authSchema = joi.object({
    body: authBodySchema,
}).options({allowUnknown: true});

export {authSchema};