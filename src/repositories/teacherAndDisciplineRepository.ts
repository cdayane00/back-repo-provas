import prisma from '../config/database';

export const findByTeacherAndDisciplinedId = (
    teacherId: number,
    disciplineId: number
) => {
    return prisma.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }

    });
};