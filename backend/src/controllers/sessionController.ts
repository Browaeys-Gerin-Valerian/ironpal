import { Request, Response, NextFunction, RequestHandler } from 'express';
import sessionModel from '../models/sessionModel';
import dayjs from 'dayjs';
import { ReqWithUser } from '../utils/types/types';
import ApiError from '../middleware/handlers/apiError';


const sessionController = {
  async getOne(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.params.id;

    const session = await sessionModel.findUnique(parseInt(sessionId));

    if (!session) {
      const err = new ApiError(`Can not find session with id : ${sessionId}`, 400);
      return next(err);
    };

    res.status(200).json(session);
  },

  async createSession(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    const { title, session_date, muscle_group_id, validated = false } = req.body;

    const newSession = await sessionModel.createSession({
      title,
      session_date: new Date(session_date),
      validated,
      user_id: id,
      muscle_group_id: parseInt(muscle_group_id),
    });

    if (!newSession) {
      const err = new ApiError(`Can not create new session`, 400);
      return next(err);
    }

    res.status(201).json(newSession);
  },

  getUserSessions: (async (req: ReqWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(400).json({ message: "Aucun utilisateur trouvé" });
    }
    const { id } = req.user;
    const { month, year } = req.query;
    // Vérification et conversion des paramètres
    const targetMonth = parseInt(month as string, 10) + 1 || dayjs().month() + 1;
    const targetYear = parseInt(year as string, 10) || dayjs().year();
    if (isNaN(targetMonth) || isNaN(targetYear) || targetMonth < 1 || targetMonth > 12) {
      return res.status(400).json({ message: "Paramètres 'month' ou 'year' invalides." });
    }
    const monthStart = dayjs(`${targetYear}-${String(targetMonth).padStart(2, "0")}-01`).startOf('month').toDate();
    const monthEnd = dayjs(monthStart).endOf('month').toDate();

    const sessions = await sessionModel.findUserSessionsForMonth(id, monthStart, monthEnd);

    if (!sessions) {
      const err = new ApiError(`Can not find session with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(sessions);
  }) as RequestHandler,

  async getUserSessionCount(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };


    const count = await sessionModel.getUserSessionCount(id);

    if (!count) {
      const err = new ApiError(`Can not get user session count with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json({ count });

  },



  async getUserValidatedSessionCount(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    const count = await sessionModel.getUserValidatedSessionCount(id);

    if (!count) {
      const err = new ApiError(`Can not get user validated session count with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json({ count });

  },

  async getUserTodaySession(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };

    const todaySession = await sessionModel.getUserTodaySession(id);

    if (!todaySession) {
      const err = new ApiError(`Unable to find today's sessions for user id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(todaySession);

  },

  async updateSession(req: ReqWithUser, res: Response, next: NextFunction) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const id = req.params.id;
    const data = req.body;

    const sessions = await sessionModel.update(parseInt(id), data);

    if (!sessions) {
      const err = new ApiError(`Can not update session with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(sessions);

  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

      const deleteSession = await sessionModel.delete(parseInt(id));

      if (!deleteSession) {
        const err = new ApiError(`Can not delete session exercise with id ${id}`, 400);
        return next(err);
      }
      res.status(200).json({ message: 'session exercise successfully deleted' });

  },

};
export default sessionController; 