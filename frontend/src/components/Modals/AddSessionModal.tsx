import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import CREATEsession from '../../api/services/sessions/CREATEsession';
import { AddSessionModalProps } from '../../utils/interfaces/components/props/AddSessionModalProps';

dayjs.locale('fr');

const AddSessionModal: React.FC<AddSessionModalProps> = ({ open, onClose, selectedDate }) => {
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
      console.log("Session créée:", response);
      navigate(`/session/${response.id}`);
      onClose();
    } catch (error: any) {
      console.error("Error creating session:", error);
      setError(error.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSessionSave(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="day-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="day-modal-title" variant="h6" component="h2" gutterBottom>
          Créer une session pour le <br />
          <b>{dayjsDate.format('dddd D MMMM')}</b>
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Nom de la session"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={sessionSave || !title.trim()}
          >
            {sessionSave ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSessionModal;
