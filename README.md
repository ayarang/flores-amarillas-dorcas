# 🌻 Feliz cumpleaños, Dorcas — edición 2026

Versión de cumpleaños del proyecto de flores amarillas para Dorcas Yaranga. Reutiliza el mismo repositorio y el mismo enlace de GitHub Pages.

**Enlace:** https://ayarang.github.io/flores-amarillas-dorcas/

## Estructura del proyecto

- index.html — nueva experiencia (inicio, ramo, velitas, carta, recuerdos y final).
- css/styles.css — estilos rosa-lila/crema y animaciones adaptables.
- js/app.js — interacciones y navegación.
- js/particles.js — pétalos, confeti y destellos en canvas.
- js/youtube.js — reproductor flotante oficial de YouTube (Danza Kuduro 00:44–01:14), que intenta comenzar al tocar el girasol.
- css/youtube.css — estilos adaptables del reproductor flotante.
- assets/illustrations/ — girasol individual y ramo ilustrados en SVG.
- assets/images/ — cuatro fotografías recuperadas de la versión anterior.
- flores-original.html — la página anterior preservada sin modificar.
- README_GITHUB.txt — instrucciones de la primera versión, conservadas.

## Cambiar la dedicatoria

Busca la sección HTML con el atributo id="letter-paper" en index.html y edita sus párrafos.

## Añadir recuerdos

Agrega las nuevas fotografías en assets/images/ y ajusta las tarjetas dentro de la sección id="recuerdos". Este proyecto y su página web son públicos; verifica que se puedan publicar las fotografías.

## Música

La versión de cumpleaños usa únicamente **Danza Kuduro**, Don Omar ft. Lucenzo, mediante el reproductor oficial de YouTube entre 00:44 y 01:14.

La música instrumental anterior se eliminó de la interfaz y ya no se importa el código de audio. La canción se intenta iniciar automáticamente cuando Dorcas toca la flor de bienvenida; el navegador móvil o YouTube pueden impedir la reproducción con sonido. En ese caso, hay controles ▶ visibles para reproducir manualmente.

El reproductor flota encima de la página durante la canción y mantiene el video oficial visible. Al pulsar × se detiene y minimiza a un botón; al reanudar, se carga desde el segundo 44. No se descarga ni redistribuye la grabación.

## Publicación con GitHub Pages

El sitio es estático, sin dependencias, compilación ni base de datos. En Settings → Pages selecciona Deploy from a branch, branch main, carpeta / (root). Los cambios publicados pueden tardar unos minutos.

## Accesibilidad y rendimiento

Diseño mobile-first; soporte de teclado, galería táctil, animaciones reducidas para prefers-reduced-motion, recursos locales y confeti eficiente con canvas.

**Fecha del homenaje:** 6 de noviembre de 2026.
