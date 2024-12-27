import { Request, Response, NextFunction } from 'express';
import setService from '../services/set.service';
import ApiError from '../middleware/handlers/apiError';

export const setController = {
  async udpate(req: Request, res: Response, next: NextFunction) {
    const { setId } = req.params;
    const { body } = req;

    const udpatedSet = await setService.update(Number(setId), body);

    if (!udpatedSet) {
      const err = new ApiError(`Can not update set with id : ${setId}`, 400);
      return next(err);
    };

    res.status(200).json(udpatedSet);
  },
};


