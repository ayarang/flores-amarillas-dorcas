# 🌻 Feliz cumpleaños, Dorcas — edición 2026

Versión de cumpleaños del proyecto de flores amarillas para Dorcas Yaranga. Reutiliza el mismo repositorio y el mismo enlace de GitHub Pages.

**Enlace:** https://ayarang.github.io/flores-amarillas-dorcas/

## Estructura del proyecto

- index.html — nueva experiencia (inicio, ramo, velitas, carta, recuerdos y final).
- css/styles.css — estilos rosa-lila/crema y animaciones adaptables.
- js/app.js — interacciones y navegación.
- js/particles.js — pétalos, confeti y destellos en canvas.
- js/audio.js — melodía instrumental ORIGINAL con Web Audio, iniciada manualmente.
- js/youtube.js — reproductor oficial de YouTube bajo demanda (Danza Kuduro 00:44–01:14).
- css/youtube.css — estilos adaptables del momento musical.
- assets/illustrations/ — girasol individual y ramo ilustrados en SVG.
- assets/images/ — cuatro fotografías recuperadas de la versión anterior.
- flores-original.html — la página anterior preservada sin modificar.
- README_GITHUB.txt — instrucciones de la primera versión, conservadas.

## Cambiar la dedicatoria

Busca la sección HTML con el atributo id="letter-paper" en index.html y edita sus párrafos.

## Añadir recuerdos

Agrega las nuevas fotografías en assets/images/ y ajusta las tarjetas dentro de la sección id="recuerdos". Este proyecto y su página web son públicos; verifica que se puedan publicar las fotografías.

## Música

La melodía actual se sintetiza con Web Audio: es una composición instrumental original, no una canción de terceros. Comienza únicamente al pulsar «Activar música», para respetar las restricciones habituales de los navegadores móviles.

También hay un botón «¡Que empiece la fiesta!» debajo del ramo. Al tocarlo carga el reproductor oficial de YouTube para Danza Kuduro (Don Omar ft. Lucenzo, 00:44–01:14). Este es un intervalo sugerido, ajustable; no se descarga ni aloja la canción en GitHub. YouTube puede requerir que la visitante pulse ▶ dentro del reproductor y su disponibilidad depende de las políticas del video y del navegador. Mientras se muestra el video, se detiene la melodía instrumental original. Para evitar reproducciones simultáneas, iniciar la música instrumental detiene el video.

## Publicación con GitHub Pages

El sitio es estático, sin dependencias, compilación ni base de datos. En Settings → Pages selecciona Deploy from a branch, branch main, carpeta / (root). Los cambios publicados pueden tardar unos minutos.

## Accesibilidad y rendimiento

Diseño mobile-first; soporte de teclado, galería táctil, animaciones reducidas para prefers-reduced-motion, recursos locales y confeti eficiente con canvas.

**Fecha del homenaje:** 6 de noviembre de 2026.
