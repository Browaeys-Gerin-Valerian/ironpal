import { Typography, Box, Container, Grid2 as Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
  hero: {
    marginTop: '100px',
  },
  profilInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    display: 'block',
    marginTop: '30px !important',
  },
});


const Profil = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              <Typography variant="h1">Prénom Nom</Typography>
              <Box className={styles.profilInfos}>
                <Typography> Age : </Typography>
                <Typography> E-mail : </Typography>
                <Typography> Membre depuis : </Typography>
                <Typography> Séances validées : </Typography>
              </Box>
              <Link to="/">
                  <Button className={styles.button} variant="outlined" >Se déconnecter</Button>
              </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};      

export default Profil;  