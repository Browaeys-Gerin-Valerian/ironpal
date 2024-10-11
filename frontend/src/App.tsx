import React from "react";
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, ThemeProvider } from '@mui/material';
import theme from "./styles/theme"; 
import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Profil from "./screens/Profil";

const App: React.FC = () => {
  return (
    <div>
      <Nav />
      <main>
        {/* */}
      </main>
    </div>
  );
};

export default App;
