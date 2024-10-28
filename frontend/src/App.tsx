import React from "react";
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from "./styles/theme"; 
import "./styles/headings.css";
import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Profil from "./screens/Profil";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          {/* Composant Nav gère désormais la navigation */}
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendrier" element={<Calendar />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
