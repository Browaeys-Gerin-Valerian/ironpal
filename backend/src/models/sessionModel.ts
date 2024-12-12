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
      include: {
        session_exercise: true
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
        session_exercise: true, // Include sessionExercises for each session
      },
    });
  
    // Check and update validated sessions
    for (const session of sessions) {
      const allExercisesValidated = session.session_exercise.every(sessionExercise => sessionExercise.validated);
  
      if (allExercisesValidated && !session.validated) {
        // Update the session if it is not already validated
        await prisma.session.update({
          where: { id: session.id },
          data: { validated: true },
        });
      }
    }
  
    // Return the number of validated sessions
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