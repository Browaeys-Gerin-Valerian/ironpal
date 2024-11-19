import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AddSessionModalProps } from '../../utils/interfaces/components/props/AddSessionModalProps';

const AddSessionModal: React.FC<AddSessionModalProps> = ({ open, onClose, selectedDate }) => {
  const [sessionName, setSessionName] = useState<string>('');
  const navigate = useNavigate();

  const dayjsDate = dayjs(selectedDate); // Convertir la date en dayjs si elle est une chaîne

  const formattedDate = dayjsDate.format('YYYY-MM-DD'); // Format de la date pour l'URL

  const handleSave = () => {
    if (sessionName.trim()) {
      navigate(`/session?name=${encodeURIComponent(sessionName)}&date=${encodeURIComponent(formattedDate)}`);
      onClose();
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
          Créer une session pour le <br /><b>{dayjsDate.format('dddd D MMMM')}</b> {/* Format la date pour l'affichage */}
        </Typography>
        <TextField
          fullWidth
          label="Nom de la session"
          variant="outlined"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
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
            disabled={!sessionName.trim()}
          >
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSessionModal;
