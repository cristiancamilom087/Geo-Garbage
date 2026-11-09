import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ usuarioActivo, onLogout }) {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', background: '#2e7d32', color: '#fff' }} role="navigation" aria-label="Menú Principal">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/logo.jpg" 
          alt="GeoGarbage Logo" 
          style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '2px' }} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Geo-Garbage</h2>
      </div>

      <div>
        <Link to="/" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Inicio</Link>
        <Link to="/reportes" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Ver Reportes</Link>
        <Link to="/crear-reporte" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Reportar Basurero</Link>
        <Link to="/mapa" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Mapa GPS</Link>
      </div>

      {usuarioActivo && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#1b5e20', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9rem' }}>
          <div>
            <span>👤 <strong>{usuarioActivo.nombre}</strong></span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#a5d6a7' }}>Rol: {usuarioActivo.rol}</span>
          </div>
          <button 
            onClick={handleCerrarSesion} 
            style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}
