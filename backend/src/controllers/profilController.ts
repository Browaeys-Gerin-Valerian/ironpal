import { Request, Response, RequestHandler } from 'express';
import profilModel from '../models/profilModel';
import bcrypt from "bcryptjs"
import userModel from '../models/userModel';

const profilController = {
    async getOne(req: Request, res: Response) {
        const profilId = req.params.id;

        const user = await profilModel.findUnique(parseInt(profilId));

        res.status(200).json(user);
    },

    update: (async (req: Request, res: Response) => {
        const profilId = req.params.id;
        const data = req.body;

        // Check if user already exists
        const existingUser = await userModel.findUserByEmail(data.email);

        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        try {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const updatedUser = await profilModel.update(parseInt(profilId), data);

            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }) as RequestHandler,
};

export default profilController;
