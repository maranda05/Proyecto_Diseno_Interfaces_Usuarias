// -----------------------------------------------------------------------
// Datos de ejemplo (mock) para el prototipo.
// Cuando exista backend, este archivo se reemplaza por llamadas a la API,
// pero la forma de los objetos (shape) puede mantenerse igual para no
// tener que tocar los componentes.
// -----------------------------------------------------------------------

export const usuario = {
  nombre: 'Mohammed A.',
  rol: 'Memorista · Ing. Civil Informática',
};

export const proceso = {
  etapas: [
    { id: 'tt1', label: 'Inscripción TT1', estado: 'done' },
    { id: 'validacion', label: 'Validación de requisitos', estado: 'current' },
    { id: 'tt2', label: 'Desarrollo TT2', estado: 'pending' },
    { id: 'defensa', label: 'Defensa de memoria', estado: 'pending' },
  ],
  tramitePendiente: 'Validación de Práctica Profesional 2',
  responsableActual: 'Dirección de Estudios',
  actualizado: 'Tiempo estimado de respuesta: 3–5 días hábiles · Actualizado hoy a las 09:12',
  hitos: [
    {
      id: 1,
      chip: 'urgent',
      chipLabel: '12 días',
      titulo: 'Entrega de informe final',
      detalle: 'Fecha límite: 15 de noviembre de 2026',
    },
    {
      id: 2,
      chip: 'neutral',
      chipLabel: 'Pendiente',
      titulo: 'Certificado de inglés de salida',
      detalle: 'Debes subirlo antes de solicitar examen de título',
    },
    {
      id: 3,
      chip: 'ok',
      chipLabel: 'En curso',
      titulo: 'Validación de Práctica Profesional 2',
      detalle: 'En revisión por Dirección de Estudios desde el 2 de septiembre',
    },
  ],
};

export const temasIniciales = [
  {
    id: 1,
    titulo: 'Desarrollo de sistema de trazabilidad académica',
    profesor: 'Pedro Godoy',
    area: 'Ingeniería de Software',
    cupos: '1/2',
    updated: 'hace 2 días',
  },
  {
    id: 2,
    titulo: 'Automatización de procesos financieros mediante IA',
    profesor: 'Raquel Pezoa',
    area: 'Inteligencia Artificial',
    cupos: '0/2',
    updated: 'hace 5 días',
  },
  {
    id: 3,
    titulo: 'Detección de anomalías en tráfico de red universitario',
    profesor: 'Marcia Muñoz',
    area: 'Ciberseguridad',
    cupos: '2/3',
    updated: 'hoy',
  },
  {
    id: 4,
    titulo: 'Panel de seguimiento para procesos académicos',
    profesor: 'Raquel Pezoa',
    area: 'Ingeniería de Software',
    cupos: '1/1',
    updated: 'hace 1 día',
  },
];

export const areas = ['Ingeniería de Software', 'Inteligencia Artificial', 'Ciberseguridad'];

export const notificacionesIniciales = [
  {
    id: 1,
    type: 'deadline',
    title: 'Tu informe final vence en 12 días',
    body: 'Fecha límite: 15 de noviembre de 2026. Revisa el formato exigido en Documentos.',
    time: 'Hoy, 08:00',
    unread: true,
  },
  {
    id: 2,
    type: 'status',
    title: 'Tu validación de Práctica Profesional 2 fue recibida',
    body: 'Dirección de Estudios está revisándola. Tiempo estimado: 3–5 días hábiles.',
    time: 'Ayer, 17:40',
    unread: true,
  },
  {
    id: 3,
    type: 'tema',
    title: 'Nuevo tema publicado en Ingeniería de Software',
    body: '"Panel de seguimiento para procesos académicos" — Prof. Raquel Pezoa.',
    time: 'Hace 2 días',
    unread: true,
  },
];

export const tiposDocumento = [
  'Informe de avance (memoria)',
  'Informe final de memoria',
  'Certificado de nivel de inglés',
  'Copia digital de la memoria (PDF)',
];

export const solicitudesEnviadasIniciales = [
  {
    id: 1,
    tipo: 'Informe de avance (memoria)',
    archivo: 'avance_v3.pdf',
    fecha: '5 de septiembre de 2026',
    estado: 'revision',
  },
];

export const documentos = {
  examenTitulo: [
    {
      id: 'certificado-regular',
      texto: 'Certificado de alumno regular (matrícula vigente)',
      checked: true,
      disabled: true,
      tag: 'Cargado 28-ago',
    },
    {
      id: 'ingles',
      texto: 'Certificado de nivel de inglés de salida',
      checked: false,
      disabled: false,
      accion: 'Ver instrucciones',
    },
    {
      id: 'memoria-pdf',
      texto: 'Copia digital de la memoria (PDF)',
      checked: false,
      disabled: false,
      accion: 'Descargar plantilla',
    },
  ],
  tt2: [
    {
      id: 'practica1',
      texto: 'Aprobación de Práctica Profesional 1',
      checked: true,
      disabled: true,
      tag: 'Validado',
    },
    {
      id: 'practica2',
      texto: 'Aprobación de Práctica Profesional 2',
      checked: false,
      disabled: true,
      tag: 'En revisión',
    },
  ],
};
