import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';

const AuthPage = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to home page
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 1500); // Short delay for smooth transition
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        mb: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Перенаправлення на головну сторінку...
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage;
