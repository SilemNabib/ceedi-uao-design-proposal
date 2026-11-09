// Genera las 8 páginas estáticas del micrositio CEEDi.  Uso: node _src/build.mjs
// Sin dependencias. Los textos marcados "muestra" en _src/contenido.mjs se reemplazan antes de publicar.
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import * as C from './contenido.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
// Huella del contenido: cada cambio en la hoja de estilos o el script cambia la URL y el navegador no usa una copia vieja.
const huella = (ruta) => `${ruta}?v=${createHash('sha1').update(readFileSync(join(RAIZ, ruta))).digest('hex').slice(0, 8)}`;
const CSS = huella('assets/css/site.css');
const JS = huella('assets/js/site.js');

/* ---------------- piezas de marca ---------------- */
// Sin arcos: las subpáginas de uao.edu.co no los usan. Viñeta: un recuadro pequeño.
const vineta = '<span class="vineta" aria-hidden="true"></span>';
const casita = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 3.2 3.5 10.2v10.1h6.2v-6.3h4.6v6.3h6.2V10.2L12 3.2Z"/></svg>';
const chevron = '<svg class="migas__sep" viewBox="0 0 8 12" width="7" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 1.5 6.5 6 2 10.5"/></svg>';
const flecha = (c) => `<svg class="${c}" viewBox="0 0 12 8" fill="currentColor" aria-hidden="true"><path d="M.9 1h10.200a.6.6 0 0 1 .47.97L6.470 7.400a.6.6 0 0 1-.94 0L.430 1.970A.6.6 0 0 1 .9 1Z"/></svg>`;

// Íconos: línea uniforme, esquinas curvas y puntas redondeadas (manual p. 46-47)
const I = {
  guia: '<path d="M6 7.5C6 6.1 7.1 5 8.5 5H18c1.9 0 3.5 1.1 4 2.7.5-1.6 2.1-2.7 4-2.7h9.5C36.9 5 38 6.1 38 7.5v25c0 1.4-1.1 2.5-2.5 2.5H26c-1.9 0-3.5 1-4 2.5-.5-1.5-2.1-2.5-4-2.5H8.5C7.1 35 6 33.9 6 32.5v-25Z"/><path d="M22 8v29"/><path d="M11 13h6M11 19h6M27 13h6M27 19h6"/>',
  plantilla: '<rect x="6" y="6" width="32" height="32" rx="4"/><path d="M6 15h32M17 15v23"/><path d="M23 22h9M23 28h9"/>',
  orientacion: '<circle cx="22" cy="22" r="16"/><path d="M28.5 15.5l-4 9-9 4 4-9 9-4Z"/><circle cx="22" cy="22" r="1"/>',
  persona: '<circle cx="22" cy="14" r="8"/><path d="M6.5 38c0-7 6.9-12 15.5-12s15.5 5 15.5 12c0 .6-.4 1-1 1h-29c-.6 0-1-.4-1-1Z"/>',
  aula: '<rect x="5" y="7" width="34" height="23" rx="3"/><path d="M15 37h14M22 30v7"/><path d="M12 15h12M12 21h20"/>',
  camara: '<rect x="5" y="11" width="24" height="22" rx="4"/><path d="M29 19l8.5-5c.7-.4 1.5.1 1.5.9v14.2c0 .8-.8 1.3-1.5.9L29 25"/>',
  evaluacion: '<rect x="8" y="6" width="28" height="33" rx="4"/><path d="M15 6v-.5C15 4.7 15.7 4 16.5 4h11c.8 0 1.5.7 1.5 1.5V6"/><path d="M15 22l5 5 9-10"/>',
  correo: '<rect x="5" y="9" width="34" height="26" rx="4"/><path d="M6 12l14 11.2c1.2.9 2.8.9 4 0L38 12"/>',
  ubicacion: '<path d="M22 40S9 27.7 9 18a13 13 0 0 1 26 0c0 9.7-13 22-13 22Z"/><circle cx="22" cy="18" r="5"/>',
  reloj: '<circle cx="22" cy="22" r="16"/><path d="M22 12v10l7 4"/>',
  documento: '<rect x="9" y="5" width="26" height="34" rx="4"/><path d="M15 14h14M15 21h14M15 28h9"/>',
  telefono: '<path d="M14.500 6h-5C7.600 6 6 7.600 6 9.500 6 24.700 19.300 38 34.500 38c1.900 0 3.500-1.600 3.500-3.500v-5c0-1.200-.7-2.300-1.900-2.700l-6.800-2.300c-1-.3-2.200-.1-3 .7l-2.500 2.500c-4.300-2.200-7.800-5.700-10-10l2.500-2.500c.8-.8 1-2 .7-3l-.8-4C15.900 7 15.300 6 14.500 6Z"/>',
};
// Redes: las marcas de cada servicio, en plano y en el color del texto.
const RED = {
  facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.990 4.388 10.954 10.125 11.854v-8.385H7.078v-3.470h3.047V9.430c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.830c-1.491 0-1.956.925-1.956 1.874v2.250h3.328l-.532 3.470h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/>',
  x: '<path d="M18.901 1.153h3.680l-8.040 9.190L24 22.846h-7.406l-5.800-7.584-6.638 7.584H.474l8.600-9.830L0 1.154h7.594l5.243 6.932ZM17.610 20.644h2.039L6.486 3.240H4.298Z"/>',
  instagram: '<path fill-rule="evenodd" d="M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6Zm0 2.200A3.800 3.800 0 0 0 3.200 7v10A3.800 3.800 0 0 0 7 20.800h10a3.800 3.800 0 0 0 3.800-3.800V7A3.800 3.800 0 0 0 17 3.200H7Zm5 3.300a5.500 5.500 0 1 1 0 11 5.500 5.500 0 0 1 0-11Zm0 2.200a3.300 3.300 0 1 0 0 6.600 3.300 3.300 0 0 0 0-6.600Zm5.700-3.700a1.300 1.300 0 1 1 0 2.600 1.300 1.300 0 0 1 0-2.600Z"/>',
  youtube: '<path fill-rule="evenodd" d="M23.500 6.200a3 3 0 0 0-2.100-2.100C19.500 3.600 12 3.600 12 3.600s-7.500 0-9.400.5A3 3 0 0 0 .5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 0 0 2.100 2.100c1.900.5 9.400.5 9.400.5s7.500 0 9.400-.5a3 3 0 0 0 2.100-2.100c.5-1.900.5-5.800.5-5.800s0-3.900-.5-5.800ZM9.600 15.600V8.400l6.200 3.600-6.200 3.600Z"/>',
  linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.200 24 24 23.227 24 22.271V1.729C24 .774 23.200 0 22.222 0h.003Z"/>',
};
// Icono de línea dentro de un recuadro blanco, como los accesos de servicios de uao.edu.co.
const cajaIcono = (n, c = '') => `<span class="caja-icono${c ? ' ' + c : ''}" aria-hidden="true"><svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${I[n]}</svg></span>`;
const icono = (n) => `<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Ilustraciones: descomplicadas, sencillas, estilizadas, inteligibles (manual p. 44)
const ILUS = {
  grafico: `<svg viewBox="0 0 240 210" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="62" y="16" width="116" height="168" rx="8"/><path d="M78 42h60M78 56h38"/><path d="M80 148v-28h16v28M104 148V98h16v50M128 148v-38h16v38"/><path d="M74 150h86"/>
    <circle cx="158" cy="48" r="12"/><path d="M158 36v12h12"/>
    <path d="M196 72l22-22c2-2 5-2 7 0s2 5 0 7l-22 22-11 4 4-11Z"/><path d="M20 182l26-26M38 186l-22-22 12-12 22 22-12 12Z"/><path d="M26 158l5 5M33 151l5 5"/></svg>`,
  audiovisual: `<svg viewBox="0 0 240 210" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="46" y="58" width="112" height="72" rx="10"/><path d="M158 82l34-20c1.5-1 3 .2 3 1.8v60.4c0 1.6-1.500 2.800-3 1.800l-34-20"/>
    <circle cx="74" cy="38" r="20"/><circle cx="126" cy="38" r="20"/><circle cx="74" cy="38" r="5"/><circle cx="126" cy="38" r="5"/>
    <path d="M92 82l26 12-26 12V82Z"/><path d="M102 130v22M102 152l-26 40M102 152l26 40"/>
    <path d="M152 170v18M166 160v38M180 168v22M194 176v8"/></svg>`,
  interactivo: `<svg viewBox="0 0 240 210" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="24" y="20" width="192" height="130" rx="10"/><path d="M24 44h192"/><circle cx="40" cy="32" r="2"/><circle cx="52" cy="32" r="2"/>
    <circle cx="66" cy="96" r="13"/><circle cx="130" cy="70" r="11"/><circle cx="130" cy="122" r="11"/><path d="M78 91l41-17M78 101l41 17"/><path d="M141 70h24M141 122h24"/><rect x="165" y="60" width="28" height="20" rx="5"/><rect x="165" y="112" width="28" height="20" rx="5"/>
    <path d="M104 128l10 46 10-14 16 20 10-8-16-20 16-8-46-16Z"/><path d="M70 190h100"/></svg>`,
};

/* ---------------- plantilla de página ----------------
   Sigue el modelo de las subpáginas de uao.edu.co (p. ej. Trabajo de Grado):
   cabecera institucional → cabezote con migas → barra de secciones del micrositio → contenido → cierre → pie. */
const img = (src, alt, w, h, extra = 'loading="lazy" decoding="async"') => `<img src="${src}" width="${w}" height="${h}" alt="${alt}" ${extra}>`;
const P = (id) => C.PICS[id];
const foto = (id, extra) => { const p = P(id); return img(p.src, p.alt, p.w, p.h, extra); };
const sinAlt = (html) => html.replace(/alt="[^"]*"/, 'alt=""');
const actual = (si) => (si ? ' aria-current="page"' : '');

// La cabecera de la Universidad: atajos arriba, marca y menús institucionales. Se compacta al bajar, como en el portal.
const cabecera = () => `
<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="uao" id="arriba">
  <div class="uao__atajos">
    <ul>${C.UAO_ATAJOS.map((a) => `<li><a href="${a.href}">${a.t}</a></li>`).join('')}</ul>
  </div>
  <div class="uao__barra">
    <a class="uao__marca" href="https://www.uao.edu.co/"><img src="assets/logo/uao-rojo.svg" width="102" height="34" alt="Universidad Autónoma de Occidente. Ir a uao.edu.co"></a>
    <button class="uao__abrir" type="button" aria-expanded="false" aria-controls="menu-uao">Menú</button>
    <nav class="uao__nav" id="menu-uao" aria-label="Universidad Autónoma de Occidente">
      <button class="uao__cerrar" type="button">Cerrar</button>
      <ul>
        ${C.UAO_MENU.map((m, i) => `
        <li class="uao__grupo" data-grupo>
          <button type="button" aria-expanded="false" aria-controls="uao-m${i}">${m.t}${flecha('uao__flecha')}</button>
          <ul class="uao__sub" id="uao-m${i}">${m.items.map((it) => `<li><a href="${it.href}">${it.t}</a></li>`).join('')}</ul>
        </li>`).join('')}
      </ul>
    </nav>
  </div>
