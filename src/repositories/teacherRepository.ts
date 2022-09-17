import prisma from '../config/database';

export const findByNameTeacher = async (nameF: string, test: String) => {
	return prisma.teacher.findUnique({
		where: {
			name: nameF
		},
	});
};