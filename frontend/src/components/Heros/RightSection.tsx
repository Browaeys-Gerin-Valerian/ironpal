import { Grid2 as Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    img:{
      width: '80%',
      overflow: 'hidden',
      borderRadius: '10px',
    },
    rowFlex:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    separatorRight:{
      display: 'block',
      width: "50%",
      height: '10px',
      background: "linear-gradient(to left, #13DC94, #fff)",
      marginBottom: "50px",
    }
});

// Définition du type des props
interface RightSectionProps {
  title: string;     // Titre à afficher
  text: string;      // Texte à afficher
  imageUrl: string;  // URL de l'image
}

const RightSection: React.FC<RightSectionProps> = ({ title, text, imageUrl }) => {
    const styles = useStyles();
  
    return (
      <Grid className="hero" container spacing={2}>
        <span className={styles.separatorRight}></span>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
        </Grid>
        <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <img className={styles.img} src={imageUrl} alt="" />
        </Grid>
      </Grid>
    );
  };
  
  export default RightSection;

