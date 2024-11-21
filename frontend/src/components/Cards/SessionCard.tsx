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
import { SessionProps } from '../../interfaces/types/props/SessionProps';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: '31%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '30px !important',
    transition: 'box-shadow 0.3s ease-in-out',
    overflow: 'hidden',
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
  date: {
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
  const isToday = dayjs(session.date).isSame(dayjs(), 'day'); // Vérifie si la session est aujourd'hui
  console.log('Session Date: ', session.date, ' Is Today: ', isToday);
  const styles = useStyles({ isToday }); // Passe isToday en props aux styles
  const formattedDate = dayjs(session.date).format('dddd D MMMM');

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography className={styles.date} variant='body1' color='primary'>
          {formattedDate}
        </Typography>
        <Typography className={styles.title} variant='h5'>
          {session.title}
        </Typography>
        <Box mt={2}>
          <List>
            {session.exercises.map((exercise, index) => (
              <ListItem key={index}>
                <ListItemText className={styles.exercise} primary={exercise} />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
