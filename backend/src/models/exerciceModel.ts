import prisma from '../../prisma/client';

const exerciseModel = {
  async getTotalExercises() {
    return prisma.exercise.count();
  },
};

export default exerciseModel;