import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { colorPrimary } from '../styles/theme';
import { SnackbarState } from '../interfaces/SnackbarState';
import axios from 'axios';

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
    width: "500px !important",
    padding: theme.spacing(8),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: "100% !important",
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
    '& a':{
        textDecoration: "none",
    },
    '& b':{
      color: colorPrimary,
      fontWeight: 300,
      '&:hover':{
        fontWeight: "bold",
        }
    }
  },
}));

const Login = () => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  // État pour gérer les champs de connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // État pour gérer la Snackbar
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: !!location.state?.registered,
    message: 'Compte créé avec succès !',
    severity: 'success',
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login', 
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Ou est retourné le token, dans response.data.token ?
        localStorage.setItem('token', response.data.token); 
        navigate('/bienvenue', { state: { registered: true } }); // Redirigez vers la page d'accueil connected et prévoir la snackbar
      }
    } catch (error: any) {
      setSnackbar({ open: true, message: 'Erreur lors de la connexion.', severity: 'error' });
    }
  };

  return (
    <Box className={styles.root}>
      <Container className={styles.container}>
        <Typography variant="h2" className={styles.title}>
          Connexion
        </Typography>
        <TextField
          className={styles.textField}
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.textField}
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Se connecter
        </Button>
        <Box>
            <Typography className={styles.inscription}>
              Vous n'avez pas de compte ? <Link to="/register"><b>Inscrivez-vous</b></Link>
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
