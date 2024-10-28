// src/components/Nav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { Grid2 as Grid } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import '../styles/nav.css';


const useStyles = makeStyles({
  navHeader:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: "10px",
    borderColor: "red",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    height: "60px",
  },
  containNav:{
    width: "100%",
  },
  icon:{
    width: "24px",
  }
});

const Nav: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // Définit le point de rupture pour passer en version desktop
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => setShowPopup(!showPopup);
  const toggleMenu = () => setShowMenu(!showMenu);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerButtonRef.current &&
      !hamburgerButtonRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }

    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup, showMenu]);

  // Fonction pour déterminer la couleur active du bouton
  const getButtonColor = (path: string) => (location.pathname === path ? 'primary' : 'secondary');

  return (
    <div className={styles.navHeader}>
      <Grid className={styles.containNav} container alignItems="center" justifyContent="space-between">
        {/* Version Mobile : Icone utilisateur à gauche, logo au centre, menu hamburger à droite */}
        {!isDesktop && (
          <>
            {/* Icône utilisateur à gauche */}
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={togglePopup}
                className="profile-button"
              >
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </Button>
            </div>

            {/* Logo au centre */}
            <Grid display="flex" justifyContent="center">
              <div className="nav-logo">
                <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                  <h1>Ironpal</h1>
                </Link>
              </div>
            </Grid>

            {/* Menu hamburger à droite */}
            <Grid display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                ref={hamburgerButtonRef}
                onClick={toggleMenu}
                className="hamburger-button"
              >
                <FontAwesomeIcon icon={faBars} className="nav-icon" />
              </Button>
            </Grid>
          </>
        )}

        {/* Version Desktop : Logo à gauche, navigation au centre, bouton profil à droite */}
        {isDesktop && (
          <>
            <Grid item md={2}>
              <div className="nav-logo">
                <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
                  <h1>Ironpal</h1>
                </Link>
              </div>
            </Grid>

            <Grid item md={6}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="text" color={getButtonColor('/')}>Home</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/calendrier" style={{ textDecoration: 'none' }}>
                    <Button variant="text" color={getButtonColor('/calendrier')}>Calendrier</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/profil" style={{ textDecoration: 'none' }}>
                    <Button variant="text" color={getButtonColor('/profil')}>Profil</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={togglePopup}
                className="profile-button"
              >
                <FontAwesomeIcon icon={faUser} className="nav-icon" />
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {/* Pop-up profil pour le bouton utilisateur */}
      {showPopup && (
        <div className="profile-popup" ref={popupRef}>
          <ul>
            <li>Modifier les informations personnelles</li>
            <li>Déconnexion</li>
          </ul>
        </div>
      )}

      {/* Menu déroulant pour mobile */}
      {showMenu && !isDesktop && (
        <div className="hamburger-popup" ref={menuRef}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/')}>Home</Button>
              </Link>
            </li>
            <li>
              <Link to="/calendrier" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/calendrier')}>Calendrier</Button>
              </Link>
            </li>
            <li>
              <Link to="/profil" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/profil')}>Profil</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
