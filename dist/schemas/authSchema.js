"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const authBodySchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
}).required();
const authSchema = joi_1.default.object({
    body: authBodySchema,
}).options({ allowUnknown: true });
exports.authSchema = authSchema;