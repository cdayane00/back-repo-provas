import app from "../src/app";
import supertest from "supertest";
import prisma from "../src/config/database";
import { faker } from "@faker-js/faker";
import testDataFactory from "./factories/testDataFactory";
import tokenFactory from "./factories/tokenFactory";

describe('POST /test', ()=>{
    it('returns 201 for valid data. Test created', async()=>{
        const test = testDataFactory();
        const token = await tokenFactory();
        const res = await supertest(app).post('/test').set('Authorization', `Bearer ${token}`).send(test);

        expect(res.status).toBe(201);
        await prisma.$executeRaw`DELETE FROM tests WHERE id = 5;`;
    });
});

describe('GET /tests', ()=>{
    it('should return 4 tests no given filter', async()=>{
        const token = await tokenFactory();
        const res = await supertest(app).get('/tests?groupBy=disciplines').set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200);
        expect(res.body.tests.length).toEqual(4);
    });

    it('shold return 1 test given filter disciplines and discipline equal Cálculo 1', async ()=>{
        const token = await tokenFactory();
        const res = await supertest(app).get('/tests?groupBy=disciplines&discipline=Cálculo 1').set('Authorization', `Bearer ${token}`);

        expect(res.status).toEqual(200);
        expect(res.body.tests.length).toEqual(1); 
    });

    it('should return 200 status code and array.tests.length equal 0, given filter disciplines and discipline equal a not registred discipline', async () => {
		const token = await tokenFactory();
		const response = await supertest(app)
			.get(`/tests?groupBy=disciplines&discipline=${faker.lorem.word()}`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toEqual(200);
		expect(response.body.tests.length).toEqual(0);
	});

    it('should return 2 test given filter teachers and teacher equal Lele', async () => {
		const token = await tokenFactory();
		const response = await supertest(app)
			.get('/tests?groupBy=teachers&teacher=Lele')
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toEqual(200);
		expect(response.body.tests.length).toEqual(2);
	});
})

afterAll(async () => {
	await prisma.$disconnect();
});
