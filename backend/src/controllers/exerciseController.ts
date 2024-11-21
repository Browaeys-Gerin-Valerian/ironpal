import { Request, Response } from 'express';
import exerciseModel from '../models/exerciceModel';

const exerciseController = {
  async getTotalExercises(req: Request, res: Response) {
    const count = await exerciseModel.getTotalExercises();
    res.status(200).json({ count });
  },
};

export default exerciseController;

