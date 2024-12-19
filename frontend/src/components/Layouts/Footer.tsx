import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Grid2 as Grid, Box } from '@mui/material';
import Copyrights from './Copyrights';

const Footer = () => {
  const styles = useStyles();

  return (
    <Box className={styles.footer}>
      <Grid className={styles.container} container spacing={2}>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
          {/* <MuiLink component={Link} to="/"> Mentions légales </MuiLink>
                    <MuiLink component={Link} to="/"> RGPD </MuiLink>
                    <MuiLink component={Link} to="/"> Calendrier </MuiLink>
                    <MuiLink component={Link} to="/"> Profil </MuiLink> */}
        </Grid>
        <Grid className={styles.rowFlex__right} size={{ xs: 12, md: 6 }}>
          <img
            className={styles.logo}
            src='/assets/img/logoWhite.svg'
            alt='Logo White'
          />
        </Grid>
      </Grid>
      <Copyrights />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
  container: {
    background: 'linear-gradient(to right, #13DC94, #fff)',
  },
  rowFlex: {
    display: 'flex',
    padding: '50px',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      padding: '0px',
    },
    // Styles des liens
    '& a': {
      marginLeft: '20%',
      padding: '5px',
      textDecoration: 'none',
      fontSize: '18px',
      color: '#fff !important',
      [theme.breakpoints.down('md')]: {
        marginLeft: '0%',
        padding: '15px',
        fontSize: '16px !important',
      },
    },
  },
  rowFlex__right: {
    display: 'flex',
    padding: '50px',
    justifyContent: 'right',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      // paddingTop: '0px',
    },
  },
  logo: {
    height: '150px',
    display: 'block',
    marginRight: '20%',
    [theme.breakpoints.down('md')]: {
      marginRight: '0%',
      width: '80%',
    },
  },
}));

export default Footer;
