export type Categoria = 'Frontend' | 'Backend' | 'Data Science' | 'Cloud';
export type TipoCap = 'Interno' | 'Externo';
export type Nivel = 'Introductorio' | 'Intermedio' | 'Avanzado';
export type EstadoCurso = 'Borrador' | 'Publicado';

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  descripcionCorta?: string;
  categorias: Categoria[];
  tipo: TipoCap;
  nivel: Nivel;
  duracion?: string;
  idioma?: string;
  modalidad?: string;
  imagenUrl?: string;
  etiquetas?: string[];
  estado?: EstadoCurso;
  reconocimientoAutomatico?: boolean;
  instructor?: {
    nombre: string;
    cargo: string;
    foto: string;
  };
  modulos?: Modulo[];
}

export interface Modulo {
  id: string;
  titulo: string;
  orden: number;
  lecciones: Leccion[];
}

export interface Leccion {
  id: string;
  titulo: string;
  duracion: string;
  tipo: 'video' | 'documento' | 'quiz';
  contenidoUrl?: string;
  orden: number;
}

export interface Filtros {
  modulos: Set<Categoria>;
  tipos: Set<TipoCap>;
  niveles: Set<Nivel>;
}

export const TODAS_LAS_CATEGORIAS: Categoria[] = ['Frontend', 'Backend', 'Data Science', 'Cloud'];
export const TODOS_LOS_NIVELES: Nivel[] = ['Introductorio', 'Intermedio', 'Avanzado'];
export const TODOS_LOS_TIPOS: TipoCap[] = ['Interno', 'Externo'];