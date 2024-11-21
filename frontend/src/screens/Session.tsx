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
import { ExerciseOrigin } from '../interfaces/data/exercise/ExerciseOrigin';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GETsession from '../api/services/sessions/GETsession';
import GETexercises from '../api/services/exercises/GETexecises';

import dayjs, { Dayjs } from 'dayjs';
import TitleEditor from '../components/Editor/TitleEditor';
import { SessionExerciseData } from '../interfaces/data/session/SessionExerciseData';

// import PUTsession from "../api/services/sessions/PUTsession";

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

const Session = () => {
  const styles = useStyles();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sessionTitle, setSessionTitle] = useState<string>('');
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(null);
  const [exerciceList, setExerciceList] = useState<ExerciseOrigin[]>([]);

  const [exercises, setExercises] = useState<SessionExerciseData[]>([]);
  const [exercise, setExercise] = useState<SessionExerciseData | null>(null);

  // Affichage dynamiques des données
  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await GETsession(id || '');
        console.log(sessionData);
        setSessionTitle(sessionData.title);
        const parsedDate = dayjs(sessionData.session_date);
        setSessionDate(parsedDate);
      } catch (error) {
        console.error('Erreur lors du chargement de la session:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadSession();
    }
  }, [id]);

  // Chargement des exercices
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exercises = await GETexercises();
        setExerciceList(exercises);
      } catch (error) {
        console.error('Erreur lors du chargement des exercices:', error);
      } finally {
        setLoading(false);
      }
    };
    loadExercises();
  }, []);

  // Loader
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

  // Gestion handle de la modal Exercice
  // OPEN
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setExercise(null);
  };
  // SAVE
  const handleSaveExercise = (SessionExerciseData: SessionExerciseData) => {
    if (exercise) {
      setExercises((prevExercises) =>
        prevExercises.map((ex) => (ex === exercise ? SessionExerciseData : ex))
      );
    } else {
      setExercises([...exercises, SessionExerciseData]);
    }
    console.log('DANS LE HANDLE SAVE', exercises);
    handleCloseModal();
  };
  // EDIT
  const handleEditExercise = (exercise: SessionExerciseData) => {
    setExercise(exercise);
    setOpen(true);
  };
  // DELETE
  const handleDeleteExercise = (exercise: SessionExerciseData) => {
    setExercises((prevExercises) =>
      prevExercises.filter((ex) => ex !== exercise)
    );
  };

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
            <Box className={styles.boxName}>
              {/* <Typography className={styles.title} variant="h1">{sessionTitle}</Typography>
              <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} />*/}
              <TitleEditor sessionId={id || ''} sessionTitle={sessionTitle} />
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}>
                {' '}
                Programmée le :{' '}
              </Typography>
              <DatePickerComponent
                label='Choisir une date'
                initialDate={sessionDate}
              />
            </Box>
            <MuscleGroup label='Groupe Musculaire' />

            <Grid container spacing={3}>
              {exercises.map((exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <ExerciseCard
                    exercise={exercise}
                    onEditExercise={handleEditExercise}
                    onDeleteExercise={handleDeleteExercise}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                <Button variant='contained' onClick={handleOpenModal} fullWidth>
                  Ajouter un exercice
                </Button>
                <AddExerciceModal
                  exercises={exerciceList}
                  open={open}
                  onClose={handleCloseModal}
                  onSave={handleSaveExercise}
                  initialData={exercise}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Session;
