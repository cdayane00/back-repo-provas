import { faker } from "@faker-js/faker";
import { CreateTestData } from "../../src/types/testInterface";

const testDataFactory = (): CreateTestData => {
    return {
        name: faker.lorem.words(2),
        pdfUrl: faker.internet.url(),
		category: 'Prática',
		teacher: 'Frank',
		discipline: 'Cálculo 2',
    };
};

export default testDataFactory;