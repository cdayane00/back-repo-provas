"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../src/config/database"));
const bcrypt_1 = require("../../src/utils/bcrypt");
const userFactory = (user) => {
    return database_1.default.user.create({
        data: Object.assign(Object.assign({}, user), { password: (0, bcrypt_1.bcryptEncryptData)(user.password) })
    });
};
exports.default = userFactory;
