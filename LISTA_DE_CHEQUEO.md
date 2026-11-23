# Lista de Chequeo — Evidencia GA7-220501096-AA4-EV01

- **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
- **Ficha:** 3336056
- **Evidencia:** GA7-220501096-AA4-EV01
- **RAP:** 220501096-04
- **Periodo de la evidencia:** 09/11 – 22/11/26
- **Proyecto:** Geo-Garbage (*"Tu reporte. Nuestra respuesta."*)
- **Versión del entregable:** 1.1 (`v1.1.0` — evolución desde versión base `v1.0.0`)
- **Aprendiz:** Cristian Morales (Cristian Camilo Morales Gomez)
- **Repositorio:** `https://github.com/cristiancamilom087/Geo-Garbage`

---

## 1. Chequeo Técnico y Funcional de la Evidencia

| N° | Criterio / Requerimiento de la Evidencia | Cumple | Observaciones / Evidencia en Código |
| :---: | :--- | :---: | :--- |
| 1 | **Componentes reutilizables:** Desarrollo de componentes de interfaz reutilizables para los módulos del proyecto. | Sí | `InputField.jsx`, `Button.jsx` y `DataTable.jsx` en `src/components/` reutilizados en formularios, listados y vistas. |
| 2 | **Separación de responsabilidades:** División clara entre componentes, vistas, validaciones y servicios. | Sí | Validaciones en `validarReporte.js`, `validarZona.js` y `validarCiudadano.js`; servicios en `src/services/`; vistas en `src/pages/`. |
| 3 | **Formularios con validaciones:** Validación de campos, formatos (correo, teléfono, edad >= 18, contraseñas) y alertas de error. | Sí | Alertas visuales campo por campo, medidor de seguridad de contraseña en verde, aceptación de términos y bloqueo ante datos inválidos. |
| 4 | **Navegación entre módulos:** Navegación fluida con React Router y control de acceso según rol (`Administrador` / `Ciudadano`). | Sí | Rutas en `src/App.jsx` (`/`, `/reportes`, `/crear-reporte`, `/zonas`, `/ciudadanos`, `/mapa`) con inicio y cierre de sesión y control por rol. |
| 5 | **Gestión de estados:** Estado compartido entre módulos mediante Context API (`AppContext`). | Sí | `src/context/AppContext.jsx` con `AppProvider` y hook `useApp()` centralizando sesión, perfil, reportes, zonas y ciudadanos. |
| 6 | **Datos de prueba:** Datos iniciales simulados para verificar registro, listado y eliminación. | Sí | Servicios iniciales con datos simulados y operaciones de listar, agregar y eliminar en memoria para probar el flujo completo. |
| 7 | **Verificación, corrección y versionado:** Pruebas funcionales, ajustes aplicados, lista diligenciada y subida al repositorio Git. | Sí | Probado en navegador (`npm run dev`), hallazgos corregidos, `LISTA_DE_CHEQUEO.md` diligenciada y cambios versionados en `develop` y `main`. |

---

## 2. Correspondencia con Criterios de Evaluación del SENA

| N° | Criterio de evaluación verificable | Estado | Soporte en el proyecto Geo-Garbage |
| :---: | :--- | :---: | :--- |
| 1 | Desarrolla componentes reutilizables para los módulos del proyecto, con separación de responsabilidades. | Cumple | `src/components/` (`Button.jsx`, `InputField.jsx`, `DataTable.jsx`), `src/pages/`, `src/services/` y módulos de validación separados. |
| 2 | Implementa formularios con validaciones y navegación coherente entre los módulos. | Cumple | Validación de formularios en módulos/perfil y rutas protegidas por rol (`Administrador` / `Ciudadano`) en `src/App.jsx`. |
| 3 | Gestiona los estados de la aplicación y utiliza datos de prueba para verificar el comportamiento. | Cumple | Estado local y global vía `AppContext.jsx` (`useApp()`) con datos iniciales simulados para registro, consulta y eliminación. |
| 4 | Verifica el resultado con una lista de chequeo y corrige los hallazgos encontrados. | Cumple | Pruebas en ejecución local, revisión de comportamiento en navegador y ajustes aplicados antes del cierre de la entrega. |
| 5 | Entrega el código versionado en el repositorio, la lista de chequeo diligenciada y la demostración del funcionamiento. | Cumple | Código subido a GitHub (`develop` y `main`), `LISTA_DE_CHEQUEO.md` en la raíz y demostración preparada del aplicativo. |

---

## 3. Control de Versiones y Hallazgos Verificados

- **Versión `v1.0.0` (Base):** Frontend inicial del proyecto Geo-Garbage en el repositorio.
- **Versión `v1.1.0` / `1.1` (Actual — Evidencia `GA7-220501096-AA4-EV01`):** Incorporación de componentes reutilizables, Context API (`AppContext`), módulos de Reportes, Zonas y Ciudadanos con validaciones y servicios, control de acceso por rol y edición de perfil.
- **Hallazgos y ajustes:** Se verificaron las rutas y permisos por rol en `src/App.jsx`, las validaciones de campos en los formularios y la sincronización de cambios entre `develop` y `main` en GitHub.

---

## 4. Lista de Entregables

- [x] Código fuente de los componentes y módulos frontend versionado en el repositorio (`https://github.com/cristiancamilom087/Geo-Garbage`).
- [x] Lista de chequeo de verificación diligenciada (`LISTA_DE_CHEQUEO.md`).
- [ ] Video o demostración del funcionamiento de los módulos (en preparación).