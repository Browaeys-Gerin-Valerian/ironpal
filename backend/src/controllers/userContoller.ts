import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import ApiError from "../middleware/handlers/apiError";

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

    async create(req: Request, res: Response, next: NextFunction) {
        const { firstname, lastname, email, password, birthdate } = req.body;
        const user = await userModel.findByEmail(email);

        if (user) {
            const err = new ApiError(`Email already registered`, 409);
            return next(err);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            birthdate: new Date(birthdate),
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    },

    async update(req: Request, res: Response, next: NextFunction) {

        const { id } = req.params;
        const { body } = req;

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