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
exports.getTestsByTeachers = exports.getTestsByDiscipline = exports.create = void 0;
const database_1 = __importDefault(require("../config/database"));
const create = (testData) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.default.test.create({
        data: testData
    });
});
exports.create = create;
const getTestsByDiscipline = (discipline) => {
    return database_1.default.term.findMany({
        where: {
            disciplines: {
                some: {
                    AND: {
                        name: discipline,
                        teacherDisciplines: { some: { tests: { some: {} } } },
                    },
                },
            },
        },
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
exports.getTestsByDiscipline = getTestsByDiscipline;
const getTestsByTeachers = (teacher) => {
    return database_1.default.teacherDiscipline.findMany({
        where: {
            AND: { teacher: { name: teacher }, tests: { some: {} } },
        },
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
    });
};
exports.getTestsByTeachers = getTestsByTeachers;
