import {Request, Response} from 'express';
import * as categoryRepository from '../repositories/categoryRepository';

export const findMany = async (req: Request, res: Response) => {
	const categories = await categoryRepository.findAll('Category');
	res.send({ categories });
};