import { Request, Response, NextFunction } from 'express';
import ApiError from '../middleware/handlers/apiError';
import sessionModel from '../models/sessionModel';
import { calculateDateRange } from '../utils/functions/time';
import { sessionExerciseModel } from '../models/sessionExercise';
import { isEmptyArray } from '../utils/functions/array';
import setModel from '../models/setModel';

export const sessionController = {

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params;

    const session = await sessionModel.findOne(parseInt(sessionId));

    if (!session) {
      const err = new ApiError(`Can not find session with id : ${sessionId}`, 400);
      return next(err);
    };

    const sessionExercises = await sessionExerciseModel.findManyBySessionId(session.id)
    const setFromSession = await setModel.findManyBySessionExerciseId(session.id)

    const sessionData = {
      ...session,
      sessionExercises: { ...sessionExercises, sets: setFromSession }
    }


    res.status(200).json(sessionData);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    const { month, year } = req.query;

    if (!month || !year) {
      const err = new ApiError(`Query parameter month or year missing`, 400);
      return next(err);
    };

    const { monthStart, monthEnd } = calculateDateRange(month as string, year as string)

    const sessions = await sessionModel.findManyByUserId(parseInt(userId), monthStart, monthEnd);

    if (!sessions) {
      const err = new ApiError(`Can not find session with userId : ${userId}`, 400);
      return next(err);
    };

    //Check the field "validated" in all session exercise from a session
    const sessionValidated = await Promise.all(
      sessions.map(async (s) => {
        const sessionExercises = await sessionExerciseModel.findManyBySessionId(s.id);
        const validated = isEmptyArray(sessionExercises) ? false : sessionExercises.every(se => se.validated);
        return { ...s, validated };
      })
    );

    res.status(200).json(sessionValidated);
  },


  async create(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    const { title, session_date } = req.body;

    const newSession = await sessionModel.create({
      title,
      session_date: new Date(session_date),
      user_id: parseInt(userId)
    });

    if (!newSession) {
      const err = new ApiError(`Can not create new session`, 400);
      return next(err);
    }

    res.status(201).json(newSession);
  },


  async delete(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.params;
    const sessions = await sessionModel.delete(parseInt(sessionId));

    if (!sessions) {
      const err = new ApiError(`Can not delete session with id : ${sessionId}`, 400);
      return next(err);
    };

    res.status(200).json(sessions);
  },
};
