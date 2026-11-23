const zonasIniciales = [
  {
    id: 1,
    ciudad: "Pereira",
    nombre: "Sector Centro Histórico",
    direccion: "Calle 14 a Calle 24 entre Carreras 6 y 9",
    frecuencia: "Diaria",
    estado: "Activa"
  },
  {
    id: 2,
    ciudad: "Pereira",
    nombre: "Comuna Cuba - Corredor Principal",
    direccion: "Avenida Las Américas # 68-15",
    frecuencia: "Interdiaria",
    estado: "Monitoreo"
  }
];

export const listarZonas = () => [...zonasIniciales];

export const agregarZona = (listaActual, nueva) => {
  const nextId =
    listaActual.length > 0
      ? Math.max(...listaActual.map((item) => item.id)) + 1
      : 1;
  return [...listaActual, { id: nextId, ...nueva }];
};

export const eliminarZonaPorId = (listaActual, id) =>
  listaActual.filter((item) => item.id !== id);