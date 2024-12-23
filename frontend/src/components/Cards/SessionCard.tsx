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
import { useNavigate } from 'react-router-dom';
import { colorPrimary } from '../../styles/theme';
import { SessionWithExercises } from '../../interfaces/entities/Session';

export interface SessionProps {
  session: SessionWithExercises;
}

const SessionCard = ({ session }: SessionProps) => {
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
    <Card
      sx={{ border: isToday ? '3px solid ' + colorPrimary : 'none' }}
      className={styles.card}
      onClick={handleClick}
    >
      <CardContent>
        <Typography
          className={styles.session_date}
          variant='body2'
          color='primary'
        >
          {isToday ? <b>Aujourd'hui</b> : formattedDate}
        </Typography>
        <Typography className={styles.title} variant='h2'>
          {session.title || 'Titre non disponible'}
        </Typography>
        <Box mt={2}>
          {(session.exercises || []).length > 0 ? (
            <List
              sx={{
                padding: '0px !important',
                '& li': { padding: '5px 0px !important' },
              }}
            >
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
            <Typography variant='body2' color='textSecondary'>
              Aucun exercice prévu pour cette séance.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '31%',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {},
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: '30px',
    },
  },
  title: {
    // fontFamily: fontText.fontFamily + '!important',
    fontWeight: '400 !important',
    // fontSize: '35px !important',
    // lineHeight: '40px !important',
    margin: '10px 0px 0px 0px !important',
  },
  session_date: {
    fontFamily: fontText.fontFamily,
    fontWeight: '400 !important',
  },
  exercise: {
    margin: '0px !important',
    width: '100%',
    overflow: 'hidden',

    '& span': {
      overflow: 'hidden',
      border: '2px solid #000',
      padding: '10px',
      borderRadius: '50px',
      fontWeight: '400 !important',
      fontSize: '20px !important',
      maxWidth: '100%',
      height: '30px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
}));

export default SessionCard;
