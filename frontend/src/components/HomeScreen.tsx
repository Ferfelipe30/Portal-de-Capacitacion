import React from 'react';
import { Box, Typography, AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../commons/auth/context/AuthContext';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate("/login");
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4, bgcolor: 'background.default' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        Bienvenido Portal de Capacitaciones
                    </Typography>
                    {isAuthenticated ? (
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1">
                                    {user?.nombre} {user?.apellido}
                                </Typography>
                                <IconButton
                                    size="large"
                                    aria-label="cuenta del usuario"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    {user?.foto_perfil ? (
                                        <Avatar src={user.foto_perfil} alt={user.nombre} />
                                    ) : (
                                        <AccountCircle />
                                    )}
                                </IconButton>
                            </Box>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem disabled>
                                    <Typography variant="body2">
                                        {user?.email}
                                    </Typography>
                                </MenuItem>
                                <MenuItem disabled>
                                    <Typography variant="body2" color="text.secondary">
                                        {user?.rol} - {user?.departamento}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
                                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={handleLogin}>
                            Iniciar Sesión
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 10 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido{isAuthenticated ? `, ${user?.nombre}` : ''}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Sistema de gestión de capacitaciones
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeScreen;