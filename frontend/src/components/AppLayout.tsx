import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeScreen from "./HomeScreen";
import UsuarioScreen from "../commons/usuario/screens/usuarioScreen";
import Catalogo from "../commons/capacitaciones/Catalogo/Catalogo";
import AdminCursosScreen from "../commons/capacitaciones/screens/AdminCursosScreen";
import CursoDetalleScreen from "../commons/capacitaciones/screens/CursoDetalleScreen";
import { useAuth } from "../commons/auth/context/AuthContext";

const drawerWidth = 240;

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Verificar si el usuario tiene permisos de administración
  const isAdminOrInstructor = user && (user.rol === 'admin' || user.rol === 'instructor');

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#fafafa',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Header del Drawer */}
        <Box sx={{ p: 2.5, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
            Portal de Capacitación
          </Typography>
          {isAdminOrInstructor && (
            <Typography variant="caption" color="text.secondary">
              Modo Administrador
            </Typography>
          )}
        </Box>

        {/* Lista de navegación */}
        <Box sx={{ overflow: 'auto', mt: 1 }}>
          <List>
            <ListItemButton 
              onClick={() => handleNavigation('/dashboard')}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#e3f2fd' }
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton 
              onClick={() => handleNavigation('/catalogo')}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#e3f2fd' }
              }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Catálogo de Cursos" />
            </ListItemButton>

            {/* Mostrar Administración solo a admin e instructor */}
            {isAdminOrInstructor && (
              <ListItemButton 
                onClick={() => handleNavigation('/admin/cursos')}
                sx={{ 
                  mx: 1, 
                  borderRadius: 1,
                  bgcolor: '#e3f2fd',
                  '&:hover': { bgcolor: '#bbdefb' }
                }}
              >
                <ListItemIcon>
                  <BuildIcon sx={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Administración" 
                  primaryTypographyProps={{ 
                    fontWeight: 'medium',
                    color: '#1976d2'
                  }} 
                />
              </ListItemButton>
            )}

            <ListItemButton 
              onClick={() => handleNavigation('/perfil')}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#e3f2fd' }
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Sección inferior */}
          <List>
            <ListItemButton 
              onClick={() => handleNavigation('/configuracion')}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#e3f2fd' }
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>

            <ListItemButton 
              onClick={handleLogout}
              sx={{ 
                mx: 1, 
                borderRadius: 1,
                '&:hover': { bgcolor: '#ffebee' }
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/dashboard" element={<HomeScreen />} />
          <Route path="/usuarios" element={<UsuarioScreen />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/curso/:cursoId" element={<CursoDetalleScreen />} />
          <Route path="/perfil" element={<Box><Typography variant="h4">Mi Perfil</Typography></Box>} />
          <Route path="/configuracion" element={<Box><Typography variant="h4">Configuración</Typography></Box>} />
          
          {/* Ruta protegida para administración */}
          {isAdminOrInstructor && (
            <Route path="/admin/cursos" element={<AdminCursosScreen />} />
          )}
        </Routes>
      </Box>
    </Box>
  );
};

export default AppLayout;