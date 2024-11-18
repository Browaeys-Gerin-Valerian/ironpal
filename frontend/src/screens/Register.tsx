import React, { useState } from 'react';
import axios from '../api/config/axios.config';
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
import { colorPrimary } from '../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { SnackbarState } from '../utils/interfaces/components/SnackbarState';
import { AUTH_ROUTES } from '../api/routes/routes.api';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
    marginTop: '100px',
    padding: theme.spacing(8),
  },
  container: {
    width: '500px !important',
    padding: theme.spacing(4),
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

const Register = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { lastname, firstname, birthdate, email, password, confirmPassword } =
      formData;

    // Vérification des champs vides
    if (
      !lastname ||
      !firstname ||
      !birthdate ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setSnackbar({
        open: true,
        message: 'Tous les champs sont obligatoires.',
        severity: 'warning',
      });
      return; // Stoppe l'exécution si des champs sont vides
    }

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Les mots de passe ne correspondent pas.',
        severity: 'error',
      });
      return;
    }

    try {
      const response = await axios.post(AUTH_ROUTES.REGISTER, {
        lastname,
        firstname,
        birthdate,
        password,
        email,
      });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: 'Compte créé avec succès !',
          severity: 'success',
        });
        navigate('/login');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setSnackbar({
          open: true,
          message: 'Cet email est déjà utilisé.',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Erreur lors de la création du compte.',
          severity: 'error',
        });
      }
    }
  };

  console.log(formData);

  return (
    <Box className={styles.root}>
      <Container className={styles.container}>
        <Typography variant='h2' className={styles.title}>
          Inscription
        </Typography>
        <TextField
          className={styles.textField}
          label='Nom'
          variant='outlined'
          name='lastname'
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Prénom'
          variant='outlined'
          name='firstname'
          value={formData.firstname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Date de naissance'
          type='date'
          variant='outlined'
          name='birthdate'
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true, // Cela permet de garder le label en haut lorsque la date est sélectionnée
          }}
        />
        <TextField
          className={styles.textField}
          label='Email'
          variant='outlined'
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Mot de passe'
          type='password'
          variant='outlined'
          name='password'
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={styles.textField}
          label='Confirmer le mot de passe'
          type='password'
          variant='outlined'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        <Button
          className={styles.button}
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          fullWidth
        >
          S'inscrire
        </Button>
        <Box>
          <Typography className={styles.inscription}>
            Déjà un compte ?{' '}
            <Link to='/login'>
              <b>Connectez-vous</b>
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

export default Register;
