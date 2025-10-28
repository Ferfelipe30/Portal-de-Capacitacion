import React, { useEffect, useState } from 'react';
import { 
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Checkbox,
    FormControlLabel,
    Alert, 
} from '@mui/material';
import type { Usuario } from '../types/types';
import { createUsuario } from '../services/services';

interface CreateUsuarioProps {
    open: boolean;
    initialData?: Usuario;
    onClose: () => void;
    onSuccess: () => void;
}

const UsuarioModal: React.FC<CreateUsuarioProps> = ({ open, initialData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<Omit<Usuario, 'id_usuario'>>({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: '',
        departamento: '',
        estado: true,
        foto_perfil: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                apellido: initialData.apellido,
                email: initialData.email,
                password: '',
                rol: initialData.rol,
                departamento: initialData.departamento || '',
                estado: initialData.estado,
                foto_perfil: initialData.foto_perfil || '',
            });
        } else {
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                rol: '',
                departamento: '',
                estado: true,
                foto_perfil: '',
            });
        }
    }, [initialData, open]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (initialData && initialData.id_usuario) {
                const created = await createUsuario(formData);
                setSuccess(`Usuario creado: ${created.data.nombre} ${created.data.apellido}`);
            } else {
                setSuccess('Usuario guardado exitosamente');
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Error al guardar el usuario');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Rol"
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Departamento"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="estado"
                                checked={formData.estado}
                                onChange={handleChange}
                            />
                        }
                        label="Activo"
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UsuarioModal;