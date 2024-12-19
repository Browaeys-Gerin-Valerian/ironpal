import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Grid2 as Grid, Typography, Box } from '@mui/material';
import { colorPrimary } from '../../styles/theme';

const Copyrights = () => {
  const styles = useStyles();

  return (
    <Box className={styles.copyrights}>
      <Grid container spacing={2}>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
          <Typography variant='body1' className={styles.spanLeft}>
            O’Clock APO Project - 2024
          </Typography>
        </Grid>
        <Grid className={styles.rowFlex__right} size={{ xs: 12, md: 6 }}>
          <Typography variant='body1' className={styles.spanRight}>
            VSTM Production
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  copyrights: {},
  rowFlex: {
    display: 'flex',
    padding: '25px 50px',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      paddingBottom: '0px',
    },
  },
  rowFlex__right: {
    padding: '25px 50px',
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      paddingTop: '0px',
    },
  },
  spanLeft: {
    fontSize: '18px',
    marginLeft: '20% !important',
    fontWeight: 300,
    [theme.breakpoints.down('md')]: {
      marginLeft: '0% !important',
      fontSize: '16px !important',
    },
  },
  spanRight: {
    fontWeight: 300,
    fontSize: '18px',
    marginRight: '20% !important',
    color: colorPrimary,
    [theme.breakpoints.down('md')]: {
      marginRight: '0% !important',
      fontSize: '16px !important',
      paddingBottom: '80px !important',
    },
  },
}));

export default Copyrights;
