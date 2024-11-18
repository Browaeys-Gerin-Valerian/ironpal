import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddSessionModalProps } from '../../utils/interfaces/components/props/AddSessionModalProps';

const AddSessionModal: React.FC<AddSessionModalProps> = ({ open, onClose, selectedDate }) => {
  const [sessionName, setSessionName] = useState<string>('');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSave = () => {
    if (sessionName.trim()) {
      navigate(`/session?name=${encodeURIComponent(sessionName)}`);
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
        Créer une session pour le <br /><b>{selectedDate}</b>
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
