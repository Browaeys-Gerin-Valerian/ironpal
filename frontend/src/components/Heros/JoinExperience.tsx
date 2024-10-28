import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { colorPrimary } from "../../styles/theme";

const useStyles = makeStyles({
  container:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100px',
  },
  containBtn:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  title:{
    fontSize: '30px',
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
        <div className={styles.container}>
            <h2 className={styles.title}>Rejois l'expérience !</h2>
            <div className={styles.containBtn}>
                <Link className={styles.btn} to="/">
                    <Button variant="outlined">S'inscrire</Button>
                </Link>
                <Link className={styles.btn} to="/">
                    <Button variant="contained">Se connecter</Button>
                </Link>
            </div>
        </div>
    );
};

export default JoinExperience;