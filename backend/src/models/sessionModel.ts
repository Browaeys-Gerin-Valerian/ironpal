import prisma from "../../prisma/client";
import { CreateSessionDto } from "../utils/types/types";

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
        muscle_group: {
          select: {
            id: true,
            name: true,
          },
        },
        session_exercise: {
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
            set: {
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


  async createSession(data: CreateSessionDto) {

    return prisma.session.create({
      data,
    });
  },

  async findUserSessionsForMonth(userId: number, startDate: Date, endDate: Date) {
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

  async getUserSessionCount(userId: number) {
    return prisma.session.count({
      where: { user_id: userId },
    });
  },

  async getUserValidatedSessionCount(userId: number) {
    return prisma.session.count({
      where: { user_id: userId, validated: true },
    });
  },

  async getUserTodaySession(userId: number) {
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    return prisma.session.findMany({
      where: {
        user_id: userId,
        session_date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
  },

};

export default sessionModel;