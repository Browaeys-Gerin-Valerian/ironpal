import prisma from '../../prisma/client';

const exerciseModel = {

  async findOneById(exerciseId: number) {
    return prisma.exercise.findUnique({ where: { id: exerciseId } });
  },
  async findMany() {
    return prisma.exercise.findMany({ orderBy: { id: 'asc' } });
  },
  async count() {
    return prisma.exercise.count()
  }
};


export default exerciseModel;