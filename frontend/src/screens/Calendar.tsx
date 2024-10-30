// frontend/src/screens/Calendar.tsx

import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Button, useMediaQuery, useTheme, SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/fr';
dayjs.locale('fr');
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
})

const Calendar: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());
  
  // Fonction pour générer les jours du mois
  const generateDaysInMonth = (month: Dayjs) => {
    const startOfMonth = month.startOf('month');
    const endOfMonth = month.endOf('month');

    const days = [];
    let day = startOfMonth;

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
      days.push(day);
      day = day.add(1, 'day');
    }
    return days;
  };

  const daysInMonth = generateDaysInMonth(selectedMonth);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    const newMonth = dayjs().month(Number(event.target.value));
    setSelectedMonth(newMonth);
  };

  // Fonction pour passer au mois suivant
  const handleNextMonth = () => {
    setSelectedMonth(selectedMonth.add(1, 'month'));
  };

  // Fonction pour passer au mois précédent
  const handlePreviousMonth = () => {
    setSelectedMonth(selectedMonth.subtract(1, 'month'));
  };

  return (
    <Box className={styles.root}>
      {/* Conteneur du Titre et Sélecteur */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: 2, // Espace réduit entre le titre et le sélecteur
          width: '100%', 
          maxWidth: '1200px', 
          marginBottom: 6, // Augmentation de l'espace sous le titre et sélecteur
          marginTop: 4 
        }}
      > 
        {/* Titre aligné à gauche */}
        <Typography variant="h1" style={{ margin: 0 }}>Mon calendrier</Typography> {/* Utilisez un <h1> pour appliquer la même typographie que dans Home.tsx */}

        {/* Sélecteur du mois rapproché du titre */}
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="month-select-label">Mois</InputLabel>
          <Select
            labelId="month-select-label"
            value={selectedMonth.month()}
            onChange={handleMonthChange}
            label="Mois"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {dayjs().month(i).format('MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Conteneur du Calendrier (centré) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6, // Augmentation de l'espace entre le titre/sélecteur et le calendrier
          maxWidth: 800,
          margin: '0 auto',
          marginTop: 10,
          marginBottom: 10, // Espace supplémentaire entre le calendrier et les boutons suivant/précédent
        }}
      >
        {/* Calendrier */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            justifyContent: 'center',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(7, 1fr)',
          }}
        >
          {daysInMonth.map((date, index) => (
            <Box
              key={index}
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
              {/* Affichage du jour et de la date */}
              <Typography variant="caption" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                {date.format('dddd')} {date.date()}
              </Typography>

              {/* Bouton "+" centré dans la case */}
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
                  onClick={() => console.log(`Add event on ${date.format('YYYY-MM-DD')}`)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Boutons pour passer au mois suivant et au mois précédent */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}> {/* Ajout de marginTop pour séparer les boutons du calendrier */}
          {/* Bouton pour passer au mois précédent */}
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(19, 220, 148, 0.1)',
                borderColor: 'primary.main',
              },
            }}
            onClick={handlePreviousMonth}
          >
            {isMobile ? 'Précédent' : 'Passer au mois précédent'}
          </Button>

          {/* Bouton pour passer au mois suivant */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextMonth}
          >
            {isMobile ? 'Suivant' : 'Passer au mois suivant'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
