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
  Avatar,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import UsuarioScreen from "../commons/usuario/screens/usuarioScreen";
import Catalogo from "../commons/capacitaciones/Catalogo/Catalogo";
import AdminCursosScreen from "../commons/capacitaciones/screens/AdminCursosScreen";
import CursoDetalleScreen from "../commons/capacitaciones/screens/CursoDetalleScreen";
import Dashboard from "./Dashboard";
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
            bgcolor: '#ffffff',
            borderRight: '1px solid #e0e0e0',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Logo y título */}
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#1976d2',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <SchoolIcon fontSize="small" />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            Training Portal
          </Typography>
        </Box>

        {/* Perfil del usuario */}
        <Box sx={{ px: 2, py: 2.5, bgcolor: '#f5f5f5', mx: 2, borderRadius: 2, mb: 2 }}>
            <Avatar
              src={user?.foto_perfil ?? undefined}
              sx={{ width: 40, height: 40, bgcolor: '#1976d2' }}
            >
              {user?.nombre?.[0]}{user?.apellido?.[0]}
            </Avatar>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography variant="body2" fontWeight="bold" noWrap>
                {user?.nombre} {user?.apellido}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.rol === 'admin' ? 'Administrator' : user?.rol === 'instructor' ? 'Instructor' : 'Software Engineer'}
              </Typography>
            </Box>
          </Box>

        {/* Lista de navegación */}
        <Box sx={{ overflow: 'auto', flex: 1 }}>
          <List sx={{ px: 1 }}>
            <ListItemButton 
              onClick={() => handleNavigation('/dashboard')}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                bgcolor: '#E3F2FD',
                '&:hover': { bgcolor: '#BBDEFB' }
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{ 
                  fontWeight: 'medium',
                  color: '#1976d2'
                }}
              />
            </ListItemButton>

            <ListItemButton 
              onClick={() => handleNavigation('/catalogo')}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Course Catalog" />
            </ListItemButton>

            <ListItemButton 
              onClick={() => handleNavigation('/schedule')}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="My Schedule" />
            </ListItemButton>

            {/* Mostrar Administración solo a admin e instructor */}
            {isAdminOrInstructor && (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItemButton 
                  onClick={() => handleNavigation('/admin/cursos')}
                  sx={{ 
                    borderRadius: 1.5,
                    mb: 0.5,
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Administration" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>

        {/* Sección inferior */}
        <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
          <List sx={{ px: 1, py: 1 }}>
            <ListItemButton 
              onClick={() => handleNavigation('/configuracion')}
              sx={{ 
                borderRadius: 1.5,
                mb: 0.5,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 1.5,
                '&:hover': { bgcolor: '#ffebee' }
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fafafa', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<UsuarioScreen />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/curso/:cursoId" element={<CursoDetalleScreen />} />
          <Route path="/schedule" element={<Box sx={{ p: 3 }}><Typography variant="h4">My Schedule</Typography></Box>} />
          <Route path="/configuracion" element={<Box sx={{ p: 3 }}><Typography variant="h4">Settings</Typography></Box>} />
          
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