import prisma from "../../prisma/client";

const userModel = {
  async createUser(data: { firstname: string; lastname: string; email: string; password: string, birthdate: string }) {
    return prisma.user.create({
      data,
    });
  },

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async findUnique(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};

export default userModel;