</header>`;

// El menú del micrositio (propuesta, sección 3) en la barra de secciones que las subpáginas UAO ponen bajo el cabezote.
const SECCIONES = [
  { id: 'inicio', t: 'Inicio', href: 'index.html' },
  { id: 'area', t: 'Qué hacemos' },
  { id: 'recursos', t: 'Recursos', href: 'recursos.html' },
  { id: 'formacion', t: 'Formación', href: 'formacion.html' },
  { id: 'ceedi', t: 'CEEDi', href: 'ceedi.html' },
  { id: 'solicita', t: 'Solicita acompañamiento', href: 'solicita-acompanamiento.html' },
];
const subnav = (activa) => `
<nav class="subnav" aria-label="Secciones del CEEDi">
  <button class="subnav__abrir" type="button" aria-expanded="false" aria-controls="subnav-lista">Secciones del CEEDi${flecha('subnav__flecha')}</button>
  <ul class="subnav__lista" id="subnav-lista">
    ${SECCIONES.map((s) => (s.id === 'area' ? `
    <li class="subnav__grupo${activa.startsWith('area') ? ' es-actual' : ''}" data-grupo>
      <button type="button" aria-expanded="false" aria-controls="subnav-areas">${s.t}${flecha('subnav__flecha')}</button>
      <ul class="subnav__sub" id="subnav-areas">${C.AREAS.map((a) => `<li><a href="${a.href}"${actual(activa === 'area-' + a.id)}>${a.nombre}</a></li>`).join('')}</ul>
    </li>` : `
    <li><a href="${s.href}"${actual(activa === s.id)}>${s.t}</a></li>`)).join('')}
  </ul>
