import React, { useState, useEffect } from 'react';
import { Typography, TextField, IconButton } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import PUTsession from '../../api/services/sessions/PUTsession';
import { makeStyles } from '@mui/styles';

interface TitleEditorProps {
  sessionId: string;
  sessionTitle: string;
  // handleSubmit: () => void;
}

const useStyles = makeStyles({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  textField: {
    width: '300px',
  },
  title: {
    flexGrow: 1,
  },
});

const TitleEditor: React.FC<TitleEditorProps> = ({ sessionId, sessionTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(sessionTitle);
  const [loading, setLoading] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    setTitle(sessionTitle);
  }, [sessionTitle]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      await PUTsession(sessionId, { title });
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du titre :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.titleContainer}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            disabled={loading}
            className={styles.textField}
          />
          <IconButton onClick={handleSaveClick} disabled={loading || !title.trim()}>
            <Save />
          </IconButton>
        </div>
      ) : (
        <div className={styles.viewContainer}>
          <Typography className={styles.title} variant="h1">
            {title || "Chargement du titre..."}
          </Typography>
          <IconButton onClick={handleEditClick}>
            <Edit />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TitleEditor;
