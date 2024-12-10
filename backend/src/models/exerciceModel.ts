import prisma from '../../prisma/client';

const exerciseModel = {
  async getAllExercices() {
    return prisma.exercise.findMany();
  }
};


export default exerciseModel;