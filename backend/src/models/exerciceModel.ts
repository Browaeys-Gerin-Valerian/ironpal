import prisma from '../../prisma/client';

const exerciseModel = {

  async findMany() {
    return prisma.exercise.findMany({ orderBy: { id: 'asc' } });
  },
  async count() {
    return prisma.exercise.count()
  }
};


export default exerciseModel;