import prisma from '../src/config/database';
import { bcryptEncryptData } from '../src/utils/bcrypt';
import {faker} from '@faker-js/faker';

const main = async () => {

    const user = [
        {
            email: 'carla@gmail.com',
            password: bcryptEncryptData('carla')
        }
    ];
    
    const terms = [
        {
            number: 1
        },
        {
            number: 2
        },
        {
            number: 3
        },
        {
            number: 4
        },
        {
            number: 5
        },
    ];

    const categories = [
        {
            name: 'Projeto'
        },
        {
            name: 'Recuperação'
        },
        {
            name: 'Trabalho'
        },
        {
            name: 'Prática'
        },
        {
            name: 'Prova Final'
        },
    ];

    const teachers = [
        {
            name: 'Lele'
        },
        {
            name: 'Frank'
        },
        {
            name: 'Marina'
        },
    ];

    const disciplines = [
        {
            name: 'Cálculo 1',
            termId: 1
        },
        {
            name: 'Álgebra 1',
            termId: 2
        },
        {
            name: 'Matemática Discreta',
            termId: 3
        },
        {
            name: 'Textos Técnicos',
            termId: 4
        },
        {
            name: 'Cálculo 2',
            termId: 5
        },
    ];

    const teachersDisciplines = [
        {
			teacherId: 1,
			disciplineId: 1,
		},
		{
			teacherId: 1,
			disciplineId: 2,
		},
		{
			teacherId: 1,
			disciplineId: 3,
		},
		{
			teacherId: 2,
			disciplineId: 4,
		},
		{
			teacherId: 2,
			disciplineId: 5,
		}
    ];

    const tests = [
        {
			name: 'Prova Cálculo 1',
			pdfUrl: faker.internet.url(),
			categoryId: 1,
			teacherDisciplineId: 1,
		},
        {
			name: 'Projeto Cálculo 1',
			pdfUrl: faker.internet.url(),
			categoryId: 1,
			teacherDisciplineId: 1,
		},
        {
			name: 'Prova Matemática Discreta',
			pdfUrl: faker.internet.url(),
			categoryId: 2,
			teacherDisciplineId: 3,
		},
        {
			name: 'Recuperação Cálculo 2',
			pdfUrl: faker.internet.url(),
			categoryId: 1,
			teacherDisciplineId: 5,
		},
        {
			name: 'Prova Álgebra 1',
			pdfUrl: faker.internet.url(),
			categoryId: 3,
			teacherDisciplineId: 4,
		},
    ];

    await prisma.user.createMany({ data: user, skipDuplicates: true });
	await prisma.term.createMany({ data: terms, skipDuplicates: true });
	await prisma.category.createMany({
		data: categories,
		skipDuplicates: true,
	});
	await prisma.teacher.createMany({
		data: teachers,
		skipDuplicates: true,
	});
	await prisma.discipline.createMany({
		data: disciplines,
		skipDuplicates: true,
	});
	await prisma.teacherDiscipline.createMany({
		data: teachersDisciplines,
		skipDuplicates: true,
	});
	await prisma.test.createMany({ data: tests, skipDuplicates: true });
};

main().catch((error) => console.log(error)).finally(async () => prisma.$disconnect());