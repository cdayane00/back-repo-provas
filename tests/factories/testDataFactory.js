"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const testDataFactory = () => {
    return {
        name: faker_1.faker.lorem.words(2),
        pdfUrl: faker_1.faker.internet.url(),
        category: 'Prática',
        teacher: 'Frank',
        discipline: 'Cálculo 2',
    };
};
exports.default = testDataFactory;
