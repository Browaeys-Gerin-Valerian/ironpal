import { Request, Response, NextFunction } from 'express';
import { sessionExerciseModel } from '../models/sessionExercise';
import { Set } from "@prisma/client";
import ApiError from '../middleware/handlers/apiError';
import setModel from '../models/setModel';
import { CreateSetDTO } from '../utils/types/set/set';

export const sessionExerciseController = {

  async create(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params
    const { load, rest_between_exercises, validated = false, comment = "", exercise_id, sets } = req.body

    const data = { load, rest_between_exercises: Number(rest_between_exercises), validated: Boolean(validated), comment, session_id: parseInt(sessionId), exercise_id: parseInt(exercise_id) }

    const createdSessionExercise = await sessionExerciseModel.create(data);

    const createdSets = await Promise.all(sets.map((set: CreateSetDTO) => {
      const { number_of_repetitions, rest_between_sets, difficulty = 0 } = set
      const data = { number_of_repetitions: Number(number_of_repetitions), rest_between_sets: Number(rest_between_sets), difficulty: Number(difficulty), session_exercise_id: createdSessionExercise.id }
      return setModel.create(data)
    }))

    if (!createdSessionExercise || !createdSets) {
      const err = new ApiError(`Can not create session exercise`, 400);
      return next(err);
    };

    res.status(200).json(createdSessionExercise);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { sessionExerciseId } = req.params
    const { body } = req

    const updateSessionExercise = await sessionExerciseModel.update(parseInt(sessionExerciseId), body);

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
      const err = new ApiError(`Can not update session exercise with sessionExerciseId : ${sessionExerciseId}`, 400);
      return next(err);
    };

    res.status(200).json(updateSessionExercise);

  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { sessionExerciseId } = req.params

    const deleteSessionExercise = await sessionExerciseModel.delete(parseInt(sessionExerciseId));

    if (!deleteSessionExercise) {
      const err = new ApiError(`Can not delete session exercise with sessionExerciseId ${sessionExerciseId}`, 400);
      return next(err);
    }
    res.status(200).json({ message: 'session exercise successfully deleted' });

  },
}

