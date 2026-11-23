import React from "react";
import { useApp } from "../../context/AppContext";
import ZonaForm from "./ZonaForm";
import DataTable from "../../components/DataTable";

const COLUMNAS_ZONAS = [
  { key: "ciudad", label: "Ciudad" },
  { key: "nombre", label: "Zona / Barrio" },
  { key: "direccion", label: "Dirección / Tramo" },
  { key: "frecuencia", label: "Frecuencia" },
  { key: "estado", label: "Estado" }
];

export default function ZonasPage() {
  const { zonas, crearZona, borrarZona } = useApp();

  return (
    <section className="contenedor-modulo">
      <h2 className="titulo-modulo">Zonas y Sectores de Cobertura</h2>
      <p className="subtitulo-modulo">
        Administra sectores por ciudad y dirección para organizar rutas de recolección y control ambiental.
      </p>

      <ZonaForm onGuardar={crearZona} />

      <div className="card">
        <h3 style={{ marginTop: 0, color: "var(--verde-oscuro)" }}>
          Zonas Registradas ({zonas.length})
        </h3>
        <DataTable
          columns={COLUMNAS_ZONAS}
          data={zonas}
          onDelete={borrarZona}
          emptyMessage="No hay zonas registradas en este momento."
        />
      </div>
    </section>
  );
}