import { useNavigate } from 'react-router-dom';
import { CURSOS_MOCK } from '../mock/cursos';
import type { Nivel, TipoCap } from '../types';
import { TODAS_LAS_CATEGORIAS } from '../types';
import { useCatalogo } from '../hooks/useCatalogo';

const tipos: TipoCap[] = ['Interno', 'Externo'];
const niveles: Nivel[] = ['Introductorio', 'Intermedio', 'Avanzado'];

export default function Catalogo() {
  const navigate = useNavigate();
  const { pestaña, setPestaña, filtros, resultado, toggleModulo, toggleTipo, toggleNivel, limpiar } =
    useCatalogo(CURSOS_MOCK);

  const handleVerMas = (cursoId: string) => {
    navigate(`/curso/${cursoId}`);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
      {/* Filtros laterales */}
      <aside style={{ borderRight: '1px solid #eee', paddingRight: 16 }}>
        <h3>Filtrar Cursos</h3>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Módulos Técnicos</div>
          {TODAS_LAS_CATEGORIAS.map((m) => (
            <label key={m} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={filtros.modulos.has(m)}
                onChange={() => toggleModulo(m)}
              />
              {m}
            </label>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Tipo de Capacitación</div>
          {tipos.map((t) => (
            <label key={t} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={filtros.tipos.has(t)}
                onChange={() => toggleTipo(t)}
              />
              {t}
            </label>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Nivel</div>
          {niveles.map((n) => (
            <label key={n} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={filtros.niveles.has(n)}
                onChange={() => toggleNivel(n)}
              />
              {n}
            </label>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={limpiar} style={{ padding: '8px 12px' }}>
            Limpiar Filtros
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <section>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Catálogo de Capacitaciones</h1>

        {/* Pestañas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['Todos', ...TODAS_LAS_CATEGORIAS] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPestaña(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                border: '1px solid #d0d7de',
                background: pestaña === tab ? '#0ea5e9' : '#fff',
                color: pestaña === tab ? '#fff' : '#111',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid de cursos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
          {resultado.map((c) => (
            <article key={c.id} style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 120, background: '#f3f4f6' }} />
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  {c.categorias.map((cat) => (
                    <span key={cat} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, background: '#eef6ff', border: '1px solid #cde1ff' }}>
                      {cat}
                    </span>
                  ))}
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, background: '#ecfdf5', border: '1px solid #ccfbf1' }}>
                    {c.tipo}
                  </span>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, background: '#fef3c7', border: '1px solid #fde68a' }}>
                    {c.nivel}
                  </span>
                </div>
                <h3 style={{ margin: '4px 0 6px' }}>{c.titulo}</h3>
                <p style={{ color: '#6b7280', minHeight: 44 }}>{c.descripcion}</p>
                <button 
                  onClick={() => handleVerMas(c.id)}
                  style={{ 
                    marginTop: 8, 
                    width: '100%', 
                    padding: '8px 12px', 
                    background: '#0ea5e9', 
                    color: '#fff', 
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}