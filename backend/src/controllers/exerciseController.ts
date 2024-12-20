import { Request, Response, NextFunction } from 'express';
import exerciseModel from '../models/exerciceModel';

export const exerciseController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const exercices = await exerciseModel.findMany();
    res.status(200).json(exercices);
  }
};






