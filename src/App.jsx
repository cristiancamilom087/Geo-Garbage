import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Login from "./pages/Login";
import ReportesPage from "./pages/reportes/ReportesPage";
import ZonasPage from "./pages/zonas/ZonasPage";
import CiudadanosPage from "./pages/ciudadanos/CiudadanosPage";
import Mapa from "./pages/Mapa";
import InputField from "./components/InputField";
import Button from "./components/Button";

function NavegacionPrincipal() {
  const { usuarioActivo, cerrarSesion, reportes, zonas, ciudadanos } = useApp();
  const esAdmin = usuarioActivo?.rol === "Administrador";

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.88rem",
    padding: "6px 12px",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.14)"
  };

  return (
    <header
      style={{
        background: "var(--verde-principal)",
        color: "#fff",
        borderBottom: "3px solid var(--verde-oscuro)",
        padding: "0.75rem 1.5rem"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.85rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.jpg"
            alt="Geo-Garbage Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#fff",
              padding: "2px",
              objectFit: "contain"
            }}
            onError={(e) => {
              e.currentTarget.src = "/logo.png";
            }}
          />
          <div>
            <strong style={{ fontSize: "1.15rem", display: "block", lineHeight: 1.2 }}>
              Geo-Garbage
            </strong>
            <small style={{ opacity: 0.92, fontSize: "0.78rem" }}>
              Tu reporte. Nuestra respuesta.
            </small>
          </div>
        </div>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/reportes" style={linkStyle}>Reportes ({reportes.length})</Link>
          {esAdmin && <Link to="/zonas" style={linkStyle}>Zonas ({zonas.length})</Link>}
          {esAdmin && <Link to="/ciudadanos" style={linkStyle}>Ciudadanos ({ciudadanos.length})</Link>}
          <Link to="/mapa" style={linkStyle}>Mapa GPS</Link>
        </nav>

        {usuarioActivo && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--verde-oscuro)",
              padding: "5px 10px",
              borderRadius: "6px",
              fontSize: "0.82rem"
            }}
          >
            <span>
              👤 <strong>{usuarioActivo.nombre}</strong> · {usuarioActivo.rol}
            </span>
            <button
              type="button"
              onClick={cerrarSesion}
              className="btn btn-peligro"
              style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function InicioResumen() {
  const { usuarioActivo, actualizarPerfilUsuario, reportes, zonas, ciudadanos } = useApp();
  const esAdmin = usuarioActivo?.rol === "Administrador";

  const [editando, setEditando] = useState(false);
  const [perfilForm, setPerfilForm] = useState({
    telefono: usuarioActivo?.telefono || "",
    ciudad: usuarioActivo?.ciudad || "",
    barrio: usuarioActivo?.barrio || "",
    direccion: usuarioActivo?.direccion || ""
  });
  const [erroresPerfil, setErroresPerfil] = useState({});
  const [mensajePerfil, setMensajePerfil] = useState("");

  const abrirEdicion = () => {
    setPerfilForm({
      telefono: usuarioActivo?.telefono || "",
      ciudad: usuarioActivo?.ciudad || "",
      barrio: usuarioActivo?.barrio || "",
      direccion: usuarioActivo?.direccion || ""
    });
    setErroresPerfil({});
    setMensajePerfil("");
    setEditando(true);
  };

  const handleChangePerfil = (e) => {
    const { name, value } = e.target;
    setPerfilForm((prev) => ({ ...prev, [name]: value }));
    if (erroresPerfil[name]) {
      setErroresPerfil((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleGuardarPerfil = (e) => {
    e.preventDefault();
    const err = {};

    if (perfilForm.telefono.trim() && !/^\d{7,10}$/.test(perfilForm.telefono.trim())) {
      err.telefono = "El teléfono debe contener solo números (entre 7 y 10 dígitos).";
    }

    if (!perfilForm.ciudad.trim()) {
      err.ciudad = "La ciudad de residencia es obligatoria.";
    } else if (/^\d+$/.test(perfilForm.ciudad.trim())) {
      err.ciudad = "Ingresa el nombre de la ciudad, no solo números.";
    }

    if (perfilForm.barrio.trim() && perfilForm.barrio.trim().length < 3) {
      err.barrio = "El barrio debe tener al menos 3 caracteres.";
    }

    setErroresPerfil(err);
    if (Object.keys(err).length > 0) return;

    actualizarPerfilUsuario({
      telefono: perfilForm.telefono.trim(),
      ciudad: perfilForm.ciudad.trim(),
      barrio: perfilForm.barrio.trim(),
      direccion: perfilForm.direccion.trim()
    });
    setEditando(false);
    setMensajePerfil("Información de perfil actualizada correctamente.");
  };

  return (
    <section className="contenedor-modulo">
      {/* Encabezado de bienvenida */}
      <div
        className="card"
        style={{
          marginBottom: "1.5rem",
          borderLeft: "5px solid var(--verde-principal)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "var(--verde-oscuro)", fontSize: "1.55rem" }}>
            ¡Bienvenido, {usuarioActivo?.nombre}!
          </h1>
          <p style={{ margin: "4px 0 0", color: "var(--texto-secundario)", fontSize: "0.94rem" }}>
            {esAdmin
              ? "Panel de Administración: gestión integral de reportes ciudadanos, zonas y brigadas ambientales."
              : "Portal Ciudadano: reporta puntos críticos de residuos y consulta el estado en tu ciudad."}
          </p>
        </div>
        <span
          style={{
            background: "var(--verde-claro)",
            color: "var(--verde-oscuro)",
            border: "1px solid var(--verde-borde)",
            padding: "6px 14px",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "0.84rem"
          }}
        >
          Rol: {usuarioActivo?.rol}
        </span>
      </div>

      {/* Ficha de datos del usuario y edición */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1rem"
          }}
        >
          <h3 style={{ margin: 0, color: "var(--verde-oscuro)" }}>
            Información del Perfil
          </h3>
          {!editando && (
            <Button variant="secundario" onClick={abrirEdicion}>
              ✏️ Editar información
            </Button>
          )}
        </div>

        {mensajePerfil && (
          <div role="status" className="alerta-exito">
            ✅ {mensajePerfil}
          </div>
        )}

        {!editando ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "0.85rem",
              fontSize: "0.9rem"
            }}
          >
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Usuario
              </span>
              <strong>{usuarioActivo?.nombre}</strong>
            </div>
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Correo electrónico
              </span>
              <strong>{usuarioActivo?.correo || "No registrado"}</strong>
            </div>
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Teléfono de contacto
              </span>
              <strong>{usuarioActivo?.telefono || "Sin registrar"}</strong>
            </div>
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Ciudad
              </span>
              <strong>{usuarioActivo?.ciudad || "Sin registrar"}</strong>
            </div>
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Barrio de residencia
              </span>
              <strong>{usuarioActivo?.barrio || "Sin registrar"}</strong>
            </div>
            <div>
              <span style={{ color: "var(--texto-secundario)", display: "block", fontSize: "0.78rem" }}>
                Dirección
              </span>
              <strong>{usuarioActivo?.direccion || "Sin registrar"}</strong>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGuardarPerfil} noValidate>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "0 1rem"
              }}
            >
              <InputField
                label="Teléfono de contacto"
                name="telefono"
                value={perfilForm.telefono}
                onChange={handleChangePerfil}
                error={erroresPerfil.telefono}
                placeholder="Ej: 3105550199"
              />
              <InputField
                label="Ciudad"
                name="ciudad"
                value={perfilForm.ciudad}
                onChange={handleChangePerfil}
                error={erroresPerfil.ciudad}
                placeholder="Ej: Pereira"
              />
              <InputField
                label="Barrio de residencia"
                name="barrio"
                value={perfilForm.barrio}
                onChange={handleChangePerfil}
                error={erroresPerfil.barrio}
                placeholder="Ej: Centro, Álamos, Cuba"
              />
              <InputField
                label="Dirección"
                name="direccion"
                value={perfilForm.direccion}
                onChange={handleChangePerfil}
                error={erroresPerfil.direccion}
                placeholder="Ej: Calle 14 # 23-10"
              />
            </div>

            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <Button variant="secundario" onClick={() => setEditando(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primario">
                Guardar cambios
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Accesos directos a los módulos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "1rem"
        }}
      >
        <div className="card">
          <h4 style={{ margin: "0 0 0.4rem", color: "var(--verde-principal)" }}>
            Reportes Ciudadanos
          </h4>
          <p style={{ margin: "0 0 0.85rem", fontSize: "1.4rem", fontWeight: 700 }}>
            {reportes.length} activos
          </p>
          <Link to="/reportes" className="btn btn-secundario">
            Gestionar Reportes →
          </Link>
        </div>

        {esAdmin && (
          <div className="card">
            <h4 style={{ margin: "0 0 0.4rem", color: "var(--verde-principal)" }}>
              Zonas Críticas
            </h4>
            <p style={{ margin: "0 0 0.85rem", fontSize: "1.4rem", fontWeight: 700 }}>
              {zonas.length} registradas
            </p>
            <Link to="/zonas" className="btn btn-secundario">
              Gestionar Zonas →
            </Link>
          </div>
        )}

        {esAdmin && (
          <div className="card">
            <h4 style={{ margin: "0 0 0.4rem", color: "var(--verde-principal)" }}>
              Ciudadanos y Brigadas
            </h4>
            <p style={{ margin: "0 0 0.85rem", fontSize: "1.4rem", fontWeight: 700 }}>
              {ciudadanos.length} registrados
            </p>
            <Link to="/ciudadanos" className="btn btn-secundario">
              Gestionar Personal →
            </Link>
          </div>
        )}

        <div className="card">
          <h4 style={{ margin: "0 0 0.4rem", color: "var(--verde-principal)" }}>
            Mapa GPS
          </h4>
          <p style={{ margin: "0 0 0.85rem", fontSize: "0.95rem", color: "var(--texto-secundario)" }}>
            Visualización de puntos críticos
          </p>
          <Link to="/mapa" className="btn btn-secundario">
            Abrir Mapa →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContenidoApp() {
  const { usuarioActivo } = useApp();
  const esAdmin = usuarioActivo?.rol === "Administrador";

  if (!usuarioActivo) {
    return <Login />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavegacionPrincipal />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<InicioResumen />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/crear-reporte" element={<ReportesPage />} />
          <Route path="/zonas" element={esAdmin ? <ZonasPage /> : <Navigate to="/" replace />} />
          <Route path="/ciudadanos" element={esAdmin ? <CiudadanosPage /> : <Navigate to="/" replace />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ContenidoApp />
      </Router>
    </AppProvider>
  );
}