import { useEffect, useState } from 'react';
import Profil from '../components/Features/Profil';
import {
  getUserSessionsCount,
  getUserValidatedSessionsCount,
} from '../api/services/statsService';

const ProfilPage = () => {
  const [userSessionsCount, setUserSessionsCount] = useState<number>(0);
  const [userValidatedSessionsCount, setUserValidatedSessionsCount] =
    useState<number>(0);

  useEffect(() => {
    const fetchUserStats = async () => {
      const sessionsCount = await getUserSessionsCount();
      const validatedSessionsCount = await getUserValidatedSessionsCount();

      setUserSessionsCount(sessionsCount);
      setUserValidatedSessionsCount(validatedSessionsCount);
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
