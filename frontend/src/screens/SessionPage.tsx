import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Exercise } from '../interfaces/data/exercise/Exercise';
import { SessionWithSessionExercises } from '../interfaces/data/session/Session';
import Session from '../components/Features/Session';
import GETsession from '../api/services/sessions/GETsession';
import GETexercises from '../api/services/exercises/GETexecises';

const SessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionWithSessionExercises>(
    {} as SessionWithSessionExercises
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);

  if (!id) {
    navigate('/calendar');
    return null;
  }

  const loadSession = async () => {
    setLoading(true);
    try {
      const sessionData = await GETsession(id);
      setSession(sessionData);
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const exercisesData = await GETexercises();
      setExercises(exercisesData);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    }
  };

  useEffect(() => {
    loadSession();
  }, [id]);

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <Session
      loading={loading}
      setLoading={setLoading}
      session={session}
      setSession={setSession}
      exercises={exercises}
    />
  );
};

export default SessionPage;
