import { useEffect, useState, useMemo } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';
import UpcomingSessions from '../components/UpcomingSessions';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import DayCard from '../components/Cards/DayCard';
import StatsCard from '../components/StatsCard';
import {
  getUserSessionsCount,
  // getUserValidatedSessionsCount,
} from '../api/services/statsService';
import { useAuthProvider } from '../context/authContext';
import { useLocation } from 'react-router-dom';
import { SessionWithExercises } from '../interfaces/data/session/Session';
import GETsessions from '../api/services/sessions/GETsessions';
import { useSnackbar } from '../context/snackbarContext';

dayjs.extend(isSameOrAfter);

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

  const [userSessionsCount, setUserSessionsCount] = useState<number | null>(
    null
  );

  // const [userValidatedSessionsCount, setUserValidatedSessionsCount] = useState<
  //   number | null
  // >(null);
  const [upcomingSessions, setUpcomingSessions] = useState<
    SessionWithExercises[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allSessions, setAllSessions] = useState<SessionWithExercises[]>([]);  // État pour stocker toutes les sessions
  const location = useLocation();
  const navigate = useNavigate();

  // Génération des 7 jours
  const today = dayjs().startOf('day');
  const daysOfWeek = useMemo(
    () => Array.from({ length: 7 }, (_, i) => today.add(i, 'day')),
    []
  );



  // Find today's session
  const todaySession = upcomingSessions.find((session) =>
    dayjs(session.session_date).isSame(today, 'day')
  );

  // Obtenir le mois et l'année actuels
  const currentMonthYear = today.format('MMMM YYYY');

  // useEffect(() => {
  //   const fetchUserStats = async () => {
  //     const sessionsCount = await getUserSessionsCount();
  //     const validatedSessionsCount = await getUserValidatedSessionsCount();

  //     setUserSessionsCount(sessionsCount);
  //     setUserValidatedSessionsCount(validatedSessionsCount);
  //   };

  //   const fetchUpcomingSessions = async () => {
  //     try {
  //       const allSessions = await GETsessions(month - 1, year); // Récupère toutes les sessions

  //       // Filtrer les sessions pour les 7 jours de la semaine
  //       const filteredSessions = allSessions.filter(
  //         (session: SessionWithExercises) => {
  //           const sessionDate = dayjs(session.session_date);
  //           return daysOfWeek.some((day) => day.isSame(sessionDate, 'day'));
  //         }
  //       );

  //       setUpcomingSessions(filteredSessions);
        
  //     } catch (error) {
  //       console.error(
  //         'Erreur lors de la récupération des prochaines séances:',
  //         error
  //       );
  //       setError('Impossible de charger les prochaines séances.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const month = dayjs().month() + 1;
  //   const year = dayjs().year();

  //   fetchUserStats();
  //   fetchUpcomingSessions();
  // }, []);

    // Fonction pour récupérer les statistiques de l'utilisateur
    
  const fetchUserStats = async () => {
    try {
      const sessionsCount = await getUserSessionsCount();
      // const validatedSessionsCount = await getUserValidatedSessionsCount();
      setUserSessionsCount(sessionsCount);
      // setUserValidatedSessionsCount(validatedSessionsCount);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques utilisateur:', error);
      setError('Impossible de charger les statistiques utilisateur.');
    }
  };
  
  // Fonction pour récupérer toutes les sessions de l'utilisateur
  const fetchAllSessions = async () => {
    const month = dayjs().month() + 1;
    const year = dayjs().year();
  
    try {
      const sessions = await GETsessions(month - 1, year);
      setAllSessions(sessions);  
    } catch (error) {
      console.error('Erreur lors de la récupération des sessions:', error);
      setError('Impossible de charger les sessions.');
      setLoading(false);
    }
  };
  
  // Fonction pour filtrer les prochaines sessions à afficher
  const fetchUpcomingSessions = async () => {
    try {
      setLoading(true); 
      const filteredSessions = allSessions.filter((session: SessionWithExercises) => {
        const sessionDate = dayjs(session.session_date);
        return daysOfWeek.some((day) => day.isSame(sessionDate, 'day'));
      });
  
      setUpcomingSessions(filteredSessions); 
    } catch (error) {
      console.error("Erreur lors de la récupération des sessions :", error);
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect pour appeler les fonctions au chargement du composant
  useEffect(() => {
    const initializeData = async () => {
      await fetchUserStats();
      await fetchAllSessions();
    };
  
    initializeData();
  }, []);  // Vide, donc appelé une seule fois au chargement
  
  // useEffect pour filtrer les sessions à chaque fois que `allSessions` est mis à jour
  useEffect(() => {
    if (allSessions.length > 0) {
      fetchUpcomingSessions();
    }
  }, [allSessions]);  // Appelé à chaque mise à jour de `allSessions`

  // Sessions passées : 
  // const pastSessions = allSessions.filter(session => dayjs(session.session_date).isBefore(today, 'day'));

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
    return upcomingSessions.find((session) =>
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
                <StatsCard
                  number={
                    allSessions.filter(ses => ses.validated).length
                  }
                  label='Séances validées'
                />
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
          ) : upcomingSessions.length === 0 ? (
            <Box>
              <Typography variant='body2' sx={{
              textAlign: { xs: 'center', sm: 'start' },
            }}>
                Aucune séance de programmée.
              </Typography>
              <Box sx={{
                textAlign: { xs: 'center', sm: 'start' },
                marginTop: '100px',
              }}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => navigate('/calendrier')}
                >
                  Ajouter une séance
                </Button>
              </Box>
            </Box>
          ) : (
            <UpcomingSessions sessions={upcomingSessions} />
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
