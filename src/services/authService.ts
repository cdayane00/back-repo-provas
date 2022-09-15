import { CreateUserData } from "../types/userInterface";
import { bcryptEncryptData, bcryptCompareEncryptedData } from "../utils/bcrypt";
import * as userRepository from '../repositories/userRepository';
import appError from "../config/error";
import { generateToken } from "../utils/JWT";

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

export const signIn = async (signInData: CreateUserData) => {
    const {email, password} = signInData;
    const user = await userRepository.findByEmail(email);
    if(!user){
        throw new appError(
            'Invalid credentials',
            401,
            'Invalid credentials',
            'Ensure that the credentials are correct'
        );
    }
    const isPasswordValid = bcryptCompareEncryptedData(password, user.password);
    if(!isPasswordValid){
        throw new appError(
            'Invalid credentials',
            401,
            'Invalid credentials',
            'Ensure that the credentials are correct'
        );
    }
    const {id} = user;
    const token = generateToken(id);
    return token;
}
