import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { colorPrimary } from '../styles/theme';
import { useAuthProvider } from '../context/authContext';
import { useSnackbar } from '../context/snackbarContext';
import { useLocation } from 'react-router-dom';

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
        showSnackbar('Les identifiants sont invalides', 'error')
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

  useEffect(() => {
    if (location.state?.message) {
      showSnackbar(location.state.message, location.state.severity || 'success');
    }
  }, [location.state, showSnackbar]);

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
    </Box>
  );
};

export default Login;
