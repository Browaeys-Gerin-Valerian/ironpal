// import React from "react";
import { makeStyles } from '@mui/styles';
import DescriptionCard from "../components/Cards/DescriptionCard";
import { Grid2 as Grid, Button, Container, Box, Typography } from "@mui/material";
import LeftSection from "../components/Heros/LeftSection";
import RightSection from "../components/Heros/RightSection";
import { Theme } from "@mui/material/styles";
import JoinExperience from '../components/Heros/JoinExperience';
import { Link } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';


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
    '& b':{
      color: colorPrimary,
      fontFamily: fontTheme.fontFamily,
    }
  },
  rowFlex:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img:{
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


const Home = () => {
  
  const styles = useStyles();

  return (
    <>
      <Box className={styles.root}>
        <Container>
        {/* Hero 1 */}
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
            <Typography variant="h1">Bienvenue</Typography>
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
            <DescriptionCard  />
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
        </Container>
      </Box>
    </>
  );
};

export default Home;

