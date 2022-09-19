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
exports.find = exports.insert = void 0;
const testRepository = __importStar(require("../repositories/testRepositoy"));
const teacherAndDisciplineRepository = __importStar(require("../repositories/teacherAndDisciplineRepository"));
const error_1 = __importDefault(require("../config/error"));
const categoryRepository = __importStar(require("../repositories/categoryRepository"));
const disciplineRepository = __importStar(require("../repositories/disciplineRepository"));
const teacherRepository = __importStar(require("../repositories/teacherRepository"));
const ensureElegibilityToCreateTest = (createTestData) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, discipline, teacher } = createTestData;
    const existingTeacher = yield teacherRepository.findByNameTeacher(teacher);
    if (!existingTeacher) {
        console.log('erro teacher');
        throw new error_1.default('Teacher not found', 404, 'Teacher not found', 'Ensure teacher exists');
    }
    const existingCategory = yield categoryRepository.findByNameCategory(category, 'Category');
    if (!existingCategory) {
        console.log('erro category');
        throw new error_1.default('Category not found', 404, 'Category not found', 'Ensure category exists');
    }
    const existingDiscipline = yield disciplineRepository.findByNameDiscipline(discipline, 'Discipline');
    if (!existingDiscipline) {
        throw new error_1.default('Discipline not found', 404, 'Discipline not found', 'Ensure discipline exists');
    }
    const existingTeacherDiscipline = yield teacherAndDisciplineRepository.findByTeacherAndDisciplinedId(existingTeacher.id, existingDiscipline.id);
    if (!existingTeacherDiscipline) {
        throw new error_1.default('Teacher and Discipline not match', 404, 'This teacher does not teach this discipline', 'Ensure teacher teaches this discipline');
    }
    return {
        categoryId: existingCategory.id,
        teacherDisciplineId: existingTeacherDiscipline.id
    };
});
const insert = (createTestData) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, teacherDisciplineId } = yield ensureElegibilityToCreateTest(createTestData);
    const { name, pdfUrl } = createTestData;
    const { id } = yield testRepository.create({
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    });
    return { id, name, pdfUrl };
});
exports.insert = insert;
const find = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    if (filter.groupBy === 'disciplines') {
        return testRepository.getTestsByDiscipline(filter.discipline);
    }
    else if (filter.groupBy === 'teachers') {
        return testRepository.getTestsByTeachers(filter.teacher);
    }
});
exports.find = find;
