# SGM · Portal de Memoria y Titulación (prototipo React)

Prototipo funcional (con datos simulados/estáticos) del sistema propuesto para
centralizar el proceso de memoria y titulación del Departamento de Informática
(UTFSM), a partir de los hallazgos de la Entrega 1 (entrevistas a alumnos,
jefe de carrera, profesor guía y secretaria).

Es la migración 1:1 del prototipo HTML/CSS/JS estático a una app **React +
Vite**, pensada para poder seguir iterando el prototipo en las próximas
entregas (agregar vistas, conectar a un backend real, etc.) sin reescribir
todo de nuevo.

## Cómo correrlo

### Opción A — con Docker (recomendado, no requiere tener Node instalado)

Desarrollo, con hot-reload:
```bash
docker compose up --build
```
Abre http://localhost:5173

Producción (build optimizado servido con nginx):
```bash
docker compose -f docker-compose.prod.yml up --build
```
Abre http://localhost:8080

### Opción B — local, sin Docker

```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Estructura del proyecto

```
src/
  data/
    mockData.js         ← TODOS los datos de ejemplo (temas, notificaciones,
                           proceso, documentos). Edita este archivo para
                           cambiar el contenido sin tocar componentes.
  components/
    Sidebar.jsx          ← Menú lateral + navegación + contador de notifs
    ProcesoView.jsx       ← Vista "Mi proceso" (stepper, estado, hitos)
    TemasView.jsx         ← Vista "Temas disponibles" (buscador, filtro,
                           solicitar tema, mis solicitudes)
    NotificacionesView.jsx← Vista "Notificaciones"
    DocumentosView.jsx    ← Vista "Documentos requeridos" (checklist)
    SolicitudesView.jsx   ← Vista "Enviar solicitud formal" (upload + envío)
  App.jsx                ← Orquesta el estado global y la navegación
                           (reemplaza las funciones sueltas del <script>
                           del HTML original: go(), renderTemas(),
                           renderNotifs(), toggleDoc(), etc.)
  index.css              ← Mismos estilos y variables CSS del prototipo
                           original (paleta navy/paper/gold), ahora en un
                           solo archivo global.
```

## Qué se mantuvo igual que el HTML original

- Todo el diseño visual (colores, tipografías, layout, componentes).
- Las 5 vistas: Mi proceso, Temas disponibles, Solicitudes, Notificaciones, Documentos.
- La navegación por hash en la URL (#proceso, #temas, #solicitudes, #notif, #documentos),
  compatible con el botón "atrás" del navegador.
- El comportamiento estático/simulado: solicitar un tema, tildar documentos,
  marcar notificaciones como leídas — todo sigue siendo "de mentira" (no hay
  backend), pero ahora vive en el estado de React en lugar de variables
  globales de JavaScript.

## Cómo seguir modificándolo

- **Cambiar textos, temas de memoria, hitos, notificaciones de ejemplo** →
  edita `src/data/mockData.js`.
- **Agregar una vista nueva** (por ejemplo "Mensajes con mi profesor guía") →
  crea un componente en `src/components/`, agrégalo a la lista `VIEWS` y al
  `switch` de vistas en `App.jsx`, y un botón en `Sidebar.jsx`.
- **Conectar a un backend real más adelante** → reemplaza los arrays de
  `mockData.js` por llamadas `fetch`/`axios` dentro de `useEffect` en
  `App.jsx`, manteniendo la misma forma de los datos para no tener que tocar
  los componentes de vista.

## Contexto del proyecto

Este prototipo responde al problema detectado en la Entrega 1: la plataforma
oficial (`sgm.inf.utfsm.cl`) está en desuso casi total y el proceso de
memoria/titulación se coordina informalmente por correo y WhatsApp. Las
vistas de este prototipo (proceso centralizado, catálogo de temas,
notificaciones proactivas y checklist de documentos) responden directamente
a las necesidades levantadas por los 7 entrevistados (alumnos, jefe de
carrera, profesores guía y secretaria).
