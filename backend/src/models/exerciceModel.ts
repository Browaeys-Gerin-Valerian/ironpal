import prisma from '../../prisma/client';

const exerciseModel = {
  async findMany() {
    return prisma.exercise.findMany();
  },
  async count() {
    return prisma.exercise.count()
  }
};


export default exerciseModel;