import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function calcularEdad(fechaStr) {
  if (!fechaStr) return -1;
  const nacimiento = new Date(`${fechaStr}T00:00:00`);
  if (Number.isNaN(nacimiento.getTime())) return -1;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDif = hoy.getMonth() - nacimiento.getMonth();
  if (mesDif < 0 || (mesDif === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function evaluarPassword(pass) {
  const requisitos = {
    longitud: pass.length >= 8,
    letra: /[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(pass),
    numero: /\d/.test(pass),
    especial: /[^A-Za-z0-9\s]/.test(pass)
  };
  const soloNumeros = pass.length > 0 && /^\d+$/.test(pass);
  const cumplidos = Object.values(requisitos).filter(Boolean).length;

  let nivel = "Débil";
  let color = "#d32f2f";
  let porcentaje = (cumplidos / 4) * 100;

  if (soloNumeros) {
    nivel = "No válida (solo números)";
    color = "#c62828";
  } else if (cumplidos === 4) {
    nivel = "Segura";
    color = "#2e7d32";
  } else if (cumplidos >= 2) {
    nivel = "Media";
    color = "#ef6c00";
  }

  return { requisitos, soloNumeros, cumplidos, nivel, color, porcentaje };
}

export default function Login() {
  const { iniciarSesion, registrarUsuario, iniciarSesionSocial } = useApp();

  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState({ tipo: "", texto: "" });

  const analisisPass = evaluarPassword(password);

  const limpiarMensajes = () => {
    setErrores({});
    setAlerta({ tipo: "", texto: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    limpiarMensajes();

    const err = {};

    if (!nombre.trim()) {
      err.nombre = "El nombre de usuario es obligatorio.";
    } else if (/^\d+$/.test(nombre.trim())) {
      err.nombre = "El nombre de usuario no puede ser solo números.";
    } else if (nombre.trim().length < 3) {
      err.nombre = "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    if (esRegistro) {
      if (!correo.trim()) {
        err.correo = "El correo electrónico es obligatorio.";
      } else if (!REGEX_CORREO.test(correo.trim())) {
        err.correo = "Ingresa un correo electrónico válido (ej: usuario@correo.com).";
      }

      if (!fechaNacimiento) {
        err.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
      } else {
        const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);
        if (nacimiento > new Date()) {
          err.fechaNacimiento = "La fecha de nacimiento no puede ser futura.";
        } else if (calcularEdad(fechaNacimiento) < 18) {
          err.fechaNacimiento = "Debes ser mayor de edad (18 años o más) para registrarte.";
        }
      }

      if (!password) {
        err.password = "La contraseña es obligatoria.";
      } else if (analisisPass.soloNumeros) {
        err.password = "La contraseña no puede contener solo números; agrega letras y símbolo.";
      } else if (analisisPass.cumplidos < 4) {
        err.password = "La contraseña debe cumplir todos los requisitos de seguridad.";
      }

      if (!aceptaTerminos) {
        err.terminos = "Debes aceptar los términos y condiciones para crear tu cuenta.";
      }
    } else if (!password.trim()) {
      err.password = "La contraseña es obligatoria.";
    }

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    if (esRegistro) {
      const res = registrarUsuario({
        nombre,
        correo,
        fechaNacimiento,
        password
      });
      if (!res.ok) {
        setAlerta({ tipo: "error", texto: res.mensaje });
        return;
      }
      setAlerta({
        tipo: "exito",
        texto: "¡Cuenta de Ciudadano creada con éxito! Ahora inicia sesión."
      });
      setEsRegistro(false);
      setPassword("");
      setAceptaTerminos(false);
    } else {
      const res = iniciarSesion(nombre, password);
      if (!res.ok) {
        setAlerta({ tipo: "error", texto: res.mensaje });
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem 1rem",
        background: "var(--fondo-app)"
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <img
            src="/logo.jpg"
            alt="Geo-Garbage Logo"
            style={{ width: "60px", height: "60px", objectFit: "contain", marginBottom: "0.4rem" }}
            onError={(e) => {
              e.currentTarget.src = "/logo.png";
            }}
          />
          <h2 style={{ margin: 0, color: "var(--verde-oscuro)", fontSize: "1.35rem" }}>
            {esRegistro ? "Crear Cuenta Ciudadana" : "Geo-Garbage - Acceso"}
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.86rem", color: "var(--texto-secundario)" }}>
            {esRegistro
              ? "Regístrate para reportar microbasureros y gestionar tu perfil"
              : "Ingresa para gestionar reportes de residuos urbanos"}
          </p>
        </div>

        {alerta.texto && (
          <div
            role="alert"
            className={alerta.tipo === "error" ? "alerta-error" : "alerta-exito"}
          >
            {alerta.tipo === "error" ? "⚠️ " : "✅ "}
            {alerta.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo-grupo">
            <label htmlFor="auth-nombre" className="campo-label">
              Nombre de Usuario {esRegistro ? "" : "o Correo Electrónico"}
            </label>
            <input
              id="auth-nombre"
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errores.nombre) setErrores((p) => ({ ...p, nombre: "" }));
              }}
              placeholder={esRegistro ? "Ej: cristian_morales" : "Ej: cristianadmin"}
              className={`campo-control ${errores.nombre ? "campo-error-control" : ""}`}
            />
            {errores.nombre && (
              <span role="alert" className="campo-error-texto">
                ⚠️ {errores.nombre}
              </span>
            )}
          </div>

          {esRegistro && (
            <>
              <div className="campo-grupo">
                <label htmlFor="auth-correo" className="campo-label">
                  Correo Electrónico
                </label>
                <input
                  id="auth-correo"
                  type="email"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    if (errores.correo) setErrores((p) => ({ ...p, correo: "" }));
                  }}
                  placeholder="Ej: nombre@correo.com"
                  className={`campo-control ${errores.correo ? "campo-error-control" : ""}`}
                />
                {errores.correo && (
                  <span role="alert" className="campo-error-texto">
                    ⚠️ {errores.correo}
                  </span>
                )}
              </div>

              <div className="campo-grupo">
                <label htmlFor="auth-fecha" className="campo-label">
                  Fecha de Nacimiento (Mayor de 18 años)
                </label>
                <input
                  id="auth-fecha"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => {
                    setFechaNacimiento(e.target.value);
                    if (errores.fechaNacimiento) {
                      setErrores((p) => ({ ...p, fechaNacimiento: "" }));
                    }
                  }}
                  className={`campo-control ${errores.fechaNacimiento ? "campo-error-control" : ""}`}
                />
                {errores.fechaNacimiento && (
                  <span role="alert" className="campo-error-texto">
                    ⚠️ {errores.fechaNacimiento}
                  </span>
                )}
              </div>
            </>
          )}

          <div className="campo-grupo">
            <label htmlFor="auth-password" className="campo-label">
              Contraseña
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errores.password) setErrores((p) => ({ ...p, password: "" }));
              }}
              placeholder={esRegistro ? "Ej: EcoVerde#2026" : "••••••••"}
              className={`campo-control ${errores.password ? "campo-error-control" : ""}`}
            />
            {errores.password && (
              <span role="alert" className="campo-error-texto">
                ⚠️ {errores.password}
              </span>
            )}

            {esRegistro && (
              <div style={{ marginTop: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: analisisPass.color
                  }}
                >
                  <span>Seguridad de contraseña:</span>
                  <span>{analisisPass.nivel}</span>
                </div>

                <div className="password-meter-bar">
                  <div
                    className="password-meter-fill"
                    style={{
                      width: `${analisisPass.porcentaje}%`,
                      backgroundColor: analisisPass.color
                    }}
                  />
                </div>

                <ul className="password-requisitos">
                  <li className={analisisPass.requisitos.longitud ? "req-ok" : "req-pendiente"}>
                    {analisisPass.requisitos.longitud ? "✓" : "•"} Mínimo 8 caracteres
                  </li>
                  <li className={analisisPass.requisitos.letra ? "req-ok" : "req-pendiente"}>
                    {analisisPass.requisitos.letra ? "✓" : "•"} Al menos 1 letra
                  </li>
                  <li className={analisisPass.requisitos.numero ? "req-ok" : "req-pendiente"}>
                    {analisisPass.requisitos.numero ? "✓" : "•"} Al menos 1 número
                  </li>
                  <li className={analisisPass.requisitos.especial ? "req-ok" : "req-pendiente"}>
                    {analisisPass.requisitos.especial ? "✓" : "•"} Al menos 1 carácter especial
                  </li>
                </ul>
              </div>
            )}
          </div>

          {esRegistro && (
            <div className="campo-grupo">
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--texto-principal)",
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => {
                    setAceptaTerminos(e.target.checked);
                    if (errores.terminos) setErrores((p) => ({ ...p, terminos: "" }));
                  }}
                  style={{ marginTop: "3px" }}
                />
                <span>Acepto los términos y condiciones de uso de Geo-Garbage.</span>
              </label>
              {errores.terminos && (
                <span role="alert" className="campo-error-texto">
                  ⚠️ {errores.terminos}
                </span>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primario btn-bloque">
            {esRegistro ? "Registrar Cuenta Ciudadana" : "Iniciar Sesión"}
          </button>
        </form>

        {/* Acceso social */}
        <div style={{ marginTop: "1.1rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "0.78rem",
              color: "var(--texto-secundario)",
              marginBottom: "0.65rem"
            }}
          >
            O continúa rápidamente con (acceso ciudadano simulado):
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <button
              type="button"
              className="btn btn-social"
              onClick={() => iniciarSesionSocial("Google")}
            >
              <span>G</span> Google
            </button>
            <button
              type="button"
              className="btn btn-social"
              onClick={() => iniciarSesionSocial("Facebook")}
            >
              <span>f</span> Facebook
            </button>
          </div>
        </div>

        <div style={{ marginTop: "1.1rem", textAlign: "center", fontSize: "0.86rem" }}>
          {esRegistro ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              limpiarMensajes();
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--verde-principal)",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.86rem"
            }}
          >
            {esRegistro ? "Inicia sesión aquí" : "Regístrate aquí"}
          </button>
        </div>

        <div
          style={{
            marginTop: "1rem",
            paddingTop: "0.75rem",
            borderTop: "1px dashed #cbd5e1",
            fontSize: "0.78rem",
            color: "var(--texto-secundario)"
          }}
        >
          <strong>Cuentas de prueba:</strong>
          <div>• Admin: <code>cristianadmin</code> / <code>12345</code></div>
          <div>• Ciudadano: <code>cristian</code> / <code>123</code></div>
        </div>
      </div>
    </div>
  );
}