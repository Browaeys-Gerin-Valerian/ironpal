import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { isValidPassword } from '../../utils/functions/validator';

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
      <Typography variant='h6' gutterBottom>
        Le mot de passe doit :
      </Typography>
      <Box display='flex' flexDirection='column' gap={1}>
        {criterias.map((criterion, index) => (
          <Box key={index} display='flex' alignItems='center'>
            {criterion.isValid ? (
              <CheckCircle className={styles.iconValid} />
            ) : (
              <Cancel className={styles.iconError} />
            )}
            <Typography
              className={criterion.isValid ? styles.valid : styles.error}
              variant='body1'
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
    color: 'green',
  },
  error: {
    color: 'red',
  },
  iconValid: {
    color: 'green',
    marginRight: theme.spacing(1),
  },
  iconError: {
    color: 'red',
    marginRight: theme.spacing(1),
  },
}));

export default PwdChecker;
