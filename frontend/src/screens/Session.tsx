import { Typography, Box, Container, Grid2 as Grid, Button, CircularProgress  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DatePickerComponent from "../components/DatePicker";
import MuscleGroup from "../components/MuscleGroup";
import ExerciseCard from "../components/Cards/ExerciseCard";
import AddExerciceModal from "../components/Modals/AddExerciceModal";
import { ExerciseData } from "../interfaces/data/exercise/ExerciseData";
import { ExerciseOrigin } from "../interfaces/data/exercise/ExerciseOrigin";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import GETsession from "../api/services/sessions/GETsession";
import GETexercises from "../api/services/exercises/GETexecises";

import dayjs, { Dayjs } from 'dayjs';
import TitleEditor from "../components/Editor/TitleEditor";

// import PUTsession from "../api/services/sessions/PUTsession";

const useStyles = makeStyles({
  root:{ 
    paddingTop: '100px', 
    paddingBottom: '150px' 
  },
  hero:{ 
    marginTop: '100px'
  },
  boxName:{ 
    display: 'flex', 
    alignItems: 'center', 
    marginBottom: '50px' 
  },
  title:{ 
    margin: "0 !important" 
  },
  editIcon:{ 
    width: '30px', 
    height: '30px', 
    marginLeft: '50px' 
  },
  boxDate:{ 
    display: 'flex', 
    alignItems: 'center' 
  },
  spanDate:{ 
    marginRight: '25px !important' 
  }
});

const Session = () => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  const [exercises, setExercises] = useState<ExerciseOrigin[]>([]);
  const [editExercise, setEditExercise] = useState<ExerciseData | null>(null);
  const {id} = useParams();

  // const [sessionData, setSessionData] = useState({});
  // console.log(sessionData)

  const [sessionTitle, setSessionTitle] = useState<string>('');
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);

  const [exerciseName, setExerciseName] = useState<string>(initialData?.exerciseName || '');
  const [series, setSeries] = useState<Series[]>(initialData?.series || [{ repetitions: 0 }]);
  const [weight, setWeight] = useState<number | undefined>(initialData?.weight);
  const [restTime, setRestTime] = useState<string | undefined>(initialData?.restTime); // Utilisation de string pour restTime
  const [restTimeFinal, setRestTimeFinal] = useState<string | undefined>(initialData?.restTimeFinal); // Utilisation de string pour restTimeFinal
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (initialData) {
      setExerciseName(initialData.exerciseName);
      setSeries(initialData.series);
      setWeight(initialData.weight);
      setRestTime(initialData.restTime);
      setRestTimeFinal(initialData.restTimeFinal);
    }
  }, [initialData]);

  const handleExerciseChange = (event: SelectChangeEvent<string>) => {
    setExerciseName(event.target.value as string);
  };

  const handleRepsChange = (index: number, value: number) => {
    const newSeries = [...series];
    newSeries[index].repetitions = Math.max(0, value);
    setSeries(newSeries);
  };

  const addSeries = () => {
    const lastReps = series.length > 0 ? series[series.length - 1].repetitions : 0;
    setSeries([...series, { repetitions: lastReps }]);
  };

  const deleteSeries = (index: number) => {
    const newSeries = series.filter((_, i) => i !== index);
    setSeries(newSeries);
  };

  const resetForm = () => {
    setExerciseName('');
    setSeries([{ repetitions: 0 }]);
    setWeight(undefined);
    setRestTime(undefined);
    setRestTimeFinal(undefined);
  };

  const handleSave = () => {
    if (exerciseName && series.some((serie) => serie.repetitions > 0)) {
      onSave({
        exerciseName,
        series,
        weight,
        restTime,
        restTimeFinal,
      });
      resetForm();
    }
  };

  const isSaveDisabled = !exerciseName || !series.some((serie) => serie.repetitions > 0);


  // Affichage dynamiques des données
  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await GETsession(id || '');
        // setSessionData(sessionData);
        console.log(sessionData)
        setSessionTitle(sessionData.title);
        const parsedDate = dayjs(sessionData.session_date);
        setSessionDate(parsedDate);
      } catch (error) {
        console.error("Erreur lors du chargement de la session:", error);
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
      try{
        const exercises = await GETexercises();
        setExercises(exercises);
      } catch (error) {
        console.error("Erreur lors du chargement des exercices:", error);
      } finally {
        setLoading(false); 
      }
    };
    loadExercises();
  }, []);

  console.log(exercises);


  // Loader
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Gestion handle de la modal Exercice
  // OPEN
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEditExercise(null);
  };
  // SAVE
  const handleSaveExercise = (exerciseData: ExerciseData) => {
    if (editExercise) {
      setExercises((prevExercises) =>
        prevExercises.map((ex) => (ex === editExercise ? exerciseData : ex))
      );
    } else {
      setExercises([...exercises, exerciseData]);
    }
    handleCloseModal();
  };
  // EDIT
  const handleEditExercise = (exercise: ExerciseData) => {
    setEditExercise(exercise);
    setOpen(true);
  };
  // DELETE
  const handleDeleteExercise = (exercise: ExerciseData) => {
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
              <TitleEditor sessionId={id || ''} sessionTitle={sessionTitle}/>
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}> Programmée le : </Typography>
              <DatePickerComponent label="Choisir une date" initialDate={sessionDate}/>
            </Box>
            <MuscleGroup label="Groupe Musculaire" />

            <Grid container spacing={3}>
              {exercises.map((exercise, index) => (
                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
                  <ExerciseCard exercise={exercise} onEditExercise={handleEditExercise} onDeleteExercise={handleDeleteExercise}/>
                </Grid>
              ))}
                <Grid size={{ xs: 12, md: 6, xl: 4 }}>
                  <Button variant="contained" onClick={handleOpenModal} fullWidth>
                    Ajouter un exercice
                  </Button>
                  <AddExerciceModal exercises={exercises} open={open} onClose={handleCloseModal} onSave={handleSaveExercise} initialData={editExercise} />
                </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


export default Session;
