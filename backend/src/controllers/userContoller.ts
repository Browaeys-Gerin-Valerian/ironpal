import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import userService from "../services/user.service";
import ApiError from "../middleware/handlers/apiError";
import sessionService from "../services/session.service";

export const userController = {
    async getOne(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params;

        const user = await userService.findById(Number(userId));

        if (!user) {
            const err = new ApiError(`Can not find profil with id : ${userId}`, 404);
            return next(err);
        };

        res.status(200).json(user);
    },

    async create(req: Request, res: Response, next: NextFunction) {
        const { firstname, lastname, email, password: pwdBody, birthdate } = req.body;

        const user = await userService.findByEmail(email);

        if (user) {
            const err = new ApiError(`Email already registered`, 409);
            return next(err);
        }

        const hashedPassword = await bcrypt.hash(pwdBody, 10);

        const newUser = await userService.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            birthdate: new Date(birthdate),
        });

        const { password, ...rest } = newUser

        res.status(201).json({ message: "User created successfully", user: rest });
    },

    async update(req: Request, res: Response, next: NextFunction) {

        const { userId } = req.params;
        const { body } = req;

        const user = await userService.findByEmail(body.email);

        if (user) {
            const err = new ApiError(`Email already registered`, 409);
            return next(err);
        }

        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }

        const updatedUser = await userService.update(Number(userId), body);

        if (!updatedUser) {
            const err = new ApiError(`Can not update profil with userId : ${userId}`, 400);
            return next(err);
        };

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    },
    async getStats(req: Request, res: Response, next: NextFunction) {

        const { userId } = req.params;

        const [sessionsCount, validatedSessionsCount] = await Promise.all(
            [
                await sessionService.countByUserId(Number(userId)),
                await sessionService.countValidateByUserId(Number(userId)),
            ]
        )
        const statistics = { sessionsCount, validatedSessionsCount }

        if (!statistics) {
            const err = new ApiError(`Can not find statistics for the homepage`, 400);
            return next(err);
        };

        res.json(statistics);
    }
}