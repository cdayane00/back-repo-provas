import prisma from '../../src/config/database';
import { CreateUserData } from '../../src/types/userInterface';
import { bcryptEncryptData } from '../../src/utils/bcrypt';

const userFactory = (user: CreateUserData) => {
    return prisma.user.create({
        data: {
            ...user,
            password: bcryptEncryptData(user.password)
        }
    });
};

export default userFactory;