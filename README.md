# Portafolio – Frank Orono

Portafolio personal hecho con HTML, CSS y JavaScript, sin frameworks.

## Archivos

| Archivo      | Qué contiene                                   |
|--------------|------------------------------------------------|
| `index.html` | El contenido (textos, secciones, proyectos)     |
| `styles.css` | Colores, tamaños, diseño para celular           |
| `script.js`  | Menú, animaciones, efecto de escritura          |
| `foto.jpg`   | Tu foto (agrégala tú, cuadrada si es posible)   |
| `cv.pdf`     | Tu hoja de vida para el botón "Descargar CV"    |

## Verlo en tu computador

Haz doble clic en `index.html`.

## Publicarlo gratis en GitHub Pages

1. Entra a GitHub y crea un repositorio **público** llamado exactamente:
   `FrankPater15.github.io` (sin README).
2. En PowerShell, dentro de esta carpeta:

   ```powershell
   git init
   git add .
   git commit -m "Primera versión del portafolio"
   git branch -M main
   git remote add origin https://github.com/FrankPater15/FrankPater15.github.io.git
   git push -u origin main
   ```

3. En el repositorio, ve a **Settings → Pages**. En "Source" elige
   **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. Espera 1 o 2 minutos y abre: **https://frankpater15.github.io**

## Actualizarlo después

```powershell
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages se actualiza solo en uno o dos minutos.
