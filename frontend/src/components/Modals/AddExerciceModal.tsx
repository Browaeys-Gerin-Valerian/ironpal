import { ChangeEvent, useEffect, useState } from 'react';
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
import { makeStyles } from '@mui/styles';
import { Set } from '../../interfaces/entities/Set';
import { convertSecondsToRest } from '../../utils/functions/date';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/entities/SessionExercise';
import { isEmptyObject } from '../../utils/functions/object';
import { Theme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Exercise } from '../../interfaces/entities/Exercise';
import {
  createSessionExercise,
  updateSessionExercise,
} from '../../api/services/sessionExercises';

const timeOptions = Array.from({ length: 40 }, (_, index) => {
  return (index + 1) * 15;
});

export interface AddExerciseProps {
  open: boolean;
  onClose: () => void;
  exercises: Exercise[];
  sessionExercise: SessionExerciseWithExerciseAndSets;
  setSessionExerciseToEdit: (
    sessionExeciseToEdit: SessionExerciseWithExerciseAndSets
  ) => void;
  handleAddSessionExercise: (
    createdSessionExercise: SessionExerciseWithExerciseAndSets
  ) => void;
  handleUpdateSessionExercise: (
    updatedSessionExercise: SessionExerciseWithExerciseAndSets
  ) => void;
}

