import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import DifficultyIcon from './Icons/DifficultyIcon';
import DifficultyBorderIcon from './Icons/DifficultyBorderIcon';
import { SetExercise } from '../interfaces/data/set/Set';
import PATCHset from '../api/services/set/PATCHset';

interface RatingDifficultyProps extends SetExercise {
  onChange: (value: number) => void;
}

const RatingDifficulty: React.FC<RatingDifficultyProps> = ({
  id,
  difficulty,
  onChange,
}) => {
  const [value, setValue] = React.useState<number | null>(difficulty);

  const handleUpdateDifficulty = async (newValue: number) => {
    try {
      const payload = { difficulty: newValue };
      const updatedDifficulty = await PATCHset(id, payload);
      setValue(updatedDifficulty.difficulty);
      onChange(updatedDifficulty.difficulty);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px', cursor: 'pointer' }}>
      <StyledRating
        value={value}
        onChange={(_, newValue) => handleUpdateDifficulty(newValue as number)}
        precision={1}
        icon={<DifficultyIcon />}
        emptyIcon={<DifficultyBorderIcon />}
      />
    </div>
  );
};

const StyledRating = styled(Rating)({});

export default RatingDifficulty;
