# Portafolio – Frank Orono

Portafolio personal hecho con **React 19, Vite, Tailwind CSS 4 y Framer Motion**.

🌐 https://frankpater15.github.io

## Funciones

- Modo claro y oscuro (se guarda la preferencia)
- Efecto de máquina de escribir y animaciones al hacer scroll
- Habilidades por pestañas y proyectos con filtros
- Barra de progreso de lectura y menú adaptable a celular
- Despliegue automático con GitHub Actions

## Estructura

```
src/
├── data/portfolio.js   ← TODOS los textos, proyectos y habilidades (edita aquí)
├── components/         ← Navbar, Hero, About, Skills, Experience, Projects, Education, Contact
├── App.jsx
└── index.css           ← colores del tema
public/
├── foto.jpg            ← tu foto (agrégala)
└── cv.pdf              ← tu hoja de vida (agrégala)
```

## Comandos

```powershell
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # ver la página en http://localhost:5173 mientras editas
npm run build    # compilar para producción (carpeta dist)
```

## Publicar cambios

```powershell
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Actions compila y publica la página sola en 1 o 2 minutos.
Puedes ver el progreso en la pestaña **Actions** del repositorio.