const AddExerciceModal = ({
  open,
  onClose,
  exercises,
  sessionExercise,
  setSessionExerciseToEdit,
  handleAddSessionExercise,
  handleUpdateSessionExercise,
}: AddExerciseProps) => {
  const { id } = useParams();
  const styles = useStyles();

  //Calcule la moyenne de temps de repos entre les sets qui pour l'instant est la meme pour tout les sets
  const rest_between_sets = sessionExercise?.sets?.reduce(
    (acc, curr, _, arr) => (acc += curr.rest_between_sets / arr.length),
    0
  );

  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [sets, setSets] = useState<Pick<Set, 'number_of_repetitions'>[]>([
    { number_of_repetitions: 0 },
  ]);
  const [load, setLoad] = useState<number>(0);
  const [restBetweenSets, setRestBetweenSets] = useState<string>('0');
  const [restBetweenExercises, setRestBetweenExercises] = useState<string>('0');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!isEmptyObject(sessionExercise)) {
      setSelectedExercise(sessionExercise.exercise?.id.toString() || '');
      setSets(sessionExercise.sets || [{ number_of_repetitions: 0 }]);
      setLoad(sessionExercise.load || 0);
      setRestBetweenSets(String(rest_between_sets) || '0');
      setRestBetweenExercises(
        String(sessionExercise.rest_between_exercises) || '0'
      );
    } else {
      resetForm();
    }
  }, [sessionExercise]);

  //SELECTED EXERCISE LINKED TO SESSION EXERCISE AMAGNEMENT
  const handleChangeExercise = (event: SelectChangeEvent<string>) => {
    setSelectedExercise(event.target.value);
  };

  //SET INPUTS MANAGMENT
  const handleChangeSets = (index: number, value: number) => {
    const newSeries = [...sets];
    newSeries[index].number_of_repetitions = Math.max(0, value);
    setSets(newSeries);
  };

  const handleAddSet = () => {
    const lastReps =
      sets.length > 0 ? sets[sets.length - 1].number_of_repetitions : 0;
    setSets([...sets, { number_of_repetitions: lastReps }]);
  };

  const handleDeleteSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  //LOAD INPUT MANAGEMENT
  const handleChangeLoad = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoad(Number(value));
  };

  //REST BETWEEN SET INPUT MANAGEMENT
  const handleChangeRestBetweenSets = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setRestBetweenSets(value);
  };

  //REST BETWEEN EXERCISE INPUT MANAGEMENT
  const handleChangeBetweenExercises = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setRestBetweenExercises(value);
  };

  const resetForm = () => {
    setSelectedExercise('');
    setSets([{ number_of_repetitions: 0 }]);
    setLoad(0);
    setRestBetweenSets('0');
    setRestBetweenExercises('0');
    setShowDetails(false);
  };

  const handleSubmit = async () => {
    const payload = {
      exercise_id: Number(selectedExercise),
      load,
      validated: false,
      rest_between_exercises: Number(restBetweenExercises),
      sets: sets.map((set) => ({
        ...set,
        rest_between_sets: Number(restBetweenSets),
      })),
    };

    try {
      if (isEmptyObject(sessionExercise)) {
        const createResponse = await createSessionExercise(
          Number(id as string),
          payload
        );
        if (createResponse.status === 200) {
          handleAddSessionExercise(createResponse.data);
          onClose();
        } else {
          console.error(
            'Erreur lors de la création de l’exercice :',
            createResponse
          );
        }
      } else {
        const updateResponse = await updateSessionExercise(
          Number(id as string),
          sessionExercise.id,
          payload
        );
        if (updateResponse.status === 200) {
          handleUpdateSessionExercise(updateResponse.data);
          onClose();
        } else {
          console.error(
            'Erreur lors de la mise à jour de l’exercice :',
            updateResponse
          );
        }
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de l’exercice :', error);
    }

    resetForm();
    setSessionExerciseToEdit({} as SessionExerciseWithExerciseAndSets);
  };

  const isSaveDisabled =
    !selectedExercise ||
    sets.some((serie) => serie.number_of_repetitions === 0) ||
    sets.length === 0;

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.box}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey' }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' component='h2' sx={{ mb: 2, fontWeight: 400 }}>
          Ajouter un exercice
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Exercice</InputLabel>
          <Select
            value={selectedExercise}
            onChange={handleChangeExercise}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 400,
                },
              },
            }}
          >
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                {exercise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/**SETS SECTION */}
        {selectedExercise && (
          <Box sx={{ mb: 2 }}>
            <Typography className={styles.subtitle} variant='subtitle1'>
              Séries :{' '}
            </Typography>
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
                    handleChangeSets(index, Number(e.target.value))
                  }
                  fullWidth
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => handleDeleteSet(index)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <IconButton
              className={styles.btnAddSerie}
              onClick={handleAddSet}
              color='primary'
              sx={{ mt: 1 }}
            >
              <AddCircleIcon /> &nbsp; Ajouter une série
            </IconButton>
          </Box>
        )}

        {/**DETAIL SECTION */}
        {selectedExercise && (
          <Accordion
            expanded={showDetails}
            onChange={() => setShowDetails(!showDetails)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={styles.accordeon}
            >
              <Typography className={styles.btnDetails}>Détails :</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/**LOAD MANAGEMENT */}
              <TextField
                label='Poids (kg)'
                type='number'
                value={load}
                onChange={handleChangeLoad}
                fullWidth
                sx={{ mb: 2 }}
              />

              {/**REST BETWEEN SETS MANAGEMENT */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Temps de repos entre séries</InputLabel>
                <Select
                  value={restBetweenSets}
                  onChange={handleChangeRestBetweenSets}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value='0'>Aucun temps de repos</MenuItem>
                  {timeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {convertSecondsToRest(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/**REST BETWEEN EXERCISES MANAGEMENT */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Repos de repos final</InputLabel>
                <Select
                  value={restBetweenExercises}
                  onChange={handleChangeBetweenExercises}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value='0'>Aucun repos final</MenuItem>
                  {timeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {convertSecondsToRest(option)}
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
          className={styles.btnSave}
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  textfield: {
    marginTop: '5px !important',
  },
  modal: {
    overflowY: 'auto',
    height: '100%',
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
    },
  },
  subtitle: {
    fontWeight: 400 + '!important',
    marginBottom: '10px !important',
  },
  btnAddSerie: {
    fontSize: '1.4rem !important',
    marginTop: '10px !important',
  },
  accordeon: {
    // border: '2px solid' + colorPrimary + '!important',
    // boxShadow: 'none !important',
  },
  btnDetails: {
    fontWeight: 400 + '!important',
  },
  btnSave: {
    marginTop: '30px !important',
    marginBottom: '10px !important',
  },
}));

export default AddExerciceModal;
