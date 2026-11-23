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

  const [reportes, setReportes] = useState(() => listarReportes());
  const [zonas, setZonas] = useState(() => listarZonas());
  const [ciudadanos, setCiudadanos] = useState(() => listarCiudadanos());

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

  const crearReporte = (nuevo) =>
    setReportes((prev) => agregarReporte(prev, nuevo));
  const borrarReporte = (id) =>
    setReportes((prev) => eliminarReportePorId(prev, id));

  const crearZona = (nueva) => setZonas((prev) => agregarZona(prev, nueva));
  const borrarZona = (id) => setZonas((prev) => eliminarZonaPorId(prev, id));

  const crearCiudadano = (nuevo) =>
    setCiudadanos((prev) => agregarCiudadano(prev, nuevo));
  const borrarCiudadano = (id) =>
    setCiudadanos((prev) => eliminarCiudadanoPorId(prev, id));

  const value = {
    usuarioActivo,
    iniciarSesion,
    registrarUsuario,
    iniciarSesionSocial,
    actualizarPerfilUsuario,
    cerrarSesion,
    reportes,
    crearReporte,
    borrarReporte,
    zonas,
    crearZona,
    borrarZona,
    ciudadanos,
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