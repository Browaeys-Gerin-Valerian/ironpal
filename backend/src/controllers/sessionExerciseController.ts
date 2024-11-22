import { Request, Response } from 'express';
import { sessionExerciseModel } from '../models/sessionExercise';

const sessionExerciseController = {
  async create(req: Request, res: Response) {
    const { body } = req
    try {
      const createdSessionExercise = await sessionExerciseModel.create(body);
      res.status(200).json(createdSessionExercise);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création d'un session exercice." });
    }
  },
  async update(req: Request, res: Response) {
    const { id } = req.params
    const { body } = req
    try {
      const createdSessionExercise = await sessionExerciseModel.update(parseInt(id), body);
      res.status(200).json(createdSessionExercise);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la modification d'un session exercice." });
    }
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await sessionExerciseModel.delete(parseInt(id));
      res.status(200).json({ message: 'session exercise successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la suppression d'un session exercice." });
    }
  },
}





export default sessionExerciseController;
