import React from 'react';
import { IconButton } from '@mui/material';
import { RatingDifficultyProps } from '../interfaces/types/props/RatingDifficultyProps';

const RatingDifficulty: React.FC<RatingDifficultyProps> = ({ rating, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: '2px', cursor: 'pointer' }}>
      {[...Array(5)].map((_, i) => (
        <IconButton key={i} onClick={() => onChange(i + 1)} size="small">
          <img
            src={`/assets/img/${i < rating ? 'fullpicto' : 'borderpicto'}.svg`} 
            style={{ width: '25px', height: '25px' }} 
          />
        </IconButton>
      ))}
    </div>
  );
};

export default RatingDifficulty;