</nav>`;

const MAPA = [
  { t: 'Inicio', href: 'index.html' },
  ...C.AREAS.map((a) => ({ t: a.nombre, href: a.href })),
  { t: 'Recursos', href: 'recursos.html' },
  { t: 'Formación', href: 'formacion.html' },
  { t: 'CEEDi', href: 'ceedi.html' },
  { t: 'Solicita acompañamiento', href: 'solicita-acompanamiento.html' },
];
const subir = '<svg viewBox="0 0 12 8" width="14" height="9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6.5 6 2l4.5 4.5"/></svg>';

// Pie con el orden de uao.edu.co: redes, cuatro datos de contacto, una fila de enlaces, marca con texto legal y franja de políticas.
const pie = () => `
<footer class="pie">
  <ul class="pie__redes" aria-label="Redes sociales de la Universidad">
    ${C.REDES.map((r) => `<li><a class="pie__red" href="${r.href}" aria-label="${r.nombre}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${RED[r.id]}</svg></a></li>`).join('')}
  </ul>
  <ul class="pie__contacto">
    ${C.CONTACTO_UAO.map((d) => `<li>${icono(d.i)}<span class="sr">${d.t}: </span>${d.href ? `<a href="${d.href}">${d.p}</a>` : `<span>${d.p}</span>`}</li>`).join('')}
  </ul>
  <nav class="pie__micro" aria-label="Mapa del micrositio">
    <strong>Micrositio CEEDi:</strong>
    <ul>${MAPA.map((l) => `<li><a href="${l.href}">${l.t}</a></li>`).join('')}</ul>
  </nav>
  <div class="pie__institucion">
    <a class="pie__marca" href="https://www.uao.edu.co/"><img src="assets/logo/uao-crema.svg" width="132" height="43" alt="Universidad Autónoma de Occidente" loading="lazy"></a>
    <div>
      <p>${C.LEGAL}</p>
      <p class="pie__creditos">Centro de Excelencia Educativa Digital, Unidad de Cultura Digital. ${C.CREDITOS}</p>
    </div>
  </div>
  <div class="pie__banda">
    <ul>${C.POLITICAS.map((p) => `<li><a href="${p.href}">${p.t}</a></li>`).join('')}</ul>
  </div>
</footer>
<a class="subir" href="#arriba"><span class="sr">Volver arriba</span>${subir}</a>`;

const pagina = ({ archivo, titulo, descripcion, activa, cuerpo }) => {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${descripcion}">
<meta name="theme-color" content="#8A1428">
<link rel="icon" href="assets/logo/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;800&family=Roboto+Slab:wght@400;500;700&display=swap">
<link rel="stylesheet" href="${CSS}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
${cabecera()}
<main id="contenido">
${cuerpo.replace('<!--subnav-->', subnav(activa))}
</main>
${pie()}
<script src="${JS}" defer></script>
</body>
</html>
`;
  writeFileSync(join(RAIZ, archivo), html, 'utf8');
  console.log('  ', archivo, (html.length / 1024).toFixed(1) + ' KB');
};

/* ---------------- componentes ---------------- */
const lineas = (arr) => arr.map((t, i) => `<span class="line"><span data-line style="--i:${i}">${t}</span></span>`).join('');

// Cabezote, como las páginas internas de uao.edu.co: foto con velo, migas en píldora, título blanco con la línea roja
// y el nombre del centro debajo. Las migas parten del portal de la Universidad y pasan por el inicio del micrositio.
// clase: 'cabezote--completa' pone la foto a todo el ancho, como en el portal (solo para fotos en alta resolución).
const cabezote = ({ h1, migas = [], fotoId, foco, vt, clase = '', lema = 'Centro de Excelencia<br>Educativa Digital' }) => {
  const ruta = [{ t: 'CEEDi', href: 'index.html' }, ...migas];
  return `
<section class="cabezote${clase ? ' ' + clase : ''}">
  <div class="cabezote__fondo"${vt ? ` style="view-transition-name:${vt}"` : ''}>
    <figure class="cabezote__foto"${foco ? ` style="--foco-img:${foco}"` : ''}>${sinAlt(foto(fotoId, 'fetchpriority="high" decoding="async"'))}</figure>
  </div>
  <nav class="migas" aria-label="Migas de pan">
    <ol>
      <li><a href="https://www.uao.edu.co/">${casita}<span class="sr">Universidad Autónoma de Occidente</span></a></li>
      ${ruta.map((m, i) => `<li>${chevron}${i === ruta.length - 1 ? `<span aria-current="page">${m.t}</span>` : `<a href="${m.href}">${m.t}</a>`}</li>`).join('')}
    </ol>
  </nav>
  <div class="cabezote__texto">
    <h1 class="lines">${lineas(h1)}</h1>
    <span class="cabezote__linea" aria-hidden="true" data-llega style="--d:360ms"></span>
    <p class="cabezote__lema" data-llega style="--d:420ms">${lema}</p>
  </div>
</section>
<!--subnav-->`;
};

const intro = ({ texto, acciones }) => `
<section class="intro" aria-label="Presentación">
  <p class="intro__texto" data-sube>${texto}</p>
  ${acciones ? `<div class="acciones intro__acciones" data-sube style="--d:80ms">${acciones}</div>` : ''}
</section>`;

// Encabezado de sección centrado, como en uao.edu.co: título, la línea roja y su descripción. La acción cierra la sección.
const cabSeccion = ({ id, titulo, texto }) => `
  <div class="cab-seccion">
    <h2 class="titulo" id="${id}" data-sube>${titulo}</h2>
    <span class="cab-seccion__linea" aria-hidden="true"></span>
    ${texto ? `<p data-sube style="--d:60ms">${texto}</p>` : ''}
  </div>`;
const pieSeccion = (acciones) => `<div class="acciones pie-seccion" data-sube>${acciones}</div>`;
// Debajo del encabezado, dos columnas que arrancan a la misma altura: foto a la izquierda, contenido a la derecha.
const dos = (izq, der) => `<div class="rejilla dos">${izq}${der}</div>`;
const fotoDos = (id, d = 0) => `<figure class="dos__foto caja foto-fondo" data-abre style="--d:${d}ms">${foto(id)}</figure>`;

const filaRecurso = (r, i = 0) => `
<li class="recurso" data-fila style="--d:${i * 70}ms">
  ${cajaIcono(r.icono)}
  <div>
    <div class="recurso__cab"><h3>${r.titulo}</h3><span class="recurso__tipo">${r.tipo}</span></div>
    <p>${r.texto}</p>
    <a class="btn btn--ghost" href="${r.href || 'recursos.html'}">Consultar recurso<span class="sr">: ${r.titulo}</span></a>
  </div>
</li>`;

