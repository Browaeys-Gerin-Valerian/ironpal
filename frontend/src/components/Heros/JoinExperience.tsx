import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";

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
  }
});

const JoinExperience = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <h1>Join experience</h1>
            <div className={styles.containBtn}>
                <Link to="/">
                    <Button variant="outlined">S'inscrire</Button>
                </Link>
                <Link to="/">
                    <Button variant="contained">Se connecter</Button>
                </Link>
            </div>
        </div>
    );
};

export default JoinExperience;