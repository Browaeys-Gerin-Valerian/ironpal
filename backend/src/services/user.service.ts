import prisma from "../../prisma/client";
import { CreateUserDto, UpdateUserDTO } from "../utils/types/DTO/user";


const userService = {
  async findById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  async create(data: CreateUserDto) {
    return prisma.user.create({
      data,
    });
  },
  async update(userId: number, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id: userId },
      data
    });
  },
  async count() {
    return prisma.user.count();
  },


};

export default userService;
