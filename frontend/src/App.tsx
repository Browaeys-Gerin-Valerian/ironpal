import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/Features/ProtectedRoutes';
import { SnackbarProvider } from './context/snackbarContext';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import HomePage from './screens/HomePage';
import CalendarPage from './screens/CalendarPage';
import LoginPage from './screens/LoginPage';
import ProfilPage from './screens/ProfilPage';
import Nav from './components/Layouts/Nav';
import Footer from './components/Layouts/Footer';
import RegisterPage from './screens/RegisterPage';
import useScrollToTop from './hooks/useScrollToTop';
import SessionPage from './screens/SessionPage';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/calendar'
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/session/:id'
              element={
                <ProtectedRoute>
                  <SessionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profil'
              element={
                <ProtectedRoute>
                  <ProfilPage />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
          <Footer />
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

// Composant pour gérer le défilement vers le haut
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default App;
