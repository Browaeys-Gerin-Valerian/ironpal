import React from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme, Grid2 as Grid } from '@mui/material';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';

const WeekDays: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect mobile devices based on breakpoints

  // Function to generate the current week's days
  const generateDaysOfWeek = () => {
    const startOfWeek = dayjs().startOf('week');
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, 'day'));
    }
    return days;
  };

  const daysOfWeek = generateDaysOfWeek();

  // Function to handle the "Add event" button click
  const handleAddEvent = (date: string) => {
    console.log(`Add event on ${date}`);
    // You can add your logic for adding an event here.
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid container spacing={2} sx={{ gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(7, 1fr)', display: 'grid' }}>
        {daysOfWeek.map((day, index) => (
          <Grid key={index}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid #ddd',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                color: day.isSame(dayjs(), 'day') ? 'primary.main' : 'text.primary',
                backgroundColor: day.isSame(dayjs(), 'day') ? 'rgba(19, 170, 100, 0.4)' : '#f5f5f5',
                borderRadius: '8px',
                padding: 1,
                boxSizing: 'border-box',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                {day.format('dddd')} {day.date()}
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
                  onClick={() => handleAddEvent(day.format('YYYY-MM-DD'))}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default WeekDays;
