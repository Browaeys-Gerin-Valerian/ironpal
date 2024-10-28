// src/components/Nav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    height: "60px",
  },
  icon: {
    width: "24px",
  },
  navLogo: {
    textDecoration: 'none',
    color: '#000',
    '& h1': {
      fontSize: "1.2rem",
      textAlign: "center",
      margin: 0,
    },
  },
  navCenter: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  profilePopup: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    zIndex: 1000,
    width: "250px",
    '& ul': {
      listStyle: "none",
      padding: 0,
      margin: 0,
      fontSize: "14px",
    },
    '& li': {
      padding: "10px",
      cursor: "pointer",
      '&:hover': {
        backgroundColor: "#f0f0f0",
      },
    },
  },
  hamburgerPopup: {
    position: "absolute",
    top: "60px",
    right: "10px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    zIndex: 1000,
    width: "200px",
    '& ul': {
      listStyle: "none",
      padding: 0,
      margin: 0,
      fontSize: "14px",
    },
    '& li': {
      padding: "10px",
      cursor: "pointer",
      '&:hover': {
        backgroundColor: "#f0f0f0",
      },
    },
  },
});

const Nav: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const togglePopup = () => {
    setShowPopup(prev => !prev);
    if (showMenu) setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
    if (showPopup) setShowPopup(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerButtonRef.current &&
      !hamburgerButtonRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      userButtonRef.current &&
      !userButtonRef.current.contains(event.target as Node)
    ) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup, showMenu]);

  const getButtonColor = (path: string) => (location.pathname === path ? 'primary' : 'secondary');

  return (
    <div className={styles.navHeader}>
      {!isDesktop && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={togglePopup}
            ref={userButtonRef}
          >
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Button>

          <div className={styles.navLogo}>
            <Link to="/" className={styles.navLogo}>
              <h1>Ironpal</h1>
            </Link>
          </div>

          <Button
            variant="contained"
            color="primary"
            ref={hamburgerButtonRef}
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} className={styles.icon} />
          </Button>
        </>
      )}

      {isDesktop && (
        <>
          <div className={styles.navLogo}>
            <Link to="/" className={styles.navLogo}>
              <h1>Ironpal</h1>
            </Link>
          </div>

          <div className={styles.navCenter}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="text" color={getButtonColor('/')}>Home</Button>
            </Link>
            <Link to="/calendrier" style={{ textDecoration: 'none' }}>
              <Button variant="text" color={getButtonColor('/calendrier')}>Calendrier</Button>
            </Link>
            <Link to="/profil" style={{ textDecoration: 'none' }}>
              <Button variant="text" color={getButtonColor('/profil')}>Profil</Button>
            </Link>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={togglePopup}
            ref={userButtonRef}
          >
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Button>
        </>
      )}

      {showPopup && (
        <div
          className={styles.profilePopup}
          style={isDesktop ? { right: '10px', left: 'auto' } : { left: '0' }}
          ref={popupRef}
        >
          <ul>
            <li>Modifier les informations personnelles</li>
            <li>Déconnexion</li>
          </ul>
        </div>
      )}

      {showMenu && !isDesktop && (
        <div className={styles.hamburgerPopup} ref={menuRef}>
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/')} fullWidth>
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/calendrier" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/calendrier')} fullWidth>
                  Calendrier
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/profil" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color={getButtonColor('/profil')} fullWidth>
                  Profil
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
