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
import MuscleGroup from '../components/MuscleGroup';
import ExerciseCard from '../components/Cards/ExerciseCard';
import AddExerciceModal from '../components/Modals/AddExerciceModal';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GETsession from '../api/services/sessions/GETsession';
import GETexercises from '../api/services/exercises/GETexecises';

import dayjs from 'dayjs';
import TitleEditor from '../components/Editor/TitleEditor';
import { Exercise } from '../interfaces/data/exercise/Exercise';
import { SessionWithMuscleGroupAndSessionExercises } from '../interfaces/data/session/Session';
import { SessionExerciseWithExerciseAndSets } from '../interfaces/data/session_exercise/SessionExercise';
import { DELETEsessionExercise } from '../api/services/session_exercise/DELETE';

const Session = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/calendar');
    return;
  }

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [session, setSession] =
    useState<SessionWithMuscleGroupAndSessionExercises>(
      {} as SessionWithMuscleGroupAndSessionExercises
    );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessionExerciseToEdit, setSessionExerciseToEdit] =
    useState<SessionExerciseWithExerciseAndSets>(
      {} as SessionExerciseWithExerciseAndSets
    );

  const loadSession = async () => {
    setLoading(true);
    try {
      const sessionData = await GETsession(id);
      setSession(sessionData);
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const exercises = await GETexercises();
      setExercises(exercises);
    } catch (error) {
      console.error('Erreur lors du chargement des exercices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, [id]);

  useEffect(() => {
    loadExercises();
  }, []);

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
    udpatedSessionExercise: SessionExerciseWithExerciseAndSets
  ) => {
    const sessionExerciseIndexToUpdate = session.session_exercise.findIndex(
      (sessionexercise) => sessionexercise.id === udpatedSessionExercise.id
    );

    if (sessionExerciseIndexToUpdate !== -1) {
      const updatedSession = { ...session };
      updatedSession.session_exercise[sessionExerciseIndexToUpdate] =
        udpatedSessionExercise;
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
  const handleCloseModal = () => {
    setOpen(false);
  };
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

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
            <Box className={styles.boxName}>
              {/* <Typography className={styles.title} variant='h1'>
                {session?.title}
              </Typography>
              <FontAwesomeIcon
                className={styles.editIcon}
                icon={faPenToSquare}
              /> */}
              <TitleEditor sessionId={id} sessionTitle={session?.title} />
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}>
                {' '}
                Programmée le :{' '}
              </Typography>
              <DatePickerComponent
                label='Choisir une date'
                initialDate={dayjs(session?.session_date)}
              />
            </Box>
            <MuscleGroup label='Groupe Musculaire' />

            <Grid container spacing={3}>
              {session?.session_exercise?.map((session_exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <ExerciseCard
                    sessionExercise={session_exercise}
                    handleSelectSessionExerciseToEdit={
                      handleSelectSessionExerciseToEdit
                    }
                    handleDeleteSessionExercise={handleDeleteSessionExercise}
                  />
                </Grid>
              ))}
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
  hero: {
    marginTop: '100px',
  },
  boxName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
  },
  title: {
    margin: '0 !important',
  },
  editIcon: {
    width: '30px',
    height: '30px',
    marginLeft: '50px',
  },
  boxDate: {
    display: 'flex',
    alignItems: 'center',
  },
  spanDate: {
    marginRight: '25px !important',
  },
});

export default Session;
