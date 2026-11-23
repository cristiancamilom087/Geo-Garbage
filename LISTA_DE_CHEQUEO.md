# Lista de Chequeo — Evidencia GA7-220501096-AA4-EV01

- **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
- **Evidencia:** GA7-220501096-AA4-EV01
- **RAP:** 220501096-04
- **Fechas de la evidencia:** 09/11 – 22/11/26
- **Proyecto:** Geo-Garbage (*"Tu reporte. Nuestra respuesta."*)
- **Aprendiz:** Cristian Camilo Morales Gomez
- **Repositorio:** `https://github.com/cristiancamilom087/Geo-Garbage`

## Criterios de Evaluación (Verificables)

| N° | Criterio de evaluación (verificable) | Cumple (Sí / No / Obs.) | Evidencia y observaciones en el proyecto |
| :---: | :--- | :---: | :--- |
| 1 | Desarrolla componentes reutilizables para los módulos del proyecto, con separación de responsabilidades. | Sí | Componentes reutilizables en `src/components/` (`InputField.jsx`, `Button.jsx`, `DataTable.jsx`), vistas en `src/pages/` (`Login.jsx`, `Mapa.jsx`, `reportes/`, `zonas/`, `ciudadanos/`), validaciones y servicios separados en `src/services/`. |
| 2 | Implementa formularios con validaciones y navegación coherente entre los módulos. | Sí | Formularios con validación de campos y alertas de error, y rutas con React Router y control según rol (`Administrador` / `Ciudadano`) en `src/App.jsx` (`/`, `/reportes`, `/crear-reporte`, `/zonas`, `/ciudadanos`, `/mapa`). |
| 3 | Gestiona los estados de la aplicación y utiliza datos de prueba para verificar el comportamiento. | Sí | Gestión de estado local y compartido mediante Context API (`AppProvider` y `useApp()` en `src/context/AppContext.jsx`) con datos iniciales simulados para probar registro, listado y eliminación. |
| 4 | Verifica el resultado con una lista de chequeo y corrige los hallazgos encontrados. | Sí | Revisión funcional de los módulos en navegador (`npm run dev`), corrección de hallazgos detectados y diligenciamiento de esta lista de chequeo. |
| 5 | Entrega el código versionado en el repositorio, la lista de chequeo diligenciada y la demostración del funcionamiento. | Sí | Código fuente versionado en Git/GitHub (`https://github.com/cristiancamilom087/Geo-Garbage`), `LISTA_DE_CHEQUEO.md` en la raíz del proyecto y demostración en video/ejecución del aplicativo. |

## Entregables Requeridos

- [x] Código fuente de los componentes y módulos frontend versionado en el repositorio del proyecto.
- [x] Lista de chequeo de verificación diligenciada (`LISTA_DE_CHEQUEO.md`).
- [ ] Video o demostración del funcionamiento de los módulos (grabar mostrando login, roles, navegación, formularios/validaciones, datos de prueba y actualización de perfil).