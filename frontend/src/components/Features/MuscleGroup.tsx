import { useState } from 'react';
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

import { makeStyles } from '@mui/styles';

export interface MuscleGroupSelectProps {
  label: string;
}

const MuscleGroupSelect = ({ label }: MuscleGroupSelectProps) => {
  const styles = useStyles();

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');

  const muscleGroups = [
    'Aucun',
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
    const value = event.target.value;
    setSelectedMuscleGroup(value === 'Aucun' ? '' : value); // Réinitialise si "Aucun" est sélectionné
  };

  return (
    <Box className={styles.box}>
      <FormControl fullWidth variant='outlined'>
        <InputLabel className={styles.input}>
          {selectedMuscleGroup === '' ? 'Ajouter un groupe musculaire' : label}
        </InputLabel>
        <Select
          className={styles.select}
          value={selectedMuscleGroup}
          onChange={handleChange}
          label={label}
          input={<OutlinedInput />}
          displayEmpty
        >
          {muscleGroups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography className={styles.optional}>Optionnel</Typography>
    </Box>
  );
};

const useStyles = makeStyles({
  box: {
    width: '400px',
    marginTop: '50px',
    marginBottom: '50px',
    color: 'black !important',
  },
  select: {
    borderRadius: '50px !important',
    // border: '1px solid black',
    fontWeight: '500 !important',
  },
  input: {
    color: 'black !important',
  },
  optional: {
    fontSize: '14px !important',
    marginLeft: '20px !important',
    color: 'grey',
  },
});

export default MuscleGroupSelect;
