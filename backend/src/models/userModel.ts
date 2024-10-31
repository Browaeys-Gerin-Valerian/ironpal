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

  async findUniqueWithoutPassword(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true
      }
    });
  },
};

export default userModel;
