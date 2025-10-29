import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  MenuBook,
  AccessTime,
  EmojiEvents,
  TrendingUp,
  Lightbulb,
  People,
  Assessment,
} from '@mui/icons-material';
import { useAuth } from '../commons/auth/context/AuthContext';

interface Course {
  id: number;
  title: string;
  image: string;
  progress: number;
  timeRemaining: string;
  duration: string;
}

interface Badge {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const coursesInProgress: Course[] = [
    {
      id: 1,
      title: 'Módulo de Seguridad Avanzada',
      image: '/course1.jpg',
      progress: 75,
      timeRemaining: 'Quedan 2 horas',
      duration: '8h',
    },
    {
      id: 2,
      title: 'Introducción a la Gestión de Proyectos',
      image: '/course2.jpg',
      progress: 25,
      timeRemaining: 'Quedan 45 minutos',
      duration: '6h',
    },
  ];

  const assignedCourses: Course[] = [
    {
      id: 3,
      title: 'Fundamentos de Marketing',
      image: '/course3.jpg',
      progress: 0,
      timeRemaining: '',
      duration: '4 horas',
    },
    {
      id: 4,
      title: 'Liderazgo Efectivo',
      image: '/course4.jpg',
      progress: 0,
      timeRemaining: '',
      duration: '6 horas',
    },
    {
      id: 5,
      title: 'Análisis de Datos con Python',
      image: '/course5.jpg',
      progress: 0,
      timeRemaining: '',
      duration: '12 horas',
    },
  ];

  const badges: Badge[] = [
    {
      id: 1,
      name: 'Líder nato',
      icon: <EmojiEvents />,
      color: '#FFD700',
      description: 'Completaste 5 cursos de liderazgo',
    },
    {
      id: 2,
      name: 'Experto en Seguridad',
      icon: <MenuBook />,
      color: '#718096',
      description: 'Certificación en seguridad',
    },
    {
      id: 3,
      name: 'Colaborador del Mes',
      icon: <People />,
      color: '#0EA5E9',
      description: 'Ayudaste a 10+ compañeros',
    },
    {
      id: 4,
      name: 'Maestro de Proyectos',
      icon: <TrendingUp />,
      color: '#10B981',
      description: 'Completaste proyectos destacados',
    },
    {
      id: 5,
      name: 'Mente Creativa',
      icon: <Lightbulb />,
      color: '#EF4444',
      description: 'Innovación y creatividad',
    },
    {
      id: 6,
      name: 'Analista de Datos',
      icon: <Assessment />,
      color: '#8B5CF6',
      description: 'Experto en análisis',
    },
  ];

  const stats = [
    {
      label: 'Cursos Completados',
      value: 12,
      icon: <MenuBook />,
      color: '#E0F2FE',
    },
    {
      label: 'Horas de Formación',
      value: '48h',
      icon: <AccessTime />,
      color: '#DCFCE7',
    },
    {
      label: 'Certificados',
      value: 8,
      icon: <EmojiEvents />,
      color: '#FEF3C7',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¡Hola de nuevo, {user?.nombre}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ¡Sigue así! Has completado 3 cursos este mes.
          </Typography>
        </Box>

        {/* Contenedor Principal */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', lg: 'nowrap' } }}>
          {/* Columna Principal */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 65%' } }}>
            {/* Cursos en Progreso */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                En Progreso
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {coursesInProgress.map((course) => (
                  <Box
                    key={course.id}
                    sx={{
                      flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' },
                      minWidth: 0,
                    }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          height: 180,
                          bgcolor: '#1F2937',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 2,
                            height: 80,
                            bgcolor: 'white',
                            opacity: 0.5,
                          }}
                        />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {course.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#0EA5E9', fontWeight: 'medium' }}>
                            {course.progress}% completado
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.timeRemaining}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{ 
                            mb: 2, 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: '#E0F2FE',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#0EA5E9',
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: '#0EA5E9',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            py: 1,
                            '&:hover': { bgcolor: '#0284C7' },
                          }}
                        >
                          Continuar Aprendiendo
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Cursos Asignados */}
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                Cursos Asignados
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {assignedCourses.map((course) => (
                  <Box
                    key={course.id}
                    sx={{
                      flex: {
                        xs: '1 1 100%',
                        sm: '1 1 calc(50% - 8px)',
                        md: '1 1 calc(33.333% - 11px)',
                      },
                      minWidth: 0,
                    }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          height: 140,
                          bgcolor: '#E5E7EB',
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {course.duration}
                        </Typography>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: 2,
                            borderColor: '#0EA5E9',
                            color: '#0EA5E9',
                            textTransform: 'none',
                            fontWeight: 'medium',
                            '&:hover': {
                              borderColor: '#0284C7',
                              bgcolor: '#E0F2FE',
                            },
                          }}
                        >
                          Comenzar
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Columna Lateral */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 35%' } }}>
            {/* Mis Estadísticas */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                Mis Estadísticas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {stats.map((stat, index) => (
                  <Card key={index} sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: stat.color,
                            width: 48,
                            height: 48,
                            color: 'text.primary',
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {stat.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Insignias Obtenidas */}
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                Insignias Obtenidas
              </Typography>
              <Card sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'space-between',
                    }}
                  >
                    {badges.map((badge) => (
                      <Box
                        key={badge.id}
                        sx={{
                          flex: '1 1 calc(33.333% - 11px)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          minWidth: 70,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: badge.color,
                            width: 56,
                            height: 56,
                            mb: 1,
                            color: 'white',
                          }}
                        >
                          {badge.icon}
                        </Avatar>
                        <Typography 
                          variant="caption" 
                          fontWeight="medium"
                          sx={{ 
                            lineHeight: 1.2,
                            fontSize: '0.7rem'
                          }}
                        >
                          {badge.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;