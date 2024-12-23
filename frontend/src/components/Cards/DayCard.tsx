import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import AddSessionModal from '../Modals/AddSessionModal';
import { useAuthProvider } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { colorPrimary } from '../../styles/theme';
import {
  Session,
  SessionWithExercises,
} from '../../interfaces/entities/Session';

export interface DayCardProps {
  date: dayjs.Dayjs;
  session: SessionWithExercises | Session | undefined;
}

const DayCard = ({ date, session }: DayCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthProvider();
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isPast = dayjs().isAfter(date, 'day');
  const isToday = date.isSame(dayjs(), 'day');

  return (
    <>
      <Box
        onClick={() => {
          if (session?.id) {
            navigate(`/session/${session.id}`);
          } else if (user) {
            if (!session?.id && !isPast) {
              handleOpenModal();
            }
          } else {
            navigate('/login');
          }
        }}
        sx={{
          position: 'relative',
          border: '1px solid #ddd',
          height: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          color: date.isSame(dayjs(), 'day') ? 'primary.main' : 'text.primary',
          backgroundColor: isToday
            ? 'rgba(19, 170, 100, 0.2)'
            : isPast
            ? '#E0E0E0'
            : '#F5F5F5',
          opacity: isPast ? 0.5 : 1,
          borderRadius: '8px',
          padding: 1,
          boxSizing: 'border-box',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            cursor: 'pointer',
            border: '1px solid' + colorPrimary,
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <Typography
          variant='caption'
          sx={{ fontWeight: '500', marginBottom: 0.5 }}
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
          {session ? (
            <Typography
              variant='caption'
              sx={{
                fontWeight: '600',
                marginBottom: 0.5,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                lineHeight: '1.5rem',
                color: isToday ? 'primary.main' : 'black',
              }}
              onClick={
                user
                  ? () => navigate(`/session/${session.id}`)
                  : () => navigate('/login')
              }
            >
              {session.title}
            </Typography>
          ) : (
            <IconButton
              size='medium'
              sx={{
                display: isPast ? 'none' : 'flex',
                backgroundColor: 'primary.main',
                color: 'white',
                width: '40px',
                height: '40px',
                '&:hover': { backgroundColor: 'primary.main' },
              }}
              onClick={user ? handleOpenModal : () => navigate('/login')}
            >
              <AddIcon fontSize='medium' />
            </IconButton>
          )}
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
