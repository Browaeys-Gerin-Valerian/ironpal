import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Exercise } from '../interfaces/entities/Exercise';
import Session from '../components/Features/Session';
import { getExercises } from '../api/services/exercises';
import { SessionProvider } from '../context/sessionContext';

const SessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/calendar');
    return;
  }

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const loadExercises = async () => {
    try {
      const exercisesData = await getExercises();
      setExercises(exercisesData);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <SessionProvider>
      <Session exercises={exercises} />
    </SessionProvider>
  );
};

export default SessionPage;
