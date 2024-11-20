import prisma from "../../prisma/client";

const mucleGroupModel = {

  async findMany() {
    return prisma.muscleGroup.findMany();
  }

};

export default mucleGroupModel;