import prisma from "../../prisma/client";
import { SessionSessionExerciseData } from "../utils/types/types";

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


  async createSession(data: { title: string, session_date: Date, validated: boolean, user_id: number, muscle_group_id: number | null }) {

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


  async getTotalSessions() {
    return prisma.session.count();
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

  async update(id: number, data: SessionSessionExerciseData) {
    // Destructure the title and sessionExercises from the provided data
    const { title, sessionExercises } = data;

    // Start a Prisma transaction to ensure all database changes are made atomically
    return await prisma.$transaction(async (prisma) => {

      // Update the session title in the database using the provided 'id'
      const updatedTitleSession = await prisma.session.update({
        where: { id },
        data: { title },
      });

      // Loop through each sessionExercise to update or create them
      for (const sessionExercise of sessionExercises) {
        const { id: sessionExerciseId, exercise, sets, ...sessionSessionExerciseData } = sessionExercise;

        let updatedSessionExercise;

        // If sessionExerciseId exists, update the corresponding session exercise
        if (sessionExerciseId) {
          updatedSessionExercise = await prisma.sessionExercise.update({
            where: { id: sessionExerciseId },
            data: {
              ...sessionSessionExerciseData,  // Update other session exercise data
              exercise: exercise.id
                ? { connect: { id: exercise.id } }  // If exercise exists, connect to the exercise by its 'id'
                : undefined,  // If no exercise is provided, leave it undefined
            },
          });
        } else {
          // If sessionExerciseId doesn't exist, create a new session exercise
          updatedSessionExercise = await prisma.sessionExercise.create({
            data: {
              ...sessionSessionExerciseData,  // Create session exercise with the provided data
              session: { connect: { id } },  // Connect the session with the given 'id'
              exercise: { connect: { id: exercise.id } },  // Connect to the exercise using its 'id'
            },
          });
        }

        // If sets are provided and are in array format, loop through each set
        if (sets && Array.isArray(sets)) {
          for (const set of sets) {
            const { session_exercise_id, ...setData } = set;

            // If the set already has an 'id', update it
            if (session_exercise_id) {
              await prisma.set.update({
                where: { id: session_exercise_id },  // Find the set by its 'id'
                data: setData,  // Update set data
              });
            } else {
              // If the set doesn't have an 'id', create a new set
              await prisma.set.create({
                data: {
                  ...setData,  // Create set with the provided data
                  session_exercise_id: updatedSessionExercise.id,  // Link the set to the updated session exercise
                },
              });
            }
          }
        }
      }

      // Return the updated session with the new title
      return updatedTitleSession;
    });
  }

};

export default sessionModel;