// Cierre: la tarjeta de contacto con sello que las subpáginas UAO ponen antes del pie, aquí con la acción principal.
const cierre = ({ titulo, texto, pregunta, boton = 'Solicitar acompañamiento', href = 'solicita-acompanamiento.html' }) => `
<section class="cierre" aria-labelledby="cierre-t">
  <div class="cierre__tarjeta" data-sube>
    <span class="cierre__sello"><img src="assets/logo/uao-ceedi.svg" width="265" height="56" alt="" loading="lazy"></span>
    <h2 class="cierre__titulo" id="cierre-t">${titulo}</h2>
    <span class="cab-seccion__linea" aria-hidden="true"></span>
    ${pregunta ? `<p class="cierre__texto">${pregunta}</p>` : ''}
    ${texto ? `<p class="cierre__texto">${texto}</p>` : ''}
    <div class="acciones"><a class="btn" href="${href}">${boton}</a></div>
  </div>
</section>`;

const perfiles = (lista) => `<ul class="perfiles">${lista.map((p, i) => `
  <li class="perfil" data-sube style="--d:${i * 80}ms">
    ${cajaIcono('persona', 'perfil__foto')}
    <div>
      <h4>${p.nombre}</h4>
      <span class="perfil__rol">${p.rol}</span>
      <p>${p.frase}</p>
    </div>
  </li>`).join('')}</ul>`;

const equipo = ({ intro: texto, lista }) => `
<section class="seccion" aria-labelledby="equipo-t">
  ${cabSeccion({ id: 'equipo-t', titulo: 'Conoce a nuestro equipo', texto })}
  ${perfiles(lista)}
  ${pieSeccion('<a class="btn btn--secundario" href="ceedi.html#equipo">Conoce al equipo</a>')}
</section>`;

const etapas = ({ id, titulo, intro: texto, lista }) => `
<section class="seccion" aria-labelledby="${id}">
  ${cabSeccion({ id, titulo, texto })}
  <div class="etapas caja" data-etapas data-sube style="--d:140ms">
    ${lista.map((e, i) => `
    <div class="etapa${i === 0 ? ' is-open' : ''}" style="--c:${e.c};--t:${e.t}">
      <h3><button class="etapa__abrir" type="button" aria-expanded="${i === 0}">${e.nombre}</button></h3>
      <p>${e.texto}</p>
      ${e.foto ? `<figure class="etapa__foto" style="--foco-img:${e.foco}">${sinAlt(foto(e.foto))}</figure>` : ''}
    </div>`).join('')}
  </div>
</section>`;

/* ---------------- 1. Inicio ---------------- */
const puerta = (p, i) => `
<article class="puerta puerta--${p.clase} caja${i === 0 ? ' is-open' : ''}" style="--c:${p.c};--t:${p.t};--vt:${p.vt};--d:${i * 90}ms" data-sube>
  <div class="puerta__color">
    <h3><button class="puerta__abrir" type="button" aria-expanded="${i === 0}" aria-controls="puerta-${i}">${p.nombre}<span class="puerta__signo" aria-hidden="true"></span></button></h3>
    <div class="puerta__cuerpo" id="puerta-${i}">
      <p class="puerta__pregunta">${p.texto}</p>
      <div class="puerta__accion"><a class="btn" href="${p.href}">${p.boton}<span class="sr">, ${p.destino}</span></a></div>
    </div>
  </div>
  <figure class="puerta__foto" style="--foco-img:${p.foco}">${foto(p.foto)}</figure>
</article>`;

pagina({
  archivo: 'index.html',
  titulo: 'CEEDi · Centro de Excelencia Educativa Digital · UAO',
  descripcion: 'Acompañamos a los profesores UAO en el diseño de experiencias de aprendizaje, la creación de recursos educativos y la apropiación de tecnologías.',
  activa: 'inicio',
  cuerpo: `
${cabezote({
    h1: ['Potenciamos tus experiencias', 'de enseñanza con lo digital.'],
    fotoId: 'campus-anfiteatro',
    foco: '50% 42%',
    clase: 'cabezote--completa cabezote--inicio',
  })}
${intro({
    texto: 'En el CEEDi acompañamos a los profesores UAO en el diseño de experiencias de aprendizaje, la creación de recursos educativos y la apropiación de tecnologías para fortalecer sus prácticas de enseñanza.',
    acciones: `<a class="btn" href="#que-necesitas">Encuentra lo que necesitas</a><a class="btn btn--secundario" href="solicita-acompanamiento.html">Solicita acompañamiento</a>`,
  })}

<section class="seccion" id="que-necesitas" aria-labelledby="que-necesitas-t">
  ${cabSeccion({ id: 'que-necesitas-t', titulo: '¿Qué necesitas?' })}
  <div class="puertas" data-puertas>
    ${C.PUERTAS.map(puerta).join('')}
  </div>
</section>

<section class="seccion seccion--pegada" aria-labelledby="recursos-t">
  ${cabSeccion({ id: 'recursos-t', titulo: 'Encuentra algo útil para tu práctica.', texto: 'Explora guías, orientaciones, plantillas y recursos que pueden ayudarte a resolver necesidades concretas de enseñanza y aprendizaje.' })}
  ${dos(fotoDos('profesora-explicando'), `<ul class="dos__der recursos-fila">${C.DESTACADOS.map(filaRecurso).join('')}</ul>`)}
  ${pieSeccion('<a class="btn" href="recursos.html">Ver todos los recursos</a>')}
</section>

<section class="campo campo--vino" aria-labelledby="formacion-t">
  <div class="campo__cuerpo">
    ${cabSeccion({ id: 'formacion-t', titulo: 'Continúa fortaleciendo tu práctica.', texto: 'Conoce las próximas oportunidades de formación, talleres y espacios del CEEDi para explorar nuevas posibilidades en tu práctica educativa.' })}
    <div class="indice" data-indice>
      <ul class="indice__lista">
        ${C.PROXIMAS.map((o, i) => `
        <li data-fila style="--d:${i * 80}ms"><a class="indice__fila" href="formacion.html#proximas">
          ${sinAlt(foto(o.foto, 'class="indice__mini" loading="lazy" decoding="async"'))}
          <span class="indice__fecha">${o.fechaCorta}</span>
          <div><h3 class="indice__nombre">${o.nombre}</h3><span class="indice__detalle"><span class="indice__modo">${o.modo}.</span> ${o.texto}</span></div>
        </a></li>`).join('')}
      </ul>
      <figure class="indice__marco caja foto-fondo" data-abre aria-hidden="true">
        ${C.PROXIMAS.map((o, i) => sinAlt(foto(o.foto, `loading="lazy" decoding="async"${i === 0 ? ' class="is-on"' : ''}`))).join('')}
      </figure>
    </div>
    ${pieSeccion('<a class="btn" href="formacion.html">Ver formación</a>')}
  </div>
</section>

<section class="banda" aria-labelledby="conoce-t" style="--foco-img:50% 58%">
  ${foto('campus-puente', 'class="deriva" loading="lazy" decoding="async"')}
  <div class="banda__tarjeta caja" data-sube>
    <h2 class="titulo" id="conoce-t">Conoce el CEEDi</h2>
    <p>Quiénes somos, qué hacemos y quiénes te acompañan en la Universidad.</p>
    <div class="acciones"><a class="btn" href="ceedi.html">Conoce el CEEDi</a></div>
  </div>
</section>

${cierre({
    titulo: '¿Tienes una idea y no sabes por dónde empezar?',
    texto: 'Cuéntanos qué quieres lograr. Te ayudamos a identificar el acompañamiento que necesitas y a encontrar la ruta más adecuada dentro del CEEDi.',
  })}`,
});

