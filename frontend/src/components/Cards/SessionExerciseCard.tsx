import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { SessionExerciseWithExerciseAndSets } from '../../interfaces/entities/SessionExercise';
import RatingDifficulty from '../Features/RatingDifficulty';
import { convertSecondsToRest } from '../../utils/functions/date';
import { colorPrimary } from '../../styles/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ConfirmationDialog from '../Modals/ConfirmationDialog';
import { useSnackbar } from '../../context/snackbarContext';
import { Theme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { updateSessionExercise } from '../../api/services/sessionExercises';
import { useSessionProvider } from '../../context/sessionContext';
import { getAverageValue } from '../../utils/functions/array';

interface SessionExerciseCardProps {
  sessionExercise: SessionExerciseWithExerciseAndSets;
  handleOpenModal: () => void;
}

const SessionExerciseCard = ({
  sessionExercise,
  handleOpenModal,
}: SessionExerciseCardProps) => {
  const { id } = useParams();
  const styles = useStyles();
  const { showSnackbar } = useSnackbar();
  const {
    session,
    handleSelectSessionExerciseToEdit,
    handleUpdateSessionExercise,
    handleDeleteSessionExercise,
  } = useSessionProvider();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isExpanded, setIsExpanded] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const rest_between_sets = sessionExercise.sets.reduce(
    (acc, curr, _, arr) => (acc += curr.rest_between_sets / arr.length),
    0
  );

  const averageDifficulty = useMemo(
    () => getAverageValue(sessionExercise.sets.map((set) => set.difficulty)),
    [session]
  );

  const getDifficultyText = (averageDifficulty: number): string => {
    if (averageDifficulty < 1.5) return 'Trop facile !';
    if (averageDifficulty < 2.5) return 'Facile';
    if (averageDifficulty < 3.5) return 'Moyen';
    if (averageDifficulty < 4.5) return 'Difficile';
    return 'Trop difficile !';
  };

  const openSelectSessionExerciseToEdit = (sessionExerciseId: number) => {
    handleSelectSessionExerciseToEdit(sessionExerciseId);
    handleOpenModal();
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

  const handleValidate = async () => {
    try {
      const payload = {
        exercise_id: sessionExercise.exercise.id,
        load: sessionExercise.load,
        rest_between_exercises: Number(sessionExercise.rest_between_exercises),
        validated: true,
        sets: sessionExercise.sets.map((set) => ({
          ...set,
          rest_between_sets: Number(set.rest_between_sets),
          difficulty: set.difficulty,
        })),
      };

      const updateResponse = await updateSessionExercise(
        Number(id as string),
        sessionExercise.id,
        payload
      );

      if (updateResponse.status === 200) {
        showSnackbar('Bravo ! Tu as fini cet exercice !', 'success');
        handleUpdateSessionExercise(updateResponse.data);
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

  return (
    <Box
      className={`${styles.card} ${
        sessionExercise.validated ? 'validated' : ''
      }`}
    >
      <Box className={styles.titleCard}>
        <Typography
          sx={{
            fontSize: '1.4rem !important',
            marginBottom: '20px',
            padding: '20px 20px 0px 20px',
          }}
          variant='h6'
        >
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
            <Typography> Difficulté ? </Typography>
          </Box>
          {sessionExercise.sets.map((set) => (
            <Box key={set.id} className={styles.series}>
              <Typography>
                S{sessionExercise.sets.findIndex((s) => s.id === set.id) + 1} -
                Reps : <b>{set.number_of_repetitions}</b>
              </Typography>
              <RatingDifficulty
                {...set}
                isValidated={sessionExercise.validated}
              />
            </Box>
          ))}
          {sessionExercise.load > 0 && (
            <Typography
              variant='body2'
              sx={{ marginTop: '20px', padding: '0px 20px' }}
            >
              Poids : <b>{sessionExercise.load} kg</b>
            </Typography>
          )}
          {rest_between_sets > 0 && (
            <Typography
              variant='body2'
              sx={{ marginTop: '20px', padding: '0 20px' }}
            >
              Repos entre : <b>{convertSecondsToRest(rest_between_sets)}</b>
            </Typography>
          )}

          {sessionExercise.rest_between_exercises > 0 && (
            <Typography
              variant='body2'
              sx={{ marginTop: '20px', padding: '0 20px' }}
            >
              Repos final :{' '}
              <b>
                {convertSecondsToRest(sessionExercise.rest_between_exercises)}
              </b>
            </Typography>
          )}
        </>
      )}

      <Box
        className={`${styles.actionButtons} ${
          sessionExercise.validated ? 'validated' : ''
        }`}
      >
        {!sessionExercise.validated && (
          <Box className={styles.actionButtonsContain}>
            <IconButton
              color='primary'
              onClick={() =>
                openSelectSessionExerciseToEdit(sessionExercise.id)
              }
              aria-label="Modifier l'exercice"
            >
              <EditIcon />
            </IconButton>
            <Button
              variant='outlined'
              color='primary'
              sx={{ padding: '7px 40px !important' }}
              onClick={handleValidate}
            >
              Valider l'exercice
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
        {sessionExercise.validated && (
          <Box className={styles.footerCard}>
            <Box
              sx={{
                display: 'flex',
                border: '1px solid' + colorPrimary,
                borderRadius: '0 0 15px 0',
                overflow: 'hidden',
                alignItems: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              <LinearProgress
                variant='determinate'
                value={averageDifficulty * 20} // Ajustez cette valeur pour modifier le remplissage
                color='primary'
                sx={{ flexGrow: 1, height: 25, background: 'transparent' }} // Styles personnalisés pour la barre
              />
              <Typography
                sx={{
                  position: 'absolute',
                  fontWeight: '400',
                  color: 'grey',
                  marginLeft: '5px',
                }}
              >
                {getDifficultyText(averageDifficulty)}
              </Typography>
            </Box>

            <Typography
              variant='body2'
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
              {isMobile ? 'Validé' : 'Exercice validé'} &nbsp;{' '}
              <CheckCircleIcon />
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        className={`${styles.toggleButton} ${
          sessionExercise.validated ? 'validated' : ''
        }`}
      >
        <Button variant='text' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </Box>
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Supprimer l'exercice ?"
        icon={<DeleteIcon color='error' />}
        message='Es-tu sûr de vouloir supprimer cet exercice ?'
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />

      <Modal
        open={isDescriptionModalOpen}
        onClose={closeDescriptionModal}
        aria-labelledby='modal-title'
        className={styles.modal}
      >
        <Box className={styles.box}>
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            gutterBottom
            sx={{ marginBottom: '10px', paddingRight: '20px' }}
          >
            {sessionExercise.exercise.name}
          </Typography>
          <IconButton
            onClick={closeDescriptionModal}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'grey' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography>{sessionExercise.exercise.description}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
      backgroundColor: 'transparent !important',
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
    width: 600,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%',
    },
  },
  footerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}));

export default SessionExerciseCard;
