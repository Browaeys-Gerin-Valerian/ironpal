import { User } from "@prisma/client";
import prisma from "../../prisma/client";

const profilModel = {

  async findUnique(id: number) {
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

  async update(id: number, data: User) {
    return prisma.user.update({
      where: { id },
      data
    });
  },

};

export default profilModel;
