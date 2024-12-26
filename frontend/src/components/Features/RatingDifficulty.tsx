import React from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import DifficultyIcon from '../Icons/DifficultyIcon';
import DifficultyBorderIcon from '../Icons/DifficultyBorderIcon';
import { Set } from '../../interfaces/entities/Set';
import { updateSet } from '../../api/services/sets';
import { useSessionProvider } from '../../context/sessionContext';

interface RatingDifficultyProps extends Set {
  isValidated: boolean;
}

const RatingDifficulty = ({
  id,
  difficulty,
  isValidated,
}: RatingDifficultyProps) => {
  const { handleUpdateSet } = useSessionProvider();
  const [value, setValue] = React.useState<number | null>(difficulty);

  const handleUpdateDifficulty = async (newValue: number) => {
    try {
      const payload = { difficulty: newValue };
      const updatedSet = await updateSet(id, payload);
      setValue(updatedSet.data.difficulty);
      handleUpdateSet(updatedSet.data.session_exercise_id, updatedSet.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2px', cursor: 'pointer' }}>
      <StyledRating
        readOnly={isValidated}
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