/* ---------------- 2. Diseño de Experiencias ---------------- */
pagina({
  archivo: 'diseno-de-experiencias.html',
  titulo: 'Diseño de Experiencias · CEEDi · UAO',
  descripcion: 'Te acompañamos en el diseño y fortalecimiento de experiencias de aprendizaje de acuerdo con las necesidades de tus estudiantes y de tu contexto de enseñanza.',
  activa: 'area-experiencias',
  cuerpo: `
${cabezote({
    h1: ['Diseño de Experiencias'],
    migas: [{ t: 'Diseño de Experiencias' }],
    fotoId: 'profesor-en-aula',
    foco: '62% 30%',
    vt: 'puerta-experiencias',
  })}
${intro({
    texto: 'Te acompañamos en el diseño y fortalecimiento de experiencias de aprendizaje, articulando propósitos, actividades, metodologías, evaluación y recursos de acuerdo con las necesidades de tus estudiantes y de tu contexto de enseñanza.',
    acciones: `<a class="btn" href="solicita-acompanamiento.html?ruta=disenar">Solicitar acompañamiento</a>`,
  })}

<section class="seccion" aria-labelledby="acompanar-t">
  ${cabSeccion({ id: 'acompanar-t', titulo: '¿En qué podemos acompañarte?' })}
  ${dos(fotoDos('profesora-explicando'), `<ul class="dos__der puntos">${C.NECESIDADES_EXP.map((n, i) => `<li class="punto" data-fila style="--d:${i * 70}ms"><h3>${vineta}${n.t}</h3><p>${n.p}</p></li>`).join('')}</ul>`)}
</section>

${etapas({
    id: 'trabajamos-t',
    titulo: '¿Cómo trabajamos contigo?',
    intro: 'Cuatro momentos, a tu ritmo y a partir de lo que ya tienes. Selecciona cada uno para ver en qué consiste.',
    lista: C.ETAPAS_EXP,
  })}

<section class="seccion seccion--pegada" aria-labelledby="relacionados-t">
  ${cabSeccion({ id: 'relacionados-t', titulo: 'Recursos relacionados', texto: 'Guías, plantillas y orientaciones para empezar por tu cuenta. El resto está en el banco general.' })}
  ${dos(fotoDos('trabajo-en-grupo'), `<ul class="dos__der recursos-fila">${C.RELACIONADOS_EXP.map(filaRecurso).join('')}</ul>`)}
  ${pieSeccion('<a class="btn" href="recursos.html#diseno-y-ensenanza">Ver recursos de Diseño de Experiencias</a>')}
</section>

${equipo({ intro: 'Conoce a las personas que acompañan el diseño y fortalecimiento de experiencias de aprendizaje desde el CEEDi.', lista: C.EQUIPO.experiencias })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Tienes una experiencia que quieres crear, transformar o fortalecer?', href: 'solicita-acompanamiento.html?ruta=disenar' })}`,
});

/* ---------------- 3. Diseño de Recursos ---------------- */
const stillInfo = `<div class="info" data-ui><strong>Ciclo de evaluación formativa</strong>
  <svg viewBox="0 0 300 250" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M178 46a84 84 0 0 1 48 108"/><path d="M203 188a84 84 0 0 1-106 0"/><path d="M74 154a84 84 0 0 1 48-108"/>
    <path d="M216 146l10 10 12-8M108 192l-12-4-3 13M113 44l11 1 2 13" />
    <circle cx="150" cy="40" r="17" fill="currentColor"/><circle cx="222" cy="170" r="17" fill="currentColor"/><circle cx="78" cy="170" r="17" fill="currentColor"/>
    <text x="150" y="88" text-anchor="middle">Planear</text>
    <text x="222" y="212" text-anchor="middle">Evaluar</text>
    <text x="78" y="212" text-anchor="middle">Mejorar</text>
    <text x="150" y="136" text-anchor="middle" style="font-size:15px;font-weight:500">Retroalimenta</text>
    <text x="150" y="155" text-anchor="middle" style="font-size:15px;font-weight:500">en cada vuelta</text>
  </svg></div>`;
const stillVideo = `<img src="assets/img/profesor-en-aula.jpg" width="1000" height="416" alt="Profesor explicando frente a su grupo en un salón de clase" loading="lazy" decoding="async">
  <div class="video__tercio"><span class="video__nombre">Cápsula de contabilidad</span></div>
  <span class="video__play">${'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 3.8c0-1 1.1-1.600 1.900-1.100l13 8.200c.8.500.8 1.700 0 2.200l-13 8.200C7.100 21.800 6 21.200 6 20.200V3.800Z"/></svg>'}</span>`;
const stillInter = `<div class="interactivo" data-ui>
  <span class="interactivo__paso">Decisión 2 de 5</span>
  <span class="interactivo__barra"><i></i></span>
  <span class="interactivo__q">Un cliente te pide omitir un dato en el informe. ¿Qué haces?</span>
  <span class="interactivo__op"><i></i>Lo omites sin decir nada</span>
  <span class="interactivo__op is-sel"><i></i>Explicas el riesgo y lo incluyes</span>
  <span class="interactivo__op"><i></i>Consultas a tu equipo</span>
  <span class="interactivo__nota">Tu decisión protege a quienes usarán el informe. Mira qué ocurre después.</span>
</div>`;

