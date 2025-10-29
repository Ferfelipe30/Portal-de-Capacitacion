import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import type { Curso, Categoria, Nivel } from '../types';
import { TODAS_LAS_CATEGORIAS, TODOS_LOS_NIVELES } from '../types';
import { useAdminCursos } from '../hooks/useAdminCursos';

interface CrearEditarCursoProps {
  cursoInicial?: Curso;
  onCancel?: () => void;
}

const CrearEditarCurso: React.FC<CrearEditarCursoProps> = ({ cursoInicial, onCancel }) => {
  const { guardarCurso } = useAdminCursos();
  const [imagenPreview, setImagenPreview] = useState<string | null>(cursoInicial?.imagenUrl || null);
  const [archivos, setArchivos] = useState<File[]>([]);
  const [formData, setFormData] = useState<Partial<Curso>>({
    titulo: cursoInicial?.titulo || '',
    descripcionCorta: cursoInicial?.descripcionCorta || '',
    categorias: cursoInicial?.categorias || [],
    nivel: (cursoInicial?.nivel ?? TODOS_LOS_NIVELES[0]) as Nivel,
    estado: cursoInicial?.estado || 'Borrador',
    reconocimientoAutomatico: cursoInicial?.reconocimientoAutomatico || false,
  });

  const handleChange = (field: keyof Curso) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCategoriaChange = (event: any) => {
    setFormData({
      ...formData,
      categorias: [event.target.value as Categoria],
    });
  };

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArchivosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArchivos(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    const success = await guardarCurso(formData);
    if (success && onCancel) {
      onCancel();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Columna izquierda - Información del Curso */}
      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Información del Curso
          </Typography>

          <TextField
            fullWidth
            label="Título del Curso"
            placeholder="Ej: Introducción a Tailwind CSS"
            value={formData.titulo}
            onChange={handleChange('titulo')}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Descripción Corta"
            placeholder="Un resumen conciso del contenido del curso..."
            multiline
            rows={4}
            value={formData.descripcionCorta}
            onChange={handleChange('descripcionCorta')}
            sx={{ mt: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Módulo Técnico</InputLabel>
              <Select
                value={formData.categorias?.[0] || ''}
                onChange={handleCategoriaChange}
                label="Módulo Técnico"
              >
                {TODAS_LAS_CATEGORIAS.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Nivel de Dificultad</InputLabel>
              <Select
                value={formData.nivel}
                onChange={handleChange('nivel')}
                label="Nivel de Dificultad"
              >
                {TODOS_LOS_NIVELES.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Material del Curso */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Material del Curso
            </Typography>

            <Paper
              sx={{
                border: '2px dashed #d0d7de',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#f6f8fa' },
                mt: 2,
              }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: '#57606a', mb: 1 }} />
              <Typography variant="body1" fontWeight="bold" color="text.primary">
                Arrastra y suelta archivos aquí
              </Typography>
              <Typography variant="body2" color="text.secondary">
                o haz clic para seleccionar (Videos, PDFs, ZIP)
              </Typography>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.mp4,.zip"
                style={{ display: 'none' }}
                onChange={handleArchivosChange}
              />
            </Paper>

            {archivos.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {archivos.length} archivo(s) seleccionado(s):
                </Typography>
                {archivos.map((file, index) => (
                  <Typography key={index} variant="body2">
                    • {file.name}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Columna derecha - Configuración */}
      <Box sx={{ width: { xs: '100%', md: '350px' } }}>
        <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Configuración
          </Typography>

          {/* Imagen de Portada */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Imagen de Portada
            </Typography>
            <Paper
              sx={{
                border: '1px dashed #d0d7de',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: imagenPreview ? `url(${imagenPreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {!imagenPreview && (
                <>
                  <CloudUploadIcon sx={{ fontSize: 40, color: '#57606a', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Subir imagen
                  </Typography>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImagenChange}
              />
            </Paper>
          </Box>

          {/* Estado */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" fontWeight="bold">
                Estado
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Borrador
                </Typography>
                <Switch
                  checked={formData.estado === 'Publicado'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estado: e.target.checked ? 'Publicado' : 'Borrador',
                    })
                  }
                />
                <Typography variant="body2" color="primary">
                  Publicado
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Reconocimiento Automático */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.reconocimientoAutomatico}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reconocimientoAutomatico: e.target.checked,
                  })
                }
              />
            }
            label="Reconocimiento Automático"
            sx={{ mt: 2 }}
          />

          {/* Botones */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              sx={{ mb: 2 }}
            >
              Guardar Cambios
            </Button>
            {onCancel && (
              <Button variant="outlined" fullWidth size="large" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CrearEditarCurso;