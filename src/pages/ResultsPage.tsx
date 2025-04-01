import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

interface ReadingResults {
  totalWords: number;
  duration: number;
  wordsPerMinute: number;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ReadingResults | null>(null);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem('readingResults');
    if (!savedResults) {
      navigate('/');
      return;
    }
    setResults(JSON.parse(savedResults));

    // Відтворення звуку вітання
    const audio = new Audio('/success.mp3');
    audio.play().catch(error => console.log('Audio playback failed:', error));

    // Приховуємо конфетті через 5 секунд
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleTryAgain = () => {
    navigate('/');
  };

  if (!results) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      {showConfetti && <Confetti width={width} height={height} />}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Вітаємо з завершенням!
          </Typography>
        </Box>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            borderRadius: 2
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <TimerIcon color="primary" sx={{ fontSize: 30 }} />
                <Typography variant="h6">
                  Час читання: {Math.round(results.duration)} секунд
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <AutoStoriesIcon color="secondary" sx={{ fontSize: 30 }} />
                <Typography variant="h6">
                  Всього прочитано: {results.totalWords} слів
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <SpeedIcon color="success" sx={{ fontSize: 30 }} />
                <Typography variant="h5">
                  {results.wordsPerMinute} слів за хвилину
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleTryAgain}
                sx={{ 
                  mt: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                Спробувати ще раз
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResultsPage;
