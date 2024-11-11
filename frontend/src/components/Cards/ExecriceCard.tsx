import React, { useState } from "react";
import {Modal,Box,Button,FormControl,InputLabel,MenuItem,Select,SelectChangeEvent,TextField,Typography,IconButton} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Series } from "../../interfaces/Series";
import { ExerciseCardProps } from "../../interfaces/props/ExercieCardProps";


const exercises = ["Tractions", "Squat", "Développé couché", "Curl biceps"];

const ExerciseCard: React.FC<ExerciseCardProps> = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [series, setSeries] = useState<Series[]>([{ repetitions: 0 }]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleExerciseChange = (event: SelectChangeEvent<string>) => {
    setExerciseName(event.target.value as string);
  };

  const handleRepsChange = (index: number, value: number) => {
    const newSeries = [...series];
    newSeries[index].repetitions = value;
    setSeries(newSeries);
  };

  const addSeries = () => {
    setSeries([...series, { repetitions: 0 }]);
  };

  const resetForm = () => {
    setExerciseName("");
    setSeries([{ repetitions: 0 }]);
  };

  const handleSave = () => {
    onSave({ exerciseName, series });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Ajouter un exercice</Button>
      
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Ajouter un exercice
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Exercice</InputLabel>
            <Select value={exerciseName} onChange={handleExerciseChange}>
              {exercises.map((exercise) => (
                <MenuItem key={exercise} value={exercise}>{exercise}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {exerciseName && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Séries</Typography>
              {series.map((serie, index) => (
                <TextField
                  key={index}
                  label={`Série ${index + 1} - Répétitions`}
                  type="number"
                  value={serie.repetitions}
                  onChange={(e) => handleRepsChange(index, Number(e.target.value))}
                  fullWidth
                  sx={{ mt: 1 }}
                />
              ))}
              <IconButton onClick={addSeries} color="primary" sx={{ mt: 1 }}>
                <AddCircleIcon /> Ajouter une série
              </IconButton>
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ExerciseCard;
