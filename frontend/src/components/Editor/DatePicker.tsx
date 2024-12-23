import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@mui/styles';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

export interface DatePickerComponentProps {
  label: string;
  onDateChange?: (date: Dayjs | null) => void;
  initialDate?: Dayjs | null;
}

const DatePickerComponent = ({
  label,
  onDateChange,
  initialDate,
}: DatePickerComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const styles = useStyles();

  // Synchronisation avec `initialDate` en cas de mise à jour
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
      <DatePicker
        className={styles.datePicker}
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        views={['day']} // Limiter les vues aux jours seulement
        format='dddd DD MMMM' // Format personnalisé géré automatiquement
        slotProps={{
          textField: {
            variant: 'outlined',
          },
        }}
      />
    </LocalizationProvider>
  );
};

const useStyles = makeStyles({
  datePicker: {
    // width: 'auto !important',
  },
});

export default DatePickerComponent;
