import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@mui/styles';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr'; // Importer la locale française pour dayjs
import { DatePickerComponentProps } from '../utils/interfaces/components/DatePickerComponentProps';
// import { TextField } from "@mui/material"; // Importer TextField pour la personnalisation

// Définir la locale de dayjs sur français
dayjs.locale('fr');

const useStyles = makeStyles({
  datePicker: {
    width: '300px !important',
  },
});

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const styles = useStyles();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  // Fonction pour formater la date
  const formatDate = (date: Dayjs | null) => {
    return date ? date.locale('fr').format('dddd DD MMMM') : '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={styles.datePicker}
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        views={['day']} // Limiter les vues aux jours seulement
        slotProps={{
          textField: {
            variant: 'outlined',
            inputProps: { value: formatDate(selectedDate) }, // Formatage personnalisé de la date
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
