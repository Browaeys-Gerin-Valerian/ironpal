import { Typography, Box, Container, Grid2 as Grid, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useAuthProvider } from "../context/authContext";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { getUserSessionsCount, getUserValidatedSessionsCount } from '../api/services/statsService';
import { Theme } from "@mui/material/styles";
import { colorPrimary } from "../styles/theme";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '80px',
    },
    '& h1': {
      color: colorPrimary,
    },
  },
  hero: {
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  profilInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    display: 'block',
    marginTop: '30px !important',
    [theme.breakpoints.down('md')]: {
      marginLeft: '50% !important',
      transform: 'translateX(-50%)',
      width: '230px !important',
    },
  },
}));


const Profil = () => {
  const styles = useStyles();

  const { user } = useAuthProvider();

  const [loading, setLoading] = useState(false);
  const { logout } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
  
      navigate('/', {
        state: { message: 'Déconnecté !', severity: 'success' },
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  const [userSessionsCount, setUserSessionsCount] = useState<number | null>(null);
  const [userValidatedSessionsCount, setUserValidatedSessionsCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      const sessionsCount = await getUserSessionsCount();
      const validatedSessionsCount = await getUserValidatedSessionsCount();
  
      setUserSessionsCount(sessionsCount);
      setUserValidatedSessionsCount(validatedSessionsCount);
    };
    fetchUserStats();
  }, []);

  console.log(user);

  const calculateAge = (birthdate: Date) => {
    const birthDate = new Date(birthdate); 
    const today = new Date();
  
    // Calculer la différence d'années
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
  
    // Vérifier si l'anniversaire est déjà passé cette année
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--; // Si l'anniversaire n'est pas encore passé, réduire l'âge de 1
    }
  
    return age;
  };

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
              {user ? (
                  <Typography variant="h1">
                    {user.firstname} {user.lastname}
                  </Typography>
              ) : (
                <></>
              )}
              <Box className={styles.profilInfos}>
                {user ? (
                  <>
                    <Typography>Age : <b>{user.birthdate ? calculateAge(user.birthdate) + " ans" : 'Non renseigné'}</b></Typography>
                    <Typography> E-mail : <b>{user.email}</b></Typography>
                    {/* <Typography> Membre depuis : <b></b></Typography> */}
                  </>
                ) : (
                  <></>
                )}
                <Typography> Séances créées : <b>{userSessionsCount}</b></Typography>
                <Typography> Séances validées : <b>{userValidatedSessionsCount}</b></Typography>
              </Box>
              <Link to="/">
                  <Button onClick={handleLogout}  className={styles.button} variant="outlined" >Se déconnecter</Button>
              </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};      

export default Profil;  