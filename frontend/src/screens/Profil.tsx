import { Typography, Box, Container, Grid2 as Grid, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useAuthProvider } from "../context/authContext";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { getUserSessionsCount, getUserValidatedSessionsCount } from '../api/services/statsService';


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

  const { user } = useAuthProvider();

  const [loading, setLoading] = useState(false);
  const { logout } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/");
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
                    {/* <Typography> Age : <b>{user.birthdate}</b></Typography>  */}
                    {/* a configurer */}
                    <Typography> E-mail : <b>{user.email}</b></Typography>
                    <Typography> Membre depuis : <b></b></Typography>
                  </>
                ) : (
                  <></>
                )}
                <Typography> Séances créées: <b>{userSessionsCount}</b></Typography>
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