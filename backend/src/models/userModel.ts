import prisma from "../../prisma/client";
import { CreateUserDto } from "../utils/types/types";

const userModel = {
  async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data,
    });
  },

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async getTotalUsers() {
    return prisma.user.count();
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
        birthdate: true,
        updated_at: true,
        created_at: true
      }
    });
  },
};

export default userModel;
