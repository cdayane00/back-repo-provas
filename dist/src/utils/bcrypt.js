"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptCompareEncryptedData = exports.bcryptEncryptData = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptEncryptData = (data) => {
    return bcrypt_1.default.hashSync(data, 10);
};
exports.bcryptEncryptData = bcryptEncryptData;
const bcryptCompareEncryptedData = (data, encryptData) => {
    return bcrypt_1.default.compareSync(data, encryptData);
};
exports.bcryptCompareEncryptedData = bcryptCompareEncryptedData;
