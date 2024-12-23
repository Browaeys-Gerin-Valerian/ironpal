import { useState, useEffect } from 'react';
import SessionCard from '../Cards/SessionCard';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import {
  SessionWithExercises,
  SessionWithSessionExercises,
} from '../../interfaces/entities/Session';
import { getSession } from '../../api/services/sessions';
import { useAuthProvider } from '../../context/authContext';

export interface UpcomingSessionsProps {
  sessions: SessionWithExercises[];
}

const UpcomingSessions = ({ sessions }: UpcomingSessionsProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const { user } = useAuthProvider();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [startIndex, setStartIndex] = useState(0);
  const [detailedSessions, setDetailedSessions] = useState<
    SessionWithSessionExercises[]
  >([]);

  // Effect pour récupérer les détails des sessions
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const fetchedSessions = await Promise.all(
          sessions.map(async (session) => {
            const sessionDetails = await getSession(
              user?.id as number,
              String(session.id)
            );
            return sessionDetails;
          })
        );
        setDetailedSessions(fetchedSessions);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionDetails();
  }, [sessions]);

  const today = dayjs().startOf('day');
  const upcomingSessions = detailedSessions
    .filter(
      (session) =>
        session.session_date &&
        dayjs(session.session_date).isSameOrAfter(today, 'day')
    )
    .sort((a, b) => dayjs(a.session_date).diff(dayjs(b.session_date)));

  const totalSessions = upcomingSessions.length;
  const cardsToShow = isMobile ? 1 : 3; // 1 carte en mode mobile, 3 en mode bureau

  // Calcul des sessions visibles en fonction de startIndex
  const visibleSessions = upcomingSessions.slice(
    startIndex,
    startIndex + cardsToShow
  );

  // Gérer le clic sur le bouton précédent
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Gérer le clic sur le bouton suivant
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalSessions - cardsToShow)
    );
  };

  return (
    <Box className={styles.container}>
      {/* Bouton gauche, désactivé si au début */}
      {startIndex > 0 && (
        <IconButton
          className={`${styles.button} ${styles.buttonLeft}`}
          onClick={handlePrev}
        >
          <ArrowBack />
        </IconButton>
      )}

      {/* Les cartes visibles */}
      <Box className={styles.cardsWrapper}>
        {visibleSessions.map((session, index) => {
          // Extraire les noms des exercices depuis session_exercise
          const exercises = session.session_exercise?.map(
            (exercise) => exercise.exercise?.name || 'Exercice inconnu'
          );

          // Passer les exercices extraits et conserver le titre de la session
          return (
            <SessionCard
              key={`${session.title}-${session.session_date}-${index}`}
              session={{
                ...session, // Conserve toutes les propriétés existantes de la session
                title: session.title || 'Titre non disponible', // Assure que le titre est maintenu
                exercises, // Ajoute la liste des exercices
              }}
            />
          );
        })}
      </Box>

      {/* Bouton droit, désactivé si à la fin */}
      {startIndex + cardsToShow < totalSessions && (
        <IconButton
          className={`${styles.button} ${styles.buttonRight}`}
          onClick={handleNext}
        >
          <ArrowForward />
        </IconButton>
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3%',
    marginTop: '24px',
    position: 'relative',
  },
  cardsWrapper: {
    padding: '10px',
    display: 'flex',
    gap: '3%',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    zIndex: 10,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.8)',
    },
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    right: 0,
  },
});

export default UpcomingSessions;
