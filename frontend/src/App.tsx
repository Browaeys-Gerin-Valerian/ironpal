import React from "react";
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, ThemeProvider } from '@mui/material';
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
          
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <Button variant="contained" color="primary">Home</Button>
                </Link>
              </li>
              <li>
                <Link to="/calendrier">
                  <Button variant="contained" color="secondary">Calendrier</Button>
                </Link>
              </li>
              <li>
                <Link to="/profil">
                  <Button variant="contained" color="secondary">Profil</Button>
                </Link>
              </li>
            </ul>
          </nav>

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
