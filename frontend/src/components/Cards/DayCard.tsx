import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DayCardProps } from '../../interfaces/props/DayCardProps';

const DayCard: React.FC<DayCardProps> = ({ date }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  // Fonction pour gérer le clic sur le bouton "+"
  const handleAddEvent = () => {
    if (!isAuthenticated()) {
      // navigate('/login');
      navigate('/session');
    } else {
      console.log(`Add event on ${date.format('YYYY-MM-DD')}`);
      navigate('/session');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #ddd',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        color: date.isSame(dayjs(), 'day') ? 'primary.main' : 'text.primary',
        backgroundColor: date.isSame(dayjs(), 'day') ? 'rgba(19, 170, 100, 0.4)' : '#f5f5f5',
        borderRadius: '8px',
        padding: 1,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
        {date.format('dddd')} {date.date()}
      </Typography>

      <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <IconButton
          size="small"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            width: '32px',
            height: '32px',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
          onClick={handleAddEvent}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DayCard;
