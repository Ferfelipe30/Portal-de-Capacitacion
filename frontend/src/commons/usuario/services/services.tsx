import api from '../../../api/axios';
import type { Usuario } from '../types/types';
import type { ApiResponse } from '../../../types/types';

export const createUsuario = async (usuario: Omit<Usuario, 'id_usuario'>): Promise<ApiResponse<Usuario>> => {
    const response = await api.post<ApiResponse<Usuario>>('/usuarios/crear/', usuario);
    console.log('response.data', response.data);
    return response.data;
};