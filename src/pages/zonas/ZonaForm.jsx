import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { validarZona } from "./validarZona";

const ESTADO_INICIAL = {
  ciudad: "",
  nombre: "",
  direccion: "",
  frecuencia: "Diaria",
  estado: "Activa"
};

const OPCIONES_FRECUENCIA = [
  { value: "Diaria", label: "Diaria" },
  { value: "Interdiaria", label: "Interdiaria" },
  { value: "Semanal", label: "Semanal" }
];

const OPCIONES_ESTADO = [
  { value: "Activa", label: "Activa" },
  { value: "Monitoreo", label: "En Monitoreo" },
  { value: "Intervenida", label: "Intervenida" }
];

export default function ZonaForm({ onGuardar }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
    if (mensajeExito) setMensajeExito("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validarZona(form);
    setErrores(err);

    if (Object.keys(err).length === 0) {
      onGuardar({
        ciudad: form.ciudad.trim(),
        nombre: form.nombre.trim(),
        direccion: form.direccion.trim(),
        frecuencia: form.frecuencia,
        estado: form.estado
      });
      setForm(ESTADO_INICIAL);
      setMensajeExito("Zona operativa agregada correctamente.");
    }
  };

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginTop: 0, color: "var(--verde-oscuro)" }}>Registrar Zona o Sector</h3>

      {mensajeExito && (
        <div role="status" className="alerta-exito">
          ✅ {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0 1rem"
          }}
        >
          <InputField
            label="Ciudad"
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            error={errores.ciudad}
            placeholder="Ej: Pereira, Dosquebradas"
          />

          <InputField
            label="Nombre de la Zona / Barrio"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            error={errores.nombre}
            placeholder="Ej: Barrio Álamos / Sector Centro"
          />

          <InputField
            label="Dirección / Tramo Principal"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            error={errores.direccion}
            placeholder="Ej: Calle 14 # 23-05"
          />

          <InputField
            label="Frecuencia de Recolección"
            name="frecuencia"
            as="select"
            value={form.frecuencia}
            onChange={handleChange}
            error={errores.frecuencia}
            options={OPCIONES_FRECUENCIA}
          />

          <InputField
            label="Estado de la Zona"
            name="estado"
            as="select"
            value={form.estado}
            onChange={handleChange}
            error={errores.estado}
            options={OPCIONES_ESTADO}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="primario">
            Guardar Zona
          </Button>
        </div>
      </form>
    </div>
  );
}