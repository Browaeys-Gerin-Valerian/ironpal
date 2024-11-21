import prisma from '../../prisma/client';

const exerciseModel = {
  async getTotalExercises() {
    return prisma.exercise.count();
  },
  async getAllExercices() {
    return prisma.exercise.findMany();
  }
};


export default exerciseModel;