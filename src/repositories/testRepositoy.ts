import { TestData } from "../types/testInterface";
import prisma from '../config/database';

export const create = async (testData: TestData) => {
    return prisma.test.create({
        data: testData
    });
};

