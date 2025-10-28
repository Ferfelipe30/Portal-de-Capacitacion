export interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: 'admin' | 'instructor' | 'colaborador' | '';
    departamento?: string;
    fecha_registro?: string;
    ultima_conexion?: string;
    estado?: true | false;
    foto_perfil?: string;
}