import joi from 'joi';
import { CreateTestData } from '../types/testInterface';

const testBodySchema = joi.object<CreateTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    category: joi.string().required(),
    teacher: joi.string().required(),
    discipline: joi.string().required()
}).required();

const testSchema = joi.object({body: testBodySchema}).options({allowUnknown: true});

export {testSchema};