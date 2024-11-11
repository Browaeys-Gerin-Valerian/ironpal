import { FC } from 'react';
import { SessionData } from '../interfaces/data/SessionData';
import SessionCard from './Cards/SessionCard';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import dayjs from 'dayjs';
import { UpcomingSessionsProps } from '../interfaces/props/UpcomingSessionProps';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    // justifyContent: 'space-between',
    gap: "3%",
    flexWrap: 'wrap',
    marginTop: '24px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const UpcomingSessions: FC<UpcomingSessionsProps> = ({ sessions }) => {
  const styles = useStyles();

  // Trier les séances par date
  const upcomingSessions = sessions
    .filter(session => dayjs(session.date).isSame(dayjs(), 'day') || dayjs(session.date).isAfter(dayjs())) // Filtrer les séances d'aujourd'hui et futures
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date))) // Trier par date
    .slice(0, 3); // Prendre seulement les trois prochaines

  return (
    <Box className={styles.container}>
      {upcomingSessions.map((session, index) => (
        <SessionCard key={index} session={session} />
      ))}
    </Box>
  );
};

export default UpcomingSessions;
