import { Link, useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { colorPrimary } from '../../styles/theme';
import {
  Typography,
  Box,
  Container,
  Grid2 as Grid,
  Button,
} from '@mui/material';
import { useAuthProvider } from '../../context/authContext';
import { getAgeFromBirthdate } from '../../utils/functions/date';

interface ProfilProps {
  userSessionsCount: number;
  userValidatedSessionsCount: number;
}

const Profil = ({
  userSessionsCount,
  userValidatedSessionsCount,
}: ProfilProps) => {
  const styles = useStyles();

  const { user } = useAuthProvider();

  const { logout } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/', {
      state: { message: 'Déconnecté !', severity: 'success' },
    });
  };

  return (
    <Box className={styles.root}>
      <Container>
        <Grid className={styles.hero} container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
            {user ? (
              <Typography variant='h1'>
                {user.firstname} {user.lastname}
              </Typography>
            ) : (
              <></>
            )}
            <Box className={styles.profilInfos}>
              {user ? (
                <>
                  <Typography>
                    Age :{' '}
                    <b>
                      {user.birthdate
                        ? getAgeFromBirthdate(user.birthdate) + ' ans'
                        : 'Non renseigné'}
                    </b>
                  </Typography>
                  <Typography>
                    {' '}
                    E-mail : <b>{user.email}</b>
                  </Typography>
                </>
              ) : (
                <></>
              )}
              <Typography>
                {' '}
                Séances créées : <b>{userSessionsCount}</b>
              </Typography>
              <Typography>
                {' '}
                Séances validées : <b>{userValidatedSessionsCount}</b>
              </Typography>
            </Box>
            <Link to='/'>
              <Button
                onClick={handleLogout}
                className={styles.button}
                variant='outlined'
              >
                Se déconnecter
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '100px',
    paddingBottom: '150px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '80px',
    },
    '& h1': {
      color: colorPrimary,
    },
  },
  hero: {
    marginTop: '100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '50px',
    },
  },
  profilInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    display: 'block',
    marginTop: '30px !important',
    [theme.breakpoints.down('md')]: {
      marginLeft: '50% !important',
      transform: 'translateX(-50%)',
      width: '230px !important',
    },
  },
}));

export default Profil;
