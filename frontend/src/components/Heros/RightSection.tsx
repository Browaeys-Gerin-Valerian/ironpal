import { Grid2 as Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SectionProps } from "../../interfaces/SectionProps";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  img: {
      width: '80%',
      overflow: 'hidden',
      borderRadius: '10px',
      [theme.breakpoints.down('md')]: {
        marginTop: '50px',
      },
  },
  rowFlex: {
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
      textAlign: 'right',
    },
  },
  text:{
    [theme.breakpoints.down('md')]: {
      textAlign: 'right',
    },
  },
  separatorRight: {
      position: 'absolute',
      right: '0',
      display: 'block',
      width: "50%",
      height: '5px',
      background: "linear-gradient(to left, #13DC94, #fff)",
      [theme.breakpoints.down('md')]: {
          width: '100%',
      },
  }
}));


const RightSection: React.FC<SectionProps> = ({ title, text, imageUrl }) => {
    const styles = useStyles();
  
    return (
      <Grid className="hero" container spacing={2}>
        <span className={styles.separatorRight}></span>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <img className={styles.img} src={imageUrl} alt="" />
        </Grid>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.text}>{text}</p>
            </div>
        </Grid>
      </Grid>
    );
  };
  
  export default RightSection;

