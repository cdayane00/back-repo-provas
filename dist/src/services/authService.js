"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const userRepository = __importStar(require("../repositories/userRepository"));
const error_1 = __importDefault(require("../config/error"));
const JWT_1 = require("../utils/JWT");
const signUp = (createUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = createUserData;
    const existingUser = yield userRepository.findByEmail(email);
    if (existingUser) {
        throw new error_1.default('User already exists', 409, 'User already exists', 'Ensure you are not using an existing email');
    }
    const encryptedPassword = (0, bcrypt_1.bcryptEncryptData)(password);
    yield userRepository.insert(Object.assign(Object.assign({}, createUserData), { password: encryptedPassword }));
});
exports.signUp = signUp;
const signIn = (signInData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = signInData;
    const user = yield userRepository.findByEmail(email);
    if (!user) {
        throw new error_1.default('Invalid credentials', 401, 'Invalid credentials', 'Ensure that the credentials are correct');
    }
    const isPasswordValid = (0, bcrypt_1.bcryptCompareEncryptedData)(password, user.password);
    if (!isPasswordValid) {
        throw new error_1.default('Invalid credentials', 401, 'Invalid credentials', 'Ensure that the credentials are correct');
    }
    const { id } = user;
    const token = (0, JWT_1.generateToken)(id);
    return token;
});
exports.signIn = signIn;
