import React from "react";
import { useApp } from "../../context/AppContext";
import ReporteForm from "./ReporteForm";
import DataTable from "../../components/DataTable";

const COLUMNAS_REPORTES = [
  { key: "ciudad", label: "Ciudad" },
  { key: "direccion", label: "Dirección / Referencia" },
  { key: "residuo", label: "Tipo de Residuo" },
  {
    key: "gravedad",
    label: "Gravedad",
    format: (valor) => (
      <span
        style={{
          fontWeight: "700",
          color: valor === "Crítico" ? "#c62828" : valor === "Alto" ? "#ef6c00" : "#2e7d32"
        }}
      >
        {valor}
      </span>
    )
  },
  { key: "descripcion", label: "Descripción" }
];

export default function ReportesPage() {
  const { reportes, crearReporte, borrarReporte } = useApp();

  return (
    <section className="contenedor-modulo">
      <h2 className="titulo-modulo">Gestión de Reportes de Microbasureros</h2>
      <p className="subtitulo-modulo">
        Registra puntos críticos indicando ciudad y dirección exacta, consulta el estado y administra los reportes.
      </p>

      <ReporteForm onGuardar={crearReporte} />

      <div className="card">
        <h3 style={{ marginTop: 0, color: "var(--verde-oscuro)" }}>
          Listado de Microbasureros ({reportes.length})
        </h3>
        <DataTable
          columns={COLUMNAS_REPORTES}
          data={reportes}
          onDelete={borrarReporte}
          emptyMessage="No hay reportes registrados en este momento."
        />
      </div>
    </section>
  );
}