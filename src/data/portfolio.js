// ============================================================
//  TODOS LOS DATOS DEL PORTAFOLIO
//  Edita este archivo para cambiar textos, proyectos o habilidades.
// ============================================================

export const perfil = {
  nombre: "Frank Javier",
  apellido: "Orono Paternina",
  titulo: "Tecnólogo en Análisis y Desarrollo de Software",
  roles: [
    "Desarrollador Full Stack Junior",
    "C# · .NET · React · Node.js",
    "Automatización con RPA y OCR",
  ],
  descripcion:
    "Construyo aplicaciones de escritorio y web, y automatizo procesos con RPA, OCR e IA de visión.",
  ciudad: "Medellín, Antioquia",
  correo: "frank.paternina.dev@gmail.com",
  github: "https://github.com/FrankPater15",
  foto: "foto.jpg", // tu foto, en la carpeta /public
  cv: "cv.pdf", // pon tu hoja de vida en la carpeta /public
};

// ------------------------------------------------------------
//  Cada sección cuenta algo distinto para no repetir:
//   - Inicio: quién eres y qué haces (una línea).
//   - Sobre mí: qué te mueve y cómo trabajas (sin logros ni cifras).
//   - Cifras: los números.
//   - Experiencia: los logros en detalle.
//   - Proyectos: qué es cada cosa que construiste.
// ------------------------------------------------------------

// Frase grande que se ilumina palabra por palabra al hacer scroll
export const frase =
  "Me gusta encontrar la tarea repetitiva que le quita tiempo a un equipo y convertirla en algo que se hace solo.";

export const sobreMi = [
  "Lo que más disfruto es entender cómo trabaja un equipo y ver dónde la tecnología le puede ahorrar tiempo: un formulario que se llena solo, un documento que se valida sin revisarlo a mano o un reporte que llega listo.",
  "Me importa que lo que entrego funcione y se pueda mantener, me comunico con claridad y me adapto rápido a herramientas nuevas. Ahora busco mi primera posición como desarrollador para aportar a un equipo y seguir creciendo.",
];

export const estadisticas = [
  { valor: 145, sufijo: "", texto: "versiones publicadas de Astrum" },
  { valor: 1000, sufijo: "+", texto: "pruebas automatizadas" },
  { valor: 6, sufijo: "", texto: "meses de experiencia" },
];

