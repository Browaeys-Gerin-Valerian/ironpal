// import React from "react";
import { makeStyles } from '@mui/styles';
import DescriptionCard from "../components/DescriptionCard";
import { Grid2 as Grid, Button } from "@mui/material";
import LeftSection from "../components/Heros/LeftSection";
import RightSection from "../components/Heros/RightSection";


const useStyles = makeStyles({
  slogan: {
    fontSize: '24px',
  },
  rowFlex:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img:{
    width: '80%',
    overflow: 'hidden',
    borderRadius: '10px',
  },
});


const Home = () => {
  
  const styles = useStyles();

  return (
    <>
      <main className="container">
      
        {/* Hero 1 */}
        <Grid className="hero" container spacing={2}>
          <Grid size={{ xs: 12, md: 6, xl: 4 }}>
            <h1>Bienvenue</h1>
            <p className={styles.slogan}>Ironpal, l’app qui développe ton programme sportif</p>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button variant="outlined" fullWidth>S'inscrire</Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button variant="contained" fullWidth>Se connecter</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ display: { xs: 'none', xl: 'block' } }} size={{ xl: 2 }}></Grid>
          <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <p>**Components utilisateurs ici**</p>
          </Grid>
        </Grid>

        {/* Hero 2 */}
        <Grid className="hero" container spacing={2}>
          <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <DescriptionCard  />
          </Grid>
          <Grid className={styles.rowFlex} size={{ xs: 12, md: 6 }}>
            <img className={styles.img} src="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg" alt="" />
          </Grid>
        </Grid>

        {/* Hero 3 */}
        <RightSection 
          title="Pour qui ?" 
          text="Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements. L’application s’adresse particulièrement aux utilisateurs qui cherchent à optimiser leurs séances de musculation, à suivre leur progression et à atteindre leurs objectifs personnels en matière de condition physique." 
          imageUrl="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg" 
        />

        {/* Hero 4 */}
        <LeftSection 
          title="Pour qui ?" 
          text="Toutes les personnes passionnées par la musculation qui souhaitent organiser, planifier et suivre efficacement leurs entraînements. L’application s’adresse particulièrement aux utilisateurs qui cherchent à optimiser leurs séances de musculation, à suivre leur progression et à atteindre leurs objectifs personnels en matière de condition physique." 
          imageUrl="https://www.lesdessousdusport.fr/wp-content/uploads/2020/08/meilleures-applications-de-musculation-pour-Smartphone-1024x683.jpg" 
        />

      </main>
    </>
  );
};

export default Home;
