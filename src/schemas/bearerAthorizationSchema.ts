import joi from 'joi';

const bearerAthorizationSchema = joi.object({
    authorization: joi
            .string()
            .pattern(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
            .required()
}).options({allowUnknown: true});

export default bearerAthorizationSchema;