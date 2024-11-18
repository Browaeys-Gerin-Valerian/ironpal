import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { ExerciseCardProps } from '../../utils/interfaces/components/props/ExerciseCardProps';

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

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onEditExercise,
  onDeleteExercise,
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.card}>
      <Typography variant='h6'>{exercise.exerciseName}</Typography>
      {exercise.series.map((serie, idx) => (
        <Typography key={idx}>
          Série {idx + 1} - Reps : <b>{serie.repetitions}</b> <br />
        </Typography>
      ))}
      <Box className={styles.actionButtons}>
        <IconButton color='primary' onClick={() => onEditExercise(exercise)}>
          <EditIcon />
        </IconButton>
        <IconButton color='error' onClick={() => onDeleteExercise(exercise)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExerciseCard;
