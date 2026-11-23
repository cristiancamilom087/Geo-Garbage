import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { validarCiudadano } from "./validarCiudadano";

const ESTADO_INICIAL = {
  nombre: "",
  correo: "",
  barrio: "",
  rol: "Ciudadano"
};

const OPCIONES_ROL = [
  { value: "Ciudadano", label: "Ciudadano Reportante" },
  { value: "Brigadista", label: "Brigadista Ambiental" },
  { value: "Coordinador", label: "Coordinador de Sector" }
];

export default function CiudadanoForm({ onGuardar }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
    if (mensajeExito) {
      setMensajeExito("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validarCiudadano(form);
    setErrores(err);

    if (Object.keys(err).length === 0) {
      onGuardar({
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        barrio: form.barrio.trim(),
        rol: form.rol
      });
      setForm(ESTADO_INICIAL);
      setMensajeExito("Ciudadano o brigadista registrado correctamente.");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d8e2d8",
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "1.5rem"
      }}
    >
      <h3 style={{ marginTop: 0, color: "#1b5e20" }}>Registrar Ciudadano / Reportante</h3>

      {mensajeExito && (
        <div
          style={{
            background: "#e8f5e9",
            color: "#1b5e20",
            border: "1px solid #a5d6a7",
            padding: "8px 12px",
            borderRadius: "4px",
            marginBottom: "1rem",
            fontSize: "0.9rem"
          }}
        >
          ✅ {mensajeExito}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Nombre Completo"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          error={errores.nombre}
          placeholder="Ej: Cristian Morales"
        />

        <InputField
          label="Correo Electrónico"
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
          error={errores.correo}
          placeholder="Ej: correo@ejemplo.co"
        />

        <InputField
          label="Barrio / Sector"
          name="barrio"
          value={form.barrio}
          onChange={handleChange}
          error={errores.barrio}
          placeholder="Ej: Centro, Cuba, Dosquebradas"
        />

        <InputField
          label="Rol"
          name="rol"
          as="select"
          value={form.rol}
          onChange={handleChange}
          error={errores.rol}
          options={OPCIONES_ROL}
        />

        <Button type="submit" variant="primario" fullWidth>
          Guardar Ciudadano
        </Button>
      </form>
    </div>
  );
}