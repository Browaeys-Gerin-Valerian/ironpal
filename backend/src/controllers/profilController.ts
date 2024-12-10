import { Request, Response, RequestHandler, NextFunction } from 'express';
import profilModel from '../models/profilModel';
import bcrypt from "bcryptjs"
import userModel from '../models/userModel';
import ApiError from '../middleware/handlers/apiError';

const profilController = {
    async getOne(req: Request, res: Response, next: NextFunction) {
        const profilId = req.params.id;

        const user = await profilModel.findUnique(parseInt(profilId));

        if(!user) {
            const err = new ApiError(`Can not find profil with id : ${profilId}`, 400);
            return next(err);
        };

        res.status(200).json(user);
    },

    update: (async (req: Request, res: Response, next: NextFunction) => {
        const profilId = req.params.id;
        const data = req.body;

        // Check if user already exists
        const existingUser = await userModel.findUserByEmail(data.email);

        if (existingUser) {
            const err = new ApiError(`Email already registered`, 409);
            return next(err);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await profilModel.update(parseInt(profilId), data);

        if(!updatedUser) {
            const err = new ApiError(`Can not update profil with id : ${profilId}`, 400);
            return next(err);
        };

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
     
    }) as RequestHandler,
};

export default profilController;
