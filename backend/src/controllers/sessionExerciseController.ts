import { Request, Response, NextFunction } from 'express';
import { sessionExerciseModel } from '../models/sessionExercise';
import ApiError from '../middleware/handlers/apiError';

const sessionExerciseController = {

  async create(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const createdSessionExercise = await sessionExerciseModel.create(body);

    if(!createdSessionExercise) {
      const err = new ApiError(`Can not create session exercise`, 400);
      return next(err);
    };

    res.status(200).json(createdSessionExercise);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { body } = req
 
    const updateSessionExercise = await sessionExerciseModel.update(parseInt(id), body);

    if(!updateSessionExercise) {
      const err = new ApiError(`Can not update session exercise with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(updateSessionExercise);

  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

      const deleteSessionExercise = await sessionExerciseModel.delete(parseInt(id));

      if (!deleteSessionExercise) {
        const err = new ApiError(`Can not delete session exercise with id ${id}`, 400);
        return next(err);
      }
      res.status(200).json({ message: 'session exercise successfully deleted' });

  },
}





export default sessionExerciseController;
