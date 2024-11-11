import { Typography, Box, Container, Grid2 as Grid, Button} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DatePickerComponent from "../components/DatePicker";
import MuscleGroup from "../components/MuscleGroup";
import ExerciseCard from "../components/Cards/ExecriceCard";
import { useState } from "react";
import { ExerciseData } from "../interfaces/data/ExerciceData";


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
    margin: "0 !important",
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
  spanDate:{
    marginRight: '25px !important',
  }
});





const Session = () => {
  const styles = useStyles();

  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  const handleSaveExercise = (exerciseData: ExerciseData) => {
    setExercises([...exercises, exerciseData]);
  };

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
              <Box className={styles.boxName}>
                <Typography className={styles.title} variant="h1">Prénom Nom</Typography>
                <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare}/>
              </Box>
              <Box className={styles.boxDate}>
                <Typography className={styles.spanDate}> Programmée le : </Typography> 
                <DatePickerComponent label="Choisir une date"/>  
              </Box>     
              <MuscleGroup label="Groupe Musculaire"/>   
              <Box>
                <ExerciseCard onSave={handleSaveExercise} />
                {exercises.map((exercise, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography variant="h6">{exercise.exerciseName}</Typography>
                    {exercise.series.map((serie, idx) => (
                      <Typography key={idx}>Série {idx + 1} : {serie.repetitions} répétitions</Typography>
                    ))}
                  </Box>
                ))}
              </Box>      
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};      

export default Session;  