import { Request, Response, NextFunction } from 'express';
import setModel from '../models/setModel';
import ApiError from '../middleware/handlers/apiError';

export const setController = {
  async udpate(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;

    const udpatedSet = await setModel.update(Number(id), body);

    if (!udpatedSet) {
      const err = new ApiError(`Can not update set with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(udpatedSet);
  },
};


