import React, { useState } from 'react';
import axios from '../api/config/axios.config';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { colorPrimary } from '../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/snackbarContext';
import { AUTH_ROUTES } from '../api/routes/routes.api';
import { isValidPassword } from '../utils/functions/validator';
import PwdChecker from '../components/Features/PasswordChecker';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
    marginTop: '100px',
    marginBottom: '100px',
    padding: theme.spacing(8),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
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
        textDecoration: 'underline',
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

  const { showSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { lastname, firstname, birthdate, email, password, confirmPassword } =
      formData;
    const { isValidPwd } = isValidPassword(formData.password);

    // Vérification des champs vides
    if (
      !lastname ||
      !firstname ||
      !birthdate ||
      !email ||
      !password ||
      !confirmPassword ||
      !isValidPwd
    ) {
      showSnackbar('Le formulaire comporte des erreurs', 'warning')
      return; // Stoppe l'exécution si des champs sont vides
    }

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      showSnackbar('Les mots de passe ne correspondent pas', 'error')
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
        navigate('/login', {
          state: { message: 'Compte créé avec succès !', severity: 'success' },
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        showSnackbar('Cet email est déjà utilisé', 'error');
      } else {
        showSnackbar('Erreur lors de la création du compte', 'error');
      }
    }
  };

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
        <PwdChecker password={formData.password} />
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
    </Box>
  );
};

export default Register;
