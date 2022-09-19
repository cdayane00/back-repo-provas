"use strict";
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
const database_1 = __importDefault(require("../src/config/database"));
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = require("@faker-js/faker");
const userDataFactory_1 = __importDefault(require("./factories/userDataFactory"));
const userFactory_1 = __importDefault(require("./factories/userFactory"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$executeRaw `TRUNCATE "users" CASCADE;`;
}));
describe('POST /sign-up', () => {
    it('returns 201 for valid data. User created', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userDataFactory_1.default)();
        const registredUser = yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const status = registredUser.status;
        const createdUser = yield database_1.default.user.findUnique({ where: { email: user.email } });
        expect(status).toEqual(201);
        expect(createdUser).not.toBeNull();
    }));
    it('returns 409 for valid data. User already created', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userDataFactory_1.default)();
        yield (0, userFactory_1.default)(user);
        const userAlreadyCreated = yield (0, supertest_1.default)(app_1.default).post('/sign-up').send(user);
        const status = userAlreadyCreated.status;
        expect(status).toEqual(409);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
describe('POST /sign-in', () => {
    it('returns 200 for valid data. User logged in', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userDataFactory_1.default)();
        yield (0, userFactory_1.default)(user);
        const userLoggedIn = yield (0, supertest_1.default)(app_1.default).post('/sign-in').send(user);
        const status = userLoggedIn.status;
        expect(status).toEqual(200);
    }));
    it('returns 401 for invalid params. Invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (0, userDataFactory_1.default)();
        const userLoggedIn = yield (0, supertest_1.default)(app_1.default).post('/sign-in').send(Object.assign(Object.assign({}, user), { email: faker_1.faker.internet.email() }));
        const status = userLoggedIn.status;
        expect(status).toEqual(401);
    }));
});
