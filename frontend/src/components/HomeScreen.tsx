import React from 'react';
import { Box, Typography, AppBar, Toolbar, Button} from '@mui/material';

const HomeScreen: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4, bgcolor: 'background.default' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        Bienvenido Portal de Capacitaciones
                    </Typography>
                    <Button color="inherit">
                        Iniciar Sesion
                    </Button>
                </Toolbar>
            </AppBar>
            
        </Box>
    );
};

export default HomeScreen;