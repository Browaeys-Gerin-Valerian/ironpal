import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import RatingDifficulty from '../RatingDifficulty';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/data/session_exercise/SessionExercise';
import { convertSecondsToRest } from '../../utils/functions/time';

interface SessionExerciseCardProps {
  handleSelectSessionExerciseToEdit: (id: number) => void;
  handleDeleteSessionExercise: (id: number) => void;
  sessionExercise: SessionExerciseWithExerciseAndSets;
}

const SessionExerciseCard: React.FC<SessionExerciseCardProps> = ({
  sessionExercise,
  handleSelectSessionExerciseToEdit,
  handleDeleteSessionExercise,
}) => {
  const styles = useStyles();

  //Calcule la moyenne de temps de repos entre les sets qui pour l'instant est la meme pour tout les sets
  const rest_between_sets = sessionExercise.set.reduce(
    (acc, curr, _, arr) => (acc += curr.rest_between_sets / arr.length),
    0
  );

  return (
    <Box className={styles.card}>
      <Typography variant='h6'>{sessionExercise.exercise.name}</Typography>
      {sessionExercise.set.map((serie, idx) => (
        <Box
          key={idx}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography>
            Série {idx + 1} - Rep : <b>{serie.number_of_repetitions}</b>
          </Typography>
          <RatingDifficulty {...serie} />
        </Box>
      ))}

      {sessionExercise.load && sessionExercise.load !== 0 && (
        <Typography variant='body2'>
          Poids : <b>{sessionExercise.load} kg</b>
        </Typography>
      )}

      {sessionExercise.set.length > 0 && (
        <Typography variant='body2'>
          Repos entre les series:{' '}
          <b>{convertSecondsToRest(rest_between_sets)}</b>
        </Typography>
      )}
      {sessionExercise.rest_between_exercises && (
        <Typography variant='body2'>
          Repos final :{' '}
          <b>{convertSecondsToRest(sessionExercise.rest_between_exercises)}</b>
        </Typography>
      )}

      <Box className={styles.actionButtons}>
        <IconButton
          color='primary'
          onClick={() => handleSelectSessionExerciseToEdit(sessionExercise.id)}
          aria-label="Modifier l'exercice"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color='error'
          onClick={() => handleDeleteSessionExercise(sessionExercise.id)}
          aria-label="Supprimer l'exercice"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    position: 'relative',
  },
  actionButtons: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '8px',
  },
});

export default SessionExerciseCard;
