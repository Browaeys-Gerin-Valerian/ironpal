import prisma from '../../prisma/client';

const statisticModel = {
    async allAppStatistic() {
        const [userCount, exerciseCount, sessionCount] = await Promise.all([
          prisma.user.count(),   
          prisma.exercise.count(),
          prisma.session.count()
        ]);
  
        return {
          users: userCount,
          exercises: exerciseCount,
          sessions: sessionCount,
        };
    },
  };
  
  export default statisticModel;
