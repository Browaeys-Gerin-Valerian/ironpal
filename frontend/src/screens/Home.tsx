import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import DescriptionCard from '../components/Cards/DescriptionCard';
import {
  Grid2 as Grid,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material';
import LeftSection from '../components/Heros/LeftSection';
import RightSection from '../components/Heros/RightSection';
import StatsCard from '../components/StatsCard';
import JoinExperience from '../components/Heros/JoinExperience';
import { Link } from 'react-router-dom';
import { colorPrimary } from '../styles/theme';
import { getTotalSessions, getTotalExercises, getTotalUsers } from '../api/services/statsService';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
  hero: {
    marginTop: '100px',
  },
  slogan: {
    fontSize: '24px !important',
    marginBottom: '30px !important',
    display: 'block',
    '& b': {
      color: colorPrimary,
    },
  },
  rowFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  },
  img: {
    width: '80%',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  button: {
    padding: '7px 0px !important',
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

  return (
    <>
      <Box className={styles.root}>
        <Container>
          {/* Hero 1 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography variant='h1'>Bienvenue</Typography>
              <Typography className={styles.slogan}>
                <b>ironpal</b>, l’app qui développe ton programme sportif !
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
            imageUrl='https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg'
          />

          {/* Hero 4 */}
          <LeftSection
            title='Comment ça marche ?'
            text='Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements.'
            imageUrl='https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg'
          />

          {/* Hero 5 */}
          <JoinExperience />
        </Container>
      </Box>
    </>
  );
};

export default Home;
