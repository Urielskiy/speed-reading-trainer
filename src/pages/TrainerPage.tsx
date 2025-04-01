import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSettings } from '../context/SettingsContext';

const TrainerPage = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, updateStatistics } = useSettings();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [showSettings, setShowSettings] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    startTime: Date.now(),
    wordsRead: 0,
  });

  useEffect(() => {
    const savedText = localStorage.getItem('readingText');
    
    if (!savedText) {
      navigate('/');
      return;
    }

    setWords(savedText.split(/\s+/));
    setStartTime(Date.now());
    setSessionStats({ startTime: Date.now(), wordsRead: 0 });
  }, [navigate]);

  const getCurrentWords = useCallback(() => {
    if (currentWordIndex >= words.length) return '';
    return words
      .slice(currentWordIndex, currentWordIndex + settings.wordsAtOnce)
      .join(' ');
  }, [currentWordIndex, words, settings.wordsAtOnce]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (currentWordIndex >= words.length) {
        setIsPlaying(false);
        const endTime = Date.now();
        const duration = (endTime - sessionStats.startTime) / 1000;
        const speed = Math.round((sessionStats.wordsRead / duration) * 60);
        const accuracy = 100; // В майбутньому можна додати перевірку розуміння тексту

        updateStatistics({ speed, accuracy });
        localStorage.setItem('readingResults', JSON.stringify({
          totalWords: words.length,
          duration,
          wordsPerMinute: speed,
        }));
        navigate('/results');
        return;
      }

      setCurrentWordIndex((prev) => prev + settings.wordsAtOnce);
      setSessionStats(prev => ({
        ...prev,
        wordsRead: prev.wordsRead + settings.wordsAtOnce,
      }));
    }, (60 / settings.wordsPerMinute) * 1000);

    return () => clearInterval(interval);
  }, [currentWordIndex, words.length, settings, isPlaying, navigate, sessionStats, updateStatistics]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSettingsChange = (key: keyof typeof settings) => (
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    const value = event.target.value;
    updateSettings({ [key]: value });
  };

  if (words.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            minHeight: '300px',
            justifyContent: 'center',
          }}
        >
          {settings.showFixationPoint && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                bgcolor: 'primary.main',
                transform: 'translate(-50%, -50%)',
                opacity: 0.5,
              }}
            />
          )}
          
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: `${settings.fontSize}px`,
              mb: 4,
              minHeight: `${settings.fontSize * 1.5}px`,
              fontFamily: settings.font,
            }}
          >
            {getCurrentWords()}
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color={isPlaying ? 'secondary' : 'primary'}
              onClick={togglePlay}
              size="large"
            >
              {isPlaying ? 'Пауза' : 'Продовжити'}
            </Button>
            <IconButton 
              onClick={() => setShowSettings(true)}
              disabled={isPlaying}
              color="primary"
            >
              <SettingsIcon />
            </IconButton>
          </Box>

          <Typography sx={{ mt: 2 }}>
            Прогрес: {Math.round((currentWordIndex / words.length) * 100)}%
          </Typography>
        </Paper>

        <Dialog
          open={showSettings && !isPlaying}
          onClose={() => setShowSettings(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              p: 2,
              borderRadius: 2,
            }
          }}
        >
          <DialogTitle>
            <Typography variant="h6" align="center">
              Налаштування
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ width: '100%', mt: 2 }}>
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

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Кількість слів за раз</InputLabel>
                <Select
                  value={settings.wordsAtOnce}
                  onChange={handleSettingsChange('wordsAtOnce')}
                  label="Кількість слів за раз"
                >
                  <MenuItem value={1}>1 слово</MenuItem>
                  <MenuItem value={2}>2 слова</MenuItem>
                  <MenuItem value={3}>3 слова</MenuItem>
                </Select>
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

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showFixationPoint}
                    onChange={(e) => 
                      updateSettings({ showFixationPoint: e.target.checked })
                    }
                  />
                }
                label="Показувати точку фіксації"
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default TrainerPage;
