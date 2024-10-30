import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from "./styles/theme"; 

import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Profil from "./screens/Profil";
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './screens/Login';
import Register from './screens/Register';
import useScrollToTop from "./hooks/useScrollToTop";
import HomeConnected from "./screens/HomeConnected";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bienvenue" element={<HomeConnected />} />
            <Route path="/calendrier" element={<Calendar />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
      </Router>
    </ThemeProvider>
  );
};

// Composant pour gérer le défilement vers le haut
const ScrollToTop = () => {
  useScrollToTop();
  return null; 
};

export default App;
