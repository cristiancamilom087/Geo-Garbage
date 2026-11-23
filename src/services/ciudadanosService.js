// Datos de prueba iniciales y funciones para el módulo de Ciudadanos / Reportantes
const ciudadanosIniciales = [
  {
    id: 1,
    nombre: "Cristian Morales",
    correo: "cristian.morales@ejemplo.co",
    barrio: "Centro",
    rol: "Ciudadano"
  },
  {
    id: 2,
    nombre: "Brigada Ambiental Norte",
    correo: "brigada.norte@ejemplo.co",
    barrio: "Cuba",
    rol: "Brigadista"
  }
];

export const listarCiudadanos = () => [...ciudadanosIniciales];

export const agregarCiudadano = (listaActual, nuevo) => {
  const nextId =
    listaActual.length > 0
      ? Math.max(...listaActual.map((item) => item.id)) + 1
      : 1;
  return [...listaActual, { id: nextId, ...nuevo }];
};

export const eliminarCiudadanoPorId = (listaActual, id) =>
  listaActual.filter((item) => item.id !== id);