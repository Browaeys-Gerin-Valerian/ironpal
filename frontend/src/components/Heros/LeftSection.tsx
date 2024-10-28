import { Grid2 as Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SectionProps } from "../../interfaces/SectionProps";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    img:{
      width: '80%',
      overflow: 'hidden',
      borderRadius: '10px',
    },
    rowFlex:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: '100px',
      [theme.breakpoints.down('md')]: {
        marginTop: '50px',
      },
    },
    title:{
      [theme.breakpoints.down('md')]: {
        textAlign: 'left',
        marginTop: '50px',
      },
    },
    text:{
      [theme.breakpoints.down('md')]: {
        textAlign: 'left',
      },
    },
    separatorLeft:{
      position: 'absolute',
      left: '0',
      width: '50%',
      height: '5px',
      background: "linear-gradient(to right, #13DC94, #fff)",
      marginBottom: "50px",
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
}));


const LeftSection: React.FC<SectionProps> = ({ title, text, imageUrl }) => {
    const styles = useStyles();
  
    return (
      <Grid className="hero" container spacing={2}>
        <span className={styles.separatorLeft}></span>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.text}>{text}</p>
            </div>
        </Grid>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <img className={styles.img} src={imageUrl} alt="" />
        </Grid>
      </Grid>
    );
  };
  
  export default LeftSection;

