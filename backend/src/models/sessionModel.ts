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
      include: {
        session_exercises: true
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
    // Retrieve all user sessions
    const sessions = await prisma.session.findMany({
      where: { user_id: userId },
      include: {
        session_exercises: true, // Include sessionExercises for each session
      },
    });

    const sessionValidatedCount = sessions.filter(s => s.session_exercises.every(se => se.validated))
    return sessionValidatedCount.length
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


  async delete(id: number) {
    await prisma.set.deleteMany({
      where: {
        session_exercise: {
          session_id: id,
        },
      },
    });

    await prisma.sessionExercise.deleteMany({
      where: {
        session_id: id,
      },
    });

    return await prisma.session.delete({
      where: {
        id: id,
      },
    });
  }

};

export default sessionModel;