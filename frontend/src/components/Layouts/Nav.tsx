import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { colorPrimary } from '../../styles/theme';
import { Theme } from '@mui/material/styles';
import { useAuthProvider } from '../../context/authContext';

const useStyles = makeStyles((theme: Theme) => ({
  navHeader: {
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    height: '100px',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    padding: '0',
    backgroundColor: '#fff !important',
    transition: 'top 0.3s',
    '& li:hover': {
      backgroundColor: 'transparent !important',
    },
    [theme.breakpoints.down('md')]: {
      height: '80px',
    },
  },
  hidden: {
    top: '-100px', // Cache la barre de navigation en haut
    [theme.breakpoints.down('md')]: {
      top: '-80px',
    },
  },
  separator: {
    position: 'absolute',
    left: '0',
    top: '100px',
    width: '100%',
    height: '5px',
    background: 'linear-gradient(to right, #13DC94, #fff)',
    [theme.breakpoints.down('md')]: {
      top: '80px',
    },
  },
  profilBtn: {
    marginRight: '10%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  navLogo: {
    marginLeft: '10%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      '& img': {
        width: "80%"
      }
    },
  },
  navCenter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    '& a': {
      textDecoration: 'none',
      color: '#000',
      fontSize: '1.2rem',
      '&:hover': {
        color: colorPrimary,
        textDecoration: 'none',
      },
      '&:active': {
        color: colorPrimary,
      },
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  activeIcon: {
    color: colorPrimary + ' !important',
  },
  btnUser: {
    padding: '15px 0px 15px 0px !important',
    '&:hover': {
        background: 'transparent !important',
        boxShadow: 'none !important',
      },
  },
  btnUserUnconnected: {
    backgroundColor: colorPrimary + '!important',
  },
  iconUser: {
    fontSize: '25px !important',
    color: colorPrimary,
  },
  btnBurger: {
    background: 'transparent !important',
    color: "#000 !important",
    fontSize: '20px !important',
    '&:hover': {
      boxShadow: 'none !important',
      color: colorPrimary + " !important",
    },
  },
  profilePopup: {
    position: 'absolute',
    top: '60px',
    right: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    zIndex: 1000,
    width: '250px',
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '14px',
    },
    '& li': {
      padding: '10px',
      cursor: 'pointer',
      fontFamily: '"Lexend", sans-serif',
      fontSize: '18px',
      fontWeight: 300,
      color: '#666',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  },
  hamburgerPopup: {
    position: 'absolute',
    top: '105px',
    right: '0px',
    backgroundColor: 'white',
    zIndex: 1000,
    width: '100%',
    height: 'calc(100vh - 105px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& ul': {
      display: 'block',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '14px',
    },
    '& li': {
      padding: '10px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  },
  navBottomMobile: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  navIconMobile: {
    fontSize: '25px',
    padding: '3px',
    color: '#000',
    '&:hover': {
      color: colorPrimary,
    },
  },
}));

const Nav: React.FC = () => {
  const { user } = useAuthProvider();
  const styles = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > scrollPosition && currentScrollPos > 100) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }

    setScrollPosition(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);


  const getLinkClass = (path: string) => {
    return location.pathname === path ? styles.activeIcon : '';
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <div className={`${styles.navHeader} ${!navVisible ? styles.hidden : ''}`}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img src="/assets/img/logo_Ironpal.svg" alt="logo Ironpal" />
          </Link>
        </div>

        <div className={styles.navCenter}>
          <MuiLink component={Link} to="/" className={getLinkClass('/')}>
            Accueil
          </MuiLink>
          <MuiLink component={Link} to="/calendar" className={getLinkClass('/calendar')}>
            Calendrier
          </MuiLink>
          <MuiLink component={Link} to={user ? '/profil' : '/login'} className={getLinkClass('/profil')}>
            Profil
          </MuiLink>
        </div>

        <div className={styles.profilBtn}>
          <Button
            color="primary"
            component={Link}
            to={user ? '/profil' : '/login'}
            className={user ? styles.btnUser : styles.btnUserUnconnected}
          >
            {user ? (
              <FontAwesomeIcon className={styles.iconUser} icon={faUser} />
            ) : (
              'Connexion'
            )}
          </Button>
        </div>
        <span className={styles.separator}></span>
      </div>

      {/* Mobile Navigation */}
      {isDesktop ? null : (
        <div className={styles.navBottomMobile}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon
              icon={faHome}
              className={`${styles.navIconMobile} ${getLinkClass('/')}`}
            />
          </Link>
          <Link to="/calendar" style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={`${styles.navIconMobile} ${getLinkClass('/calendar')}`}
            />
          </Link>
          <Link to={user ? '/profil' : '/login'} style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon
              icon={faUser}
              className={`${styles.navIconMobile} ${getLinkClass('/profil')}`}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
