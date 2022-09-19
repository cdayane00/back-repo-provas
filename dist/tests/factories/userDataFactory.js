"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const userDataFactory = () => {
    return {
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password()
    };
};
exports.default = userDataFactory;
