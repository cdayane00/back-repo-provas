"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const testBodySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    pdfUrl: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    teacher: joi_1.default.string().required(),
    discipline: joi_1.default.string().required()
}).required();
const testSchema = joi_1.default.object({ body: testBodySchema }).options({ allowUnknown: true });
exports.testSchema = testSchema;
