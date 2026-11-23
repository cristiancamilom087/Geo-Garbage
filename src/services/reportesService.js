const reportesIniciales = [
  {
    id: 1,
    ciudad: "Pereira",
    direccion: "Calle 19 # 8-34, esquina Parque Lago",
    residuo: "Plásticos",
    gravedad: "Medio",
    descripcion: "Acumulación de bolsas plásticas y envases junto al contenedor."
  },
  {
    id: 2,
    ciudad: "Dosquebradas",
    direccion: "Avenida Simón Bolívar con Calle 35",
    residuo: "Escombros",
    gravedad: "Crítico",
    descripcion: "Restos de construcción y muebles abandonados sobre el separador."
  }
];

export const listarReportes = () => [...reportesIniciales];

export const agregarReporte = (listaActual, nuevo) => {
  const nextId =
    listaActual.length > 0
      ? Math.max(...listaActual.map((item) => item.id)) + 1
      : 1;
  return [...listaActual, { id: nextId, ...nuevo }];
};

export const eliminarReportePorId = (listaActual, id) =>
  listaActual.filter((item) => item.id !== id);