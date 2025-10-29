import type { Categoria, Curso, Filtros } from '../types';

export type CategoriaTab = 'Todos' | Categoria;

export function agruparPorCategoria(cursos: Curso[]) {
  const mapa: Record<Categoria, Curso[]> = { Frontend: [], Backend: [], 'Data Science': [], Cloud: [] };
  for (const c of cursos) {
    for (const cat of c.categorias) {
      mapa[cat].push(c);
    }
  }
  return mapa;
}

/**
 * Aplica el conjunto de filtros laterales y la pestaña activa.
 */
export function filtrarCursos(
  cursos: Curso[],
  pestaña: CategoriaTab,
  filtros: Filtros
): Curso[] {
  let res = cursos;

  // Pestaña superior
  if (pestaña !== 'Todos') {
    res = res.filter(c => c.categorias.includes(pestaña));
  }

  // Filtros laterales
  const { modulos, tipos, niveles } = filtros;

  if (modulos.size) {
    res = res.filter(c => c.categorias.some(cat => modulos.has(cat)));
  }
  if (tipos.size) {
    res = res.filter(c => tipos.has(c.tipo));
  }
  if (niveles.size) {
    res = res.filter(c => niveles.has(c.nivel));
  }

  // Eliminar duplicados si el mismo curso entró varias veces por múltiples categorías
  const vistos = new Set<string>();
  return res.filter(c => (vistos.has(c.id) ? false : (vistos.add(c.id), true)));
}