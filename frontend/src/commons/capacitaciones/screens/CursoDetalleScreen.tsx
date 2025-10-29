import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayCircleOutline,
  Description,
  Quiz,
  Schedule,
  BarChart,
  Language,
  VideoLibrary,
  EmojiEvents,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface Leccion {
  id: string;
  titulo: string;
  duracion: string;
  tipo: 'video' | 'documento' | 'quiz';
  icono: React.ReactElement;
}

interface Modulo {
  id: string;
  titulo: string;
  lecciones: Leccion[];
}

interface CursoDetalle {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  duracion: string;
  nivel: string;
  idioma: string;
  modalidad: string;
  instructor: {
    nombre: string;
    cargo: string;
    foto: string;
  };
  acerca: string;
  modulos: Modulo[];
}

// Mock data - reemplazar con datos reales del API
const CURSO_MOCK: CursoDetalle = {
  id: '1',
  titulo: 'Introducción a la Ciberseguridad',
  descripcion: 'Protege los activos digitales de la organización contra amenazas modernas.',
  imagenUrl: '/curso-cyber.jpg',
  duracion: '6 Horas',
  nivel: 'Intermedio',
  idioma: 'Español',
  modalidad: 'En línea',
  instructor: {
    nombre: 'Ana Torres',
    cargo: 'Directora de Seguridad de la Información',
    foto: '/instructor.jpg',
  },
  acerca: `En este curso, aprenderás los fundamentos y técnicas avanzadas para dominar la ciberseguridad. 
  Cubriremos todo, desde los conceptos básicos como la gestión de contraseñas y la identificación de 
  phishing, hasta las aplicaciones prácticas de defensa de redes. Adquirirás las habilidades necesarias 
  para aplicar estos conocimientos en tu trabajo diario y proteger la información sensible de nuestra 
  empresa. Este curso está diseñado para ser interactivo y práctico.`,
  modulos: [
    {
      id: 'm1',
      titulo: 'Módulo 1: Fundamentos de Seguridad',
      lecciones: [
        {
          id: 'l1',
          titulo: '1.1 Introducción a las Amenazas Digitales',
          duracion: '15 min',
          tipo: 'video',
          icono: <PlayCircleOutline />,
        },
        {
          id: 'l2',
          titulo: '1.2 Políticas de Contraseñas Seguras',
          duracion: '10 min',
          tipo: 'documento',
          icono: <Description />,
        },
        {
          id: 'l3',
          titulo: '1.3 Quiz del Módulo 1',
          duracion: '5 min',
          tipo: 'quiz',
          icono: <Quiz />,
        },
      ],
    },
    {
      id: 'm2',
      titulo: 'Módulo 2: Protección de Datos',
      lecciones: [
        {
          id: 'l4',
          titulo: '2.1 Encriptación y Seguridad',
          duracion: '20 min',
          tipo: 'video',
          icono: <PlayCircleOutline />,
        },
        {
          id: 'l5',
          titulo: '2.2 Backup y Recuperación',
          duracion: '15 min',
          tipo: 'video',
          icono: <PlayCircleOutline />,
        },
      ],
    },
  ],
};

const CursoDetalleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cursoId } = useParams<{ cursoId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [expandedModule, setExpandedModule] = useState<string | false>('m1');

  // En producción, cargar datos reales según cursoId
  const curso = CURSO_MOCK;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleModuleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedModule(isExpanded ? panel : false);
  };

  const handleInscripcion = () => {
    // Lógica de inscripción
    console.log('Inscribirse al curso:', cursoId);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 3, pb: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Inicio
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/catalogo')}
          >
            Catálogo de Cursos
          </Link>
          <Typography color="text.primary">{curso.titulo}</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 350px' }, gap: 3 }}>
          {/* Contenido principal */}
          <Box>
            {/* Banner del curso */}
            <Paper
              sx={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/cyber-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                p: 4,
                borderRadius: 2,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {curso.titulo}
              </Typography>
              <Typography variant="body1">{curso.descripcion}</Typography>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ mt: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Descripción" />
                <Tab label="Temario" />
                <Tab label="Requisitos" />
                <Tab label="Discusiones" />
              </Tabs>

              {/* Tab Descripción */}
              {tabValue === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Acerca de este curso
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {curso.acerca}
                  </Typography>
                </Box>
              )}

              {/* Tab Temario */}
              {tabValue === 1 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Temario del Curso
                  </Typography>

                  {curso.modulos.map((modulo) => (
                    <Accordion
                      key={modulo.id}
                      expanded={expandedModule === modulo.id}
                      onChange={handleModuleChange(modulo.id)}
                      sx={{ mt: 2 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight="bold">{modulo.titulo}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {modulo.lecciones.map((leccion) => (
                            <ListItem
                              key={leccion.id}
                              sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                mb: 1,
                                '&:hover': { bgcolor: '#f5f5f5' },
                              }}
                            >
                              <ListItemIcon>{leccion.icono}</ListItemIcon>
                              <ListItemText primary={leccion.titulo} />
                              <Typography variant="body2" color="text.secondary">
                                {leccion.duracion}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {/* Tab Requisitos */}
              {tabValue === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Requisitos
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    • Conocimientos básicos de informática
                    <br />
                    • Computadora con acceso a internet
                    <br />• Interés en seguridad informática
                  </Typography>
                </Box>
              )}

              {/* Tab Discusiones */}
              {tabValue === 3 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Discusiones
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Las discusiones estarán disponibles una vez inscrito al curso.
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Instructor */}
            <Paper sx={{ mt: 3, p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Instructor
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={curso.instructor.foto} sx={{ width: 64, height: 64 }}>
                  {curso.instructor.nombre.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {curso.instructor.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {curso.instructor.cargo}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Sidebar derecho */}
          <Box>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleInscripcion}
                sx={{ mb: 3, py: 1.5 }}
              >
                Inscribirse al Curso
              </Button>

              {/* Información del curso */}
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Duración"
                    secondary={curso.duracion}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <BarChart color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Nivel"
                    secondary={curso.nivel}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Idioma"
                    secondary={curso.idioma}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <VideoLibrary color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modalidad"
                    secondary={curso.modalidad}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>

              {/* Reconocimiento */}
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Reconocimiento
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <EmojiEvents sx={{ fontSize: 48, color: '#FFD700' }} />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Completa el curso para recibir una insignia digital y un certificado de finalización.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CursoDetalleScreen;