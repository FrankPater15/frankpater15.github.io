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
    "Construyo aplicaciones de escritorio y web, y automatizo procesos con RPA, OCR e IA de visión. Busco mi primera posición como desarrollador.",
  ciudad: "Medellín, Antioquia",
  correo: "frank2018orono@gmail.com",
  github: "https://github.com/FrankPater15",
  foto: "foto.png", // tu foto, en la carpeta /public
  cv: "cv.pdf", // pon tu hoja de vida en la carpeta /public
};

export const sobreMi = [
  "Soy Tecnólogo en Análisis y Desarrollo de Software del SENA (2026). Hice mis prácticas durante seis meses en EDN Colombia. Allí diseñé y desarrollé Astrum, la plataforma interna de escritorio que usan los equipos de operación, comercial y PM.",
  "Me gusta automatizar tareas repetitivas. Trabajé con robots RPA, lectura de documentos con OCR e IA de visión, integraciones con Microsoft Graph y tableros de reportes. También me importa la calidad: mantuve más de 1.000 pruebas automatizadas y despliegues por CI/CD.",
  "Busco mi primera posición como desarrollador para aportar a un equipo de tecnología y seguir creciendo.",
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
    categoria: "Laboral",
    descripcion:
      "Plataforma interna de escritorio para los equipos de operación, comercial y PM de EDN Colombia. Tiene actualización automática, firma de código y unas 145 versiones publicadas en 6 meses.",
    stack: ["C#", ".NET", "CI/CD", "Pruebas"],
    privado: true,
    destacado: true,
  },
  {
    nombre: "Robots RPA para certificados digitales",
    categoria: "Laboral",
    descripcion:
      "Automatización de la radicación y renovación de certificados digitales, con puntos de aprobación humana y manejo de captchas.",
    stack: ["RPA", "Automatización"],
    privado: true,
  },
  {
    nombre: "Validación de documentos con OCR",
    categoria: "Laboral",
    descripcion:
      "Lectura automática de RUT, Cámara de Comercio y documentos de identidad con OCR e IA de visión para validar la información.",
    stack: ["OCR", "IA de visión", "Microsoft Graph"],
    privado: true,
  },
  {
    nombre: "NailSoft",
    categoria: "Académico",
    descripcion:
      "Aplicación web del SENA para administrar los servicios de un spa de uñas, con interfaz en React, servidor en Node.js y base de datos MongoDB.",
    stack: ["React", "Node.js", "MongoDB"],
    repo: "https://github.com/IHomoSapienI/ProyectoNailSoft",
  },
  {
    nombre: "Este portafolio",
    categoria: "Personal",
    descripcion:
      "Sitio personal hecho con React, Vite y Tailwind CSS, con animaciones en Framer Motion, modo claro/oscuro y despliegue automático en GitHub Pages con GitHub Actions.",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
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
