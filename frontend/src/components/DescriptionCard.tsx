import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { colorPrimary } from '../styles/theme';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container:{
    borderWidth: '5px',
    borderColor: '#13DC94',
    borderStyle: 'solid',
    borderRadius: '0px 0px 100px 0px',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  bold:{
    color: colorPrimary,
  }
  
}));


const DescriptionCard = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h1><b className={styles.bold}>Ironpal</b> c’est quoi ?</h1>
      <Typography>Ironpal est une application web de musculation permettant aux utilisateurs de planifier, suivre et personnaliser leurs entraînements. Elle se concentre sur l'organisation de séances d'entraînement efficaces en proposant une vaste bibliothèque d'exercices, qui peuvent être regroupés en séances et planifiés sur une semaine. Le but est de fournir un outil simple et intuitif pour aider les utilisateurs à optimiser leurs entraînements tout en leur offrant des fonctionnalités pour suivre leur progression et ajuster leurs routines.
      </Typography>
    </div>
  );
};

export default DescriptionCard;