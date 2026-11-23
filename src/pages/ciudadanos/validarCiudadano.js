const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCiudadano({ nombre, correo, barrio, rol }) {
  const errores = {};

  if (!nombre || !nombre.trim()) {
    errores.nombre = "El nombre completo es obligatorio.";
  } else if (nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!correo || !correo.trim()) {
    errores.correo = "El correo electrónico es obligatorio.";
  } else if (!REGEX_CORREO.test(correo.trim())) {
    errores.correo = "Ingresa un correo electrónico con formato válido.";
  }

  if (!barrio || !barrio.trim()) {
    errores.barrio = "El barrio o sector de residencia es obligatorio.";
  }

  if (!rol || !rol.trim()) {
    errores.rol = "Debes seleccionar un rol.";
  }

  return errores;
}