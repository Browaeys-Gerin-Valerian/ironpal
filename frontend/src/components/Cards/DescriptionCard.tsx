import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { colorPrimary } from '../../styles/theme';
import { Typography, Box } from '@mui/material';

const DescriptionCard = () => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Typography variant='h2'>
        <b className={styles.bold}>Ironpal</b> c’est quoi ?
      </Typography>
      <Typography>
        Ironpal est une <b>application web de musculation</b> permettant aux
        utilisateurs de <b className={styles.bold}>planifier</b>,{' '}
        <b className={styles.bold}>suivre</b> et{' '}
        <b className={styles.bold}>personnaliser</b> leurs entraînements.
        <br />
        <br />
        Elle se concentre sur l'organisation de séances d'entraînement efficaces
        en proposant une vaste bibliothèque d'exercices, qui peuvent être
        regroupés en séances et planifiés sur une semaine.
        <br />
        <br />
        Le but est de fournir un outil simple et intuitif pour aider les
        utilisateurs à optimiser leurs entraînements tout en leur offrant des
        fonctionnalités pour suivre leur progression et ajuster leurs routines.
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderWidth: '5px',
    borderColor: '#13DC94',
    borderStyle: 'solid',
    borderRadius: '0px 0px 100px 0px',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      margin: '-16px !important',
      padding: '20px',
      borderWidth: '3px',
    },
  },
  bold: {
    color: colorPrimary,
  },
}));

export default DescriptionCard;
