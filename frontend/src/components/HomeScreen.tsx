import React from 'react';
import { Box, Typography, AppBar, Toolbar, Button} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4, bgcolor: 'background.default' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        Bienvenido Portal de Capacitaciones
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login" onClick={handleLogin}>
                        Iniciar Sesion
                    </Button>
                </Toolbar>
            </AppBar>
            
        </Box>
    );
};

export default HomeScreen;