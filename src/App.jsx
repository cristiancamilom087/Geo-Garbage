import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// 1. Barra de Navegación con Logotipo oficial y usuario activo
function Navbar({ usuarioActivo, onLogout }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', background: '#2e7d32', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src="/logo.jpg" 
          alt="GeoGarbage Logo" 
          style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '2px' }} 
          onError={(e) => { e.target.src = '/logo.png'; }} // Intenta JPG y si falla pasa a PNG
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1b5e20', padding: '5px 10px', borderRadius: '4px' }}>
          <span>👤 {usuarioActivo.nombre}</span>
          <button onClick={onLogout} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
            Salir
          </button>
        </div>
      )}
    </nav>
  );
}

// 2. Pantalla de Acceso con opción de Registro e Inicio de Sesión
function Login({ onLogin, usuariosRegistrados, setUsuariosRegistrados }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (esRegistro) {
      // Registrar nuevo usuario
      const existe = usuariosRegistrados.find(u => u.nombre === nombre);
      if (existe) {
        setError('El usuario ya existe. Inicia sesión.');
        return;
      }
      const nuevoUsuario = { nombre, password, rol: 'Ciudadano' };
      setUsuariosRegistrados([...usuariosRegistrados, nuevoUsuario]);
      alert('¡Registro exitoso! Ahora inicia sesión.');
      setEsRegistro(false);
      setPassword('');
    } else {
      // Validar inicio de sesión
      const encontrado = usuariosRegistrados.find(u => u.nombre === nombre && u.password === password);
      if (encontrado) {
        onLogin(encontrado);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', background: '#f9f9f9' }}>
      <img src="/logo.jpg" alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '1rem' }} onError={(e)=>{e.target.src='/logo.png'}} />
      <h2>{esRegistro ? 'Registro de Usuario' : 'Geo-Garbage - Acceso'}</h2>
      
      {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: '1rem', textAlign: 'left' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre de Usuario:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', background: '#2e7d32', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
        {esRegistro ? '¿Ya tienes cuenta?' : '¿No estás registrado?'} {' '}
        <button 
          onClick={() => { setEsRegistro(!esRegistro); setError(''); }} 
          style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {esRegistro ? 'Inicia Sesión aquí' : 'Regístrate aquí'}
        </button>
      </p>
    </div>
  );
}

// 3. Páginas del Sistema
function Home({ usuarioActivo }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>¡Bienvenido, {usuarioActivo.nombre}!</h1>
      <p style={{ fontStyle: 'italic', color: '#555' }}>"Tu reporte. Nuestra respuesta."</p>
      <p>Sistema inteligente de gestión y georreferenciación de microbasureros urbanos.</p>
    </div>
  );
}

function Reportes({ listaReportes }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Listado de Microbasureros Registrados</h2>
      {listaReportes.length === 0 ? (
        <p style={{ color: '#666', marginTop: '1rem' }}>No hay reportes registrados en este momento.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#f0f0f0', borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Ubicación</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Tipo de Residuo</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Gravedad</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {listaReportes.map((rep, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{rep.ubicacion}</td>
                <td style={{ padding: '10px' }}>{rep.residuo}</td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: rep.gravedad === 'Crítico' ? 'red' : '#333' }}>{rep.gravedad}</td>
                <td style={{ padding: '10px' }}>{rep.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function CrearReporte({ listaReportes, setListaReportes }) {
  const [ubicacion, setUbicacion] = useState('');
  const [residuo, setResiduo] = useState('Plásticos');
  const [gravedad, setGravedad] = useState('Medio');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ubicacion.trim() || !descripcion.trim()) {
      alert('Por favor complete la ubicación y la descripción.');
      return;
    }

    const nuevoReporte = { ubicacion, residuo, gravedad, descripcion };
    setListaReportes([...listaReportes, nuevoReporte]);
    alert('¡Reporte guardado con éxito!');
    setUbicacion('');
    setDescripcion('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
      <h2>Registrar Microbasurero</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ubicación / Coordenadas:</label>
          <input 
            type="text" 
            value={ubicacion} 
            onChange={(e) => setUbicacion(e.target.value)} 
            placeholder="Ej: Esquina Parque Central" 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
            required 
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Residuo:</label>
          <select value={residuo} onChange={(e) => setResiduo(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
            <option value="Plásticos">Plásticos y Envases</option>
            <option value="Escombros">Escombros y Materiales</option>
            <option value="Orgánicos">Residuos Orgánicos</option>
            <option value="Electrónicos">Residuos Electrónicos</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nivel de Gravedad:</label>
          <select value={gravedad} onChange={(e) => setGravedad(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Crítico">Crítico</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Detalles de la acumulación..." 
            style={{ width: '100%', padding: '8px', height: '80px', boxSizing: 'border-box' }} 
            required 
          />
        </div>

        <button type="submit" style={{ width: '100%', background: '#2e7d32', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Guardar Reporte
        </button>
      </form>
    </div>
  );
}

function Mapa() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Mapa GPS de Microbasureros</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>Visualización de puntos críticos georreferenciados.</p>
      
      <div style={{ maxWidth: '700px', height: '400px', margin: '0 auto', border: '3px solid #2e7d32', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#e0e0e0' }}>
        {/* Imagen de fondo del mapa cargada desde public/mapa.png */}
        <img 
          src="/mapa.png" 
          alt="Mapa Base" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', top: '40%', left: '50%', background: '#d32f2f', color: '#fff', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
          📍 Lat: 4.8133, Lon: -75.6961 (Punto Crítico)
        </div>
      </div>
    </div>
  );
}

// Enrutador Principal App con estados globales
export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    { nombre: 'cristian', password: '123', rol: 'Ciudadano' } // Usuario por defecto para pruebas rápidas
  ]);
  const [listaReportes, setListaReportes] = useState([
    { ubicacion: 'Parque Central', residuo: 'Plásticos', gravedad: 'Medio', descripcion: 'Acumulación de bolsas plásticas.' }
  ]);

  return (
    <Router>
      {usuarioActivo && <Navbar usuarioActivo={usuarioActivo} onLogout={() => setUsuarioActivo(null)} />}
      <Routes>
        {!usuarioActivo ? (
          <Route path="*" element={<Login onLogin={setUsuarioActivo} usuariosRegistrados={usuariosRegistrados} setUsuariosRegistrados={setUsuariosRegistrados} />} />
        ) : (
          <>
            <Route path="/" element={<Home usuarioActivo={usuarioActivo} />} />
            <Route path="/reportes" element={<Reportes listaReportes={listaReportes} />} />
            <Route path="/crear-reporte" element={<CrearReporte listaReportes={listaReportes} setListaReportes={setListaReportes} />} />
            <Route path="/mapa" element={<Mapa />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
