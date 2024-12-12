import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Grid2 as Grid,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import DatePickerComponent from '../components/DatePicker';
import ExerciseCard from '../components/Cards/ExerciseCard';
import AddExerciceModal from '../components/Modals/AddExerciceModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GETsession from '../api/services/sessions/GETsession';
import GETexercises from '../api/services/exercises/GETexecises';
import { DELETEsessionExercise } from '../api/services/session_exercise/DELETE';
import { DELETEsession } from '../api/services/sessions/DELETEsession';

import dayjs from 'dayjs';
import { Exercise } from '../interfaces/data/exercise/Exercise';
import { SessionWithMuscleGroupAndSessionExercises } from '../interfaces/data/session/Session';
import { SessionExerciseWithExerciseAndSets } from '../interfaces/data/session_exercise/SessionExercise';
import { Theme } from '@mui/material/styles';
import { colorPrimary } from '../styles/theme';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Loader from '../components/Loader';

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
  const [session, setSession] =
    useState<SessionWithMuscleGroupAndSessionExercises>(
      {} as SessionWithMuscleGroupAndSessionExercises
    );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessionExerciseToEdit, setSessionExerciseToEdit] = useState<SessionExerciseWithExerciseAndSets>(
    {} as SessionExerciseWithExerciseAndSets
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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


  // SUPPRIMER UN SESSION_EXERCICE
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

    // SPPRIMMER LA SESSION
    const handleDeleteSession = async () => {
      const sessionId = parseInt(id, 10); // Convertir l'ID en nombre
      try {
        setLoading(true);
        await DELETEsession(sessionId);
        navigate('/calendrier', {
          state: { message: `Séance ${(session.title)} supprimée !`, severity: 'success' },
        });
      } catch (error) {
        console.error('Erreur lors de la suppression de la session:', error);
      } finally {
        setLoading(false);
      }
    };
  

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (loading) {
    return (
      <Loader />
    );
  }

  const totalExercises = session.session_exercise?.length || 0;
  const validatedExercisesCount =
    session.session_exercise?.filter((ex) => ex.validated).length || 0;
  const isSessionValidated =
    validatedExercisesCount === totalExercises && totalExercises > 0;


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
                Programmée le : <b>{dayjs(session?.session_date).format('DD MMMM YYYY')}</b>
              </Typography>
              {/* <DatePickerComponent
                label='Choisir une date'
                initialDate={dayjs(session?.session_date)}
              /> */}
            </Box>
            <Grid container spacing={3}>
              {session?.session_exercise?.map((session_exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <ExerciseCard
                    id={id}
                    sessionExercise={session_exercise}
                    handleSelectSessionExerciseToEdit={
                      handleSelectSessionExerciseToEdit
                    }
                    handleDeleteSessionExercise={handleDeleteSessionExercise}
                    onExerciseValidated={() => {
                      // Mettre à jour l'état de validation des exercices
                      const updatedSessionExercises =
                        session.session_exercise.map((ex) =>
                          ex.id === session_exercise.id
                            ? { ...ex, validated: true }
                            : ex
                        );
                      setSession((prev) => ({
                        ...prev,
                        session_exercise: updatedSessionExercises,
                      }));
                    }}
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
          <Typography variant="h6" sx={{ color: colorPrimary, marginTop: '50px', textAlign: { xs: 'center', sm: 'start' }, }} >
            Séance validée ! 
            {/* <CheckCircleIcon style={{ color: colorPrimary }} /> */}
          </Typography>
        ) : (
          totalExercises > 0 && (
          <Typography className={styles.spanDate} style={{ display: "block", marginTop: '100px' }}>
            Exercices validés : <b>{validatedExercisesCount} / {totalExercises}</b>
          </Typography>
          )
        )}
        <Box
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            marginTop: '100px',
          }}
        >
          <Button sx={{ 
            background:"white",
            color:"grey",
            border: "1px solid grey",
            '&:hover': {
              background: 'black',
              color: 'white',
              border: "1px solid black",
            },
          }} 
            onClick={() => setIsDeleteDialogOpen(true)}>Supprimer la séance &nbsp; <DeleteIcon /></Button>
        </Box>
        {/* Dialog for deletion */}
        <ConfirmationDialog 
          open={isDeleteDialogOpen}
          title="Supprimer la séance ?"
          icon={<DeleteIcon color='error' />}
          message="Es-tu sûr de vouloir supprimer cette séance ?"
          onConfirm={handleDeleteSession}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default Session;
