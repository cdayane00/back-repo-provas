import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId: number) => {
    const secret: string = process.env.JWT_SECRET || '123';
    return jwt.sign({userId}, secret ,{ expiresIn: '24h'});
};

export const verifyToken = (token: string) => {
    const secret: string = process.env.JWT_SECRET || '123';
    return jwt.verify(token, secret);
};