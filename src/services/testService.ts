import * as testRepository from '../repositories/testRepositoy';
import * as teacherAndDisciplineRepository from '../repositories/teacherAndDisciplineRepository';
import { CreateTestData, Filter } from '../types/testInterface';
import appError from '../config/error';
import * as categoryRepository from '../repositories/categoryRepository';
import * as disciplineRepository from '../repositories/disciplineRepository';
import * as teacherRepository from '../repositories/teacherRepository';

const ensureElegibilityToCreateTest = async (createTestData: CreateTestData) =>{
    const {category, discipline, teacher} = createTestData;
    
    const existingCategory = await categoryRepository.findByNameCategory(category, 'Category');
    if(!existingCategory){
        throw new appError(
			'Category not found',
			404,
			'Category not found',
			'Ensure category exists'
		);
    }

    const existingTeacher = await teacherRepository.findByNameTeacher(teacher,'Teacher');
    if(!existingTeacher){
        throw new appError(
			'Teacher not found',
			404,
			'Teacher not found',
			'Ensure teacher exists'
		);
    }

    const existingDiscipline = await disciplineRepository.findByNameDiscipline(discipline,'Discipline');
    if(!existingDiscipline){
        throw new appError(
			'Discipline not found',
			404,
			'Discipline not found',
			'Ensure discipline exists'
		);
    }

    const existingTeacherDiscipline = await teacherAndDisciplineRepository.findByTeacherAndDisciplinedId(
        existingTeacher.id,
        existingDiscipline.id);
    if (!existingTeacherDiscipline) {
        throw new appError(
            'Teacher and Discipline not match',
            404,
            'This teacher does not teach this discipline',
            'Ensure teacher teaches this discipline'
        );
    }

    return {
        categoryId: existingCategory.id,
        teacherDisciplineId: existingTeacherDiscipline.id
    };

};

export const insert = async (createTestData: CreateTestData) => {
    const {categoryId, teacherDisciplineId} = await ensureElegibilityToCreateTest(createTestData);
    const {name, pdfUrl} = createTestData;
    const {id} = await testRepository.create({
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    });
    return {id,name,pdfUrl};
};

export const find = async (filter: Filter) => {
	if (filter.groupBy === 'disciplines') {
		return testRepository.getTestsByDiscipline(filter.discipline);
	} else if (filter.groupBy === 'teachers') {
		return testRepository.getTestsByTeachers(filter.teacher);
	}
};
