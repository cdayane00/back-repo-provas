import prisma from '../config/database';

export const findByNameCategory = async (nameF: string, test: String) => {
	return prisma.category.findUnique({
		where: {
			name: nameF
		},
	});
};