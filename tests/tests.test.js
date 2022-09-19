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
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../src/config/database"));
const faker_1 = require("@faker-js/faker");
const testDataFactory_1 = __importDefault(require("./factories/testDataFactory"));
const tokenFactory_1 = __importDefault(require("./factories/tokenFactory"));
describe('POST /test', () => {
    it('returns 201 for valid data. Test created', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = (0, testDataFactory_1.default)();
        const token = yield (0, tokenFactory_1.default)();
        const res = yield (0, supertest_1.default)(app_1.default).post('/test').set('Authorization', `Bearer ${token}`).send(test);
        expect(res.status).toBe(201);
        yield database_1.default.$executeRaw `DELETE FROM tests WHERE id = 5;`;
    }));
});
describe('GET /tests', () => {
    it('should return 4 tests no given filter', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, tokenFactory_1.default)();
        const res = yield (0, supertest_1.default)(app_1.default).get('/tests?groupBy=disciplines').set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.tests.length).toEqual(4);
    }));
    it('shold return 1 test given filter disciplines and discipline equal Cálculo 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, tokenFactory_1.default)();
        const res = yield (0, supertest_1.default)(app_1.default).get('/tests?groupBy=disciplines&discipline=Cálculo 1').set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.tests.length).toEqual(1);
    }));
    it('should return 200 status code and array.tests.length equal 0, given filter disciplines and discipline equal a not registred discipline', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, tokenFactory_1.default)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests?groupBy=disciplines&discipline=${faker_1.faker.lorem.word()}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.tests.length).toEqual(0);
    }));
    it('should return 2 test given filter teachers and teacher equal Lele', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, tokenFactory_1.default)();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/tests?groupBy=teachers&teacher=Lele')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.tests.length).toEqual(2);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.$disconnect();
}));
