import { Request, Response } from 'express';

const userController = {
  async getOne(req: Request, res: Response) {
    const userId = req.params.id;

    const fakeUser = {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com"
    };

    res.status(200).json(fakeUser);
  }
};

export default userController;
