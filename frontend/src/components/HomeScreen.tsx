import React from 'react';
import { Box, Typography } from '@mui/material';

const HomeScreen: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant='h2' gutterBottom>
                Bienvenido a la aplicación de Portal de Capacitaciones
            </Typography>
        </Box>
    );
};

export default HomeScreen;