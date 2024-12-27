import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { colorPrimary } from '../../styles/theme';
import { Theme } from '@mui/material/styles';
import {
  Typography,
  Box,
  Container,
  Grid2 as Grid,
  Button,
} from '@mui/material';
import { Exercise } from '../../interfaces/entities/Exercise';
import SessionExerciseCard from '../Cards/SessionExerciseCard';
import AddExerciceModal from '../../components/Modals/AddExerciceModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../Modals/ConfirmationDialog';
import Loader from '../Layouts/Loader';
import { useSessionProvider } from '../../context/sessionContext';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/entities/SessionExercise';

interface SessionProps {
  exercises: Exercise[];
}

const Session = ({ exercises }: SessionProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/calendar');
    return;
  }

  const styles = useStyles();

  const { loading, session, handleDeleteSession, setSessionExerciseToEdit } =
    useSessionProvider();

  const [open, setOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
  };

  const totalNumberOfSessionExercises = session.session_exercises?.length || 0;
  const totalNumberOfValidatedSessionExercises =
    session.session_exercises?.filter((ex) => ex.validated).length || 0;
  const isSessionValidated =
    totalNumberOfValidatedSessionExercises === totalNumberOfSessionExercises &&
    totalNumberOfSessionExercises > 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
            <Box className={styles.boxName}>
              <Typography
                className={`${styles.title} ${
                  isSessionValidated ? 'validated' : ''
                }`}
                variant='h1'
              >
                {session?.title}
              </Typography>
              {isSessionValidated && (
                <CheckCircleIcon
                  style={{ color: colorPrimary, marginLeft: '20px' }}
                />
              )}
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}>
                Programmée le :{' '}
                <b>{dayjs(session?.session_date).format('DD MMMM YYYY')}</b>
              </Typography>
              {/* <DatePickerComponent
                label='Choisir une date'
                initialDate={dayjs(session?.session_date)}
              /> */}
            </Box>
            <Grid container spacing={3}>
              {session?.session_exercises?.map((session_exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <SessionExerciseCard
                    sessionExercise={session_exercise}
                    handleOpenModal={handleOpenModal}
                  />
                </Grid>
              ))}
              {!isSessionValidated && (
                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                  <Button
                    variant='contained'
                    onClick={handleOpenModal}
                    fullWidth
                  >
                    Ajouter un exercice
                  </Button>
                  <AddExerciceModal
                    open={open}
                    onClose={handleCloseModal}
                    exercises={exercises}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        {isSessionValidated ? (
          <Typography
            variant='h6'
            sx={{
              color: colorPrimary,
              marginTop: '50px',
              textAlign: { xs: 'center', sm: 'start' },
            }}
          >
            Séance validée !
            {/* <CheckCircleIcon style={{ color: colorPrimary }} /> */}
          </Typography>
        ) : (
          <Typography
            className={styles.spanDate}
            style={{ display: 'block', marginTop: '100px' }}
          >
            Exercices validés :{' '}
            <b>
              {totalNumberOfValidatedSessionExercises} /{' '}
              {totalNumberOfSessionExercises}
            </b>
          </Typography>
        )}
        <Box
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            marginTop: '100px',
          }}
        >
          <Button
            sx={{
              background: 'white',
              color: 'grey',
              border: '1px solid grey',
              '&:hover': {
                background: 'black',
                color: 'white',
                border: '1px solid black',
              },
            }}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Supprimer la séance &nbsp; <DeleteIcon />
          </Button>
        </Box>
        {/* Dialog for deletion */}
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          title='Supprimer la séance ?'
          icon={<DeleteIcon />}
          message='Es-tu sûr de vouloir supprimer cette séance ?'
          onConfirm={handleDeleteSession}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '80px',
    },
  },
  hero: {
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  boxName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
  },
  title: {
    margin: '0 !important',
    '&.validated': {
      color: colorPrimary,
    },
  },
  editIcon: {
    width: '30px',
    height: '30px',
    marginLeft: '50px',
  },
  boxDate: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px !important',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  spanDate: {
    marginRight: '25px !important',
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px !important',
      display: 'block',
    },
  },
}));

export default Session;
