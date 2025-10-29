import { useState, useEffect } from 'react';
import type { Curso } from '../types';

export function useAdminCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarCursos = async () => {
    setLoading(true);
    try {
      // const data = await obtenerCursos();
      // setCursos(data);
      // Mock temporal
      setCursos([]);
    } catch (err) {
      setError('Error al cargar cursos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const guardarCurso = async (curso: Partial<Curso>) => {
    setLoading(true);
    try {
      if (curso.id) {
        // await actualizarCurso(curso.id, curso);
        console.log('Actualizando curso:', curso);
      } else {
        // await crearCurso(curso);
        console.log('Creando curso:', curso);
      }
      await cargarCursos();
      return true;
    } catch (err) {
      setError('Error al guardar curso');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return {
    cursos,
    loading,
    error,
    cargarCursos,
    guardarCurso,
  };
}