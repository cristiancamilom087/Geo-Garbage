import React from 'react';

export default function Reportes() {
  const reportesSimulados = [
    { id: 1, nombre: 'Esquina Parque Central', estado: 'Reportado', gravedad: 'Medio' },
    { id: 2, nombre: 'Lote Av. Ferrocarril', estado: 'En Proceso', gravedad: 'Alto' },
    { id: 3, nombre: 'Sector Quebrada La Dulcera', estado: 'Limpio', gravedad: 'Crítico' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Listado de Microbasureros Registrados</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }} aria-label="Tabla de microbasureros">
        <thead>
          <tr style={{ background: '#f0f0f0', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Ubicación</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Estado</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Gravedad</th>
          </tr>
        </thead>
        <tbody>
          {reportesSimulados.map((rep) => (
            <tr key={rep.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{rep.nombre}</td>
              <td style={{ padding: '10px' }}>{rep.estado}</td>
              <td style={{ padding: '10px' }}>{rep.gravedad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
