import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from '../components/Features/Calendar';
import { useSnackbar } from '../context/snackbarContext';
import { Session } from '../interfaces/data/session/Session';
import GETsessions from '../api/services/sessions/GETsessions';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useAuthProvider } from '../context/authContext';
dayjs.locale('fr');

const CalendarPage = () => {
  const { user } = useAuthProvider();
  // State pour gérer le mois et l'année sélectionnés
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [monthSessions, setMonthSession] = useState<Session[]>([]);

  useEffect(() => {
    (async () => {
      const monthSessionsResponse = await GETsessions(
        user.id,
        selectedMonth,
        selectedYear
      );
      setMonthSession(monthSessionsResponse);
    })();
  }, [selectedMonth, selectedYear]);

  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      showSnackbar(
        location.state.message,
        location.state.severity || 'success'
      );

      // Nettoyer l'état après affichage
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, showSnackbar, navigate]);

  return (
    <Calendar
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      monthSessions={monthSessions}
      setSelectedMonth={setSelectedMonth}
      setSelectedYear={setSelectedYear}
    />
  );
};

export default CalendarPage;
