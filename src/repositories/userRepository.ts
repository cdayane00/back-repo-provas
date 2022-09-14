import prisma from '../config/database';
import { CreateUserData } from '../types/userInterface';

export const findByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    });
    return user;
};

export const insert = async (createUserData: CreateUserData) => {
    return await prisma.user.create({
        data: createUserData
    });
};