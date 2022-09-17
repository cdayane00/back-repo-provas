import prisma from '../config/database';

export const findByNameDiscipline = async (nameF: string, test: String) => {
	return prisma.discipline.findUnique({
		where: {
			name: nameF
		},
	});
};