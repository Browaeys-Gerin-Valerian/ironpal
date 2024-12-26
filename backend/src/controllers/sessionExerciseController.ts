import { Request, Response, NextFunction } from 'express';
import { sessionExerciseModel } from '../models/sessionExercise';
import { Set } from "@prisma/client";
import ApiError from '../middleware/handlers/apiError';
import setModel from '../models/setModel';
import { CreateSetDTO } from '../utils/types/set/set';
import exerciseModel from '../models/exerciceModel';

export const sessionExerciseController = {

  async create(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params
    const { load, rest_between_exercises, validated = false, comment = "", exercise_id, sets } = req.body

    const data = { load, rest_between_exercises: Number(rest_between_exercises), validated: (validated === 'false') ? false : true, comment, session_id: Number(sessionId), exercise_id: Number(exercise_id) }

    const createdSessionExercise = await sessionExerciseModel.create(data);

    if (!createdSessionExercise) {
      const err = new ApiError(`Can not create session exercise`, 400);
      return next(err);
    };

    //PROMISE ALL SEEMS TO NOT CREATE IN A PROPER ORDER
    for (const set of sets) {
      const { number_of_repetitions, rest_between_sets, difficulty = 0 } = set
      const data = { number_of_repetitions: Number(number_of_repetitions), rest_between_sets: Number(rest_between_sets), difficulty: Number(difficulty), session_exercise_id: createdSessionExercise.id }
      await setModel.create(data);
    }

    const exerciseFromSessionExercise = await exerciseModel.findOneById(createdSessionExercise.exercise_id)
    const setsFormSessionExercise = await setModel.findManyBySessionExerciseId(createdSessionExercise.id)

    const response = { ...createdSessionExercise, exercise: exerciseFromSessionExercise, sets: setsFormSessionExercise }

    res.status(200).json(response);
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { sessionExerciseId } = req.params
    const { sets, ...rest } = req.body

    const updateSessionExercise = await sessionExerciseModel.update(Number(sessionExerciseId), rest);

    if (!updateSessionExercise) {
      const err = new ApiError(`Can not update session exercise with sessionExerciseId : ${sessionExerciseId}`, 400);
      return next(err);
    };


    const setsFromSessionExercise = await setModel.findManyBySessionExerciseId(updateSessionExercise.id)

    const setToCreate = sets.filter((set: Set) => !set.id)

    //PROMISE ALL SEEMS TO NOT CREATE IN A PROPER ORDER
    for (const set of setToCreate) {
      await setModel.create({ ...set, session_exercise_id: Number(sessionExerciseId) })
    }

    for (const setFromSessionExercise of setsFromSessionExercise) {
      //IF WE FOUND A MATCHING SET BETWEEN SET FROM SESSION EXERCISE IN THE DB AND THE RETURNED ONES FROM THE CLIENT IT S AN UPDATED OTHERWISE ITS A DELETE
      const matchingBodySet = sets.find((set: Set) => set.id === setFromSessionExercise.id)

      if (matchingBodySet) {
        await setModel.update(matchingBodySet.id, matchingBodySet)
      }
      if (!matchingBodySet) {
        await setModel.delete(setFromSessionExercise.id)
      }
    }


    const exerciseFromSessionExercise = await exerciseModel.findOneById(updateSessionExercise.exercise_id)
    const setsFormSessionExercise = await setModel.findManyBySessionExerciseId(updateSessionExercise.id)

    const response = { ...updateSessionExercise, exercise: exerciseFromSessionExercise, sets: setsFormSessionExercise }

    res.status(200).json(response);

  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { sessionExerciseId } = req.params

    const deleteSessionExercise = await sessionExerciseModel.delete(Number(sessionExerciseId));

    if (!deleteSessionExercise) {
      const err = new ApiError(`Can not delete session exercise with sessionExerciseId ${sessionExerciseId}`, 400);
      return next(err);
    }
    res.status(200).json({ message: 'session exercise successfully deleted' });

  },
}

