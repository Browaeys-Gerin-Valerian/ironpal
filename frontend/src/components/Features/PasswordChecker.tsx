import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { isValidPassword } from '../../utils/functions/validator';
import { colorPrimary } from '../../styles/theme';

interface PwdCheckerProps {
  password: string;
}

const PwdChecker = ({ password }: PwdCheckerProps) => {
  const styles = useStyles();
  const {
    isValidLength,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
  } = isValidPassword(password);

  const criterias = [
    { text: 'Faire au moins 12 caractères', isValid: isValidLength },
    { text: 'Contenir au moins une majuscule', isValid: hasUppercase },
    { text: 'Contenir au moins une minuscule', isValid: hasLowercase },
    { text: 'Contenir au moins un chiffre', isValid: hasDigit },
    { text: 'Contenir au moins un caractère spécial', isValid: hasSpecialChar },
  ];

  return (
    <div>
      <Box 
        sx={{
          display: "flex",
          fontSize: "1rem",
          flexWrap: "wrap",
          // justifyContent: "center"
        }}
      >
        {criterias.map((criterion, index) => (
          <Box key={index} display='flex' alignItems='center' sx={{ marginLeft:"10px"}}>
            {criterion.isValid ? (
              <CheckCircle className={styles.iconValid} sx={{fontSize: "1rem"}} />
            ) : (
              <Cancel className={styles.iconError} sx={{fontSize: "1rem"}}/>
            )}
            <Typography
              className={criterion.isValid ? styles.valid : styles.error}
              variant='body1'
              sx={{ fontSize: "1rem"}}
            >
              {criterion.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  valid: {
    color: colorPrimary,
  },
  error: {
    color: 'red',
  },
  iconValid: {
    color: colorPrimary,
    marginRight: theme.spacing(1),
  },
  iconError: {
    color: 'red',
    marginRight: theme.spacing(1),
  },
}));

export default PwdChecker;
