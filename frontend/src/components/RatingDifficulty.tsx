import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import DifficuktyIcon from './Icons/DifficultyIcon';
import DifficultyBorderIcon from './Icons/DifficultyBorderIcon';
import { SetExercise } from '../interfaces/data/set/Set';
import PATCHset from '../api/services/set/PATCHset';

const StyledRating = styled(Rating)({});

const RatingDifficulty: React.FC<SetExercise> = ({ id, difficulty }) => {
  const [value, setValue] = React.useState<number | null>(difficulty);

  const handleUpdateDifficulty = async () => {
    try {
      const paylaod = { difficulty: value && value !== -1 ? value : 0 };
      const udpatedDifficulty = await PATCHset(id, paylaod);
      if (udpatedDifficulty.status === 200) {
        setValue(udpatedDifficulty.difficulty);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px', cursor: 'pointer' }}>
      <>
        <StyledRating
          onChangeActive={(_, newValue) => {
            setValue(newValue);
          }}
          onChange={handleUpdateDifficulty}
          precision={1}
          icon={<DifficuktyIcon />}
          emptyIcon={<DifficultyBorderIcon />}
        />
      </>
    </div>
  );
};

export default RatingDifficulty;
