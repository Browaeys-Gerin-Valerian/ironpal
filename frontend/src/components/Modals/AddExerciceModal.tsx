import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Series } from '../../utils/interfaces/components/Series';
import { AddExerciseProps } from '../../utils/interfaces/components/props/AddExerciseProps';
import { makeStyles } from '@mui/styles';

const exercises = ['Tractions', 'Squat', 'Développé couché', 'Curl biceps'];

// Options de temps sous forme de chaîne de caractères
const timeOptions = Array.from({ length: 41 }, (_, index) => {
  const minutes = Math.floor(index / 4);
  const seconds = (index % 4) * 15;    

  // Formate le temps en minutes et secondes
  return seconds === 0 
    ? `${minutes}'`
    : `${minutes}'${seconds}s`;
});



const useStyles = makeStyles({
  textfield: {
    marginTop: "05px !important",
  },
});

const AddExerciceModal: React.FC<AddExerciseProps> = ({ open, onClose, onSave, initialData }) => {
  const styles = useStyles();
  
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

  const renderWeightInput = () => (
    <TextField
      label="Poids (kg)"
      type="number"
      value={weight ?? ''}
      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : undefined)}
      fullWidth
      sx={{ mb: 2 }}
    />
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
          Ajouter un exercice
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Exercice</InputLabel>
          <Select value={exerciseName} onChange={handleExerciseChange}>
            {exercises.map((exercise) => (
              <MenuItem key={exercise} value={exercise}>
                {exercise}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {exerciseName && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle1'>Séries</Typography>
            {series.map((serie, index) => (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} key={index}>
                <TextField
                  className={styles.textfield}
                  label={`Série ${index + 1} - Répétitions`}
                  type='number'
                  value={serie.repetitions}
                  onChange={(e) => handleRepsChange(index, Number(e.target.value))}
                  fullWidth
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => deleteSeries(index)} color='error'>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <IconButton onClick={addSeries} color='primary' sx={{ mt: 1 }}>
              <AddCircleIcon /> Ajouter une série
            </IconButton>
          </Box>
        )}

        {exerciseName && (
          <Accordion expanded={showDetails} onChange={() => setShowDetails(!showDetails)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: 'lightgray' }}>
              <Typography>Détails</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderWeightInput()}

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Temps de repos entre séries</InputLabel>
                <Select
                  value={restTime ?? ''}
                  onChange={(e) => setRestTime(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value="">Aucun temps de repos</MenuItem>
                  {timeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Repos final</InputLabel>
                <Select
                  value={restTimeFinal ?? ''}
                  onChange={(e) => setRestTimeFinal(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value="">Aucun repos final</MenuItem>
                  {timeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        )}

        <Button variant='contained' color='primary' onClick={handleSave} fullWidth disabled={isSaveDisabled}>
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default AddExerciceModal;
