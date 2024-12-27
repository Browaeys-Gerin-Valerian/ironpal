import { Request, Response, NextFunction } from 'express';
import ApiError from '../middleware/handlers/apiError';
import setService from '../services/set.service';
import sessionService from '../services/session.service';
import { calculateDateRange } from '../utils/functions/time';
import { sessionExerciseService } from '../services/sessionExercise.service';
import { isEmptyArray } from '../utils/functions/array';

export const sessionController = {

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params;

    const session = await sessionService.findOneById(Number(sessionId));

    if (!session) {
      const err = new ApiError(`Can not find session with id : ${sessionId}`, 400);
      return next(err);
    };

    const sessionExercisesFromSession = await sessionExerciseService.findManyBySessionId(session.id)


    const sessionExercisesWithSets = await Promise.all(sessionExercisesFromSession.map(async sessionExercise => {
      const setsFromSessionExercise = await setService.findManyBySessionExerciseId(sessionExercise.id)
      return { ...sessionExercise, sets: setsFromSessionExercise }
    }))

    const response = { ...session, session_exercises: sessionExercisesWithSets }


    res.status(200).json(response);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    const { month, year } = req.query;

    if (!month || !year) {
      const err = new ApiError(`Query parameter month or year missing`, 400);
      return next(err);
    };

    const { monthStart, monthEnd } = calculateDateRange(month as string, year as string)

    const sessions = await sessionService.findManyByUserId(Number(userId), monthStart, monthEnd);

    if (!sessions) {
      const err = new ApiError(`Can not find session with userId : ${userId}`, 400);
      return next(err);
    };

    //Check the field "validated" in all session exercise from a session
    const sessionValidated = await Promise.all(
      sessions.map(async (s) => {
        const sessionExercises = await sessionExerciseService.findManyBySessionId(s.id);
        const validated = isEmptyArray(sessionExercises) ? false : sessionExercises.every(se => se.validated);
        return { ...s, validated };
      })
    );

    res.status(200).json(sessionValidated);
  },


  async create(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    const { title, session_date } = req.body;

    const newSession = await sessionService.create({
      title,
      session_date: new Date(session_date),
      user_id: Number(userId)
    });

    if (!newSession) {
      const err = new ApiError(`Can not create new session`, 400);
      return next(err);
    }

    res.status(201).json(newSession);
  },


  async delete(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params;
    const sessions = await sessionService.delete(Number(sessionId));

    if (!sessions) {
      const err = new ApiError(`Can not delete session with id : ${sessionId}`, 400);
      return next(err);
    };

    res.status(200).json(sessions);
  },
};
