import { Button, Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { colorPrimary } from "../../styles/theme";

const useStyles = makeStyles({
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
  },
  title:{
    color: colorPrimary,
  },
  btn:{
    display: 'block',
    margin: "5px",
  }
});

const JoinExperience = () => {
    const styles = useStyles();

    return (
        <Container className={styles.container}>
            <Typography variant="h2" className={styles.title}>Rejois l'expérience !</Typography>
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