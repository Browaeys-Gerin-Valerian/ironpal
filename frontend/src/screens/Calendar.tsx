import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
  Container,
  Grid2 as Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');
import { makeStyles } from '@mui/styles';
import { colorPrimary } from '../styles/theme';
import DayCard from '../components/Cards/DayCard';

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',

    '& h1 b': { 
      color: colorPrimary + ' !important',
      fontWeight: 400,
    },
  },
});

const Calendar: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State pour gérer le mois et l'année sélectionnés
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

  const handleNextMonth = () => {
    const newDate = dayjs()
      .year(selectedYear)
      .month(selectedMonth)
      .add(1, 'month');
    setSelectedMonth(newDate.month());
    setSelectedYear(newDate.year());
  };

  // const handlePreviousMonth = () => {
  //   const newDate = dayjs()
  //     .year(selectedYear)
  //     .month(selectedMonth)
  //     .subtract(1, 'month');
  //   setSelectedMonth(newDate.month());
  //   setSelectedYear(newDate.year());
  // };

  return (
    <Box className={styles.root}>
      <Container>
        {/* Titre et Sélecteurs */}
        <Grid
          container
          spacing={2}
          alignItems='center'
          justifyContent='center'
          direction={isMobile ? 'column' : 'row'}
        >
          <Grid size={{ xl: 12 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: 2,
                marginBottom: 6,
                marginTop: 4,
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <Typography variant='h1' style={{ margin: 0 }}>
                Mon <b>calendrier</b>
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: isMobile ? '100%' : 'auto',
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                <FormControl variant='outlined'>
                  <InputLabel id='month-select-label'>Mois</InputLabel>
                  <Select
                    labelId='month-select-label'
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    label='Mois'
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem
                        key={i}
                        value={i}
                        disabled={
                          selectedYear === dayjs().year() && i < dayjs().month()
                        }
                      >
                        {dayjs().month(i).format('MMMM')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant='outlined'>
                  <InputLabel id='year-select-label'>Année</InputLabel>
                  <Select
                    labelId='year-select-label'
                    value={selectedYear}
                    onChange={handleYearChange}
                    label='Année'
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <MenuItem key={i} value={dayjs().year() + i}>
                        {dayjs().year() + i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Conteneur du Calendrier */}
        <Grid container spacing={2} justifyContent='center'>
          <Grid size={{ xs: 12, md: 12, xl: 12 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(2, 1fr)'
                  : 'repeat(5, 1fr)',
                gap: 2,
                width: '100%',
              }}
            >
              {daysInMonth.map((date, index) => (
                <DayCard key={index} date={date} />
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                marginTop: 8,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* <Button
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
              </Button> */}

              <Button
                variant='outlined'
                color='primary'
                onClick={handleNextMonth}
              >
                {isMobile ? 'Suivant' : 'Passer au mois suivant'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Calendar;
