import { useState } from 'react';

export default function CrearReporte() {
  const [formData, setFormData] = useState({
    microbasurero: '',
    descripcion: '',
    nivel_gravedad: 'Medio'
  });
  
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.microbasurero.trim() || !formData.descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (formData.descripcion.length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      return;
    }

    setError('');
    setExito(true);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registrar Nuevo Reporte / Microbasurero</h2>
      {error && <p style={{ color: 'red' }} role="alert">{error}</p>}
      {exito && <p style={{ color: 'green' }} role="alert">¡Reporte simulado con éxito!</p>}
      
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="microbasurero">Ubicación / Microbasurero: </label>
          <input 
            type="text" 
            id="microbasurero" 
            name="microbasurero" 
            value={formData.microbasurero} 
            onChange={handleChange}
            placeholder="Ej: Esquina Parque Central"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="descripcion">Descripción del residuo: </label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange}
            placeholder="Describa los elementos encontrados..."
            style={{ width: '100%', padding: '8px', marginTop: '4px', height: '80px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nivel_gravedad">Nivel de Gravedad: </label>
          <select 
            id="nivel_gravedad" 
            name="nivel_gravedad" 
            value={formData.nivel_gravedad} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          >
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Critico">Crítico</option>
          </select>
        </div>

        <button type="submit" style={{ background: '#2e7d32', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}
