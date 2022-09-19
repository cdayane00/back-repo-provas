import prisma from '../config/database';

export const findByNameTeacher = async (nameF: string) => {
	return prisma.teacher.findFirst({
		where: {
			name: nameF
		},
	});
};