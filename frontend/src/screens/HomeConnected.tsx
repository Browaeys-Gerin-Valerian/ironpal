import React from 'react';
import { makeStyles } from '@mui/styles';
import DescriptionCard from "../components/DescriptionCard";
import { Grid2 as Grid, Button, Container, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import LeftSection from "../components/Heros/LeftSection";
import RightSection from "../components/Heros/RightSection";
import { Theme } from "@mui/material/styles";
import JoinExperience from '../components/Heros/JoinExperience';
import { Link } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';
import dayjs from 'dayjs';
import DayCard from '../components/DayCard'; 

const useStyles = makeStyles((theme: Theme) => ({
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
      fontFamily: fontTheme,
    }
  },
  rowFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

  // Génération des 7 jours
  const today = dayjs().startOf('day');
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => today.add(i, 'day'));

  // Obtenir le mois et l'année actuels
  const currentMonthYear = today.format('MMMM YYYY'); 

  return (
    <>
      <Box className={styles.root}>
        <Container>
          {/* Hero 1 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography variant="h1">Bienvenue John tu es connecté</Typography>
              <Typography className={styles.slogan}><b>ironpal</b>, l’app qui développe ton programme sportif !</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Link to="/register">
                    <Button className={styles.button} variant="outlined" fullWidth>S'inscrire</Button>
                  </Link>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Link to="/login">
                    <Button className={styles.button} variant="contained" fullWidth>Se connecter</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ display: { xs: 'none', xl: 'block' } }} size={{ xl: 2 }}></Grid>
            <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
              <Typography>**Components utilisateurs ici**</Typography>
            </Grid>
          </Grid>

          {/* Hero 2 */}
          <Grid className={styles.hero} container spacing={2}>
            <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
              <DescriptionCard />
            </Grid>
            <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
              <img className={styles.img} src="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg" alt="" />
            </Grid>
          </Grid>

          {/* Hero 3 */}
          <RightSection
            title="Pour qui ?"
            text="Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements. L’application s’adresse particulièrement aux utilisateurs qui cherchent à optimiser leurs séances de musculation, à suivre leur progression et à atteindre leurs objectifs personnels en matière de condition physique."
            imageUrl="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg"
          />

          {/* Hero 4 */}
          <LeftSection
            title="Comment ça marche ?"
            text="Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements. L’application s’adresse particulièrement aux utilisateurs qui cherchent à optimiser leurs séances de musculation, à suivre leur progression et à atteindre leurs objectifs personnels en matière de condition physique."
            imageUrl="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg"
          />

          {/* Hero 5 */}
          <JoinExperience />

          {/* Week Days Display Title */}
          <Typography variant="h2" sx={{ marginTop: 8, marginBottom: 2, textAlign: 'center' }}>
            Ajouter une séance
          </Typography>

          {/* Mois et Année du jour actuel */}
          <Typography variant="h6" sx={{ marginBottom: 4, textAlign: 'center' }}>
            {currentMonthYear}
          </Typography>

          {/* DayCard Display */}
          <Grid container spacing={2} justifyContent="center">
            <Grid container spacing={2} sx={{ gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(7, 1fr)', display: 'grid' }}>
              {daysOfWeek.map((date, index) => (
                <DayCard key={index} date={date} />
              ))}
            </Grid>
          </Grid>

          {/* Bouton "Voir mon calendrier" */}
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Link to="/calendrier" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
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
