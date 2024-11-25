import { Request, Response } from 'express';
import setModel from '../models/setModel';

const setController = {
  async udpate(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    try {
      const udpatedSet = await setModel.update(parseInt(id), body);
      res.status(200).json(udpatedSet);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la modification d'un Set.",
      });
    }
  },
};

export default setController;
