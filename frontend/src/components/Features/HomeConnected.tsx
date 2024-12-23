import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { colorPrimary, fontTheme } from '../../styles/theme';
import { Theme } from '@mui/material/styles';
import {
  Grid2 as Grid,
  Button,
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useSnackbar } from '../../context/snackbarContext';
import UpcomingSessions from '../UpcomingSessions';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import DayCard from '../Cards/DayCard';
import StatsCard from '../StatsCard';
import { getUserSessionsCount } from '../../api/services/statsService';
import { useAuthProvider } from '../../context/authContext';
import { SessionWithExercises } from '../../interfaces/data/Session';
import { getSessions } from '../../api/services/sessions';

dayjs.extend(isSameOrAfter);

const HomeConnected = () => {
  const styles = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user } = useAuthProvider();

  const [userSessionsCount, setUserSessionsCount] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionWithExercises[]>([]);

  // Génération des 7 jours
  const today = dayjs().startOf('day');

  const daysOfWeek = useMemo(
    () => Array.from({ length: 7 }, (_, i) => today.add(i, 'day')),
    []
  );

  // Find today's session
  const todaySession = sessions.find((session) =>
    dayjs(session.session_date).isSame(today, 'day')
  );

  // Obtenir le mois et l'année actuels
  const currentMonthYear = today.format('MMMM YYYY');

  // Fonction pour récupérer les statistiques de l'utilisateur

  const fetchUserStats = async () => {
    try {
      const sessionsCount = await getUserSessionsCount();
      // const validatedSessionsCount = await getUserValidatedSessionsCount();
      setUserSessionsCount(sessionsCount);
      // setUserValidatedSessionsCount(validatedSessionsCount);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des statistiques utilisateur:',
        error
      );
      setError('Impossible de charger les statistiques utilisateur.');
    }
  };

  // Fonction pour récupérer toutes les sessions de l'utilisateur
  const fetchAllSessions = async () => {
    const month = dayjs().month() + 1;
    const year = dayjs().year();

    try {
      const sessions = await getSessions(user.id, month - 1, year);
      setSessions(sessions);
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      setError('Impossible de charger les sessions.');
      setLoading(false);
    }
  };

  const initializeData = async () => {
    await fetchUserStats();
    await fetchAllSessions();
  };

  // useEffect pour appeler les fonctions au chargement du composant
  useEffect(() => {
    initializeData();
  }, []);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (location.state?.message) {
      showSnackbar(
        location.state.message,
        location.state.severity || 'success'
      );

      // Nettoyer l'état après affichage
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, showSnackbar, navigate]);

  const sessionDay = (day: dayjs.Dayjs) => {
    return sessions.find((session) =>
      day.isSame(dayjs(session.session_date), 'day')
    );
  };

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
              <Grid size={{ xs: 6, md: 3 }}>
                <StatsCard
                  number={
                    userSessionsCount !== null ? userSessionsCount : '...'
                  }
                  label='Séances créées'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                {/* <StatsCard
                  number={sessions.filter((ses) => ses.validated).length}
                  label='Séances validées'
                /> */}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <StatsCard
                  number={todaySession ? todaySession.title : 'Repos'}
                  label='Séance du jour'
                  bgColor={todaySession ? colorPrimary : '#ccc'}
                  textColor={todaySession ? '#000' : '#666'}
                />
              </Grid>
              {/* Placeholder card to align with Home */}
              {/* <Grid size={{ xs: 6, md: 3 }}></Grid> */}
            </Grid>
          </Grid>
          <Box className={styles.separatorLeft}></Box>
          <Typography variant='h2' sx={{ marginTop: 10 }}>
            Mes prochaines <b>séances :</b>
          </Typography>
          {/* UpcomingSessions */}
          {loading ? (
            <Typography>Chargement des séances...</Typography>
          ) : error ? (
            <Typography color='error'>{error}</Typography>
          ) : sessions.length === 0 ? (
            <Box>
              <Typography
                variant='body2'
                sx={{
                  textAlign: { xs: 'center', sm: 'start' },
                }}
              >
                Aucune séance de programmée.
              </Typography>
              <Box
                sx={{
                  textAlign: { xs: 'center', sm: 'start' },
                  marginTop: '100px',
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => navigate('/calendar')}
                >
                  Ajouter une séance
                </Button>
              </Box>
            </Box>
          ) : (
            <UpcomingSessions sessions={sessions} />
          )}
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
                <DayCard
                  key={index}
                  date={session_date}
                  session={sessionDay(session_date)}
                />
              ))}
            </Grid>
          </Grid>

          {/* Bouton "Voir mon calendrier" */}
          <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
            <Link to='/calendar' style={{ textDecoration: 'none' }}>
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

export default HomeConnected;
