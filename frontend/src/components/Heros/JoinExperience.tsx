import { Button, Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { colorPrimary } from "../../styles/theme";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  container:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150px',
  },
  containBtn:{
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      alignItems: 'center',
    },
  },
  title:{
    color: colorPrimary,
    textAlign: "center",
  },
  btn:{
    display: 'block',
    margin: "5px",
    [theme.breakpoints.down('md')]: {
      margin: "15px",
    },
  }
}));

const JoinExperience = () => {
    const styles = useStyles();

    return (
        <Container className={styles.container}>
            <Typography variant="h2" className={styles.title}>Rejoins l'expérience !</Typography>
            <Box className={styles.containBtn}>
                <Link className={styles.btn} to="/register">
                    <Button variant="outlined">S'inscrire</Button>
                </Link>
                <Link className={styles.btn} to="/login">
                    <Button variant="contained">Se connecter</Button>
                </Link>
            </Box>
        </Container>
    );
};

export default JoinExperience;