import React from 'react';
import { useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import RatingDifficulty from '../RatingDifficulty';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/data/session_exercise/SessionExercise';
import { convertSecondsToRest } from '../../utils/functions/time';
import { colorPrimary } from '../../styles/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmationDialog from '../ConfirmationDialog';

const useStyles = makeStyles({
  card: {
    // padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    position: 'relative',
    backgroundColor: '#efefef',
    '&.validated': {
      borderColor: colorPrimary,
      borderWidth: '2px',
    },
    '& b': {
      fontSize: '120% !important',
      marginLeft: '5px',
    },
  },
  seriesTitle: {
    padding: '5px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid' + colorPrimary,
    '& span': {
      fontSize: '14px !important',
      color: 'grey',
    },
  },
  series: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '10px 20px',
  },
  actionButtons: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    padding: '0px 20px',
    justifyContent: 'space-between',
    '&.validated': {
      justifyContent: 'flex-end',
    },
  },
  toggleButton: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ddd' ,
    borderRadius: '0px 0px 15px 15px',
    '&.validated': {
      backgroundColor: colorPrimary,
    },
    '& button': {
      width: '100%',
      textTransform: 'uppercase',
      borderRadius: '0px 0px 15px 15px !important',
    },
    '& button:hover': {
      BoxShadow: 'none !important',
      backgroundColor: 'none !important',
      borderRadius: '0px 0px 15px 15px !important',
    },
  },
});

interface SessionExerciseCardProps {
  handleSelectSessionExerciseToEdit: (id: number) => void;
  handleDeleteSessionExercise: (id: number) => void;
  sessionExercise: SessionExerciseWithExerciseAndSets;
}

const ExerciseCard: React.FC<SessionExerciseCardProps> = ({
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


  const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleValidate = () => {
    setIsValidated(true);
    setIsValidateDialogOpen(false);
  };

  const handleDelete = () => {
    handleDeleteSessionExercise(sessionExercise.id);
    setIsDeleteDialogOpen(false);
  };


  return (
    <Box className={`${styles.card} ${isValidated ? 'validated' : ''}`}>
      <Typography  sx={{ fontSize: '1.4rem !important', marginBottom: '20px', padding: '20px 20px 0px 20px' }}  variant='h6'>
        {sessionExercise.exercise.name}
      </Typography>
      {isExpanded && (
        <>
          <Box className={styles.seriesTitle}>
            <Typography> Séries </Typography>
            <Typography> Facilité ? </Typography>
          </Box>
          {sessionExercise.set.map((serie, idx) => (
            <Box key={idx} className={styles.series}>
              <Typography>
                Série {idx + 1} - Reps : <b>{serie.number_of_repetitions}</b>
              </Typography>
              <RatingDifficulty {...serie} />
            </Box>
          ))}
          {sessionExercise.load && sessionExercise.load !== 0 && (
            <Typography variant='body2' sx={{ marginTop: '20px', padding: '0px 20px' }}>
              Poids : <b>{sessionExercise.load} kg</b>
            </Typography>
          )}
          {rest_between_sets > 0 && (
            <Typography
              variant="body2"
              sx={{ marginTop: '20px', padding: '0 20px' }}
            >
              Repos entre : <b>{convertSecondsToRest(rest_between_sets)}</b>
            </Typography>
          )}

          {sessionExercise.rest_between_exercises > 0 && (
            <Typography
              variant="body2"
              sx={{ marginTop: '20px', padding: '0 20px' }}
            >
              Repos final : <b>{convertSecondsToRest(sessionExercise.rest_between_exercises)}</b>
            </Typography>
          )}
        </>
      )}

    <Box className={`${styles.actionButtons} ${isValidated ? 'validated' : ''}`}>
      {!isValidated && (
        <Box>
          <IconButton
            color='primary'
            onClick={() => handleSelectSessionExerciseToEdit(sessionExercise.id)}
            aria-label="Modifier l'exercice"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => setIsDeleteDialogOpen(true)}
            aria-label="Supprimer l'exercice"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      {!isValidated && (
        <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsValidateDialogOpen(true)}
        >
          Exercice validé
        </Button>
      )}
      {isValidated && (
          <Typography
            variant="body2"
            sx={{
              justifyContent: 'flex-end',
              marginTop: '20px',
              color: colorPrimary,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Exercice validé &nbsp; <CheckCircleIcon />
          </Typography>
        )}
    </Box>

    <Box className={`${styles.toggleButton} ${isValidated ? 'validated' : ''}`}>
      <Button variant="text" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Cacher -' : 'Détails +'}
      </Button>
    </Box>

    {/* Dialog for validation */}
    <ConfirmationDialog
      open={isValidateDialogOpen}
      title="Confirmation"
      message="Es-tu sûr de vouloir valider cet exercice ?"
      onConfirm={handleValidate}
      onCancel={() => setIsValidateDialogOpen(false)}
    />

    {/* Dialog for deletion */}
    <ConfirmationDialog
      open={isDeleteDialogOpen}
      title="Confirmation"
      message="Es-tu sûr de vouloir supprimer cet exercice ?"
      onConfirm={handleDelete}
      onCancel={() => setIsDeleteDialogOpen(false)}
    />
    
    </Box>
  );
};

export default ExerciseCard;
