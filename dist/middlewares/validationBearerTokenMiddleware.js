"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../utils/JWT");
const bearerAthorizationSchema_1 = __importDefault(require("../schemas/bearerAthorizationSchema"));
const error_1 = __importDefault(require("../config/error"));
const validateBearerToken = (req, res, next) => {
    var _a;
    const { error } = bearerAthorizationSchema_1.default.validate(req.headers, { abortEarly: false });
    if (error) {
        throw new error_1.default('Invalid authorization header', 401, 'Invalid authorization header', error.details.map((detail) => detail.message).join(', '));
    }
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        const userData = (0, JWT_1.verifyToken)(token);
        res.locals.userData = userData;
        next();
    }
    catch (error) {
        return res.status(401).send(error);
    }
};
exports.default = validateBearerToken;
