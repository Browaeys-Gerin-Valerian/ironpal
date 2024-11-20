import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { ExerciseCardProps } from '../../utils/interfaces/components/props/ExerciseCardProps';
import RatingDifficulty from '../RatingDifficulty';

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

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onEditExercise, onDeleteExercise }) => {
  const styles = useStyles();

  const [ratings, setRatings] = useState<number[]>(exercise.series.map(() => 0)); // Initialize ratings based on the number of series


  // Fonction pour mettre à jour la note d'une série
  const handleRatingChange = (idx: number, newRating: number) => {
    const newRatings = [...ratings];
    newRatings[idx] = newRating;
    setRatings(newRatings);
  };

  return (
    <Box className={styles.card}>
      <Typography variant="h6">{exercise.exerciseName}</Typography>
      {exercise.series.map((serie, idx) => (
        <Box key={idx} display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            Série {idx + 1} - Rep : <b>{serie.repetitions}</b>
          </Typography>
          <RatingDifficulty
            rating={ratings[idx]}
            onChange={(newRating) => handleRatingChange(idx, newRating)}
          />
        </Box>
      ))}

      {exercise.weight && exercise.weight !== 0 && (
        <Typography variant="body2">Poids : <b>{exercise.weight} kg</b></Typography>
      )}
      
      {exercise.restTime && exercise.restTime !== '' && (
        <Typography variant="body2">Repos entre : <b>{exercise.restTime}</b></Typography>
      )}
      {exercise.restTimeFinal && exercise.restTimeFinal !== '' && (
        <Typography variant="body2">Repos final : <b>{exercise.restTimeFinal}</b></Typography>
      )}

      <Box className={styles.actionButtons}>
        <IconButton
          color="primary"
          onClick={() => onEditExercise(exercise)}
          aria-label="Modifier l'exercice"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onDeleteExercise(exercise)}
          aria-label="Supprimer l'exercice"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExerciseCard;
