import { TestData } from "../types/testInterface";
import prisma from '../config/database';

export const create = async (testData: TestData) => {
    return prisma.test.create({
        data: testData
    });
};

    

export const findByNameCategory = async (nameF: string, test: String) => {
	return prisma.category.findUnique({
		where: {
			name: nameF
		},
	});
};

export const findByNameDiscipline = async (nameF: string, test: String) => {
	return prisma.discipline.findUnique({
		where: {
			name: nameF
		},
	});
};

export const findByNameTeacher = async (nameF: string, test: String) => {
	return prisma.teacher.findUnique({
		where: {
			name: nameF
		},
	});
};
