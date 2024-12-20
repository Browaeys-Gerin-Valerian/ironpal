import { Request, Response, NextFunction } from 'express';
import { sessionExerciseModel } from '../models/sessionExercise';
import { Set } from "@prisma/client";
import ApiError from '../middleware/handlers/apiError';
import setModel from '../models/setModel';
import { CreateSetDTO } from '../utils/types/set/set';

export const sessionExerciseController = {

  async create(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const createdSessionExercise = await sessionExerciseModel.create(body);

    if (!createdSessionExercise) {
      const err = new ApiError(`Can not create session exercise`, 400);
      return next(err);
    };

    res.status(200).json(createdSessionExercise);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { body } = req

    const updateSessionExercise = await sessionExerciseModel.update(parseInt(id), body);

    const setsFromSessionExercise = await setModel.findManyBySessionExerciseId(updateSessionExercise.id)

    const setToCreate = body.sets.filter((set: Set) => !set.id)
    const createdSets = await Promise.all(setToCreate.map((set: CreateSetDTO) => setModel.create(set)))



    const updatedSets = await Promise.all(setsFromSessionExercise.map(setFromSessionExercise => {
      const matchingBodySet = body.set.find((set: Set) => set.id === setFromSessionExercise.id)
      if (matchingBodySet) {
        return setModel.update(matchingBodySet.id, matchingBodySet)
      }
      if (!matchingBodySet) {
        return setModel.delete(setFromSessionExercise.id)
      }
    }))

    if (!updateSessionExercise || !createdSets || !updatedSets) {
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

