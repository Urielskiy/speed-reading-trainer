import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Slider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useSettings, Settings } from '../context/SettingsContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  const handleStart = () => {
    navigate('/trainer');
  };

  const handleSettingsChange = (key: keyof typeof settings) => (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    const value = event.target.value;
    updateSettings({ [key]: value });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Налаштування
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Швидкість (слів за хвилину): {settings.wordsPerMinute}
            </Typography>
            <Slider
              value={settings.wordsPerMinute}
              onChange={handleSettingsChange('wordsPerMinute')}
              min={100}
              max={1000}
              step={50}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Розмір шрифту: {settings.fontSize}px
            </Typography>
            <Slider
              value={settings.fontSize}
              onChange={handleSettingsChange('fontSize')}
              min={16}
              max={48}
              step={2}
            />
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Кількість слів за раз</InputLabel>
            <Select
              value={settings.wordsAtOnce}
              onChange={(e) => updateSettings({ wordsAtOnce: e.target.value as Settings['wordsAtOnce'] })}
              label="Кількість слів за раз"
            >
              <MenuItem value={1}>1 слово</MenuItem>
              <MenuItem value={2}>2 слова</MenuItem>
              <MenuItem value={3}>3 слова</MenuItem>
              <MenuItem value={4}>4 слова</MenuItem>
              <MenuItem value={5}>5 слів</MenuItem>
              <MenuItem value={6}>6 слів</MenuItem>
              <MenuItem value={7}>7 слів</MenuItem>
            </Select>
            <FormHelperText>
              Оберіть кількість слів, які ви хочете бачити одночасно
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Шрифт</InputLabel>
            <Select
              value={settings.font}
              onChange={handleSettingsChange('font')}
              label="Шрифт"
            >
              <MenuItem value="Roboto">Roboto</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Режим</InputLabel>
            <Select
              value={settings.mode}
              onChange={handleSettingsChange('mode')}
              label="Режим"
            >
              <MenuItem value="normal">Звичайний</MenuItem>
              <MenuItem value="sprint">Спринт</MenuItem>
              <MenuItem value="marathon">Марафон</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleStart}
          >
            Почати читання
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SettingsPage;
