/**
 * Reproductor oficial de YouTube para el tramo festivo de Danza Kuduro.
 * No descarga música ni oculta el reproductor.
 * Los segundos de inicio y fin se pueden modificar aquí.
 */
const VIDEO_ID = '7zp1TbLFPp8';
const START_SECONDS = 44;
const END_SECONDS = 74;
const EMBED_URL = 'https://www.youtube-nocookie.com/embed/' + VIDEO_ID
  + '?start=' + START_SECONDS
  + '&end=' + END_SECONDS
  + '&autoplay=1&playsinline=1&controls=1&rel=0';

export function initPartyMoment({onPlay} = {}) {
  const button = document.getElementById('party-play');
  const panel = document.getElementById('party-video');
  const frameHolder = document.getElementById('party-frame');
  if (!button || !panel || !frameHolder) return {stop(){}};

  let opened = false;
  function stop() {
    if (!opened) return;
    opened = false;
    // Desmontar el reproductor detiene video y audio sin depender de APIs de terceros.
    frameHolder.replaceChildren();
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Reproducir fragmento de Danza Kuduro en YouTube');
    button.innerHTML = '<span aria-hidden="true">▶</span> ¡Que empiece la fiesta!';
  }
  button.addEventListener('click', () => {
    if (opened) { stop(); return; }
    onPlay?.();
    const iframe = document.createElement('iframe');
    iframe.title = 'Danza Kuduro — Don Omar ft. Lucenzo, fragmento de 00:44 a 01:14';
    iframe.src = EMBED_URL;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'eager');
    frameHolder.replaceChildren(iframe);
    panel.hidden = false;
    opened = true;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Detener y cerrar el fragmento de Danza Kuduro');
    button.innerHTML = '<span aria-hidden="true">■</span> Detener canción';
  });
  return {stop};
}
