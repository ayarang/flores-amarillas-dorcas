/**
 * Momento musical de Dorcas: reproductor oficial flotante de YouTube.
 * La visitante toca la flor: intentamos reproducir con sonido sin otro clic.
 * Los navegadores pueden bloquear autoplay y necesitar ▶ dentro del video.
 * El reproductor nunca se mantiene reproduciéndose oculto.
 */
const VIDEO_ID = '7zp1TbLFPp8';
const START_SECONDS = 44;
const END_SECONDS = 74;
const EMBED_URL = 'https://www.youtube-nocookie.com/embed/' + VIDEO_ID +
  '?start=' + START_SECONDS + '&end=' + END_SECONDS +
  '&autoplay=1&playsinline=1&controls=1&rel=0';

export function initFloatingParty() {
  const root = document.getElementById('floating-party');
  const panel = document.getElementById('floating-party-panel');
  const holder = document.getElementById('floating-party-frame');
  const collapse = document.getElementById('floating-party-close');
  const toggle = document.getElementById('floating-party-toggle');

  if (!root || !panel || !holder || !collapse || !toggle) return {start() {}, stop() {}};

  function stop() {
    // Descargar iframe detiene realmente el audio de YouTube.
    holder.replaceChildren();
    panel.hidden = true;
    toggle.hidden = false;
  }
  function start() {
    if (!panel.hidden && holder.firstChild) return;
    root.hidden = false;
    panel.hidden = false;
    toggle.hidden = true;
    const iframe = document.createElement('iframe');
    iframe.title = 'Danza Kuduro — Don Omar ft. Lucenzo, del segundo 44 al 74';
    iframe.src = EMBED_URL;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; web-share; fullscreen';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading','eager');
    holder.replaceChildren(iframe);
  }
  collapse.addEventListener('click', stop);
  toggle.addEventListener('click', start);
  return {start, stop};
}
