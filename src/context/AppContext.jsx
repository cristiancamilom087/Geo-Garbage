import React, { createContext, useContext, useState } from "react";
import {
  listarReportes,
  agregarReporte,
  eliminarReportePorId
} from "../services/reportesService";
import {
  listarZonas,
  agregarZona,
  eliminarZonaPorId
} from "../services/zonasService";
import {
  listarCiudadanos,
  agregarCiudadano,
  eliminarCiudadanoPorId
} from "../services/ciudadanosService";

const AppContext = createContext(null);

const contenedorVacio = () => ({
  reportes: [],
  zonas: [],
  ciudadanos: []
});

export function AppProvider({ children }) {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    {
      nombre: "cristianadmin",
      correo: "admin.geogarbage@ejemplo.co",
      fechaNacimiento: "1997-10-28",
      password: "12345",
      rol: "Administrador",
      telefono: "3105550199",
      ciudad: "Pereira",
      barrio: "Centro",
      direccion: "Carrera 7 # 19-20"
    },
    {
      nombre: "cristian",
      correo: "cristian.ciudadano@ejemplo.co",
      fechaNacimiento: "1997-10-28",
      password: "123",
      rol: "Ciudadano",
      telefono: "3125550144",
      ciudad: "Pereira",
      barrio: "Álamos",
      direccion: "Calle 14 # 23-10"
    }
  ]);

  // Cada cuenta tiene su propio espacio de registros; las cuentas nuevas arrancan en cero
  const [datosPorUsuario, setDatosPorUsuario] = useState(() => ({
    "admin.geogarbage@ejemplo.co": {
      reportes: listarReportes(),
      zonas: listarZonas(),
      ciudadanos: listarCiudadanos()
    },
    "cristian.ciudadano@ejemplo.co": {
      reportes: [listarReportes()[0]],
      zonas: [],
      ciudadanos: []
    }
  }));

  const claveUsuarioActual = usuarioActivo?.correo?.toLowerCase() || null;
  const datosActuales = claveUsuarioActual
    ? datosPorUsuario[claveUsuarioActual] || contenedorVacio()
    : contenedorVacio();

  const iniciarSesion = (identificador, password) => {
    const limpio = identificador.trim().toLowerCase();
    const encontrado = usuariosRegistrados.find(
      (u) =>
        (u.nombre.toLowerCase() === limpio || u.correo.toLowerCase() === limpio) &&
        u.password === password
    );
    if (!encontrado) {
      return { ok: false, mensaje: "Usuario/correo o contraseña incorrectos." };
    }
    setUsuarioActivo(encontrado);
    return { ok: true };
  };

  const registrarUsuario = ({ nombre, correo, fechaNacimiento, password }) => {
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    const existe = usuariosRegistrados.some(
      (u) =>
        u.nombre.toLowerCase() === nombreLimpio.toLowerCase() ||
        u.correo.toLowerCase() === correoLimpio
    );

    if (existe) {
      return {
        ok: false,
        mensaje: "Ya existe una cuenta con ese nombre de usuario o correo."
      };
    }

    const nuevoUsuario = {
      nombre: nombreLimpio,
      correo: correoLimpio,
      fechaNacimiento,
      password,
      rol: "Ciudadano",
      telefono: "",
      ciudad: "Pereira",
      barrio: "",
      direccion: ""
    };

    setUsuariosRegistrados((prev) => [...prev, nuevoUsuario]);
    // Inicializa en cero los módulos para el nuevo usuario
    setDatosPorUsuario((prev) => ({
      ...prev,
      [correoLimpio]: contenedorVacio()
    }));

    return { ok: true };
  };

  const iniciarSesionSocial = (proveedor) => {
    const etiqueta = proveedor === "Google" ? "google_ciudadano" : "facebook_ciudadano";
    const correoSocial =
      proveedor === "Google"
        ? "usuario.google@gmail.com"
        : "usuario.facebook@correo.com";

    let usuarioSocial = usuariosRegistrados.find((u) => u.correo === correoSocial);
    if (!usuarioSocial) {
      usuarioSocial = {
        nombre: etiqueta,
        correo: correoSocial,
        fechaNacimiento: "1998-05-15",
        password: "",
        rol: "Ciudadano",
        telefono: "",
        ciudad: "Pereira",
        barrio: "",
        direccion: ""
      };
      setUsuariosRegistrados((prev) => [...prev, usuarioSocial]);
      setDatosPorUsuario((prev) => ({
        ...prev,
        [correoSocial]: contenedorVacio()
      }));
    }

    setUsuarioActivo(usuarioSocial);
  };

  const actualizarPerfilUsuario = (datosPerfil) => {
    if (!usuarioActivo) return;
    const actualizado = {
      ...usuarioActivo,
      ...datosPerfil
    };
    setUsuarioActivo(actualizado);
    setUsuariosRegistrados((prev) =>
      prev.map((u) =>
        u.nombre === usuarioActivo.nombre && u.correo === usuarioActivo.correo
          ? actualizado
          : u
      )
    );
  };

  const cerrarSesion = () => setUsuarioActivo(null);

  const crearReporte = (nuevo) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          reportes: agregarReporte(actual.reportes, nuevo)
        }
      };
    });
  };

  const borrarReporte = (id) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          reportes: eliminarReportePorId(actual.reportes, id)
        }
      };
    });
  };

  const crearZona = (nueva) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          zonas: agregarZona(actual.zonas, nueva)
        }
      };
    });
  };

  const borrarZona = (id) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          zonas: eliminarZonaPorId(actual.zonas, id)
        }
      };
    });
  };

  const crearCiudadano = (nuevo) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          ciudadanos: agregarCiudadano(actual.ciudadanos, nuevo)
        }
      };
    });
  };

  const borrarCiudadano = (id) => {
    if (!claveUsuarioActual) return;
    setDatosPorUsuario((prev) => {
      const actual = prev[claveUsuarioActual] || contenedorVacio();
      return {
        ...prev,
        [claveUsuarioActual]: {
          ...actual,
          ciudadanos: eliminarCiudadanoPorId(actual.ciudadanos, id)
        }
      };
    });
  };

  const value = {
    usuarioActivo,
    iniciarSesion,
    registrarUsuario,
    iniciarSesionSocial,
    actualizarPerfilUsuario,
    cerrarSesion,
    reportes: datosActuales.reportes,
    crearReporte,
    borrarReporte,
    zonas: datosActuales.zonas,
    crearZona,
    borrarZona,
    ciudadanos: datosActuales.ciudadanos,
    crearCiudadano,
    borrarCiudadano
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp debe usarse dentro de un AppProvider");
  }
  return ctx;
}