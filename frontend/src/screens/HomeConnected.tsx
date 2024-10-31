// import React from "react";
import { makeStyles } from '@mui/styles';
import { Grid2 as Grid, Button, Container, Box, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import { colorPrimary, fontTheme } from '../styles/theme';
import WeekDays from '../components/WeekDays';
import UpcomingSessions from '../components/UpcomingSessions';
import { SessionData } from '../interfaces/SessionData';


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
    marginTop: "-30px !important",
    display: 'block',
    fontWeight: 400,
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


const HomeConnected = () => {
  
  const styles = useStyles();

  const allSessions: SessionData[] = [
    { title: "Session 1", date: "2024-10-31", exercises: ["Course", "Saut à la corde", "Montées de genoux"]  },
    { title: "Session 2", date: "2024-11-02", exercises: ["Course", "Saut à la corde"]  },
    { title: "Session 3", date: "2024-11-28", exercises: ["Course", "Saut à la corde", "Montées de genoux"]  },
    { title: "Session 4", date: "2024-11-12", exercises: ["Course", "Saut à la corde", "Montées de genoux"]  },
  ];

  return (
    <>
      <Box className={styles.root}>
        <Container>
        {/* Hero 1 */}
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
            <Typography variant="h1">Bonjour</Typography>
            <Typography className={styles.slogan}><b>Nom Prénom</b></Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Link to="/register">
                  <Button className={styles.button} variant="outlined" fullWidth>Se déconnecter</Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ display: { xs: 'none', xl: 'block' } }} size={{ xl: 2 }}></Grid>
          <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <Typography>**Components utilisateurs ici**</Typography>
          </Grid>
        </Grid>


        <Typography variant="h2" sx={{ marginTop: 10,}}>
            Mes prochaines séances
        </Typography>
        <UpcomingSessions sessions={allSessions} />



        <Typography variant="h2" sx={{ marginTop: 10,}}>
            Ajouter une séance
        </Typography>
        <WeekDays />

        </Container>
      </Box>
    </>
  );
};

export default HomeConnected;

