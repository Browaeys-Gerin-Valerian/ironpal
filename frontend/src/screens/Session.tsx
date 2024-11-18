import { Typography, Box, Container, Grid2 as Grid, Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from "@mui/styles";
import DatePickerComponent from "../components/DatePicker";
import MuscleGroup from "../components/MuscleGroup";
import ExerciseCard from "../components/Cards/ExerciseCard";
import AddExerciceModal from "../components/Modals/AddExerciceModal";
import { ExerciseData } from "../interfaces/data/ExerciceData";
import { useState } from "react";

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

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEditExercise(null);
  };

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

  const handleEditExercise = (exercise: ExerciseData) => {
    setEditExercise(exercise);
    setOpen(true);
  };

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
              <Typography className={styles.title} variant="h1">Nom de ma Session</Typography>
              <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare} />
            </Box>
            <Box className={styles.boxDate}>
              <Typography className={styles.spanDate}> Programmée le : </Typography>
              <DatePickerComponent label="Choisir une date" />
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
