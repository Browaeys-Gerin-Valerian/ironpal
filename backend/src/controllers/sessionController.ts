import { Request, Response, RequestHandler } from 'express';
import sessionModel from '../models/sessionModel';
import dayjs from 'dayjs';
import { ReqWithUser } from '../utils/types/types';
const sessionController = {
  async getOne(req: Request, res: Response) {
    const sessionId = req.params.id;
    try {
      const session = await sessionModel.findUnique(parseInt(sessionId));
      res.status(200).json(session);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération de la session.", error });
    }
  },
  async createSession(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    const { title, session_date, muscle_group_id, validated = false } = req.body;
    try {
      const newSession = await sessionModel.createSession({
        title,
        session_date: new Date(session_date),
        validated,
        user_id: id,
        muscle_group_id: parseInt(muscle_group_id),
      });
      res.status(201).json(newSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création de la session.", error });
    }
  },
  getUserSessions: (async (req: ReqWithUser, res: Response) => {
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
    try {
      const sessions = await sessionModel.findUserSessionsForMonth(id, monthStart, monthEnd);
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des sessions pour un utilisateur.", error });
    }
  }) as RequestHandler,
  async getTotalSessions(req: Request, res: Response) {
    try {
      const count = await sessionModel.getTotalSessions();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération du total des sessions.", error });
    }
  },
  async getUserSessionCount(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    try {
      const count = await sessionModel.getUserSessionCount(id);
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération du nombre de sessions pour l'utilisateur.", error });
    }
  },
  async getUserValidatedSessionCount(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    try {
      const count = await sessionModel.getUserValidatedSessionCount(id);
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération du nombre de sessions validées pour l'utilisateur.", error });
    }
  },
  async getUserTodaySession(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const { id } = req.user as { id: number };
    try {
      const todaySession = await sessionModel.getUserTodaySession(id);
      res.status(200).json(todaySession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération de la session du jour pour l'utilisateur.", error });
    }
  },
  async updateSession(req: ReqWithUser, res: Response) {
    if (!req.user) throw new Error('Aucun utilisateur trouvé');
    const id = req.params.id;
    const data = req.body;
    try {
      const sessions = await sessionModel.update(parseInt(id), data);
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la modification ou création d'une session exercice." });
    }
  },
};
export default sessionController; 