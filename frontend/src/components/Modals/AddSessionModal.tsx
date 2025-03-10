import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { useAuthProvider } from '../../context/authContext';
import { createSession } from '../../api/services/sessions';

dayjs.locale('fr');

export interface AddSessionModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
}

const AddSessionModal = ({
  open,
  onClose,
  selectedDate,
}: AddSessionModalProps) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const { user } = useAuthProvider();

  if (!user) {
    navigate('/login');
  }

  const [title, setTitle] = useState<string>('');
  const [sessionSave, setSessionSave] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dayjsDate = dayjs(selectedDate);
  const session_date = dayjsDate.format('YYYY-MM-DD'); // Formater la date

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSessionSave(true);
    setError(null);

    try {
      const response = await createSession(user?.id as number, {
        title,
        session_date,
      });
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

  // RGAA Touche Entrée pour se connecter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave(e as any);
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
          Créer une séance pour le :<br />
          <b>{dayjsDate.format('dddd D MMMM')}</b>
        </Typography>
        {error && (
          <Typography color='error' sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label='Nom de la séance'
          variant='outlined'
          value={title}
          onKeyDown={handleKeyPress}
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

export default AddSessionModal;
