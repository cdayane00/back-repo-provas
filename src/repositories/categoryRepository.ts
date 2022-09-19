import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export const findByNameCategory = async (nameF: string, test: String) => {
	return prisma.category.findUnique({
		where: {
			name: nameF
		},
	});
};

export const findAll = async (model: Prisma.ModelName) => {
	return prisma[model].findMany();
};