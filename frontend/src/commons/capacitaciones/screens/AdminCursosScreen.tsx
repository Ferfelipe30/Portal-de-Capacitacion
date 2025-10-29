import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import CrearEditarCurso from '../components/CrearEditarCurso';
import GestionarParticipantes from '../components/GestionarParticipantes';

const AdminCursosScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Verificar permisos
  if (!user || (user.rol !== 'admin' && user.rol !== 'instructor')) {
    navigate('/');
    return null;
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setMostrarFormulario(false);
  };

  const handleNuevoCurso = () => {
    setMostrarFormulario(true);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 0, pb: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 3,
          pt: 2
        }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
              Administración de Cursos
            </Typography>
          </Box>
          {tabValue === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleNuevoCurso}
              size="large"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1.5
              }}
            >
              Agregar Nuevo Curso
            </Button>
          )}
        </Box>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: 160
              }
            }}
          >
            <Tab label="Crear/Editar Curso" />
            <Tab label="Gestionar Participantes" />
          </Tabs>

          {/* Contenido de las tabs */}
          <Box sx={{ p: 4, bgcolor: '#fafafa', minHeight: '70vh' }}>
            {tabValue === 0 && (
              <>
                {mostrarFormulario ? (
                  <CrearEditarCurso onCancel={() => setMostrarFormulario(false)} />
                ) : (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 12,
                    bgcolor: 'white',
                    borderRadius: 2
                  }}>
                    <Typography variant="h5" fontWeight="medium" color="text.secondary" gutterBottom>
                      No hay cursos en edición
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      Haz clic en "Agregar Nuevo Curso" para comenzar a crear contenido
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleNuevoCurso}
                      size="large"
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 4,
                        py: 1.5
                      }}
                    >
                      Agregar Nuevo Curso
                    </Button>
                  </Box>
                )}
              </>
            )}

            {tabValue === 1 && <GestionarParticipantes />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminCursosScreen;