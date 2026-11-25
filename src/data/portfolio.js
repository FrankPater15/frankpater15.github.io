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
    "Node.js · React · Angular · Python",
    "Integraciones con APIs",
    "Automatización con RPA, OCR e IA",
  ],
  descripcion:
    "Construyo aplicaciones web y de escritorio, integro sistemas por medio de APIs y automatizo procesos con Python, RPA, OCR e IA.",
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
  "Me importa que lo que entrego funcione y se pueda mantener, me comunico con claridad y me adapto rápido a herramientas nuevas. Ahora busco un equipo donde aportar lo que aprendí construyendo Astrum y seguir creciendo.",
];

export const estadisticas = [
  { valor: 145, sufijo: "", texto: "versiones publicadas de Astrum" },
  { valor: 1000, sufijo: "+", texto: "pruebas automatizadas" },
  { valor: 6, sufijo: "", texto: "meses de experiencia" },
];

export const habilidades = {
  Backend: ["Node.js", "Express", "Python", "Flask", "Socket.IO", "APIs REST", "C#", ".NET"],
  Frontend: ["React", "Angular", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite", "Electron"],
  "Bases de datos": ["SQL Server", "PostgreSQL", "MongoDB", "Supabase", "Firebase"],
  Móvil: ["Flutter", "Dart"],
  Automatización: ["RPA con Python", "Playwright", "OCR", "IA de visión", "Agentes de IA", "Microsoft Graph"],
  Herramientas: ["Git", "GitHub", "Postman", "CI/CD", "Azure (básico)", "Claude Code", "Pruebas automatizadas", "Metodologías ágiles"],
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
      "Automaticé con Python la radicación y renovación de certificados digitales con robots RPA, con puntos de aprobación humana y manejo de captchas.",
      "Implementé la lectura de documentos con OCR e IA de visión para validar RUT, Cámara de Comercio y documentos de identidad.",
      "Construí en Python tableros de cumplimiento de facturación electrónica y reportes ejecutivos automáticos para aliados.",
      "Integré Microsoft Graph (Outlook y SharePoint), autenticación con Microsoft y APIs de terceros, probando los servicios con Postman.",
      "Me reunía con las áreas para entender sus procesos, detectar tareas repetitivas y proponer cómo automatizarlas.",
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
    stack: ["C#", ".NET", "Python", "Flask", "React", "Electron", "PostgreSQL", "CI/CD", "Pruebas"],
    imagen: "proyectos/astrum.jpg", // captura en /public (opcional)
    privado: true,
    destacado: true,
  },
  {
    nombre: "Minimapa de Origins (BO2 Zombies)",
    icono: "Map",
    color: "#60a5fa",
    categoria: "Personal",
    descripcion:
      "Mod de fans para Black Ops II en Plutonium T6: un minimapa que gira contigo, muestra zombis y Panzer en vivo, avisa si atacan tus generadores y abre el mapa completo con una tecla. Probado en solitario.",
    stack: ["GSC", "Lua", "Python"],
    imagen: "proyectos/minimapa.jpg",
    repo: "https://github.com/FrankPater15/BO2-Origins-Minimap",
    video: "https://youtube.com/shorts/sDCiI5q1efg",
    descarga: "https://github.com/FrankPater15/BO2-Origins-Minimap/releases/latest",
  },
  {
    nombre: "Radar de Empleo CO",
    icono: "Radar",
    color: "#34d399",
    categoria: "Personal",
    descripcion:
      "Agente personal que reúne ofertas de empleo desde APIs públicas, elimina duplicados, las prefiltra y las puntúa con IA según mi perfil. Tiene un panel web para el seguimiento y una corrida diaria automática. No se postula solo: la decisión es mía.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "Gemini", "Pydantic", "pytest"],
    animacion: "radar",
    repo: "https://github.com/FrankPater15/Radar-Empleos",
  },
  {
    nombre: "Robots RPA para certificados digitales",
    icono: "Bot",
    color: "#a78bfa",
    categoria: "Laboral",
    descripcion:
      "Robots que radican y renuevan certificados digitales. Una persona aprueba los pasos clave y el robot se encarga del resto, incluidos los captchas.",
    stack: ["Python", "Playwright", "RPA"],
    animacion: "rpa", // portada animada (rpa | ocr | radar | clipper)
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
      "Rediseño completo del proyecto de mi equipo del SENA: reservas en línea para un spa de uñas, panel de ventas e inventario y app Android para las estilistas. Cerré huecos de seguridad, hice un sistema de diseño propio y agregué más de 240 pruebas automáticas con CI.",
    stack: ["React", "Node.js", "MongoDB", "Flutter", "Jest", "GitHub Actions"],
    imagen: "proyectos/nailsoft.jpg",
    repo: "https://github.com/FrankPater15/NailSoftMejorado",
    demo: "https://nailsoft-spa.web.app",
    apk: "https://github.com/FrankPater15/NailSoftMejorado/releases/latest",
  },
  {
    nombre: "Clipper",
    icono: "Scissors",
    color: "#fb7185",
    categoria: "Personal",
    descripcion:
      "Herramienta para streamers que no quieren pasar horas editando: encuentra los mejores momentos del directo con los picos del chat e IA, recorta y subtitula los clips, y los deja listos para revisar en un panel.",
    stack: ["Python", "FFmpeg", "Gemini"],
    animacion: "clipper",
    privado: true,
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
