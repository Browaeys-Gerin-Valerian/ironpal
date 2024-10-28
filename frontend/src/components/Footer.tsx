import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { Grid2 as Grid } from "@mui/material";
import { Link } from 'react-router-dom';
import Copyrights from './Copyrights';

const useStyles = makeStyles((theme: Theme) => ({
    footer:{
        position: 'absolute',
        width: "100%",
        left: 0,
        marginTop: "150px",
    },
    container:{
        background: "linear-gradient(to right, #13DC94, #fff)",
    },
    rowFlex: {
        display: "flex",
        padding: '50px',
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            alignItems: "center",
        },
        // Links styles
        '& a':{
            marginLeft: '20%',
            padding: '5px',
            textDecoration: 'none',
            fontSize: '18px',
            [theme.breakpoints.down('md')]: {
                marginLeft: '0%',
                padding: '15px',
            },
        }
    },
    rowFlex__right: {
        display: "flex",
        padding: '50px',
        justifyContent: "right",
        [theme.breakpoints.down('md')]: {
            justifyContent: "center",
            paddingTop: '0px',
        },
    },
    logo:{
        height: '150px',
        display: 'block',
        marginRight: '20%',
        [theme.breakpoints.down('md')]: {
            marginRight: '0%',
        },
    },
}));

const Footer = () => {
    const styles = useStyles();

    return (
        <div className={styles.footer}>
            <Grid className={styles.container} container spacing={2}>
                <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
                    <Link to="/"> Mentions légales </Link>
                    <Link to="/"> RGPD </Link>
                    <Link to="/"> Calendrier </Link>
                    <Link to="/"> Profil </Link>
                </Grid>
                <Grid className={styles.rowFlex__right} size={{ xs: 12, md: 6 }}>
                    <img className={styles.logo} src="/assets/img/logoWhite.svg" alt="Logo White" />
                </Grid>
            </Grid>
            <Copyrights />
        </div>
    );
};

export default Footer;