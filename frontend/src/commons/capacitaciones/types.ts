export type Categoria = 'Frontend' | 'Backend' | 'Data Science' | 'Cloud';
export type TipoCap = 'Interno' | 'Externo';
export type Nivel = 'Introductorio' | 'Intermedio' | 'Avanzado';

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  categorias: Categoria[];
  tipo: TipoCap;
  nivel: Nivel;
  imagenUrl?: string;
  etiquetas?: string[];
}

export interface Filtros {
  // Si está vacío, no restringe
  modulos: Set<Categoria>;
  tipos: Set<TipoCap>;
  niveles: Set<Nivel>;
}

export const TODAS_LAS_CATEGORIAS: Categoria[] = ['Frontend', 'Backend', 'Data Science', 'Cloud'];