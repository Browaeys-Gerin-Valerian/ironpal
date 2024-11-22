import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import AddSessionModal from '../Modals/AddSessionModal';
import { DayCardProps } from '../../interfaces/props/DayCardProps';
import { useAuthProvider } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const DayCard: React.FC<DayCardProps> = ({ date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          backgroundColor: date.isSame(dayjs(), 'day')
            ? 'rgba(19, 170, 100, 0.4)'
            : '#f5f5f5',
          borderRadius: '8px',
          padding: 1,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant='caption'
          sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
        >
          {date.format('dddd')} {date.date()}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <IconButton
            size='small'
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              width: '32px',
              height: '32px',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
            onClick={user ? handleOpenModal : () => navigate("/login")}
          >
            <AddIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>

      <AddSessionModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={date.format('YYYY-MM-DD')} // Format attendu
      />
    </>
  );
};

export default DayCard;
