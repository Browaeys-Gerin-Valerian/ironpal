import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import ApiError from "../middleware/handlers/apiError";
import { ReqWithUser } from "../utils/types/user/user";

export const userController = {
    async getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const user = await userModel.findById(parseInt(id));

        if (!user) {
            const err = new ApiError(`Can not find profil with id : ${id}`, 400);
            return next(err);
        };

        res.status(200).json(user);
    },

    async update(req: ReqWithUser, res: Response, next: NextFunction) {
        const { id: userId } = req.user as { id: number }
        const { id } = req.params;
        const { body } = req;

        if (body.id !== userId) {
            const err = new ApiError(`Permission denied to update this profil`, 403);
            return next(err);
        }

        const user = await userModel.findByEmail(body.email);

        if (user) {
            const err = new ApiError(`Email already registered`, 409);
            return next(err);
        }

        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }

        const updatedUser = await userModel.update(parseInt(id), body);

        if (!updatedUser) {
            const err = new ApiError(`Can not update profil with id : ${id}`, 400);
            return next(err);
        };

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    },
}