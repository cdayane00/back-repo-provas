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
const bcrypt_1 = require("../src/utils/bcrypt");
const faker_1 = require("@faker-js/faker");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = [
        {
            email: 'carla@gmail.com',
            password: (0, bcrypt_1.bcryptEncryptData)('carla')
        }
    ];
    const terms = [
        {
            number: 1
        },
        {
            number: 2
        },
        {
            number: 3
        },
        {
            number: 4
        },
        {
            number: 5
        },
    ];
    const categories = [
        {
            name: 'Projeto'
        },
        {
            name: 'Recuperação'
        },
        {
            name: 'Trabalho'
        },
        {
            name: 'Prática'
        },
        {
            name: 'Prova Final'
        },
    ];
    const teachers = [
        {
            name: 'Lele'
        },
        {
            name: 'Frank'
        },
        {
            name: 'Marina'
        },
    ];
    const disciplines = [
        {
            name: 'Cálculo 1',
            termId: 1
        },
        {
            name: 'Álgebra 1',
            termId: 2
        },
        {
            name: 'Matemática Discreta',
            termId: 3
        },
        {
            name: 'Textos Técnicos',
            termId: 4
        },
        {
            name: 'Cálculo 2',
            termId: 5
        },
    ];
    const teachersDisciplines = [
        {
            teacherId: 1,
            disciplineId: 1,
        },
        {
            teacherId: 1,
            disciplineId: 2,
        },
        {
            teacherId: 1,
            disciplineId: 3,
        },
        {
            teacherId: 2,
            disciplineId: 4,
        },
        {
            teacherId: 2,
            disciplineId: 5,
        }
    ];
    const tests = [
        {
            name: 'Prova Cálculo 1',
            pdfUrl: faker_1.faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 1,
        },
        {
            name: 'Projeto Cálculo 1',
            pdfUrl: faker_1.faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 1,
        },
        {
            name: 'Prova Matemática Discreta',
            pdfUrl: faker_1.faker.internet.url(),
            categoryId: 2,
            teacherDisciplineId: 3,
        },
        {
            name: 'Recuperação Cálculo 2',
            pdfUrl: faker_1.faker.internet.url(),
            categoryId: 1,
            teacherDisciplineId: 4,
        },
        {
            name: 'Prova Álgebra 1',
            pdfUrl: faker_1.faker.internet.url(),
            categoryId: 3,
            teacherDisciplineId: 5,
        },
    ];
    yield database_1.default.user.createMany({ data: user, skipDuplicates: true });
    yield database_1.default.term.createMany({ data: terms, skipDuplicates: true });
    yield database_1.default.category.createMany({
        data: categories,
        skipDuplicates: true,
    });
    yield database_1.default.teacher.createMany({
        data: teachers,
        skipDuplicates: true,
    });
    yield database_1.default.discipline.createMany({
        data: disciplines,
        skipDuplicates: true,
    });
    yield database_1.default.teacherDiscipline.createMany({
        data: teachersDisciplines,
        skipDuplicates: true,
    });
    yield database_1.default.test.createMany({ data: tests, skipDuplicates: true });
});
main().catch((error) => console.log(error)).finally(() => __awaiter(void 0, void 0, void 0, function* () { return database_1.default.$disconnect(); }));
