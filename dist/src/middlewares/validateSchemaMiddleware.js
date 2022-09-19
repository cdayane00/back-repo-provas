"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../config/error"));
function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req, { abortEarly: false });
        if (error) {
            throw new error_1.default('Invalid input', 422, 'Invalid input', error.details.map((detail) => detail.message).join(', '));
        }
        next();
    };
}
exports.default = validateSchemaMiddleware;
