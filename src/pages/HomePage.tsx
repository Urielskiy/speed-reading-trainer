import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const HomePage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleStart = () => {
    if (text.trim()) {
      localStorage.setItem('readingText', text);
      navigate('/settings');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <RemoveRedEyeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Тренажер швидкого читання
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
            "Око в центрі"
          </Typography>
        </Box>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            label="Введіть текст для читання"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleStart}
            disabled={!text.trim()}
          >
            Почати тренування
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