pagina({
  archivo: 'diseno-de-recursos.html',
  titulo: 'Diseño de Recursos · CEEDi · UAO',
  descripcion: 'Diseñamos y desarrollamos recursos educativos digitales que ayudan a materializar experiencias de aprendizaje en formatos pertinentes para cada necesidad.',
  activa: 'area-recursos',
  cuerpo: `
${cabezote({
    h1: ['Diseño de Recursos'],
    migas: [{ t: 'Diseño de Recursos' }],
    fotoId: 'diseno-en-equipo',
    foco: '50% 40%',
    vt: 'puerta-recursos',
  })}
${intro({
    texto: 'Diseñamos y desarrollamos recursos educativos digitales que ayudan a materializar experiencias de aprendizaje en formatos pertinentes para cada necesidad.',
    acciones: `<a class="btn" href="solicita-acompanamiento.html?ruta=crear">Quiero desarrollar un recurso</a>`,
  })}

<section class="seccion" aria-labelledby="crear-t">
  ${cabSeccion({ id: 'crear-t', titulo: '¿Qué podemos crear contigo?' })}
  <ul class="mosaico">
    ${C.CATEGORIAS_REC.map((c, i) => `
    <li data-sube style="--d:${i * 90}ms">
      <div class="mosaico__arte caja" style="--c:${c.c};--t:${c.t}">${ILUS[c.ilus]}</div>
      <h3>${c.t2}</h3>
      <p>${c.p}</p>
    </li>`).join('')}
  </ul>
  <div class="orienta caja" data-sube>
    <h3>¿No sabes qué formato necesitas?</h3>
    <div class="orienta__txt">
      <p>No necesitas llegar con el recurso definido. Cuéntanos qué quieres lograr y te ayudamos a identificar una alternativa pertinente.</p>
    </div>
    <div class="acciones"><a class="btn" href="solicita-acompanamiento.html?ruta=crear">Cuéntanos tu idea</a></div>
  </div>
</section>

<section class="seccion seccion--pegada" aria-labelledby="proposito-t">
  ${cabSeccion({ id: 'proposito-t', titulo: 'Del propósito al recurso' })}
  <ol class="flujo">
    ${C.FLUJO.map((f, i) => `
    <li data-llena data-sube style="--d:${i * 110}ms">
      <div class="flujo__caja" aria-hidden="true"><span class="flujo__lleno" style="--lleno:${f.lleno};--d:${i * 110 + 240}ms;--c:${f.c}"></span><span class="flujo__paso">${String(i + 1).padStart(2, '0')}</span></div>
      <h3>${f.t}</h3>
      <p>${f.p}</p>
    </li>`).join('')}
  </ol>
</section>

<section class="seccion seccion--pegada" aria-labelledby="casos-t">
  ${cabSeccion({ id: 'casos-t', titulo: 'Explora recursos creados con CEEDi', texto: 'Una selección pequeña para ayudarte a imaginar posibilidades.' })}
  <ul class="casos">
    <li class="caso" data-sube><div class="caso__still caja" style="--c:var(--coral)">${stillInfo}</div><h3>Ciclo de evaluación formativa</h3><span class="caso__tipo">Recurso gráfico</span><p>Infografía para un curso de primer semestre.</p></li>
    <li class="caso" data-sube style="--d:90ms"><div class="caso__still caja" style="--c:var(--vino-o)">${stillVideo}</div><h3>Cápsula de contabilidad</h3><span class="caso__tipo">Recurso audiovisual</span><p>Video corto de apoyo para repasar un concepto antes de clase.</p></li>
    <li class="caso" data-sube style="--d:180ms"><div class="caso__still caja" style="--c:var(--blanco)">${stillInter}</div><h3>Simulador de decisiones éticas</h3><span class="caso__tipo">Recurso interactivo</span><p>Los estudiantes toman decisiones y ven sus consecuencias.</p></li>
  </ul>
  ${pieSeccion('<a class="btn" href="recursos.html#recursos-educativos-digitales">Explorar recursos</a>')}
</section>

${equipo({ intro: 'Conoce a las personas que transforman necesidades educativas en recursos digitales junto con los profesores UAO.', lista: C.EQUIPO.recursos })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Tienes una idea que quieres convertir en un recurso?', href: 'solicita-acompanamiento.html?ruta=crear' })}`,
});

/* ---------------- 4. Cultura Digital ---------------- */
pagina({
  archivo: 'cultura-digital.html',
  titulo: 'Cultura Digital · CEEDi · UAO',
  descripcion: 'Te acompañamos en la apropiación de tecnologías, herramientas y prácticas digitales para que puedas incorporarlas con sentido a tu práctica educativa.',
  activa: 'area-cultura',
  cuerpo: `
${cabezote({
    h1: ['Cultura Digital'],
    migas: [{ t: 'Cultura Digital' }],
    fotoId: 'sala-de-computo',
    foco: '50% 60%',
    vt: 'puerta-cultura',
  })}
${intro({
    texto: 'Te acompañamos en la apropiación de tecnologías, herramientas y prácticas digitales para que puedas incorporarlas con sentido a tu práctica educativa.',
    acciones: `<a class="btn" href="#fortalecer">Fortalecer mi práctica digital</a>`,
  })}

<section class="seccion" id="fortalecer" aria-labelledby="fortalecer-t">
  ${cabSeccion({ id: 'fortalecer-t', titulo: '¿Qué quieres fortalecer?' })}
  <div class="rutas">
    ${C.RUTAS_CD.map((r, i) => `
    <a class="ruta" href="${r.href}" data-fila style="--d:${i * 70}ms">
      <h3>${vineta}${r.t}</h3>
      <p>${r.p}</p>
      <span class="ruta__accion">${r.a}</span>
    </a>`).join('')}
  </div>
</section>

<section class="seccion seccion--pegada" aria-labelledby="aprende-t">
  ${cabSeccion({ id: 'aprende-t', titulo: 'Aprende y ponlo en práctica' })}
  ${dos(fotoDos('trabajo-en-grupo'), `<ul class="dos__der puntos">${C.APRENDE_CD.map((n, i) => `<li class="punto" data-fila style="--d:${i * 70}ms"><h3>${vineta}${n.t}</h3><p>${n.p}</p></li>`).join('')}</ul>`)}
  ${pieSeccion('<a class="btn" href="formacion.html">Ver toda la formación</a>')}
</section>

<section class="campo campo--vino herr" aria-labelledby="herr-t">
  <div class="campo__cuerpo">
    ${cabSeccion({ id: 'herr-t', titulo: 'Herramientas para tu práctica', texto: 'Encuentra guías y orientaciones para aprovechar las herramientas digitales institucionales en tus experiencias de enseñanza.' })}
    <ul class="herr__lista">
      ${C.HERRAMIENTAS.map((h, i) => `<li class="herr__item" data-fila style="--d:${i * 80}ms">${icono(h.i)}<div><h3>${h.t}</h3><p>${h.p}</p></div></li>`).join('')}
    </ul>
    ${pieSeccion('<a class="btn" href="recursos.html#herramientas-digitales">Explorar herramientas</a>')}
  </div>
</section>

${equipo({ intro: 'Conoce a las personas que acompañan la apropiación de tecnologías y el fortalecimiento de la cultura digital en la comunidad universitaria.', lista: C.EQUIPO.cultura })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres fortalecer algún aspecto de tu práctica digital?', href: 'solicita-acompanamiento.html?ruta=fortalecer' })}`,
});

