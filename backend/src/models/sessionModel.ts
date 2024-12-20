import prisma from "../../prisma/client";
import { CreateSessionDTO } from "../utils/types/session/session";


const sessionModel = {
  async findUnique(id: number) {
    return prisma.session.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            birthdate: true,
          },
        },
        session_exercises: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            load: true,
            validated: true,
            rest_between_exercises: true,
            exercise: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            sets: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                number_of_repetitions: true,
                difficulty: true,
                rest_between_sets: true,
                session_exercise: true,
              },
            },
          },
        },
      },
    });
  },


  async findManyByUserId(userId: number, startDate: Date, endDate: Date) {
    return prisma.session.findMany({
      where: {
        user_id: userId,
        session_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        session_date: 'asc',
      },
    });
  },

  async create(data: CreateSessionDTO) {
    return prisma.session.create({
      data,
    });
  },
  async delete(session_id: number) {
    // await prisma.set.deleteMany({
    //   where: {
    //     session_exercise: {
    //       session_id
    //     },
    //   },
    // });

    // await prisma.sessionExercise.deleteMany({
    //   where: {
    //     session_id,
    //   },
    // });

    return await prisma.session.delete({
      where: {
        id: session_id,
      },
    });
  },

  async count() {
    return prisma.session.count()
  },

  //TODO A REVOIR
  async countFromUserId(userId: number) {
    return prisma.session.count({
      where: { user_id: userId },
    });
  },
};

export default sessionModel;