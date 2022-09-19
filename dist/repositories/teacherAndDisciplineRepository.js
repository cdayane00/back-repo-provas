"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByTeacherAndDisciplinedId = void 0;
const database_1 = __importDefault(require("../config/database"));
const findByTeacherAndDisciplinedId = (teacherId, disciplineId) => {
    return database_1.default.teacherDiscipline.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    });
};
exports.findByTeacherAndDisciplinedId = findByTeacherAndDisciplinedId;
