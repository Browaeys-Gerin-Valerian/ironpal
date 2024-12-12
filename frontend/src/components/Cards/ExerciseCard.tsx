import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Modal, LinearProgress, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import RatingDifficulty from '../RatingDifficulty';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/data/session_exercise/SessionExercise';
import { convertSecondsToRest } from '../../utils/functions/time';
import { colorPrimary } from '../../styles/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConfirmationDialog from '../ConfirmationDialog';
import { PUTsessionExercise } from '../../api/services/session_exercise/PUT';
import { useSnackbar } from '../../context/snackbarContext';

const useStyles = makeStyles({
  card: {
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
  titleCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  actionButtonsContain: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  toggleButton: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ddd',
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
      boxShadow: 'none !important',
      backgroundColor: 'none !important',
      borderRadius: '0px 0px 15px 15px !important',
    },
  },
  modal: {
    overflowY: 'auto',
    height: '100%',
  },
  box: {
    maxHeight: '100vh',
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

interface SessionExerciseCardProps {
  handleSelectSessionExerciseToEdit: (id: number) => void;
  handleDeleteSessionExercise: (id: number) => void;
  sessionExercise: SessionExerciseWithExerciseAndSets;
  id: string;
  onExerciseValidated: () => void;
}

const ExerciseCard: React.FC<SessionExerciseCardProps> = ({
  sessionExercise,
  handleSelectSessionExerciseToEdit,
  handleDeleteSessionExercise,
  id,
  onExerciseValidated,
}) => {
  const styles = useStyles();
  const { showSnackbar } = useSnackbar(); // Use the useSnackbar hook

  const rest_between_sets = sessionExercise.set.reduce(
    (acc, curr, _, arr) => (acc += curr.rest_between_sets / arr.length),
    0
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isValidateDialogOpen, setIsValidateDialogOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(sessionExercise.validated || false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [averageDifficulty, setAverageDifficulty] = useState<number | null>(null);
  const [difficultyRatings, setDifficultyRatings] = useState(
    sessionExercise.set.map((set) => set.difficulty)
  );


  // RATING DIFFICULTY
  const averageRating = (): number => {
    const ratings = difficultyRatings;
    const average = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    return average;
  };

  useEffect(() => {
    if (isValidated) {
      setAverageDifficulty(averageRating());
    }
  }, [isValidated, difficultyRatings]);

  const getDifficultyText = (averageDifficulty: number): string => {
    if (averageDifficulty < 1.5) return 'Trop difficile !';
    if (averageDifficulty < 2.5) return 'Difficile';
    if (averageDifficulty < 3.5) return 'Moyen';
    if (averageDifficulty < 4.5) return 'Facile';
    return 'Trop facile !';
  };
  
// SESSION_EXERCICE VALIDATION
  const handleValidate = async () => {
    try {
      const payload = {
        session_id: parseInt(id),
        exercise_id: sessionExercise.exercise.id,
        load: sessionExercise.load,
        rest_between_exercises: String(sessionExercise.rest_between_exercises),
        sets: sessionExercise.set.map((set, index) => ({
          ...set,
          rest_between_sets: String(set.rest_between_sets),
          difficulty: difficultyRatings[index],
        })),
        validated: true,
      };

      const updateResponse = await PUTsessionExercise(sessionExercise.id, payload);

      if (updateResponse.status === 200) {
        setIsValidated(true);
        showSnackbar('Bravo ! Tu as fini cet exercice !', 'success');
        // Appeler la fonction depuis le parent
        onExerciseValidated();
      } else {
        showSnackbar(
          "Une erreur s'est produite lors de la validation de l'exercice.",
          'error'
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’exercice :', error);
      showSnackbar(
        "Impossible de valider l'exercice. Vérifiez votre connexion.",
        'error'
      );
    }
  };

  const handleDelete = () => {
    handleDeleteSessionExercise(sessionExercise.id);
    setIsDeleteDialogOpen(false);
  };

  const openDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };
  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  const handleDifficultyChange = (index: number, value: number) => {
    const newRatings = [...difficultyRatings];
    newRatings[index] = value;
    setDifficultyRatings(newRatings);
  };

  return (
    <Box className={`${styles.card} ${isValidated ? 'validated' : ''}`}>
      <Box className={styles.titleCard}>
        <Typography sx={{ fontSize: '1.4rem !important', marginBottom: '20px', padding: '20px 20px 0px 20px' }} variant='h6'>
          {sessionExercise.exercise.name}
        </Typography>
        <IconButton onClick={openDescriptionModal}>
          <InfoIcon sx={{ color: 'grey' }} />
        </IconButton>
      </Box>
      {isExpanded && (
        <>
          <Box className={styles.seriesTitle}>
            <Typography> Séries </Typography>
            <Typography> Facilité ? </Typography>
          </Box>
          {sessionExercise.set.map((serie, idx) => (
            <Box key={idx} className={styles.series}>
              <Typography>
                S{idx + 1} - Reps : <b>{serie.number_of_repetitions}</b>
              </Typography>
              <RatingDifficulty
                {...serie}
                onChange={(value) => handleDifficultyChange(idx, value)}
              />
            </Box>
          ))}
          {sessionExercise.load > 0 && (
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
          <Box className={styles.actionButtonsContain}>
            <IconButton
              color='primary'
              onClick={() => handleSelectSessionExerciseToEdit(sessionExercise.id)}
              aria-label="Modifier l'exercice"
            >
              <EditIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="primary"
              sx={{ padding: '7px 40px !important' }}
              onClick={() => setIsValidateDialogOpen(true)}
            >
              Exercice validé
            </Button>
            <IconButton
              color='error'
              onClick={() => setIsDeleteDialogOpen(true)}
              aria-label="Supprimer l'exercice"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        {isValidated && (
          <Box className={styles.footerCard}>
            {averageDifficulty !== null && averageDifficulty > 0.5 &&(
              <Box sx={{ display: 'flex', border: '1px solid' + colorPrimary, borderRadius: '0 0 15px 0', overflow:"hidden", alignItems: 'center', gap: 2, width: '100%' }}>
              <LinearProgress
                variant="determinate"
                value={averageDifficulty * 20} // Ajustez cette valeur pour modifier le remplissage
                color="primary"
                sx={{ flexGrow: 1, height: 25, background: "transparent"}} // Styles personnalisés pour la barre
              />
              <Typography
                sx={{
                  position: 'absolute',
                  fontWeight: '400',
                  color: 'grey',
                  marginLeft: '5px',
                }}
              >
                {averageDifficulty !== null && getDifficultyText(averageDifficulty)}
              </Typography>
            </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                justifyContent: 'flex-end',
                marginTop: '20px',
                color: colorPrimary,
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                width: '100%',
                textAlign: 'center',
              }}
            >
              {isMobile ? 'Validé' : 'Exercice validé'} &nbsp; <CheckCircleIcon />
            </Typography>
          </Box>
        )}
      </Box>

      <Box className={`${styles.toggleButton} ${isValidated ? 'validated' : ''}`}>
        <Button variant="text" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </Box>

      {/* Dialog for validation */}
      <ConfirmationDialog
        open={isValidateDialogOpen}
        title="Exercice validé ?"
        icon={<CheckCircleIcon style={{ color: colorPrimary }} />}
        message="Es-tu sûr de vouloir valider cet exercice ? <br/>Cette action est irréversible."
        onConfirm={async () => {
          await handleValidate();
          setIsValidateDialogOpen(false);
        }}
        onCancel={() => setIsValidateDialogOpen(false)}
      />

      {/* Dialog for deletion */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Supprimer l'exercice ?"
        icon={<DeleteIcon color='error' />}
        message="Es-tu sûr de vouloir supprimer cet exercice ?"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />

      {/* Modal */}
      <Modal
        open={isDescriptionModalOpen}
        onClose={closeDescriptionModal}
        aria-labelledby="modal-title"
        className={styles.modal}
      >
        <Box className={styles.box}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ marginBottom: '10px' }}
          >
            {sessionExercise.exercise.name}
          </Typography>
          <IconButton
            onClick={closeDescriptionModal}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'grey' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography>
            {sessionExercise.exercise.description}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ExerciseCard;
