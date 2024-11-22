import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddExerciseProps } from '../../interfaces/props/AddExerciseProps';
import { makeStyles } from '@mui/styles';
import { SetExercise } from '../../interfaces/data/set/Set';
import { CREATEsessionExercise } from '../../api/services/session_exercise/CREATE';

import { convertSecondsToRest } from '../../utils/functions/time';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/data/session_exercise/SessionExercise';
import { isEmptyObject } from '../../utils/functions/object';
import { PUTsessionExercise } from '../../api/services/session_exercise/PUT';

// Options de temps sous forme de chaîne de caractères
const timeOptions = Array.from({ length: 41 }, (_, index) => {
  const minutes = Math.floor(index / 4);
  const seconds = (index % 4) * 15;

  // Formate le temps en minutes et secondes
  return seconds === 0 ? `${minutes}'` : `${minutes}'${seconds}s`;
});

const useStyles = makeStyles({
  textfield: {
    marginTop: '5px !important',
  },
});

const AddExerciceModal: React.FC<AddExerciseProps> = ({
  id,
  open,
  onClose,
  exercises,
  sessionExercise,
  setSessionExerciseToEdit,
  handleAddSessionExercise,
  handleUpdateSessionExercise,
}) => {
  const styles = useStyles();

  //Calcule la moyenne de temps de repos entre les sets qui pour l'instant est la meme pour tout les sets
  const rest_between_sets = sessionExercise?.set?.reduce(
    (acc, curr, _, arr) => (acc += curr.rest_between_sets / arr.length),
    0
  );

  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [sets, setSets] = useState<
    Pick<SetExercise, 'number_of_repetitions'>[]
  >([{ number_of_repetitions: 0 }]);
  const [load, setLoad] = useState<number>(0);
  const [restBetweenSets, setRestBetweenSets] = useState<string>('');
  const [restBetweenExercises, setRestBetweenExercises] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (sessionExercise) {
      setSelectedExercise(sessionExercise.exercise?.id.toString() || '');
      setSets(sessionExercise.set || [{ number_of_repetitions: 0 }]);
      setLoad(sessionExercise.load || 0);
      setRestBetweenSets(convertSecondsToRest(rest_between_sets) || '');
      setRestBetweenExercises(
        convertSecondsToRest(sessionExercise.rest_between_exercises) || ''
      );
    } else {
      resetForm();
    }
  }, [sessionExercise]);

  const handleExerciseChange = (event: SelectChangeEvent<string>) => {
    setSelectedExercise(event.target.value);
  };

  const handleRepsChange = (index: number, value: number) => {
    const newSeries = [...sets];
    newSeries[index].number_of_repetitions = Math.max(0, value);
    setSets(newSeries);
  };

  const addSets = () => {
    const lastReps =
      sets.length > 0 ? sets[sets.length - 1].number_of_repetitions : 0;
    setSets([...sets, { number_of_repetitions: lastReps }]);
  };

  const deleteSeries = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  const resetForm = () => {
    setSelectedExercise('');
    setSets([{ number_of_repetitions: 0 }]);
    setLoad(0);
    setRestBetweenSets('');
    setRestBetweenExercises('');
    setShowDetails(false);
  };

  const handleSubmit = async () => {
    const payload = {
      session_id: parseInt(id),
      exercise_id: parseInt(selectedExercise),
      load,
      rest_between_exercises: restBetweenExercises,
      sets: sets.map((set) => ({
        ...set,
        rest_between_sets: restBetweenSets,
      })),
    };

    if (isEmptyObject(sessionExercise)) {
      const createResponse = await CREATEsessionExercise(payload);
      try {
        if (createResponse.status === 200) {
          handleAddSessionExercise(createResponse.data);
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (!isEmptyObject(sessionExercise)) {
      const udpateResponse = await PUTsessionExercise(
        sessionExercise.id,
        payload
      );
      try {
        if (udpateResponse.status === 200) {
          handleUpdateSessionExercise(udpateResponse.data);
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    }

    resetForm();
    setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
  };

  const isSaveDisabled =
    !selectedExercise ||
    sets.some((serie) => serie.number_of_repetitions === 0);

  const renderWeightInput = () => (
    <TextField
      label='Poids (kg)'
      type='number'
      value={load}
      onChange={(e) => setLoad(Number(e.target.value))}
      fullWidth
      sx={{ mb: 2 }}
    />
  );

  return (
    <Modal open={open} onClose={onClose}>
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
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
          Ajouter un exercice
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Exercice</InputLabel>
          <Select value={selectedExercise} onChange={handleExerciseChange}>
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedExercise && (
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle1'>Séries</Typography>
            {sets.map((serie, index) => (
              <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                key={index}
              >
                <TextField
                  className={styles.textfield}
                  label={`Série ${index + 1} - Répétitions`}
                  type='number'
                  value={serie.number_of_repetitions}
                  onChange={(e) =>
                    handleRepsChange(index, Number(e.target.value))
                  }
                  fullWidth
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => deleteSeries(index)} color='error'>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <IconButton onClick={addSets} color='primary' sx={{ mt: 1 }}>
              <AddCircleIcon /> Ajouter une série
            </IconButton>
          </Box>
        )}

        {selectedExercise && (
          <Accordion
            expanded={showDetails}
            onChange={() => setShowDetails(!showDetails)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: 'lightgray' }}
            >
              <Typography>Détails</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderWeightInput()}

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Temps de repos entre séries</InputLabel>
                <Select
                  value={restBetweenSets ?? ''}
                  onChange={(e) => setRestBetweenSets(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value=''>Aucun temps de repos</MenuItem>
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
                  value={restBetweenExercises ?? ''}
                  onChange={(e) => setRestBetweenExercises(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value=''>Aucun repos final</MenuItem>
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

        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          fullWidth
          disabled={isSaveDisabled}
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default AddExerciceModal;
