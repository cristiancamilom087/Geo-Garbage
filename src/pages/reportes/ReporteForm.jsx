import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { validarReporte } from "./validarReporte";

const ESTADO_INICIAL = {
  ciudad: "",
  direccion: "",
  residuo: "Plásticos",
  gravedad: "Medio",
  descripcion: ""
};

const OPCIONES_RESIDUO = [
  { value: "Plásticos", label: "Plásticos y Envases" },
  { value: "Escombros", label: "Escombros y Materiales" },
  { value: "Orgánicos", label: "Residuos Orgánicos" },
  { value: "Electrónicos", label: "Residuos Electrónicos" }
];

const OPCIONES_GRAVEDAD = [
  { value: "Bajo", label: "Bajo" },
  { value: "Medio", label: "Medio" },
  { value: "Alto", label: "Alto" },
  { value: "Crítico", label: "Crítico" }
];

export default function ReporteForm({ onGuardar }) {
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
    const err = validarReporte(form);
    setErrores(err);

    if (Object.keys(err).length === 0) {
      onGuardar({
        ciudad: form.ciudad.trim(),
        direccion: form.direccion.trim(),
        residuo: form.residuo,
        gravedad: form.gravedad,
        descripcion: form.descripcion.trim()
      });
      setForm(ESTADO_INICIAL);
      setMensajeExito("Reporte registrado correctamente en el listado.");
    }
  };

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginTop: 0, color: "var(--verde-oscuro)" }}>Registrar Microbasurero</h3>

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
            placeholder="Ej: Pereira, Dosquebradas, Santa Rosa"
          />

          <InputField
            label="Dirección / Punto de Referencia"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            error={errores.direccion}
            placeholder="Ej: Carrera 8 # 22-40, Barrio Centro"
          />

          <InputField
            label="Tipo de Residuo"
            name="residuo"
            as="select"
            value={form.residuo}
            onChange={handleChange}
            error={errores.residuo}
            options={OPCIONES_RESIDUO}
          />

          <InputField
            label="Nivel de Gravedad"
            name="gravedad"
            as="select"
            value={form.gravedad}
            onChange={handleChange}
            error={errores.gravedad}
            options={OPCIONES_GRAVEDAD}
          />
        </div>

        <InputField
          label="Descripción del Hallazgo"
          name="descripcion"
          as="textarea"
          value={form.descripcion}
          onChange={handleChange}
          error={errores.descripcion}
          placeholder="Describe el tipo de acumulación, volumen aproximado o si obstruye vía peatonal..."
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="primario">
            Guardar Reporte
          </Button>
        </div>
      </form>
    </div>
  );
}