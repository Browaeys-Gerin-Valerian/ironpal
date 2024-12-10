import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import CREATEsession from '../../api/services/sessions/CREATEsession';
import { AddSessionModalProps } from '../../interfaces/props/AddSessionModalProps';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) => ({
  box: {
    // maxHeight: '100vh',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: '100%',
    // border: '2px solid' + colorPrimary,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
    },
  },
}));

dayjs.locale('fr');

const AddSessionModal: React.FC<AddSessionModalProps> = ({
  open,
  onClose,
  selectedDate,
}) => {
  const styles = useStyles();

  const [title, setTitle] = useState<string>('');
  const [sessionSave, setSessionSave] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const dayjsDate = dayjs(selectedDate);
  const session_date = dayjsDate.format('YYYY-MM-DD'); // Formater la date

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSessionSave(true);
    setError(null);

    try {
      const response = await CREATEsession({ title, session_date });
      navigate(`/session/${response.id}`);
      onClose();
    } catch (error: any) {
      console.error('Error creating session:', error);
      setError(
        error.message || "Une erreur s'est produite. Veuillez réessayer."
      );
    } finally {
      setSessionSave(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='day-modal-title'>
      <Box className={styles.box}>
        <Typography
          id='day-modal-title'
          variant='h6'
          component='h2'
          gutterBottom
          sx={{ fontWeight: 300 }}
        >
          Créer une session pour le :<br />
          <b>{dayjsDate.format('dddd D MMMM')}</b>
        </Typography>
        {error && (
          <Typography color='error' sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label='Nom de la session'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} color='secondary' variant='outlined'>
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            color='primary'
            variant='contained'
            disabled={sessionSave || !title.trim()}
          >
            {sessionSave ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSessionModal;
