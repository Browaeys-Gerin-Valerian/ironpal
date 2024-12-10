import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Grid2 as Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DatePickerComponent from '../components/DatePicker';
import ExerciseCard from '../components/Cards/ExerciseCard';
import AddExerciceModal from '../components/Modals/AddExerciceModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GETsession from '../api/services/sessions/GETsession';
import GETexercises from '../api/services/exercises/GETexecises';
import { DELETEsessionExercise } from '../api/services/session_exercise/DELETE';

import dayjs from 'dayjs';
import { Exercise } from '../interfaces/data/exercise/Exercise';
import { SessionWithMuscleGroupAndSessionExercises } from '../interfaces/data/session/Session';
import { SessionExerciseWithExerciseAndSets } from '../interfaces/data/session_exercise/SessionExercise';
import { Theme } from '@mui/material/styles';
import { colorPrimary } from '../styles/theme';

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

const Session = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/calendar');
    return null;
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionWithMuscleGroupAndSessionExercises>(
    {} as SessionWithMuscleGroupAndSessionExercises
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessionExerciseToEdit, setSessionExerciseToEdit] = useState<SessionExerciseWithExerciseAndSets>(
    {} as SessionExerciseWithExerciseAndSets
  );

  const loadSession = async () => {
    setLoading(true);
    try {
      const sessionData = await GETsession(id);
      setSession(sessionData);
      console.log(sessionData);
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const exercisesData = await GETexercises();
      setExercises(exercisesData);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    }
  };

  useEffect(() => {
    loadSession();
    loadExercises();
  }, [id]);

  const handleAddSessionExercise = (
    createdSessionExercise: SessionExerciseWithExerciseAndSets
  ) => {
    setSession((prev) => ({
      ...prev,
      session_exercise: [...prev.session_exercise, createdSessionExercise],
    }));
  };

  const handleSelectSessionExerciseToEdit = (id: number) => {
    const sessionExerciseToEdit = session.session_exercise.find(
      (sessionexercise) => sessionexercise.id === id
    );
    if (sessionExerciseToEdit) {
      setSessionExerciseToEdit(sessionExerciseToEdit);
    }
    handleOpenModal();
  };

  const handleUpdateSessionExercise = (
    updatedSessionExercise: SessionExerciseWithExerciseAndSets
  ) => {
    const sessionExerciseIndexToUpdate = session.session_exercise.findIndex(
      (sessionexercise) => sessionexercise.id === updatedSessionExercise.id
    );

    if (sessionExerciseIndexToUpdate !== -1) {
      const updatedSession = { ...session };
      updatedSession.session_exercise[sessionExerciseIndexToUpdate] =
        updatedSessionExercise;
      setSession(updatedSession);
    }
  };

  const handleDeleteSessionExercise = async (id: number) => {
    try {
      await DELETEsessionExercise(id);
      const updatedSessionExercise = session.session_exercise.filter(
        (sessionexercise) => sessionexercise.id !== id
      );
      setSession((prev) => ({
        ...prev,
        session_exercise: updatedSessionExercise,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  const totalExercises = session.session_exercise?.length || 0;
  const validatedExercisesCount = session.session_exercise?.filter(ex => ex.validated).length || 0;
  const isSessionValidated = validatedExercisesCount === totalExercises && totalExercises > 0;

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
            <Box className={styles.boxName}>
              <Typography className={`${styles.title} ${isSessionValidated ? 'validated' : ''}`} variant="h1">{session?.title}</Typography>
              {isSessionValidated && (
                <CheckCircleIcon style={{ color: colorPrimary, marginLeft: '20px' }} />
              )}
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}>
                Programmée le :
              </Typography>
              <DatePickerComponent
                label='Choisir une date'
                initialDate={dayjs(session?.session_date)}
              />
            </Box>
            <Grid container spacing={3}>
              {session?.session_exercise?.map((session_exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <ExerciseCard
                    id={id}
                    sessionExercise={session_exercise}
                    handleSelectSessionExerciseToEdit={handleSelectSessionExerciseToEdit}
                    handleDeleteSessionExercise={handleDeleteSessionExercise}
                    onExerciseValidated={() => {
                      // Mettre à jour l'état de validation des exercices
                      const updatedSessionExercises = session.session_exercise.map(ex =>
                        ex.id === session_exercise.id ? { ...ex, validated: true } : ex
                      );
                      setSession(prev => ({
                        ...prev,
                        session_exercise: updatedSessionExercises,
                      }));
                    }}
                  />
                </Grid>
              ))}
              {!isSessionValidated && (
                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                  <Button variant='contained' onClick={handleOpenModal} fullWidth>
                    Ajouter un exercice
                  </Button>
                  <AddExerciceModal
                    id={id}
                    open={open}
                    onClose={handleCloseModal}
                    exercises={exercises}
                    sessionExercise={sessionExerciseToEdit}
                    setSessionExerciseToEdit={setSessionExerciseToEdit}
                    handleAddSessionExercise={handleAddSessionExercise}
                    handleUpdateSessionExercise={handleUpdateSessionExercise}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        {isSessionValidated ? (
          <Typography variant="h6" style={{ color: colorPrimary, marginTop: '50px' }}>
            Séance validée ! 
            {/* <CheckCircleIcon style={{ color: colorPrimary }} /> */}
          </Typography>
        ) : (
          <Typography variant="h6" style={{ marginTop: '50px' }}>
            Exercices à valider : {validatedExercisesCount} / {totalExercises}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Session;
