import prisma from "../../prisma/client";
import { CreateUserDto, UpdateUserDTO } from "../utils/types/user/user";


const userModel = {
  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
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
  async update(id: number, data: UpdateUserDTO) {
    return prisma.user.update({
      where: { id },
      data
    });
  },
  async count() {
    return prisma.user.count();
  },


};

export default userModel;
