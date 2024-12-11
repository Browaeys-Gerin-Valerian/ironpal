import { FC } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fontText } from '../../styles/theme';
import { Theme } from '@mui/material';
import dayjs from 'dayjs';
import { SessionProps } from '../../interfaces/props/SessionProps';
import { useNavigate } from 'react-router-dom';
import { SessionWithExercises } from '../../interfaces/data/session/Session';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '31%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '30px !important',
    transition: 'box-shadow 0.3s ease-in-out',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: '30px',
    },
    // Bordure conditionnelle
    border: (props: { isToday: boolean }) =>
      props.isToday ? `3px solid ${theme.palette.primary.main}` : 'none',
  },
  title: {
    fontFamily: fontText.fontFamily,
    fontWeight: '400 !important',
    fontSize: '40px !important',
  },
  session_date: {
    fontFamily: fontText.fontFamily,
    fontWeight: '400 !important',
  },
  exercise: {
    margin: '0px !important',
    '& span': {
      border: '2px solid #000',
      padding: '10px',
      borderRadius: '50px',
      fontWeight: '400 !important',
      fontSize: '20px !important',
    },
  },
}));

const SessionCard: FC<SessionProps> = ({ session }) => {
  const isToday = dayjs(session.session_date).isSame(dayjs(), 'day'); // Vérifie si la session est aujourd'hui
  const styles = useStyles({ isToday }); // Passe isToday en props aux styles
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleClick = () => {
    navigate(`/session/${session.id}`); // Redirige vers l'URL de la session
  };
  const formattedDate = session.session_date
    ? dayjs(session.session_date).format('dddd D MMMM')
    : 'Date inconnue';

  return (
    <Card className={styles.card} onClick={handleClick}>
      <CardContent>
        <Typography
          className={styles.session_date}
          variant="body1"
          color="primary"
        >
          {formattedDate}
        </Typography>
        <Typography className={styles.title} variant="h5">
          {session.title || 'Titre non disponible'}
        </Typography>
        <Box mt={2}>
          {(session.exercises || []).length > 0 ? (
            <List>
              {session.exercises.map((exercise, index) => (
                <ListItem key={index}>
                  <ListItemText
                    className={styles.exercise}
                    primary={exercise}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Aucun exercice prévu pour cette session.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
