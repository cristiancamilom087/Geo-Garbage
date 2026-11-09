import React from 'react';

export default function Mapa() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Georreferenciación de Microbasureros (Mapa GPS)</h2>
      <p style={{ color: '#666' }}>Visualización espacial de los puntos críticos reportados en la zona urbana.</p>
      
      <div style={{ maxWidth: '800px', margin: '1.5rem auto', border: '3px solid #2e7d32', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#e0e0e0', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Simulación visual de un mapa interactivo con pines */}
        <div style={{ position: 'absolute', top: '30%', left: '40%', background: '#d32f2f', color: '#fff', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
          📍 Parque Central (Crítico)
        </div>
        <div style={{ position: 'absolute', top: '60%', left: '70%', background: '#f57c00', color: '#fff', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
          📍 Av. Ferrocarril (Medio)
        </div>
        <div style={{ position: 'absolute', top: '45%', left: '20%', background: '#388e3c', color: '#fff', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
          📍 Quebrada (Atendido)
        </div>
        
        <p style={{ background: 'rgba(255,255,255,0.8)', padding: '10px 20px', borderRadius: '5px', zIndex: 10, fontWeight: 'bold' }}>
          [ Simulación de Mapa satelital / Capa de geolocalización activa ]
        </p>
      </div>
    </div>
  );
}