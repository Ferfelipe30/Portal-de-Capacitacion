import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  LinearProgress,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Code as CodeIcon,
  Cloud as CloudIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
  EmojiEvents as EmojiEventsIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAuth } from '../commons/auth/context/AuthContext';

// Mock data - reemplazar con datos reales del API
const estadisticasMock = {
  cursosCompletados: 14,
  horasTotales: 82,
  insigniasObtenidas: 8,
  objetivoAnual: 100,
  progresoAnual: 75,
};

const insigniasMock = [
  { id: '1', nombre: 'Code Starter', icono: <CodeIcon />, color: '#FDB022', desbloqueado: true },
  { id: '2', nombre: 'Cloud Novice', icono: <CloudIcon />, color: '#4285F4', desbloqueado: true },
  { id: '3', nombre: 'First 5 Courses', icono: <CheckCircleIcon />, color: '#34A853', desbloqueado: true },
  { id: '4', nombre: 'Module Master', icono: <SchoolIcon />, color: '#9C27B0', desbloqueado: true },
  { id: '5', nombre: 'Security Pro', icono: <SecurityIcon />, color: '#EA4335', desbloqueado: true },
  { id: '6', nombre: 'Team Player', icono: <ShareIcon />, color: '#FF9800', desbloqueado: true },
  { id: '7', nombre: 'Graduate', icono: <SchoolIcon />, color: '#E0E0E0', desbloqueado: false },
  { id: '8', nombre: 'Data Whiz', icono: <TrendingUpIcon />, color: '#E0E0E0', desbloqueado: false },
];

const logrosMock = [
  {
    id: '1',
    titulo: 'First 5 Courses Completed',
    descripcion: 'Unlocked on Oct 1, 2023',
    icono: <CheckCircleIcon sx={{ color: '#34A853' }} />,
  },
  {
    id: '2',
    titulo: 'Master of Module X',
    descripcion: 'Unlocked on Sep 15, 2023',
    icono: <EmojiEventsIcon sx={{ color: '#9C27B0' }} />,
  },
];

const actividadesRecientesMock = [
  {
    id: '1',
    tipo: 'completado' as const,
    titulo: "Completed 'Advanced Python'",
    tiempo: '2d ago',
    color: '#34A853',
    icono: <CheckCircleIcon />,
  },
  {
    id: '2',
    tipo: 'insignia' as const,
    titulo: "Earned 'Data Whiz' badge",
    tiempo: '17d ago',
    color: '#FDB022',
    icono: <StarIcon />,
  },
  {
    id: '3',
    tipo: 'iniciado' as const,
    titulo: "Started 'Machine Learning Basics'",
    tiempo: '19d ago',
    color: '#4285F4',
    icono: <TrendingUpIcon />,
  },
];

const cursosCompletadosMock = [
  {
    id: '1',
    titulo: 'Advanced Python Programming',
    fechaCompletado: '2023-10-15',
    certificadoUrl: '#',
  },
  {
    id: '2',
    titulo: 'Introduction to Cloud Computing',
    fechaCompletado: '2023-09-22',
    certificadoUrl: '#',
  },
  {
    id: '3',
    titulo: 'Cybersecurity Fundamentals',
    fechaCompletado: '2023-08-01',
    certificadoUrl: '#',
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Progress Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.nombre}! Here's a summary of your learning journey.
        </Typography>
      </Box>

      {/* Estadísticas principales */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Paper sx={{ flex: '1 1 200px', p: 3, borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Courses Completed
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="primary">
            {estadisticasMock.cursosCompletados}
          </Typography>
        </Paper>

        <Paper sx={{ flex: '1 1 200px', p: 3, borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Total Hours
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="primary">
            {estadisticasMock.horasTotales}
          </Typography>
        </Paper>

        <Paper sx={{ flex: '1 1 200px', p: 3, borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Badges Earned
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="primary">
            {estadisticasMock.insigniasObtenidas}
          </Typography>
        </Paper>

        <Paper sx={{ flex: '1 1 200px', p: 3, borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Annual Training Target
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant="determinate"
                value={estadisticasMock.progresoAnual}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#34A853',
                  },
                }}
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="#34A853">
              {estadisticasMock.progresoAnual}%
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Columna izquierda */}
        <Box sx={{ flex: 1 }}>
          {/* Insignias */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              My Badges
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
              {insigniasMock.map((insignia) => (
                <Box
                  key={insignia.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    opacity: insignia.desbloqueado ? 1 : 0.4,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: insignia.color,
                      boxShadow: insignia.desbloqueado ? 2 : 0,
                    }}
                  >
                    {insignia.icono}
                  </Avatar>
                  <Typography
                    variant="caption"
                    align="center"
                    sx={{ maxWidth: 80, fontSize: '0.7rem' }}
                  >
                    {insignia.nombre}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Cursos completados */}
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Completed Courses
            </Typography>
            <List>
              {cursosCompletadosMock.map((curso) => (
                <ListItem
                  key={curso.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {curso.titulo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Completed on: {curso.fechaCompletado}
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<DownloadIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Certificate
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Columna derecha */}
        <Box sx={{ width: { xs: '100%', lg: 400 } }}>
          {/* Logros */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Achievements
            </Typography>
            {logrosMock.map((logro) => (
              <Card key={logro.id} sx={{ mb: 2, boxShadow: 0, border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'transparent' }}>{logro.icono}</Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {logro.titulo}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {logro.descripcion}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>

          {/* Actividad reciente */}
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {actividadesRecientesMock.map((actividad) => (
                <ListItem key={actividad.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: actividad.color, width: 40, height: 40 }}>
                      {actividad.icono}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={actividad.titulo}
                    secondary={actividad.tiempo}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;