import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid2 as Grid,
  Button,
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';
import UpcomingSessions from '../components/UpcomingSessions';
import { SessionData } from '../utils/interfaces/components/data/SessionData';
import dayjs from 'dayjs';
import DayCard from '../components/Cards/DayCard';
import StatsCard from '../components/StatsCard';
import {
  getUserSessionsCount,
  getUserValidatedSessionsCount,
} from '../api/services/statsService';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
  hero: {
    marginTop: '100px',
  },
  slogan: {
    fontSize: '40px !important',
    marginBottom: '60px !important',
    marginTop: '-30px !important',
    display: 'block',
    fontWeight: 400,
    '& b': {
      color: colorPrimary,
      fontFamily: fontTheme.fontFamily,
    },
  },
  rowFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    overflow: 'hidden',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  button: {
    padding: '7px 0px !important',
  },
}));

const HomeConnected = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userSessionsCount, setUserSessionsCount] = useState<number | null>(
    null
  );
  const [userValidatedSessionsCount, setUserValidatedSessionsCount] =
    useState<number | null>(null);

  // Génération des 7 jours
  const today = dayjs().startOf('day');
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));

  // Obtenir le mois et l'année actuels
  const currentMonthYear = today.format('MMMM YYYY');

  const allSessions: SessionData[] = [
    {
      title: 'Session 1',
      date: '2024-10-31',
      exercises: ['Course', 'Saut à la corde', 'Montées de genoux'],
    },
    {
      title: 'Session 2',
      date: '2024-11-02',
      exercises: ['Course', 'Saut à la corde'],
    },
    {
      title: 'Session 3',
      date: '2024-11-28',
      exercises: ['Course', 'Saut à la corde', 'Montées de genoux'],
    },
    {
      title: 'Session 4',
      date: '2024-11-12',
      exercises: ['Course', 'Saut à la corde', 'Montées de genoux'],
    },
  ];

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
    <>
      <Box className={styles.root}>
        <Container>
          {/* Hero 1 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography variant='h1'>Bonjour</Typography>
              <Typography className={styles.slogan}>
                <b>Nom Prénom</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Link to='/'>
                    <Button
                      className={styles.button}
                      variant='outlined'
                      fullWidth
                    >
                      Se déconnecter
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{ display: { xs: 'none', xl: 'block' } }}
              size={{ xl: 2 }}
            ></Grid>

            {/* Section des StatsCard */}
            <Grid
              container
              spacing={2}
              className={styles.rowFlex}
              size={{ xs: 12, md: 6 }}
            >
              <Grid size={{ xs: 6, md: 4 }}>
                <StatsCard
                  number={userSessionsCount !== null ? userSessionsCount : '...'}
                  label='Séances créées'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <StatsCard
                  number={userValidatedSessionsCount !== null ? userValidatedSessionsCount : '...'}
                  label='Séances validées'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <StatsCard
                  number={'Upper Body'}
                  label='Séance du jour'
                  bgColor={colorPrimary}
                  textColor='#000'
                />
              </Grid>
            </Grid>
          </Grid>

          <Typography variant='h2' sx={{ marginTop: 10 }}>
            Mes prochaines séances
          </Typography>
          <UpcomingSessions sessions={allSessions} />

          {/* Week Days Display Title */}
          <Typography variant='h2' sx={{ marginTop: 8, marginBottom: 2 }}>
            Ajouter une séance
          </Typography>

          {/* Mois et Année du jour actuel */}
          <Typography
            variant='h6'
            sx={{ marginBottom: 4, textAlign: 'center' }}
          >
            {currentMonthYear}
          </Typography>

          {/* DayCard Display */}
          <Grid container spacing={2} justifyContent='center'>
            <Grid
              container
              spacing={2}
              sx={{
                gridTemplateColumns: isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(7, 1fr)',
                display: 'grid',
              }}
            >
              {daysOfWeek.map((date, index) => (
                <DayCard key={index} date={date} />
              ))}
            </Grid>
          </Grid>

          {/* Bouton "Voir mon calendrier" */}
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Link to='/calendrier' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='primary'>
                Voir mon calendrier
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeConnected;
