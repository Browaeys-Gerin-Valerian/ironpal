import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionWithSessionExercises } from '../interfaces/entities/Session';
import { SessionExerciseWithExerciseAndSets } from '../interfaces/entities/SessionExercise';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthProvider } from './authContext';
import { deleteSession, getSession } from '../api/services/sessions';
import { deleteSessionExercise } from '../api/services/sessionExercises';
import { Set } from '../interfaces/entities/Set';

interface AuthContextType {
  loading: boolean;
  session: SessionWithSessionExercises;
  sessionExerciseToEdit: SessionExerciseWithExerciseAndSets;
  setSessionExerciseToEdit: React.Dispatch<
    React.SetStateAction<SessionExerciseWithExerciseAndSets>
  >;
  handleDeleteSession: () => void;
  handleSelectSessionExerciseToEdit: (sessionExerciseId: number) => void;
  handleAddSessionExercise: (
    createdSessionExercise: SessionExerciseWithExerciseAndSets
  ) => void;
  handleUpdateSessionExercise: (
    updatedSessionExercise: SessionExerciseWithExerciseAndSets
  ) => void;
  handleDeleteSessionExercise: (sessionExerciseId: number) => void;
  handleUpdateSet: (sessionExerciseId: number, updatedSet: Set) => void;
}

const SessionContext = createContext<AuthContextType>({} as AuthContextType);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<SessionWithSessionExercises>(
    {} as SessionWithSessionExercises
  );
  const [sessionExerciseToEdit, setSessionExerciseToEdit] =
    useState<SessionExerciseWithExerciseAndSets>(
      {} as SessionExerciseWithExerciseAndSets
    );

  const handleDeleteSession = async () => {
    const sessionId = Number(id);
    try {
      await deleteSession(user?.id as number, sessionId);
      navigate('/calendar', {
        state: {
          message: `Séance ${session.title} supprimée !`,
          severity: 'success',
        },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
    }
  };

  const handleSelectSessionExerciseToEdit = (sessionExerciseId: number) => {
    const sessionExerciseToEdit = session.session_exercises.find(
      (sessionexercise) => sessionexercise.id === sessionExerciseId
    );
    if (sessionExerciseToEdit) {
      setSessionExerciseToEdit(sessionExerciseToEdit);
    }
  };

  const handleAddSessionExercise = (
    createdSessionExercise: SessionExerciseWithExerciseAndSets
  ) => {
    setSession((prev) => ({
      ...prev,
      session_exercises: [...prev.session_exercises, createdSessionExercise],
    }));
    setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
  };

  const handleUpdateSessionExercise = (
    updatedSessionExercise: SessionExerciseWithExerciseAndSets
  ) => {
    const sessionExerciseIndexToUpdate = session.session_exercises.findIndex(
      (sessionexercise) => sessionexercise.id === updatedSessionExercise.id
    );

    if (sessionExerciseIndexToUpdate !== -1) {
      const updatedSession = { ...session };
      updatedSession.session_exercises[sessionExerciseIndexToUpdate] =
        updatedSessionExercise;
      setSession(updatedSession);
    }
    setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
  };

  const handleUpdateSet = (sessionExerciseId: number, updatedSet: Set) => {
    const sessionExerciseToUpdate = session.session_exercises.find(
      (sessionexercise) => sessionexercise.id === sessionExerciseId
    );
    const sessionExerciseIndexToUpdate = session.session_exercises.findIndex(
      (sessionexercise) => sessionexercise.id === sessionExerciseId
    );
    if (sessionExerciseToUpdate) {
      const udpatedSet = sessionExerciseToUpdate.sets.map((set) =>
        set.id === updatedSet.id ? updatedSet : set
      );
      const udpatedSessionExercise = {
        ...sessionExerciseToUpdate,
        sets: udpatedSet,
      };
      const updatedSession = { ...session };

      updatedSession.session_exercises[sessionExerciseIndexToUpdate] =
        udpatedSessionExercise;
      setSession(updatedSession);
    }
  };

  // SUPPRIMER UN SESSION_EXERCICE
  const handleDeleteSessionExercise = async (sessionExerciseId: number) => {
    try {
      await deleteSessionExercise(Number(id), sessionExerciseId);
      const updatedSessionExercise = session.session_exercises.filter(
        (sessionexercise) => sessionexercise.id !== sessionExerciseId
      );
      setSession((prev) => ({
        ...prev,
        session_exercises: updatedSessionExercise,
      }));
      setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSession = async () => {
    setLoading(true);
    try {
      const sessionData = await getSession(user?.id as number, String(id));
      setSession(sessionData);
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, [id]);

  return (
    <SessionContext.Provider
      value={{
        loading,
        session,
        sessionExerciseToEdit,
        setSessionExerciseToEdit,
        handleDeleteSession,
        handleSelectSessionExerciseToEdit,
        handleAddSessionExercise,
        handleUpdateSessionExercise,
        handleDeleteSessionExercise,
        handleUpdateSet,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionProvider = () => {
  return useContext(SessionContext);
};

export { SessionContext, SessionProvider };
