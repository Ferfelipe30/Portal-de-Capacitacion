import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import Login from '../components/Login';

const LoginScreen: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Login />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginScreen;