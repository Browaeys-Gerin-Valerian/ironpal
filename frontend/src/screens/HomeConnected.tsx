import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid2 as Grid, Button, Container, Box, Typography, useMediaQuery, useTheme} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';
import UpcomingSessions from '../components/UpcomingSessions';
import dayjs from 'dayjs';
import DayCard from '../components/Cards/DayCard';
import StatsCard from '../components/StatsCard';
import {
  getUserSessionsCount,
  getUserValidatedSessionsCount,
} from '../api/services/statsService';
import { useAuthProvider } from '../context/authContext';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from '../context/snackbarContext';
import { SessionWithExercises } from '../interfaces/data/session/Session';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '80px',
    },
    '& h2': {
      marginTop: '150px',
    },
    '& h2 b': {
      color: colorPrimary,
      fontWeight: 400,
    },
  },
  hero: {
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  bonjour: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  slogan: {
    fontSize: '40px !important',
    marginBottom: '60px !important',
    marginTop: '-30px !important',
    display: 'block',
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    '& b': {
      color: colorPrimary,
      fontFamily: fontTheme.fontFamily,
      [theme.breakpoints.down('md')]: {
        fontSize: '30px !important',
      },
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
  separatorLeft: {
    position: 'absolute',
    display: 'block !important',
    left: '0',
    width: '50%',
    height: '5px',
    background: 'linear-gradient(to right, #13DC94, #fff)',
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

const HomeConnected = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuthProvider();

  const  {showSnackbar} = useSnackbar();
  const location = useLocation();

  const [userSessionsCount, setUserSessionsCount] = useState<number | null>(
    null
  );
  const [userValidatedSessionsCount, setUserValidatedSessionsCount] = useState<
    number | null
  >(null);

  // Génération des 7 jours
  const today = dayjs().startOf('day');
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));

  // Obtenir le mois et l'année actuels
  const currentMonthYear = today.format('MMMM YYYY');

  const allSessions: SessionWithExercises[] = [
    {
      title: 'Session 1',
      session_date: '2024-10-31',
      exercises: ['Course', 'Saut à la corde', 'Montées de genoux'],
    },
    {
      title: 'Session 2',
      session_date: '2024-10-31',
      exercises: ['Course', 'Saut à la corde'],
    },
    {
      title: 'Session 3',
      session_date: '2024-10-31',
      exercises: ['Course', 'Saut à la corde', 'Montées de genoux'],
    },
    {
      title: 'Session 4',
      session_date: '2024-10-31',
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


  useEffect(() => {
    if (location.state?.message) {
      showSnackbar(location.state.message, location.state.severity || 'success');
    }
  }, [location.state, showSnackbar]);


  return (
    <>
      <Box className={styles.root}>
        <Container>
          {/* Hero 1 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography className={styles.bonjour} variant='h1'>
                Bonjour
              </Typography>
              {user ? (
                <Typography className={styles.slogan}>
                  <b>{user.firstname}</b> <b>{user.lastname}</b>
                </Typography>
              ) : (
                <></>
              )}
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
                  number={
                    userSessionsCount !== null ? userSessionsCount : '...'
                  }
                  label='Séances créées'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <StatsCard
                  number={
                    userValidatedSessionsCount !== null
                      ? userValidatedSessionsCount
                      : '...'
                  }
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
          <Box className={styles.separatorLeft}></Box>
          <Typography variant='h2' sx={{ marginTop: 10 }}>
            Mes prochaines <b>séances :</b>
          </Typography>
          <UpcomingSessions sessions={allSessions} />

          {/* Week Days Display Title */}
          <Box className={styles.separatorLeft}></Box>
          <Typography variant='h2' sx={{ marginTop: 8, marginBottom: 2 }}>
            <b>Ajouter</b> une séance :
          </Typography>

          {/* Mois et Année du jour actuel */}
          <Typography
            variant='h6'
            sx={{
              marginBottom: 4,
              marginTop: 4,
              fontSize: '18px',
              fontStyle: 'italic',
            }}
          >
            {currentMonthYear} :
          </Typography>

          {/* DayCard Display */}
          <Grid
            container
            spacing={0}
            justifyContent='center'
            sx={{ padding: 0, margin: 0 }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(7, 1fr)',
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
              }}
            >
              {daysOfWeek.map((session_date, index) => (
                <DayCard key={index} date={session_date} />
              ))}
            </Grid>
          </Grid>

          {/* Bouton "Voir mon calendrier" */}
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Link to='/calendrier' style={{ textDecoration: 'none' }}>
              <Button variant='outlined' color='primary'>
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
