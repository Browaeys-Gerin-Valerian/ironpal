import { Request, Response, NextFunction } from 'express';
import exerciseModel from '../models/exerciceModel';
import ApiError from '../middleware/handlers/apiError';

const exerciseController = {
  async getAllExercices(req: Request, res: Response, next: NextFunction) {
    const exercices = await exerciseModel.getAllExercices();

    if(!exercices || exercices.length === 0) {
      const err = new ApiError(`Can not find exercise`, 400);
      return next(err);
    };

    res.status(200).json(exercices);
  }
};




export default exerciseController;

