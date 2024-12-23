import prisma from "../../prisma/client";

const mucleGroupModel = {

  async findMany() {
    return prisma.muscleGroup.findMany({ orderBy: { id: 'asc' } });
  },
  async count() {
    return prisma.muscleGroup.count();
  },
};

export default mucleGroupModel;