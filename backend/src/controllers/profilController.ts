import { Request, Response } from 'express';
import profilModel from '../models/profilModel';
import bcrypt from "bcryptjs"

const profilController = {
    async getOne(req: Request, res: Response) {
        const profilId = req.params.id;

        const user = await profilModel.findUnique(parseInt(profilId));

        res.status(200).json(user);
    },

    async update(req: Request, res: Response) {
        const profilId = req.params.id;
        const data = req.body;

        try {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const updatedUser = await profilModel.update(parseInt(profilId), data);

            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }
};

export default profilController;
