import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, CircularProgress } from '@mui/material';
import { useAuth } from '../../auth/context/AuthContext';
import api from '../../../api/axios';

type Badge = {
  id_usuario_insignia: number;
  usuario: number;
  insignia: {
    id_insignia: number;
    nombre: string;
    descripcion: string;
    icono?: string | null;
    tipo?: string | null;
    puntos?: number | null;
    color?: string | null;
  };
  fecha_obtencion: string;
};

const PerfilScreen: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/usuarios/${user.id_usuario}/insignias/`);
        setBadges(data.data);
      } catch (err: any) {
        setError('No se pudo cargar las insignias.');
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Inicia sesión para ver tu perfil</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Perfil de {user.nombre} {user.apellido}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Mis Insignias
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {badges && badges.length > 0 ? (
            badges.map((b) => (
              <Box key={b.id_usuario_insignia} sx={{ flex: '1 1 280px', minWidth: 260, maxWidth: 400 }}>
                <Card>
                  <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: b.insignia.color || '#1976d2' }}>
                      {b.insignia.icono ? (
                        <img src={b.insignia.icono} alt={b.insignia.nombre} style={{ width: 36, height: 36 }} />
                      ) : (
                        b.insignia.nombre?.charAt(0)
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{b.insignia.nombre}</Typography>
                      <Typography variant="body2" color="text.secondary">{b.insignia.descripcion}</Typography>
                      <Typography variant="caption" color="text.secondary">Obtenida: {new Date(b.fecha_obtencion).toLocaleDateString()}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Typography variant="body2">Aún no tienes insignias. Completa capacitaciones para obtenerlas.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PerfilScreen;
