export function validarReporte({ ciudad, direccion, residuo, gravedad, descripcion }) {
  const errores = {};

  if (!ciudad || !ciudad.trim()) {
    errores.ciudad = "La ciudad es obligatoria.";
  } else if (/^\d+$/.test(ciudad.trim())) {
    errores.ciudad = "Ingresa un nombre de ciudad válido, no solo números.";
  } else if (ciudad.trim().length < 3) {
    errores.ciudad = "La ciudad debe tener al menos 3 caracteres.";
  }

  if (!direccion || !direccion.trim()) {
    errores.direccion = "La dirección o punto de referencia es obligatoria.";
  } else if (direccion.trim().length < 5) {
    errores.direccion = "Ingresa una dirección clara (ej: Carrera 7 # 21-15, barrio Centro).";
  }

  if (!residuo || !residuo.trim()) {
    errores.residuo = "Debes seleccionar un tipo de residuo.";
  }

  if (!gravedad || !gravedad.trim()) {
    errores.gravedad = "Debes seleccionar un nivel de gravedad.";
  }

  if (!descripcion || !descripcion.trim()) {
    errores.descripcion = "La descripción de la acumulación es obligatoria.";
  } else if (descripcion.trim().length < 8) {
    errores.descripcion = "Describe brevemente el problema (mínimo 8 caracteres).";
  }

  return errores;
}