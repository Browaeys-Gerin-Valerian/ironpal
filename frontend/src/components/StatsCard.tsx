import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
  },
  card: {
    borderRadius: '0 0 70px 0',
    padding: '20px',
    width: '100px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: '25px',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '8px',
  },
});

interface StatsCardProps {
  number: number | string;
  label: string;
  bgColor?: string;   // Prop pour la couleur de fond
  textColor?: string; // Prop pour la couleur du texte
}

const StatsCard: React.FC<StatsCardProps> = ({ number, label, bgColor, textColor }) => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Typography
        sx={{ fontSize: '12px', color: textColor || '#666', textAlign: 'center', marginBottom: '8px' }}
      >
        {label}
      </Typography>
      <Box className={styles.card} sx={{ backgroundColor: bgColor || '#f5f5f5' }}>
        <Typography
          sx={{ fontSize: '25px', fontWeight: 'bold', color: textColor || '#333' }}
        >
          {number}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsCard;
