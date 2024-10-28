import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/material/styles";
import { Grid2 as Grid } from "@mui/material";
import { colorPrimary } from '../styles/theme';

const useStyles = makeStyles((theme: Theme) => ({
    copyrights:{
    },
    rowFlex: {
        display: "flex",
        padding: '25px 50px',
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        [theme.breakpoints.down('md')]: {
            alignItems: "center",
            paddingBottom: '0px',
        },
    },
    rowFlex__right: {
        padding: '25px 50px',
        textAlign: "right",
        [theme.breakpoints.down('md')]: {
            textAlign: "center",
            paddingTop: '0px',
        },
    },
    spanLeft:{
        fontSize: '18px',
        marginLeft: '20%',
        fontWeight: 300,
        [theme.breakpoints.down('md')]: {
            marginLeft: '0%'
        },
    },
    spanRight:{
        fontWeight: 300,
        fontSize: '18px',
        marginRight: '20%',
        color: colorPrimary,
        [theme.breakpoints.down('md')]: {
            marginRight: '0%'
        },
    },
}));

const Copyrights = () => {
    const styles = useStyles();

    return (
        <div className={styles.copyrights}>
            <Grid container spacing={2}>
                <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
                    <span className={styles.spanLeft}>O’Clock APO Project - 2024</span>
                </Grid>
                <Grid className={styles.rowFlex__right} size={{ xs: 12, md: 6 }}>
                    <span className={styles.spanRight}>VSTM Production</span>
                </Grid>
            </Grid>
        </div>
    );
};

export default Copyrights;