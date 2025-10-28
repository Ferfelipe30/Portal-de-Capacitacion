import { useState } from 'react';
import type { Usuario } from '../types/types';
import { createUsuario } from '../services/services';

const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const addUsuario = async (usuarioData: Omit<Usuario, 'id_usuario'>) => {
        setLoading(true);
        setError(null);
        try {
            const newUsuario = await createUsuario(usuarioData);
            setUsuarios((prevUsuarios) => [...prevUsuarios, newUsuario.data]);
        } catch (err) {
            setError('Error al crear el usuario');
        } finally {
            setLoading(false);
        }
    };

    return {
        usuarios,
        loading,
        error,
        addUsuario,
    };
};

export default useUsuario;