import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  icon,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        {title} {icon && 
        <span 
          style={{ 
            marginLeft: '2px', 
            display: 'flex', 
            alignItems: 'center',
          }}
        >
        {icon}
        </span>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{ __html: message }} />
      </DialogContent>
      <DialogActions
       sx={{
        padding: '10px 20px',
       }}
      >
        <Button onClick={onCancel} color="secondary" variant="outlined">
          Non
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;