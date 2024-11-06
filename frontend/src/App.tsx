import React from 'react';
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';

import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Profil from './screens/Profil';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './screens/Login';
import Register from './screens/Register';
import useScrollToTop from './hooks/useScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/calendar'
              element={
                <ProtectedRoute>
                  <Calendar />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path='/profil'
              element={
                <ProtectedRoute>
                  <Profil />{' '}
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

// Composant pour gérer le défilement vers le haut
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default App;
