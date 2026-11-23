export function validarZona({ ciudad, nombre, direccion, frecuencia, estado }) {
  const errores = {};

  if (!ciudad || !ciudad.trim()) {
    errores.ciudad = "La ciudad es obligatoria.";
  } else if (/^\d+$/.test(ciudad.trim())) {
    errores.ciudad = "Ingresa el nombre de la ciudad, no solo números.";
  } else if (ciudad.trim().length < 3) {
    errores.ciudad = "La ciudad debe tener al menos 3 caracteres.";
  }

  if (!nombre || !nombre.trim()) {
    errores.nombre = "El nombre de la zona o barrio es obligatorio.";
  } else if (nombre.trim().length < 3) {
    errores.nombre = "El nombre de la zona debe tener al menos 3 caracteres.";
  }

  if (!direccion || !direccion.trim()) {
    errores.direccion = "La dirección o tramo vial es obligatorio.";
  } else if (direccion.trim().length < 5) {
    errores.direccion = "Ingresa una dirección o tramo claro (ej: Calle 20 # 10-15).";
  }

  if (!frecuencia || !frecuencia.trim()) {
    errores.frecuencia = "Selecciona una frecuencia de inspección.";
  }

  if (!estado || !estado.trim()) {
    errores.estado = "Selecciona un estado para la zona.";
  }

  return errores;
}