/* ---------------- 5. Recursos ---------------- */
pagina({
  archivo: 'recursos.html',
  titulo: 'Recursos para tu práctica · CEEDi · UAO',
  descripcion: 'Encuentra guías, plantillas, orientaciones y materiales para apoyar el diseño de tus experiencias de aprendizaje y el uso pedagógico de tecnologías.',
  activa: 'recursos',
  cuerpo: `
${cabezote({
    h1: ['Recursos para tu práctica'],
    migas: [{ t: 'Recursos' }],
    fotoId: 'lectura-campus',
    foco: '50% 50%',
  })}

<nav class="saltos" aria-label="Categorías de recursos" id="banco">
  ${C.BANCO.map((c) => `<a href="#${c.id}">${vineta}<span>${c.nombre}</span></a>`).join('')}
</nav>
${intro({
    texto: 'Encuentra guías, plantillas, orientaciones y materiales para apoyar el diseño de tus experiencias de aprendizaje y el uso pedagógico de tecnologías.',
  })}

<div class="seccion" style="padding-top:clamp(32px,4vw,56px)">
  ${C.BANCO.map((c) => `
  <section class="categoria" id="${c.id}" aria-labelledby="${c.id}-t">
    <div class="categoria__cab">
      <h2 id="${c.id}-t" data-sube>${c.nombre}</h2>
      <span class="categoria__cuenta">${c.items.length} recursos</span>
    </div>
    <figure class="categoria__foto caja foto-fondo" data-abre>${foto(c.foto)}</figure>
    <ul class="categoria__lista">
      ${c.items.map(filaRecurso).join('')}
    </ul>
  </section>`).join('')}
</div>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿No encuentras lo que buscas? Cuéntanos qué necesitas y te orientamos.' })}`,
});

/* ---------------- 6. Formación ---------------- */
pagina({
  archivo: 'formacion.html',
  titulo: 'Formación para profesores · CEEDi · UAO',
  descripcion: 'Encuentra oportunidades para fortalecer tus competencias, explorar nuevas posibilidades y llevarlas a tu práctica educativa.',
  activa: 'formacion',
  cuerpo: `
${cabezote({
    h1: ['Formación para profesores'],
    migas: [{ t: 'Formación' }],
    fotoId: 'auditorio',
    foco: '50% 50%',
  })}
${intro({
    texto: 'Encuentra oportunidades para fortalecer tus competencias, explorar nuevas posibilidades y llevarlas a tu práctica educativa.',
    acciones: `<a class="btn" href="#proximas">Ver próximas oportunidades</a>`,
  })}

<section class="seccion" id="proximas" aria-labelledby="proximas-t">
  ${cabSeccion({ id: 'proximas-t', titulo: 'Próximas oportunidades' })}
  <ul class="oportunidades">
    ${C.PROXIMAS.map((o, i) => `
    <li class="oportunidad" data-sube style="--d:${i * 90}ms">
      <div class="oportunidad__fecha caja" style="--c:${o.c};--t:${o.t}">${o.fechaLarga}</div>
      <h3>${o.nombre}</h3>
      <span class="oportunidad__modo">${o.modo}</span>
      <p>${o.texto}</p>
      <div class="acciones"><a class="btn" href="#agenda">Ver actividad / Inscribirme<span class="sr">: ${o.nombre}</span></a></div>
    </li>`).join('')}
  </ul>
</section>

<section class="campo campo--vino" id="rutas" aria-labelledby="rutas-t">
  <div class="campo__cuerpo">
    ${cabSeccion({ id: 'rutas-t', titulo: 'Rutas de formación', texto: 'Trayectorias y cursos de mayor alcance, descritos por lo que podrás desarrollar.' })}
    ${dos(fotoDos('estudiantes-campus'), `<ul class="dos__der lista-rutas">${C.RUTAS_F.map((r, i) => `<li data-fila style="--d:${i * 80}ms"><h3>${vineta}${r.t}</h3><p>${r.p}</p></li>`).join('')}</ul>`)}
    ${pieSeccion('<a class="btn" href="#agenda">Explorar rutas de formación</a>')}
  </div>
</section>

<section class="seccion" id="agenda" aria-labelledby="agenda-t">
  ${cabSeccion({ id: 'agenda-t', titulo: 'Agenda y actividades' })}
  <table class="tabla" data-sube style="--d:80ms">
    <thead><tr><th scope="col">Fecha</th><th scope="col">Actividad</th><th scope="col">Modalidad</th></tr></thead>
    <tbody>${C.AGENDA.map((a) => `<tr><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td></tr>`).join('')}</tbody>
  </table>
</section>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres llevar lo que aprendes a un curso concreto? Te acompañamos.', href: 'solicita-acompanamiento.html?ruta=fortalecer' })}`,
});

