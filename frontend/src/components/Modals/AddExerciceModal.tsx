import React, { useState, useEffect } from "react";
import { Modal, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Series } from "../../interfaces/Series";
import { AddExerciseProps } from "../../interfaces/props/AddExerciseProps";

const exercises = ["Tractions", "Squat", "Développé couché", "Curl biceps"];

const AddExerciceModal: React.FC<AddExerciseProps> = ({ open, onClose, onSave, initialData }) => {
  const [exerciseName, setExerciseName] = useState<string>(initialData?.exerciseName || "");
  const [series, setSeries] = useState<Series[]>(initialData?.series || [{ repetitions: 0 }]);

  useEffect(() => {
    if (initialData) {
      setExerciseName(initialData.exerciseName);
      setSeries(initialData.series);
    }
  }, [initialData]);

  const handleExerciseChange = (event: SelectChangeEvent<string>) => {
    setExerciseName(event.target.value as string);
  };

  const handleRepsChange = (index: number, value: number) => {
    const newSeries = [...series];
    // Empêche les répétitions négatives
    newSeries[index].repetitions = Math.max(0, value);
    setSeries(newSeries);
  };

  const addSeries = () => {
    // Récupère les répétitions de la dernière série
    const lastReps = series.length > 0 ? series[series.length - 1].repetitions : 0;
    setSeries([...series, { repetitions: lastReps }]);
  };

  const resetForm = () => {
    setExerciseName("");
    setSeries([{ repetitions: 0 }]);
  };

  const handleSave = () => {
    if (exerciseName && series.some((serie) => serie.repetitions > 0)) {
      onSave({ exerciseName, series });
      resetForm();
    }
  };

  // Validation pour désactiver le bouton "Enregistrer"
  const isSaveDisabled = !exerciseName || !series.some((serie) => serie.repetitions > 0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Ajouter un exercice</Typography>
        
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
          disabled={isSaveDisabled} // Désactive le bouton si les conditions ne sont pas remplies
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default AddExerciceModal;
