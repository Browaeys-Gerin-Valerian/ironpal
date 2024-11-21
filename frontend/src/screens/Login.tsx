import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { colorPrimary } from '../styles/theme';
import { useAuthProvider } from '../context/authContext';
import { SnackbarState } from '../utils/interfaces/components/SnackbarState';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
    marginTop: '100px',
    padding: theme.spacing(4),
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
        fontWeight: 'bold',
      },
    },
  },
}));

const Login = () => {
  const styles = useStyles();

  const { login } = useAuthProvider();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Initialisation de l'état
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success', // Valeur par défaut
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    // Vérification des champs vides
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: 'Tous les champs sont obligatoires.',
        severity: 'warning',
      });
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.status === 401) {
        setSnackbar({
          open: true,
          message: 'Les identifiants sont invalides',
          severity: 'error',
        });
        return;
      }

      setSnackbar({
        open: true,
        message: 'Compte créé avec succès !',
        severity: 'success',
      });
      navigate('/');
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la connexion.',
        severity: 'error',
      });
    }
  };

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
          variant='outlined'
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Mot de passe'
          name='password'
          value={formData.password}
          onChange={handleChange}
          type='password'
          variant='outlined'
          fullWidth
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
