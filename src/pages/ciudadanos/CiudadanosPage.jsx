import React from "react";
import { useApp } from "../../context/AppContext";
import CiudadanoForm from "./CiudadanoForm";
import DataTable from "../../components/DataTable";

const COLUMNAS_CIUDADANOS = [
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  { key: "barrio", label: "Barrio / Sector" },
  { key: "rol", label: "Rol" }
];

export default function CiudadanosPage() {
  const { ciudadanos, crearCiudadano, borrarCiudadano } = useApp();

  return (
    <section style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#1b5e20", marginBottom: "0.25rem" }}>
        Módulo 3: Gestión de Ciudadanos y Brigadas
      </h2>
      <p style={{ color: "#555", marginTop: 0, marginBottom: "1.5rem" }}>
        Registra ciudadanos reportantes o brigadistas con validación de correo, lista y elimina registros.
      </p>

      <CiudadanoForm onGuardar={crearCiudadano} />

      <div
        style={{
          background: "#fff",
          border: "1px solid #d8e2d8",
          borderRadius: "8px",
          padding: "1.5rem"
        }}
      >
        <h3 style={{ marginTop: 0, color: "#1b5e20" }}>
          Ciudadanos y Brigadistas Registrados ({ciudadanos.length})
        </h3>
        <DataTable
          columns={COLUMNAS_CIUDADANOS}
          data={ciudadanos}
          onDelete={borrarCiudadano}
          emptyMessage="No hay ciudadanos registrados en este momento."
        />
      </div>
    </section>
  );
}