import { CreateUserData } from "../types/userInterface";
import { bcryptEncryptData, bcryptCompareEncryptedData } from "../utils/bcrypt";
import * as userRepository from '../repositories/userRepository';
import appError from "../config/error";

export const signUp = async (createUserData: CreateUserData) => {
    const {email, password} = createUserData;
    const existingUser = await userRepository.findByEmail(email);
    if(existingUser){
        throw new appError(
            'User already exists',
            409,
            'User already exists',
            'Ensure you are not using an existing email'
        );
    }
    const encryptedPassword = bcryptEncryptData(password);
    await userRepository.insert({
        ...createUserData,
        password: encryptedPassword
    });
};
