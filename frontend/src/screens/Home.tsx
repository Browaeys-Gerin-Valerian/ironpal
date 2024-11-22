import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import DescriptionCard from '../components/Cards/DescriptionCard';
import { Grid2 as Grid, Button, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import LeftSection from '../components/Heros/LeftSection';
import RightSection from '../components/Heros/RightSection';
import StatsCard from '../components/StatsCard';
import JoinExperience from '../components/Heros/JoinExperience';
import { Link } from 'react-router-dom';
import { colorPrimary } from '../styles/theme';
import { getTotalSessions, getTotalExercises, getTotalUsers } from '../api/services/statsService';
import { useLocation } from 'react-router-dom';
import { SnackbarState } from '../interfaces/SnackbarState';
import { Theme } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '80px',
    },
  },
  hero: {
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  bienvenue: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  slogan: {
    fontSize: '24px !important',
    marginBottom: '30px !important',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    '& b': {
      color: colorPrimary,
    },
  },
  rowFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  img: {
    width: '80%',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  rowButton:{
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  button: {
    padding: '7px 0px !important',
    [theme.breakpoints.down('md')]: {
      width: '200px !important',
    },
  },
}));

const Home = () => {
  const styles = useStyles();
  const [totalSessions, setTotalSessions] = useState<number | null>(null);
  const [totalExercises, setTotalExercises] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      const sessionsCount = await getTotalSessions();
      const exercisesCount = await getTotalExercises();
      const usersCount = await getTotalUsers();
      setTotalSessions(sessionsCount);
      setTotalExercises(exercisesCount);
      setTotalUsers(usersCount);
    };
    fetchStats();
  }, []);


// SNACKBAR
  const location = useLocation(); 
  // Initialisation de l'état
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success', // Valeur par défaut
  });

  useEffect(() => {
    if (location.state?.message) {
      setSnackbar({
        open: true,
        message: location.state.message,
        severity: location.state.severity || 'success',
      });
    }
  }, [location.state]);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
// SNACKBAR

  return (
    <>
      <Box className={styles.root}>
        <Container>
          {/* Hero 1 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography className={styles.bienvenue} variant='h1'>Bienvenue</Typography>
              <Typography className={styles.slogan}>
                <b>ironpal</b>, l’app qui développe ton programme sportif !
              </Typography>
              <Grid container spacing={2}>
                <Grid className={styles.rowButton} size={{ xs: 12, md: 6 }}>
                  <Link to='/register'>
                    <Button
                      className={styles.button}
                      variant='outlined'
                      fullWidth
                    >
                      S'inscrire
                    </Button>
                  </Link>
                </Grid>
                <Grid className={styles.rowButton} size={{ xs: 12, md: 6 }}>
                  <Link to='/login'>
                    <Button
                      className={styles.button}
                      variant='contained'
                      fullWidth
                    >
                      Se connecter
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
              <Grid size={{ xs: 6, md: 3 }}>
                <StatsCard
                  number={totalUsers !== null ? totalUsers : '...'}
                  label='Utilisateurs actifs'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <StatsCard
                  number={totalSessions !== null ? totalSessions : '...'}
                  label='Séances créées'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <StatsCard
                  number={totalExercises !== null ? totalExercises : '...'}
                  label='Exercices disponibles'
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <StatsCard
                  number={'100%'}
                  label='Gratuité'
                  bgColor={colorPrimary}
                  textColor='#000'
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Hero 2 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
              <DescriptionCard />
            </Grid>
            <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
              <img
                className={styles.img}
                src='https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg'
                alt=''
              />
            </Grid>
          </Grid>

          {/* Hero 3 */}
          <RightSection
            title='Pour qui ?'
            text='Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements.'
            imageUrl='https://static.vecteezy.com/system/resources/thumbnails/048/506/608/small_2x/black-man-strong-and-fitness-selfie-gym-and-exercise-portrait-after-workout-and-weight-training-happy-and-flexing-arm-cardio-endurance-and-smile-sweat-for-sport-and-bicep-photo-wellness-video.jpg'
          />

          {/* Hero 4 */}
          <LeftSection
            title='Comment ça marche ?'
            text="Inscris-toi pour accéder à un calendrier interactif où tu pourras planifier tes sessions d'entraînement, choisir tes exercices, définir les répétitions, le poids et les temps de récupération. À la fin de chaque session, évalue la difficulté pour suivre tes progrès et ajuster tes entraînements futurs."
            imageUrl='https://www.sport-orthese.com/img/cms/accroche%20magnetique%20pour%20telephone%20sur%20rack%20de%20crossfit.jpg'
          />

          {/* Hero 5 */}
          <JoinExperience />
        </Container>
        <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Home;
