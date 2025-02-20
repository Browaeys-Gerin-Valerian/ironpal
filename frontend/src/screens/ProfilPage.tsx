import { useEffect, useState } from 'react';
import Profil from '../components/Features/Profil';
import { getUserStats } from '../api/services/statsService';
import { useAuthProvider } from '../context/authContext';

const ProfilPage = () => {
  const { user } = useAuthProvider();

  const [userSessionsCount, setUserSessionsCount] = useState<number>(0);
  const [userValidatedSessionsCount, setUserValidatedSessionsCount] =
    useState<number>(0);

  useEffect(() => {
    const fetchUserStats = async () => {
      const userStats = await getUserStats(Number(user?.id));
      setUserSessionsCount(userStats.sessionsCount);
      setUserValidatedSessionsCount(userStats.validatedSessionsCount);
    };
    fetchUserStats();
  }, []);
  return (
    <Profil
      userSessionsCount={userSessionsCount}
      userValidatedSessionsCount={userValidatedSessionsCount}
    />
  );
};

export default ProfilPage;
