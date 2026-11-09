import React from 'react';

export default function Home({ usuarioActivo }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>¡Bienvenido a Geo-Garbage, {usuarioActivo ? usuarioActivo.nombre : 'Invitado'}!</h1>
      <p style={{ fontStyle: 'italic', color: '#555' }}>"Tu reporte. Nuestra respuesta."</p>
      <p>Sistema inteligente de gestión y georreferenciación de microbasureros urbanos.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
        <div style={{ background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #c8e6c9', width: '200px' }}>
          <h3>3</h3>
          <p style={{ margin: 0, color: '#388e3c' }}>Reportes Activos</p>
        </div>
        <div style={{ background: '#fff3e0', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffe0b2', width: '200px' }}>
          <h3>1</h3>
          <p style={{ margin: 0, color: '#f57c00' }}>En Proceso de Limpieza</p>
        </div>
        <div style={{ background: '#e3f2fd', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bbdefb', width: '200px' }}>
          <h3>Rol Actual</h3>
          <p style={{ margin: 0, color: '#1976d2', fontWeight: 'bold' }}>{usuarioActivo ? usuarioActivo.rol : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