export const habilidades = {
  Backend: ["C#", ".NET", "Node.js"],
  Frontend: ["React", "Angular", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"],
  "Bases de datos": ["SQL Server", "MongoDB", "Supabase"],
  Móvil: ["Flutter", "Dart"],
  Automatización: ["RPA", "OCR", "IA de visión", "Microsoft Graph"],
  Herramientas: ["Git", "GitHub", "CI/CD", "Pruebas automatizadas", "Metodologías ágiles"],
};

export const habilidadesPersonales = [
  "Trabajo en equipo",
  "Comunicación efectiva",
  "Resolución de problemas",
  "Proactividad y puntualidad",
  "Adaptabilidad",
];

export const idiomas = "Español (nativo) · Inglés A2 (básico)";

export const experiencia = [
  {
    cargo: "Practicante – Auxiliar del Área de Implementaciones",
    empresa: "EDN Colombia",
    logo: "logos/edn.png", // PNG con fondo transparente, en /public
    fecha: "Abr 2026 – Oct 2026",
    logros: [
      "Diseñé y desarrollé Astrum, la plataforma interna de escritorio de los equipos de operación, comercial y PM: unas 145 versiones en 6 meses, con actualización automática y firma de código.",
      "Automaticé la radicación y renovación de certificados digitales con robots RPA, con puntos de aprobación humana y manejo de captchas.",
      "Implementé la lectura de documentos con OCR e IA de visión para validar RUT, Cámara de Comercio y documentos de identidad.",
      "Construí tableros de cumplimiento de facturación electrónica y reportes ejecutivos automáticos para aliados.",
      "Integré Microsoft Graph (Outlook y SharePoint), autenticación con Microsoft y APIs de terceros.",
      "Mantuve más de 1.000 pruebas automatizadas y despliegues por CI/CD.",
    ],
  },
];

// categoria: "Laboral" | "Académico" | "Personal"
export const proyectos = [
  {
    nombre: "Astrum",
    icono: "Monitor",
    color: "#2dd4bf",
    categoria: "Laboral",
    descripcion:
      "Aplicación de escritorio interna para los equipos de operación, comercial y PM, con actualización automática y firma de código.",
    stack: ["C#", ".NET", "CI/CD", "Pruebas"],
    imagen: "proyectos/astrum.jpg", // captura en /public (opcional)
    privado: true,
    destacado: true,
  },
  {
    nombre: "Robots RPA para certificados digitales",
    icono: "Bot",
    color: "#a78bfa",
    categoria: "Laboral",
    descripcion:
      "Robots que radican y renuevan certificados digitales. Una persona aprueba los pasos clave y el robot se encarga del resto, incluidos los captchas.",
    stack: ["RPA", "Automatización"],
    animacion: "rpa", // portada animada (rpa | ocr)
    privado: true,
  },
  {
    nombre: "Validación de documentos con OCR",
    icono: "ScanText",
    color: "#38bdf8",
    categoria: "Laboral",
    descripcion:
      "Lectura automática de RUT, Cámara de Comercio y documentos de identidad con OCR e IA de visión para validar la información.",
    stack: ["OCR", "IA de visión", "Microsoft Graph"],
    animacion: "ocr",
    privado: true,
  },
  {
    nombre: "NailSoft",
    icono: "Sparkles",
    color: "#f472b6",
    categoria: "Académico",
    descripcion:
      "Aplicación web del SENA para administrar los servicios de un spa de uñas, con interfaz en React, servidor en Node.js y base de datos MongoDB.",
    stack: ["React", "Node.js", "MongoDB"],
    imagen: "proyectos/nailsoft.jpg",
    repo: "https://github.com/IHomoSapienI/ProyectoNailSoft",
  },
  {
    nombre: "Este portafolio",
    icono: "Code2",
    color: "#fbbf24",
    categoria: "Personal",
    descripcion:
      "Sitio personal en React con scroll suave (Lenis), animaciones ligadas al scroll con Framer Motion, cursor personalizado, modo claro/oscuro y despliegue automático con GitHub Actions.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lenis"],
    imagen: "proyectos/portafolio.jpg",
    repo: "https://github.com/FrankPater15/frankpater15.github.io",
  },
];

export const formacion = [
  {
    titulo: "Tecnólogo en Análisis y Desarrollo de Software",
    lugar: "SENA – Centro de Servicios y Gestión Empresarial, Medellín",
    fecha: "2023 – 2026",
    extra: "Título: 29 de octubre de 2026",
  },
  {
    titulo: "Técnico laboral en Asistente de Soporte, Mantenimiento y Visualización de Bases de Datos",
    lugar: "Institución Universitaria ITM",
    fecha: "2022",
  },
  {
    titulo: "Bachiller en Media Técnica, especialidad Informática/TIC",
    lugar: "Institución Educativa El Pinal",
    fecha: "2018 – 2022",
  },
];

// ============================================================
//  CERTIFICADOS
//  Para agregar uno nuevo:
//   1. Copia el PDF (o imagen) en /public/certificados/
//   2. Agrega un bloque aquí abajo (los más recientes primero).
//  Campos opcionales: horas, serie, archivo, enlace (URL de verificación).
// ============================================================
export const certificados = [
  {
    nombre: "Pensamiento crítico y resolución de problemas",
    entidad: "Santander Open Academy",
    fecha: "Oct 2026",
    horas: 8,
    serie: "OA-2026-1013003332447",
    archivo: "certificados/pensamiento-critico.pdf",
  },
  {
    nombre: "Comunicación Efectiva",
    entidad: "Santander Open Academy",
    fecha: "Sep 2026",
    horas: 8,
    serie: "OA-2026-0928003254309",
    archivo: "certificados/comunicacion-efectiva.pdf",
  },
];
