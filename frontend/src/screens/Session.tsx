import { Typography, Box, Container, Grid2 as Grid, Button, CircularProgress  } from "@mui/material";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@mui/styles";
import DatePickerComponent from "../components/DatePicker";
import MuscleGroup from "../components/MuscleGroup";
import ExerciseCard from "../components/Cards/ExerciseCard";
import AddExerciceModal from "../components/Modals/AddExerciceModal";
import { ExerciseData } from "../utils/interfaces/components/data/ExerciceData";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import GETsession from "../api/services/sessions/GETsession";
import dayjs, { Dayjs } from 'dayjs';
import TitleEditor from "../components/Editor/TitleEditor";
// import axios from "axios";
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
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [editExercise, setEditExercise] = useState<ExerciseData | null>(null);
  const {id} = useParams();

  // const [sessionData, setSessionData] = useState({});
  // console.log(sessionData)

  const [sessionTitle, setSessionTitle] = useState<string>('');
  const [sessionDate, setSessionDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);

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
                  <AddExerciceModal open={open} onClose={handleCloseModal} onSave={handleSaveExercise} initialData={editExercise} />
                </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};


export default Session;