/* ---------------- 7. CEEDi / Nosotros ---------------- */
pagina({
  archivo: 'ceedi.html',
  titulo: 'Quiénes somos · CEEDi · UAO',
  descripcion: 'El Centro de Excelencia Educativa Digital articula el diseño de experiencias de aprendizaje, la creación de recursos educativos digitales y la apropiación de la cultura digital.',
  activa: 'ceedi',
  cuerpo: `
${cabezote({
    h1: ['Centro de Excelencia', 'Educativa Digital'],
    migas: [{ t: 'Quiénes somos' }],
    fotoId: 'campus-panoramica',
    foco: '62% 50%',
    clase: 'cabezote--completa',
    lema: 'Universidad Autónoma<br>de Occidente',
  })}
${intro({
    texto: 'El Centro de Excelencia Educativa Digital (CEEDi) articula el diseño de experiencias de aprendizaje, la creación de recursos educativos digitales y la apropiación de la cultura digital para fortalecer los procesos de enseñanza y aprendizaje en la Universidad Autónoma de Occidente.',
    acciones: `<a class="btn" href="#equipo">Nuestro equipo</a><a class="btn btn--secundario" href="#contacto">Contacto</a>`,
  })}

<section class="seccion" id="que-hacemos" aria-labelledby="hacemos-t">
  ${cabSeccion({ id: 'hacemos-t', titulo: 'Qué hacemos' })}
  <ul class="areas">
    ${C.AREAS.map((a, i) => `
    <li class="area" style="--c:${a.c};--t:${a.t};--d:${i * 90}ms" data-sube>
      <div class="area__bloque caja"><h3>${a.nombre}</h3></div>
      <p>${a.breve}</p>
      <a class="btn btn--ghost" href="${a.href}">Conocer el área<span class="sr">: ${a.nombre}</span></a>
    </li>`).join('')}
  </ul>
</section>

<section class="seccion seccion--pegada" id="equipo" aria-labelledby="nuestro-t">
  ${cabSeccion({ id: 'nuestro-t', titulo: 'Nuestro equipo' })}
  ${C.AREAS.map((a) => `
  <section class="grupo" aria-labelledby="grupo-${a.id}">
    <div class="grupo__cab"><h3 id="grupo-${a.id}">${a.nombre}</h3><a class="btn btn--ghost" href="${a.href}">Ver el área</a></div>
    ${perfiles(C.EQUIPO[a.id])}
  </section>`).join('')}
</section>

<section class="seccion seccion--pegada" id="contacto" aria-labelledby="contacto-t">
  ${cabSeccion({ id: 'contacto-t', titulo: 'Contacto' })}
  ${dos(fotoDos('campus-anfiteatro'), `<ul class="dos__der contacto">${C.CONTACTO.map((c, i) => `<li class="contacto__item" data-fila style="--d:${i * 70}ms">${icono(c.i)}<div><h3>${c.t}</h3><p>${c.p}</p></div></li>`).join('')}</ul>`)}
</section>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres trabajar con nosotros en tu próximo curso?' })}`,
});

/* ---------------- 8. Solicita acompañamiento ---------------- */
pagina({
  archivo: 'solicita-acompanamiento.html',
  titulo: 'Solicita acompañamiento · CEEDi · UAO',
  descripcion: 'No necesitas saber qué área o servicio necesitas. Cuéntanos brevemente tu idea, necesidad o reto y te orientaremos.',
  activa: 'solicita',
  cuerpo: `
${cabezote({
    h1: ['Cuéntanos qué quieres lograr'],
    migas: [{ t: 'Solicita acompañamiento' }],
    fotoId: 'trabajo-en-grupo',
    foco: '50% 40%',
  })}
${intro({
    texto: 'No necesitas saber qué área o servicio necesitas. Cuéntanos brevemente tu idea, necesidad o reto y te orientaremos sobre la alternativa de acompañamiento más adecuada.',
  })}

<section class="seccion" style="padding-top:clamp(36px,4vw,60px)" aria-labelledby="eleccion-t">
  <form id="solicitud" action="#gracias" method="post">
    ${cabSeccion({ id: 'eleccion-t', titulo: '¿Qué te trae por aquí?' })}
    <fieldset class="opciones">
      <legend class="sr">Elige la opción que más se parece a lo que necesitas</legend>
      ${C.OPCIONES.map((o, i) => `
      <label class="opcion" data-sube style="--d:${i * 70}ms">
        <input type="radio" name="ruta" value="${o.v}">
        <span class="opcion__tarjeta caja"><span class="opcion__txt">${o.t}</span><span class="opcion__foto">${sinAlt(foto(o.foto))}</span></span>
      </label>`).join('')}
    </fieldset>
    <p class="nota" data-aviso-ruta hidden style="margin-top:10px;font-weight:600;color:var(--vino)">Elige una opción para continuar. Si no estás seguro, marca “Tengo otra necesidad / No estoy seguro”.</p>
    <!-- Formulario con la estructura de contacto de uao.edu.co: tarjeta blanca con sello, datos de la institución
         a la izquierda y el panel gris del formulario a la derecha, sobre el marco rojo. -->
    <div class="formu" data-sube>
      <div class="formu__tarjeta">
        <aside class="formu__info" aria-labelledby="formu-inst">
          <span class="formu__sello"><img src="assets/logo/uao-rojo.svg" width="102" height="34" alt="Universidad Autónoma de Occidente" loading="lazy"></span>
          <h3 class="formu__inst" id="formu-inst">Institución</h3>
          <span class="formu__linea" aria-hidden="true"></span>
          <dl class="formu__datos">
            ${C.CONTACTO_UAO.map((d) => `<div><dt>${d.t}</dt><dd>${icono(d.i)}${d.href ? `<a href="${d.href}">${d.p}</a>` : `<span>${d.p}</span>`}</dd></div>`).join('')}
          </dl>
        </aside>
        <div class="formu__panel">
          <h2 class="formu__titulo" data-pregunta-titulo>Cuéntanos qué tienes en mente.</h2>
          <p class="formu__sub">Pedimos únicamente lo indispensable para comprender tu necesidad y canalizarla.</p>
          <div class="campo-f campo-f--check">
            <label><input type="checkbox" name="autoriza" required> <span>Autorizo el <a href="${C.POLITICAS[1].href}">tratamiento de mis datos personales</a></span></label>
            <span class="error">Debes autorizar el tratamiento de tus datos para enviar la solicitud.</span>
          </div>
          <div class="campo-f">
            <label for="nombre">Nombre completo</label>
            <input id="nombre" name="nombre" type="text" autocomplete="name" required>
            <span class="error">Escribe tu nombre.</span>
          </div>
          <div class="campo-f">
            <label for="correo">Correo institucional</label>
            <input id="correo" name="correo" type="email" autocomplete="email" required>
            <span class="error">Escribe un correo válido.</span>
          </div>
          <div class="campo-f">
            <label for="facultad">Facultad o departamento</label>
            <input id="facultad" name="facultad" type="text" autocomplete="organization" required>
            <span class="error">Escribe tu facultad o departamento.</span>
          </div>
          <div class="campo-f">
            <label for="idea" data-pregunta-etiqueta>Cuéntanos brevemente tu idea, necesidad o reto.</label>
            <textarea id="idea" name="idea" required></textarea>
            <span class="error">Cuéntanos al menos una frase para poder orientarte.</span>
          </div>
          <button class="formu__enviar" type="submit">Enviar solicitud<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
        </div>
      </div>
    </div>
  </form>
  <div class="gracias caja" id="gracias" hidden>
    <h2 class="titulo">Recibimos tu solicitud.</h2>
    <p>Te escribiremos a tu correo institucional con la alternativa de acompañamiento más adecuada.</p>
    <a class="btn btn--ghost" href="index.html">Volver al inicio</a>
  </div>
</section>`,
});

console.log('Listo.');
