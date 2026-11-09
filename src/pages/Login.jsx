import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('Ciudadano');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario.trim()) {
      alert('Por favor ingresa un nombre de usuario');
      return;
    }
    // Guardamos los datos del usuario y redirigimos al inicio
    onLogin({ nombre: usuario, rol: rol });
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', background: '#f9f9f9' }}>
      <img src="/logo-geogarbage.png" alt="Logo GeoGarbage" style={{ width: '80px', marginBottom: '1rem' }} onError={(e)=>{e.target.style.display='none'}} />
      <h2>Geo-Garbage Acceso</h2>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Sistema de Gestión y Georreferenciación</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', textAlign: 'left' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre de Usuario:</label>
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            placeholder="Ej: Cristian Morales"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Rol en el Sistema:</label>
          <select 
            value={rol} 
            onChange={(e) => setRol(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Ciudadano">Ciudadano / Reportero</option>
            <option value="Operador">Operador Ambiental</option>
            <option value="Administrador">Administrador del Sistema</option>
          </select>
        </div>

        <button type="submit" style={{ width: '100%', background: '#2e7d32', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ingresar al Sistema
        </button>
      </form>
    </div>
  );
}
