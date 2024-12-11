import { FC, useState } from 'react';
import SessionCard from './Cards/SessionCard';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { UpcomingSessionsProps } from '../interfaces/props/UpcomingSessionProps';

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

const UpcomingSessions: FC<UpcomingSessionsProps> = ({ sessions }) => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [startIndex, setStartIndex] = useState(0);

  const upcomingSessions = (sessions || [])
    .filter(session => session.session_date) // Vérifie que la date existe
    .sort((a, b) => dayjs(a.session_date).diff(dayjs(b.session_date)));

  const totalSessions = upcomingSessions.length;
  const cardsToShow = isMobile ? 1 : 3;  // 1 carte en mode mobile, 3 en mode bureau

  const visibleSessions = upcomingSessions.slice(startIndex, startIndex + cardsToShow);

  const handlePrev = () => {
    setStartIndex(prevIndex => (prevIndex === 0 ? totalSessions - cardsToShow : prevIndex - cardsToShow));
  };

  const handleNext = () => {
    setStartIndex(prevIndex => (prevIndex + cardsToShow) % totalSessions);
  };

  return (
    <Box className={styles.container}>
      {totalSessions > cardsToShow && (
        <IconButton
          className={`${styles.button} ${styles.buttonLeft}`}
          onClick={handlePrev}
        >
          <ArrowBack />
        </IconButton>
      )}

      <Box className={styles.cardsWrapper}>
        {visibleSessions.map(session => (
          <SessionCard key={`${session.title}-${session.session_date}`} session={session} />
        ))}
      </Box>

      {totalSessions > cardsToShow && (
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

export default UpcomingSessions;
