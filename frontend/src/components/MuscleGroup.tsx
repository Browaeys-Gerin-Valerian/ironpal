import React, { useState } from 'react';
import {
  Select,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { MuscleGroupSelectProps } from '../utils/interfaces/components/props/MuscleGroupSelectProps';

const MuscleGroupSelect: React.FC<MuscleGroupSelectProps> = ({ label }) => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');

  const muscleGroups = [
    'Pectoraux',
    'Dos',
    'Épaules',
    'Jambes',
    'Biceps',
    'Triceps',
    'Abdominaux',
    'Avant-bras',
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedMuscleGroup(event.target.value);
  };

  return (
    <Box sx={{ width: 300 }}>
      <FormControl fullWidth variant='outlined'>
        <InputLabel
          sx={{
            backgroundColor: 'white',
            paddingX: 1,
            marginLeft: 1,
            zIndex: 1,
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={selectedMuscleGroup}
          onChange={handleChange}
          label={label}
          input={<OutlinedInput />}
        >
          {muscleGroups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Optionnel</Typography>
    </Box>
  );
};

export default MuscleGroupSelect;
