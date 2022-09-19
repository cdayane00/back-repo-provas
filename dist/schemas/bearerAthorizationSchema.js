"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const bearerAthorizationSchema = joi_1.default.object({
    authorization: joi_1.default
        .string()
        .pattern(/^Bearer\s[\w-]*\.[\w-]*\.[\w-]*$/)
        .required()
}).options({ allowUnknown: true });
exports.default = bearerAthorizationSchema;
