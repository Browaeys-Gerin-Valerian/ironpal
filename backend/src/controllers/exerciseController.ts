import { Request, Response, NextFunction } from 'express';
import exerciseService from '../services/exercise.service';

export const exerciseController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const exercices = await exerciseService.findMany();
    res.status(200).json(exercices);
  }
};






