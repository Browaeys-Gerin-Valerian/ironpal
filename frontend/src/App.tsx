import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from "./styles/theme"; 
import "./styles/headings.css";

import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Profil from "./screens/Profil";
import Nav from './components/Nav';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendrier" element={<Calendar />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          <Footer/>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
