import { useMemo, useState } from 'react';
import type { Categoria, Curso, Filtros, Nivel, TipoCap } from '../types';
import { filtrarCursos } from '../utils/categorization';

export type Pestaña = 'Todos' | Categoria;

const filtrosVacios: Filtros = {
  modulos: new Set<Categoria>(),
  tipos: new Set<TipoCap>(),
  niveles: new Set<Nivel>(),
};

export function useCatalogo(cursos: Curso[]) {
  const [pestaña, setPestaña] = useState<Pestaña>('Todos');
  const [filtros, setFiltros] = useState<Filtros>(filtrosVacios);

  const resultado = useMemo(() => filtrarCursos(cursos, pestaña, filtros), [cursos, pestaña, filtros]);

  const toggleModulo = (m: Categoria) =>
    setFiltros(f => {
      const mod = new Set(f.modulos);
      mod.has(m) ? mod.delete(m) : mod.add(m);
      return { ...f, modulos: mod };
    });

  const toggleTipo = (t: TipoCap) =>
    setFiltros(f => {
      const tipos = new Set(f.tipos);
      tipos.has(t) ? tipos.delete(t) : tipos.add(t);
      return { ...f, tipos };
    });

  const toggleNivel = (n: Nivel) =>
    setFiltros(f => {
      const niveles = new Set(f.niveles);
      niveles.has(n) ? niveles.delete(n) : niveles.add(n);
      return { ...f, niveles };
    });

  const limpiar = () => setFiltros(filtrosVacios);

  return {
    pestaña,
    setPestaña,
    filtros,
    resultado,
    toggleModulo,
    toggleTipo,
    toggleNivel,
    limpiar,
  };
}