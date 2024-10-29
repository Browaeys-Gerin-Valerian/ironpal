import React from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { colorPrimary } from '../styles/theme';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)',
    marginTop: '100px',
  },
  container: {
    width: "500px !important",
    padding: theme.spacing(4),
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
    marginTop: '50px !important',
    textAlign: 'center',
    fontSize: '16px',
    '& a': {
      textDecoration: "none",
    },
    '& b': {
      color: colorPrimary,
      fontWeight: 300,
      '&:hover': {
        fontWeight: "bold",
      }
    }
  },
}));

const Register = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Container className={styles.container}>
        <Typography variant="h2" className={styles.title}>
          Inscription
        </Typography>
        <TextField
          className={styles.textField}
          label="Nom"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={styles.textField}
          label="Prénom"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={styles.textField}
          label="Âge"
          type="number"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={styles.textField}
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={styles.textField}
          label="Confirmer le mot de passe"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          fullWidth
        >
          S'inscrire
        </Button>
        <Box>
          <Typography className={styles.inscription}>
            Déjà un compte ? <Link to="/login"><b>Connectez-vous</b></Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
