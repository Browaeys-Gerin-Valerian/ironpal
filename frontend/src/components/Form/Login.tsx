import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { colorPrimary } from '../../styles/theme';
import { Theme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuthProvider } from '../../context/authContext';
import { useSnackbar } from '../../context/snackbarContext';

const Login = () => {
  const styles = useStyles();

  const { login } = useAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    // Vérification des champs vides
    if (!email || !password) {
      showSnackbar('Tous les champs sont obligatoires', 'warning');
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.status === 401) {
        showSnackbar('Les identifiants sont invalides', 'error');
        return;
      }
      if (response.status === 200) {
        navigate('/', {
          state: { message: 'Compte connecté !', severity: 'success' },
        });
      }
    } catch (error: any) {
      showSnackbar('Erreur lors de la connexion', 'error');
    }
  };

  // RGAA Touche Entrée pour se connecter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (location.state?.message) {
      showSnackbar(
        location.state.message,
        location.state.severity || 'success'
      );

      // Nettoyer l'état après affichage
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, showSnackbar, navigate]);
  return (
    <Box className={styles.root}>
      <Container className={styles.container}>
        <Typography variant='h2' className={styles.title}>
          Connexion
        </Typography>
        <TextField
          className={styles.textField}
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          variant='outlined'
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Mot de passe'
          name='password'
          value={formData.password}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={togglePasswordVisibility} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleSubmit}
          className={styles.button}
          variant='contained'
          color='primary'
        >
          Se connecter
        </Button>
        <Box>
          <Typography className={styles.inscription}>
            Vous n'avez pas de compte ?{' '}
            <Link to='/register'>
              <b>Inscrivez-vous</b>
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 150px)',
    marginTop: '100px',
    padding: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    width: '500px !important',
    padding: theme.spacing(8),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
  title: {
    marginBottom: '50px !important',
    textAlign: 'center',
  },
  textField: {
    marginBottom: '20px !important',
  },
  button: {
    marginTop: '50px !important',
    width: 'auto !important',
  },
  inscription: {
    display: 'block',
    marginTop: '50px !important',
    textAlign: 'center',
    fontSize: '16px',
    '& a': {
      textDecoration: 'none',
    },
    '& b': {
      color: colorPrimary,
      fontWeight: 300,
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

export default Login;
