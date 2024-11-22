import React from 'react';
import { useAuthProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Profil from './screens/Profil';
import Nav from './components/Layouts/Nav';
import Footer from './components/Layouts/Footer';
import Login from './screens/Login';
import Register from './screens/Register';
import useScrollToTop from './hooks/useScrollToTop';
import HomeConnected from './screens/HomeConnected';
import { ProtectedRoute } from './components/ProtectedRoutes';
import Session from './screens/Session';

const App: React.FC = () => {
  const { user } = useAuthProvider();
  const isAuthenticated = user !== null;

  return (
    <Router>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path="/" element={isAuthenticated ? <HomeConnected /> : <Home />} />
            <Route
              path='/calendrier'
              element={
                // <ProtectedRoute>
                  <Calendar />
                // </ProtectedRoute>
              }
            />
            <Route
              path='/session/:id'
              element={
                <ProtectedRoute>
                  <Session />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profil'
              element={
                <ProtectedRoute>
                  <Profil />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <Footer />
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
