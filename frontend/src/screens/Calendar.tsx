import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, Button, useMediaQuery, useTheme, SelectChangeEvent, Container, Grid2 as Grid } from '@mui/material'; // Utilisation de Grid2
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/fr';
dayjs.locale('fr');
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
  },
});

const Calendar: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

  // Fonction pour générer les jours du mois
  const generateDaysInMonth = (year: number, month: number) => {
    const startOfMonth = dayjs().year(year).month(month).startOf('month');
    const endOfMonth = dayjs().year(year).month(month).endOf('month');
    const today = dayjs().startOf('day');

    const days = [];
    let day = startOfMonth;

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
      if (day.isSame(today, 'day') || day.isAfter(today)) {
        days.push(day);
      }
      day = day.add(1, 'day');
    }
    return days;
  };

  const daysInMonth = generateDaysInMonth(selectedYear, selectedMonth);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
  };

  // Fonction pour passer au mois suivant
  const handleNextMonth = () => {
    const newDate = dayjs().year(selectedYear).month(selectedMonth).add(1, 'month');
    setSelectedMonth(newDate.month());
    setSelectedYear(newDate.year());
  };

  // Fonction pour passer au mois précédent
  const handlePreviousMonth = () => {
    const newDate = dayjs().year(selectedYear).month(selectedMonth).subtract(1, 'month');
    setSelectedMonth(newDate.month());
    setSelectedYear(newDate.year());
  };

  const currentMonth = dayjs().month(); // Récupérer le mois actuel
  const currentYear = dayjs().year(); // Récupérer l'année actuelle

  return (
    <Box className={styles.root}>
      <Container>
        {/* Titre et Sélecteurs */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                marginBottom: 6,
                marginTop: 4,
              }}
            >
              <Typography variant="h1" style={{ margin: 0 }}>Mon calendrier</Typography>

              {/* Sélecteur du mois */}
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel id="month-select-label">Mois</InputLabel>
                <Select
                  labelId="month-select-label"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Mois"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem
                      key={i}
                      value={i}
                      disabled={selectedYear === currentYear && i < currentMonth}
                    >
                      {dayjs().month(i).format('MMMM')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sélecteur de l'année */}
              <FormControl variant="outlined" sx={{ minWidth: 100 }}>
                <InputLabel id="year-select-label">Année</InputLabel>
                <Select
                  labelId="year-select-label"
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Année"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <MenuItem key={i} value={currentYear + i}>
                      {currentYear + i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Conteneur du Calendrier */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)', // Toujours 5 jours par ligne
                  gap: 2,
                  width: '100%',
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
                        onClick={() => console.log(`Add event on ${date.format('YYYY-MM-DD')}`)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
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

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextMonth}
                >
                  {isMobile ? 'Suivant' : 'Passer au mois suivant'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Calendar;
