// Genera las 8 páginas estáticas del micrositio CEEDi.  Uso: node _src/build.mjs
// Sin dependencias. Los textos marcados "muestra" en _src/contenido.mjs se reemplazan antes de publicar.
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from './contenido.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------------- piezas de marca ---------------- */
const ARCO = 'M491.82 7.79V238.13C491.82 242.43 488.34 245.91 484.04 245.91H428.38C424.11 245.91 420.03 244.16 417.1 241.06 374.18 195.67 313.34 167.36 245.91 167.36 178.48 167.36 117.64 195.67 74.72 241.06 71.79 244.16 67.71 245.91 63.45 245.91H7.79C3.48 245.91 0 242.43 0 238.13V7.79C0 3.49 3.48 0 7.79 0H484.04C488.34 0 491.82 3.49 491.82 7.79Z';
const vineta = `<svg class="vineta" viewBox="0 0 491.82 245.91" aria-hidden="true"><path d="${ARCO}"/></svg>`;
const flecha = (c = 'nav__flecha') => `<svg class="${c}" viewBox="0 0 12 7" fill="none" aria-hidden="true"><path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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
};
const arcoPath = (e = 0) => {
  const y = (v) => (v + e).toFixed(2);
  return `M491.82 7.79V${y(238.13)}C491.82 ${y(242.43)} 488.34 ${y(245.91)} 484.04 ${y(245.91)}H428.38C424.11 ${y(245.91)} 420.03 ${y(244.16)} 417.1 ${y(241.06)} 374.18 ${y(195.67)} 313.34 ${y(167.36)} 245.91 ${y(167.36)} 178.48 ${y(167.36)} 117.64 ${y(195.67)} 74.72 ${y(241.06)} 71.79 ${y(244.16)} 67.71 ${y(245.91)} 63.45 ${y(245.91)}H7.79C3.48 ${y(245.91)} 0 ${y(242.43)} 0 ${y(238.13)}V7.79C0 3.49 3.48 0 7.79 0H484.04C488.34 0 491.82 3.49 491.82 7.79Z`;
};
// Un arco alargado hacia arriba (sin deformar la curva, manual p. 51) con un icono de linea adentro.
const arcoIcono = (n, c, t, e = 190) => {
  const H = 245.91 + e, s = 214, x = (491.82 - s) / 2, yy = (H - 78.55 - s) / 2 + 6;
  return `<svg class="arco-icono" viewBox="0 0 491.82 ${H.toFixed(2)}" aria-hidden="true"><path style="fill:${c}" d="${arcoPath(e)}"/><svg x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${s}" height="${s}" viewBox="0 0 44 44" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="stroke:${t}">${I[n]}</svg></svg>`;
};
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

/* ---------------- plantilla de página ---------------- */
const img = (src, alt, w, h, extra = 'loading="lazy" decoding="async"') => `<img src="${src}" width="${w}" height="${h}" alt="${alt}" ${extra}>`;
const P = (id) => C.PICS[id];
const foto = (id, extra) => { const p = P(id); return img(p.src, p.alt, p.w, p.h, extra); };

const cabecera = (activa) => `
<a class="saltar" href="#contenido">Saltar al contenido</a>
<header class="cabecera">
  <a class="cabecera__marca" href="index.html"><img src="assets/logo/uao-ceedi.svg" width="265" height="56" alt="uao, Centro de Excelencia Educativa Digital. Ir al inicio"></a>
  <button class="cabecera__abrir" type="button" aria-expanded="false" aria-controls="menu">Menú</button>
  <nav class="nav" id="menu" aria-label="Principal">
    <button class="nav__cerrar" type="button">Cerrar</button>
    <ul>
      <li><a class="nav__enlace" href="index.html"${activa === 'inicio' ? ' aria-current="page"' : ''}>Inicio</a></li>
      <li class="nav__grupo${activa.startsWith('area') ? ' es-actual' : ''}">
        <button type="button" aria-expanded="false" aria-controls="sub-hacemos">Qué hacemos ${flecha()}</button>
        <ul class="submenu" id="sub-hacemos">
          ${C.AREAS.map((a) => `<li><a href="${a.href}"${activa === 'area-' + a.id ? ' aria-current="page"' : ''}><strong style="--vineta:${a.color}">${vineta}${a.nombre}</strong><span>${a.menu}</span></a></li>`).join('')}
        </ul>
      </li>
      <li><a class="nav__enlace" href="recursos.html"${activa === 'recursos' ? ' aria-current="page"' : ''}>Recursos</a></li>
      <li><a class="nav__enlace" href="formacion.html"${activa === 'formacion' ? ' aria-current="page"' : ''}>Formación</a></li>
      <li><a class="nav__enlace" href="ceedi.html"${activa === 'ceedi' ? ' aria-current="page"' : ''}>CEEDi</a></li>
      <li><a class="btn" href="solicita-acompanamiento.html"${activa === 'solicita' ? ' aria-current="page"' : ''}>Solicita acompañamiento</a></li>
    </ul>
  </nav>
</header>`;

const pie = () => `
<footer class="pie">
  <a class="pie__marca" href="index.html"><img src="assets/logo/uao-ceedi-crema.svg" width="620" height="131" alt="uao, Centro de Excelencia Educativa Digital" loading="lazy"></a>
  <div class="pie__cols">
    <div class="pie__col--a">
      <h2>Qué hacemos</h2>
      <ul>${C.AREAS.map((a) => `<li><a href="${a.href}">${a.nombre}</a></li>`).join('')}</ul>
    </div>
    <div class="pie__col--b">
      <h2>Micrositio</h2>
      <ul>
        <li><a href="recursos.html">Recursos</a></li>
        <li><a href="formacion.html">Formación</a></li>
        <li><a href="ceedi.html">CEEDi</a></li>
        <li><a href="solicita-acompanamiento.html">Solicita acompañamiento</a></li>
      </ul>
    </div>
    <div class="pie__col--c">
      <h2>Universidad Autónoma de Occidente</h2>
      <p>Centro de Excelencia Educativa Digital, Unidad de Cultura Digital.</p>
      <p><a href="https://www.uao.edu.co" style="text-decoration-color:currentColor">uao.edu.co</a></p>
      <div class="pie__uni"><img src="assets/logo/uao-horizontal-crema.svg" width="200" height="36" alt="uao, Universidad Autónoma de Occidente" loading="lazy"></div>
    </div>
  </div>
  <div class="pie__legal">
    <p>${C.LEGAL}</p>
    <p>${C.CREDITOS}</p>
  </div>
</footer>`;

const pagina = ({ archivo, titulo, descripcion, activa, cuerpo }) => {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${descripcion}">
<meta name="theme-color" content="#FF051E">
<link rel="icon" href="assets/logo/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
${cabecera(activa)}
<main id="contenido">
${cuerpo}
</main>
${pie()}
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;
  writeFileSync(join(RAIZ, archivo), html, 'utf8');
  console.log('  ', archivo, (html.length / 1024).toFixed(1) + ' KB');
};

/* ---------------- componentes ---------------- */
const lineas = (arr) => arr.map((t, i) => `<span class="line"><span data-line style="--i:${i}">${t}</span></span>`).join('');

// Portada: el arco a escala máxima, con la foto contenida y el domo que entrega a la sección siguiente.
const portada = ({ color, h1, clase = 'display', texto, acciones, fotoId, domo = '46%', domoH, foco, vt }) => `
<section class="portada c-${color}" style="--dome-hero:${domo};--dome-h:${domoH}">
  <div class="portada__campo"${vt ? ` style="view-transition-name:${vt}"` : ''}></div>
  <div class="portada__titulo">
    <h1 class="${clase} lines">${lineas(h1)}</h1>
  </div>
  <div class="portada__texto">
    <p class="lead" data-llega style="--d:420ms">${texto}</p>
    <div class="acciones" data-llega style="--d:500ms">${acciones}</div>
  </div>
  ${fotoId ? `<figure class="portada__foto"${foco ? ` style="--foco-img:${foco}"` : ''}>${foto(fotoId, 'fetchpriority="high" decoding="async"')}</figure>` : ''}
  <div class="domo portada__domo"></div>
</section>`;

const filaRecurso = (r, i = 0) => `
<li class="recurso" data-fila style="--d:${i * 70}ms">
  ${arcoIcono(r.icono, r.m, r.mi)}
  <div>
    <div class="recurso__cab"><h3>${r.titulo}</h3><span class="recurso__tipo">${r.tipo}</span></div>
    <p>${r.texto}</p>
    <a class="enlace" href="${r.href || 'recursos.html'}">Consultar recurso<span class="sr">: ${r.titulo}</span></a>
  </div>
</li>`;

const cierre = ({ titulo, texto, pregunta, boton = 'Solicitar acompañamiento', href = 'solicita-acompanamiento.html', fotoId = 'campus-puente' }) => `
<section class="cierre" aria-labelledby="cierre-t">
  <div class="cierre__lado cierre__lado--izq" data-abre>${foto(fotoId).replace(/alt="[^"]*"/, 'alt=""')}</div>
  <div class="cierre__tile arco${pregunta ? ' cierre__tile--breve' : ''}" data-sube>
    <h2 class="titulo" id="cierre-t">${titulo}</h2>
    ${pregunta ? `<p class="cierre__pregunta">${pregunta}</p>` : ''}
    ${texto ? `<p class="cierre__texto">${texto}</p>` : ''}
    <div class="acciones"><a class="btn" href="${href}">${boton}</a></div>
  </div>
  <div class="cierre__lado cierre__lado--der" data-sube style="--d:90ms"></div>
</section>`;

const perfiles = (lista) => `<ul class="perfiles">${lista.map((p, i) => `
  <li class="perfil" data-sube style="--d:${i * 80}ms">
    ${arcoIcono('persona', p.c, p.t, 170)}
    <h4>${p.nombre}</h4>
    <span class="perfil__rol">${p.rol}</span>
    <p>${p.frase}</p>
  </li>`).join('')}</ul>`;

const equipo = ({ intro, lista }) => `
<section class="seccion" aria-labelledby="equipo-t">
  <div class="rejilla equipo__cab">
    <h2 class="titulo" id="equipo-t" data-sube>Conoce a nuestro equipo</h2>
    <div data-sube style="--d:80ms">
      <p>${intro}</p>
      <div class="acciones"><a class="btn" href="ceedi.html#equipo">Conoce al equipo</a></div>
    </div>
  </div>
  ${perfiles(lista)}
</section>`;

const etapas = ({ id, titulo, intro, lista }) => `
<section class="seccion" aria-labelledby="${id}">
  <div class="rejilla etapas__intro">
    <h2 class="titulo" id="${id}" data-sube>${titulo}</h2>
    <p data-sube style="--d:80ms">${intro}</p>
  </div>
  <div class="etapas arco" data-etapas data-sube style="--d:140ms">
    ${lista.map((e, i) => `
    <div class="etapa${i === 0 ? ' is-open' : ''}" style="--c:${e.c};--t:${e.t}">
      <h3><button class="etapa__abrir" type="button" aria-expanded="${i === 0}">${e.nombre}</button></h3>
      <p>${e.texto}</p>
      ${e.foto ? `<figure class="etapa__foto" style="--foco-img:${e.foco}">${foto(e.foto).replace(/alt="[^"]*"/, 'alt=""')}</figure>` : ''}
    </div>`).join('')}
  </div>
</section>`;

/* ---------------- 1. Inicio ---------------- */
const puerta = (p, i) => `
<article class="puerta puerta--${p.clase} arco${i === 0 ? ' is-open' : ''}" style="--c:${p.c};--t:${p.t};--vt:${p.vt};--d:${i * 90}ms" data-sube>
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
${portada({
    color: 'rojo',
    h1: ['Potenciamos tus experiencias', 'de enseñanza con lo digital.'],
    texto: 'En el CEEDi acompañamos a los profesores UAO en el diseño de experiencias de aprendizaje, la creación de recursos educativos y la apropiación de tecnologías para fortalecer sus prácticas de enseñanza.',
    acciones: `<a class="btn" href="#que-necesitas">Encuentra lo que necesitas</a><a class="btn btn--linea" href="solicita-acompanamiento.html">Solicita acompañamiento</a>`,
    fotoId: 'campus-anfiteatro',
    foco: '50% 38%',
    domoH: '9.9vw',
  })}

<section class="necesitas" id="que-necesitas" aria-labelledby="que-necesitas-t">
  <h2 class="titulo necesitas__titulo" id="que-necesitas-t">¿Qué necesitas?</h2>
  <div class="puertas" data-puertas>
    ${C.PUERTAS.map(puerta).join('')}
  </div>
</section>

<section class="seccion seccion--pegada" aria-labelledby="recursos-t">
  <div class="rejilla dos">
    <div class="dos__izq">
      <h2 class="titulo" id="recursos-t" data-sube>Encuentra algo útil para tu práctica.</h2>
      <p data-sube style="--d:80ms">Explora guías, orientaciones, plantillas y recursos que pueden ayudarte a resolver necesidades concretas de enseñanza y aprendizaje.</p>
      <div class="acciones" data-sube style="--d:140ms"><a class="btn" href="recursos.html">Ver todos los recursos</a></div>
      <figure class="dos__foto arco foto-fondo" data-abre style="--d:120ms">${foto('profesora-explicando')}</figure>
    </div>
    <ul class="dos__der recursos-fila">
      ${C.DESTACADOS.map(filaRecurso).join('')}
    </ul>
  </div>
</section>

<section class="campo campo--vino" aria-labelledby="formacion-t">
  <div class="campo__arco arco" style="--outer:var(--crema)">
    <div class="rejilla indice__cab">
      <h2 class="titulo" id="formacion-t" data-sube>Continúa fortaleciendo tu práctica.</h2>
      <p data-sube style="--d:80ms">Conoce las próximas oportunidades de formación, talleres y espacios del CEEDi para explorar nuevas posibilidades en tu práctica educativa.</p>
    </div>
    <div class="indice" data-indice>
      <div class="indice__lista">
        <ul>
          ${C.PROXIMAS.map((o, i) => `
          <li data-fila style="--d:${i * 80}ms"><a class="indice__fila" href="formacion.html#proximas">
            ${foto(o.foto, 'class="indice__mini" loading="lazy" decoding="async"').replace(/alt="[^"]*"/, 'alt=""')}
            <span class="indice__fecha">${o.fechaCorta}</span>
            <div><h3 class="indice__nombre">${o.nombre}</h3><span class="indice__detalle"><span class="indice__modo">${o.modo}.</span> ${o.texto}</span></div>
          </a></li>`).join('')}
        </ul>
        <div class="acciones indice__pie" data-sube><a class="btn" href="formacion.html">Ver formación</a></div>
      </div>
      <figure class="indice__marco arco foto-fondo" data-abre aria-hidden="true">
        ${C.PROXIMAS.map((o, i) => foto(o.foto, `loading="lazy" decoding="async"${i === 0 ? ' class="is-on"' : ''}`).replace(/alt="[^"]*"/, 'alt=""')).join('')}
      </figure>
    </div>
  </div>
</section>

<section class="banda" aria-labelledby="conoce-t" style="--foco-img:50% 58%">
  ${foto('campus-puente', 'class="deriva" loading="lazy" decoding="async"')}
  <div class="banda__tarjeta arco" data-sube style="padding-bottom:clamp(58px,6vw,84px)">
    <h2 class="titulo" id="conoce-t">Conoce el CEEDi</h2>
    <p>Quiénes somos, qué hacemos y quiénes te acompañan en la Universidad.</p>
    <div class="acciones"><a class="btn" href="ceedi.html">Conoce el CEEDi</a></div>
  </div>
</section>

${cierre({
    titulo: '¿Tienes una idea y no sabes por dónde empezar?',
    texto: 'Cuéntanos qué quieres lograr. Te ayudamos a identificar el acompañamiento que necesitas y a encontrar la ruta más adecuada dentro del CEEDi.',
    fotoId: 'trabajo-en-grupo',
  })}`,
});

/* ---------------- 2. Diseño de Experiencias ---------------- */
pagina({
  archivo: 'diseno-de-experiencias.html',
  titulo: 'Diseño de Experiencias · CEEDi · UAO',
  descripcion: 'Te acompañamos en el diseño y fortalecimiento de experiencias de aprendizaje de acuerdo con las necesidades de tus estudiantes y de tu contexto de enseñanza.',
  activa: 'area-experiencias',
  cuerpo: `
${portada({
    color: 'rojo',
    clase: 'display--area',
    h1: ['Diseño de Experiencias'],
    texto: 'Te acompañamos en el diseño y fortalecimiento de experiencias de aprendizaje, articulando propósitos, actividades, metodologías, evaluación y recursos de acuerdo con las necesidades de tus estudiantes y de tu contexto de enseñanza.',
    acciones: `<a class="btn" href="solicita-acompanamiento.html?ruta=disenar">Solicitar acompañamiento</a>`,
    fotoId: 'profesor-en-aula',
    foco: '42% 30%',
    domoH: '9.9vw',
    vt: 'puerta-experiencias',
  })}

<section class="seccion" aria-labelledby="acompanar-t">
  <div class="rejilla dos">
    <div class="dos__izq">
      <h2 class="titulo" id="acompanar-t" data-sube>¿En qué podemos acompañarte?</h2>
      <figure class="dos__foto arco foto-fondo" data-abre>${foto('profesora-explicando')}</figure>
    </div>
    <ul class="dos__der puntos">
      ${C.NECESIDADES_EXP.map((n, i) => `<li class="punto" data-fila style="--d:${i * 70}ms"><h3>${vineta}${n.t}</h3><p>${n.p}</p></li>`).join('')}
    </ul>
  </div>
</section>

${etapas({
    id: 'trabajamos-t',
    titulo: '¿Cómo trabajamos contigo?',
    intro: 'Cuatro momentos, a tu ritmo y a partir de lo que ya tienes. Selecciona cada uno para ver en qué consiste.',
    lista: C.ETAPAS_EXP,
  })}

<section class="seccion seccion--pegada" aria-labelledby="relacionados-t">
  <div class="rejilla dos">
    <div class="dos__izq">
      <h2 class="titulo" id="relacionados-t" data-sube>Recursos relacionados</h2>
      <p data-sube style="--d:80ms">Guías, plantillas y orientaciones para empezar por tu cuenta. El resto está en el banco general.</p>
      <div class="acciones" data-sube style="--d:140ms"><a class="btn" href="recursos.html#diseno-y-ensenanza">Ver recursos de Diseño de Experiencias</a></div>
      <figure class="dos__foto arco foto-fondo" data-abre style="--d:120ms">${foto('trabajo-en-grupo')}</figure>
    </div>
    <ul class="dos__der recursos-fila">${C.RELACIONADOS_EXP.map(filaRecurso).join('')}</ul>
  </div>
</section>

${equipo({ intro: 'Conoce a las personas que acompañan el diseño y fortalecimiento de experiencias de aprendizaje desde el CEEDi.', lista: C.EQUIPO.experiencias })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Tienes una experiencia que quieres crear, transformar o fortalecer?', href: 'solicita-acompanamiento.html?ruta=disenar', fotoId: 'tablero' })}`,
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
${portada({
    color: 'vino',
    clase: 'display--area',
    h1: ['Diseño de Recursos'],
    texto: 'Diseñamos y desarrollamos recursos educativos digitales que ayudan a materializar experiencias de aprendizaje en formatos pertinentes para cada necesidad.',
    acciones: `<a class="btn" href="solicita-acompanamiento.html?ruta=crear">Quiero desarrollar un recurso</a>`,
    fotoId: 'diseno-en-equipo',
    foco: '50% 40%',
    domoH: '9.9vw',
    vt: 'puerta-recursos',
  })}

<section class="seccion" aria-labelledby="crear-t">
  <h2 class="titulo" id="crear-t" data-sube>¿Qué podemos crear contigo?</h2>
  <ul class="mosaico">
    ${C.CATEGORIAS_REC.map((c, i) => `
    <li data-sube style="--d:${i * 90}ms">
      <div class="mosaico__arte arco" style="--c:${c.c};--t:${c.t}">${ILUS[c.ilus]}</div>
      <h3>${c.t2}</h3>
      <p>${c.p}</p>
    </li>`).join('')}
  </ul>
  <div class="orienta arco" data-sube>
    <h3>¿No sabes qué formato necesitas?</h3>
    <div class="orienta__txt">
      <p>No necesitas llegar con el recurso definido. Cuéntanos qué quieres lograr y te ayudamos a identificar una alternativa pertinente.</p>
    </div>
    <div class="acciones"><a class="btn" href="solicita-acompanamiento.html?ruta=crear">Cuéntanos tu idea</a></div>
  </div>
</section>

<section class="seccion seccion--pegada" aria-labelledby="proposito-t">
  <h2 class="titulo" id="proposito-t" data-sube>Del propósito al recurso</h2>
  <ol class="flujo">
    ${C.FLUJO.map((f, i) => {
      const y = 246 * (1 - f.lleno);
      return `
    <li data-llena data-sube style="--d:${i * 110}ms">
      <svg class="flujo__arco" viewBox="0 0 491.82 245.91" aria-hidden="true">
        <clipPath id="fl${i}"><path d="${ARCO}"/></clipPath>
        <g clip-path="url(#fl${i})"><rect class="flujo__lleno" x="0" y="${y.toFixed(1)}" width="492" height="${(246 - y).toFixed(1)}" style="--d:${i * 110 + 240}ms;--c:${f.c}"/></g>
        <path class="flujo__traza" d="${ARCO}"/>
      </svg>
      <h3>${f.t}</h3>
      <p>${f.p}</p>
    </li>`;
    }).join('')}
  </ol>
</section>

<section class="seccion seccion--pegada" aria-labelledby="casos-t">
  <div class="rejilla equipo__cab">
    <h2 class="titulo" id="casos-t" data-sube>Explora recursos creados con CEEDi</h2>
    <div data-sube style="--d:80ms">
      <p>Una selección pequeña para ayudarte a imaginar posibilidades.</p>
      <div class="acciones"><a class="btn" href="recursos.html#recursos-educativos-digitales">Explorar recursos</a></div>
    </div>
  </div>
  <ul class="casos" style="margin-top:0">
    <li class="caso" data-sube><div class="caso__still arco" style="--c:var(--coral)">${stillInfo}</div><h3>Ciclo de evaluación formativa</h3><span class="caso__tipo">Recurso gráfico</span><p>Infografía para un curso de primer semestre.</p></li>
    <li class="caso" data-sube style="--d:90ms"><div class="caso__still arco" style="--c:var(--vino-o)">${stillVideo}</div><h3>Cápsula de contabilidad</h3><span class="caso__tipo">Recurso audiovisual</span><p>Video corto de apoyo para repasar un concepto antes de clase.</p></li>
    <li class="caso" data-sube style="--d:180ms"><div class="caso__still arco" style="--c:var(--blanco)">${stillInter}</div><h3>Simulador de decisiones éticas</h3><span class="caso__tipo">Recurso interactivo</span><p>Los estudiantes toman decisiones y ven sus consecuencias.</p></li>
  </ul>
</section>

${equipo({ intro: 'Conoce a las personas que transforman necesidades educativas en recursos digitales junto con los profesores UAO.', lista: C.EQUIPO.recursos })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Tienes una idea que quieres convertir en un recurso?', href: 'solicita-acompanamiento.html?ruta=crear', fotoId: 'diseno-en-equipo' })}`,
});

/* ---------------- 4. Cultura Digital ---------------- */
pagina({
  archivo: 'cultura-digital.html',
  titulo: 'Cultura Digital · CEEDi · UAO',
  descripcion: 'Te acompañamos en la apropiación de tecnologías, herramientas y prácticas digitales para que puedas incorporarlas con sentido a tu práctica educativa.',
  activa: 'area-cultura',
  cuerpo: `
${portada({
    color: 'coral',
    clase: 'display--area',
    h1: ['Cultura Digital'],
    texto: 'Te acompañamos en la apropiación de tecnologías, herramientas y prácticas digitales para que puedas incorporarlas con sentido a tu práctica educativa.',
    acciones: `<a class="btn" href="#fortalecer">Fortalecer mi práctica digital</a>`,
    fotoId: 'sala-de-computo',
    foco: '50% 60%',
    domoH: '9.9vw',
    vt: 'puerta-cultura',
  })}

<section class="seccion" id="fortalecer" aria-labelledby="fortalecer-t">
  <div class="rejilla cabfoto">
    <h2 class="titulo" id="fortalecer-t" data-sube>¿Qué quieres fortalecer?</h2>
    <figure class="arco foto-fondo" data-abre>${foto('profesora-explicando')}</figure>
  </div>
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
  <div class="rejilla dos">
    <div class="dos__izq">
      <h2 class="titulo" id="aprende-t" data-sube>Aprende y ponlo en práctica</h2>
      <div class="acciones" data-sube style="--d:80ms;margin-top:clamp(18px,2vw,28px)"><a class="btn" href="formacion.html">Ver toda la formación</a></div>
      <figure class="dos__foto arco foto-fondo" data-abre>${foto('trabajo-en-grupo')}</figure>
    </div>
    <ul class="dos__der puntos">
      ${C.APRENDE_CD.map((n, i) => `<li class="punto" data-fila style="--d:${i * 70}ms"><h3 style="font-size:var(--s-lead);letter-spacing:-.02em;font-weight:500">${vineta}${n.t}</h3><p>${n.p}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="campo campo--vino herr" aria-labelledby="herr-t">
  <div class="campo__arco arco" style="--outer:var(--crema)">
    <div class="rejilla indice__cab" style="margin-bottom:0">
      <h2 class="titulo" id="herr-t" data-sube>Herramientas para tu práctica</h2>
      <div class="herr__txt" data-sube style="--d:80ms">
        <p style="grid-column:auto">Encuentra guías y orientaciones para aprovechar las herramientas digitales institucionales en tus experiencias de enseñanza.</p>
        <div class="acciones" style="margin-top:18px"><a class="btn" href="recursos.html#herramientas-digitales">Explorar herramientas</a></div>
      </div>
    </div>
    <ul class="herr__lista">
      ${C.HERRAMIENTAS.map((h, i) => `<li class="herr__item" data-fila style="--d:${i * 80}ms">${icono(h.i)}<div><h3>${h.t}</h3><p>${h.p}</p></div></li>`).join('')}
    </ul>
  </div>
</section>

${equipo({ intro: 'Conoce a las personas que acompañan la apropiación de tecnologías y el fortalecimiento de la cultura digital en la comunidad universitaria.', lista: C.EQUIPO.cultura })}

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres fortalecer algún aspecto de tu práctica digital?', href: 'solicita-acompanamiento.html?ruta=fortalecer', fotoId: 'lectura-campus' })}`,
});

/* ---------------- 5. Recursos ---------------- */
pagina({
  archivo: 'recursos.html',
  titulo: 'Recursos para tu práctica · CEEDi · UAO',
  descripcion: 'Encuentra guías, plantillas, orientaciones y materiales para apoyar el diseño de tus experiencias de aprendizaje y el uso pedagógico de tecnologías.',
  activa: 'recursos',
  cuerpo: `
${portada({
    color: 'coral',
    clase: 'display--medio',
    h1: ['Recursos para', 'tu práctica'],
    texto: 'Encuentra guías, plantillas, orientaciones y materiales para apoyar el diseño de tus experiencias de aprendizaje y el uso pedagógico de tecnologías.',
    acciones: `<a class="btn" href="#banco">Ver recursos</a>`,
    fotoId: 'lectura-campus',
    foco: '50% 50%',
    domo: '36%',
    domoH: '7.75vw',
  })}

<nav class="saltos" aria-label="Categorías de recursos" style="margin-top:clamp(20px,3vw,44px)" id="banco">
  ${C.BANCO.map((c) => `<a href="#${c.id}">${vineta}<span>${c.nombre}</span></a>`).join('')}
</nav>

<div class="seccion" style="padding-top:clamp(32px,4vw,56px)">
  ${C.BANCO.map((c) => `
  <section class="categoria" id="${c.id}" aria-labelledby="${c.id}-t">
    <div class="categoria__cab">
      <h2 id="${c.id}-t" data-sube>${c.nombre}</h2>
      <span class="categoria__cuenta">${c.items.length} recursos</span>
      <figure class="arco foto-fondo" data-abre>${foto(c.foto)}</figure>
    </div>
    <ul class="categoria__lista">
      ${c.items.map(filaRecurso).join('')}
    </ul>
  </section>`).join('')}
</div>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿No encuentras lo que buscas? Cuéntanos qué necesitas y te orientamos.', fotoId: 'estudiantes-campus' })}`,
});

/* ---------------- 6. Formación ---------------- */
pagina({
  archivo: 'formacion.html',
  titulo: 'Formación para profesores · CEEDi · UAO',
  descripcion: 'Encuentra oportunidades para fortalecer tus competencias, explorar nuevas posibilidades y llevarlas a tu práctica educativa.',
  activa: 'formacion',
  cuerpo: `
${portada({
    color: 'vino',
    clase: 'display--medio',
    h1: ['Formación', 'para profesores'],
    texto: 'Encuentra oportunidades para fortalecer tus competencias, explorar nuevas posibilidades y llevarlas a tu práctica educativa.',
    acciones: `<a class="btn" href="#proximas">Ver próximas oportunidades</a>`,
    fotoId: 'auditorio',
    foco: '50% 50%',
    domo: '36%',
    domoH: '7.75vw',
  })}

<section class="seccion" id="proximas" aria-labelledby="proximas-t">
  <div class="rejilla cabfoto">
    <h2 class="titulo" id="proximas-t" data-sube>Próximas oportunidades</h2>
    <figure class="arco foto-fondo" data-abre>${foto('profesora-explicando')}</figure>
  </div>
  <ul class="oportunidades">
    ${C.PROXIMAS.map((o, i) => `
    <li class="oportunidad" data-sube style="--d:${i * 90}ms">
      <div class="oportunidad__fecha arco" style="--c:${o.c};--t:${o.t}">${o.fechaLarga}</div>
      <h3>${o.nombre}</h3>
      <span class="oportunidad__modo">${o.modo}</span>
      <p>${o.texto}</p>
      <div class="acciones"><a class="btn" href="#agenda">Ver actividad / Inscribirme<span class="sr">: ${o.nombre}</span></a></div>
    </li>`).join('')}
  </ul>
</section>

<section class="campo campo--vino" id="rutas" aria-labelledby="rutas-t">
  <div class="campo__arco arco" style="--outer:var(--crema)">
    <div class="rejilla dos">
      <div class="dos__izq">
        <h2 class="titulo" id="rutas-t" data-sube>Rutas de formación</h2>
        <p data-sube style="--d:80ms">Trayectorias y cursos de mayor alcance, descritos por lo que podrás desarrollar.</p>
        <div class="acciones" data-sube style="--d:140ms"><a class="btn" href="#agenda">Explorar rutas de formación</a></div>
        <figure class="dos__foto arco foto-fondo" data-abre style="--outer:var(--vino-o)">${foto('estudiantes-campus')}</figure>
      </div>
      <ul class="dos__der lista-rutas">
        ${C.RUTAS_F.map((r, i) => `<li data-fila style="--d:${i * 80}ms"><h3>${vineta}${r.t}</h3><p>${r.p}</p></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="seccion" id="agenda" aria-labelledby="agenda-t">
  <h2 class="titulo" id="agenda-t" data-sube>Agenda y actividades</h2>
  <table class="tabla" data-sube style="--d:80ms">
    <thead><tr><th scope="col">Fecha</th><th scope="col">Actividad</th><th scope="col">Modalidad</th></tr></thead>
    <tbody>${C.AGENDA.map((a) => `<tr><td>${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td></tr>`).join('')}</tbody>
  </table>
</section>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres llevar lo que aprendes a un curso concreto? Te acompañamos.', href: 'solicita-acompanamiento.html?ruta=fortalecer', fotoId: 'pasillo' })}`,
});

/* ---------------- 7. CEEDi / Nosotros ---------------- */
pagina({
  archivo: 'ceedi.html',
  titulo: 'Quiénes somos · CEEDi · UAO',
  descripcion: 'El Centro de Excelencia Educativa Digital articula el diseño de experiencias de aprendizaje, la creación de recursos educativos digitales y la apropiación de la cultura digital.',
  activa: 'ceedi',
  cuerpo: `
${portada({
    color: 'rojo',
    clase: 'display--ceedi',
    h1: ['Centro de Excelencia', 'Educativa Digital'],
    texto: 'El Centro de Excelencia Educativa Digital (CEEDi) articula el diseño de experiencias de aprendizaje, la creación de recursos educativos digitales y la apropiación de la cultura digital para fortalecer los procesos de enseñanza y aprendizaje en la Universidad Autónoma de Occidente.',
    acciones: `<a class="btn" href="#equipo">Nuestro equipo</a><a class="btn btn--linea" href="#contacto">Contacto</a>`,
    fotoId: 'campus-panoramica',
    foco: '62% 50%',
    domo: '36%',
    domoH: '7.75vw',
  })}

<section class="seccion" aria-labelledby="hacemos-t">
  <div class="rejilla cabfoto">
    <h2 class="titulo" id="hacemos-t" data-sube>Qué hacemos</h2>
    <figure class="arco foto-fondo" data-abre>${foto('pasillo')}</figure>
  </div>
  <ul class="areas">
    ${C.AREAS.map((a, i) => `
    <li class="area" style="--c:${a.c};--t:${a.t};--d:${i * 90}ms" data-sube>
      <div class="area__arco arco"><h3>${a.nombre}</h3></div>
      <p>${a.breve}</p>
      <a class="enlace" href="${a.href}">Conocer el área<span class="sr">: ${a.nombre}</span></a>
    </li>`).join('')}
  </ul>
</section>

<section class="seccion seccion--pegada" id="equipo" aria-labelledby="nuestro-t">
  <h2 class="titulo" id="nuestro-t" data-sube style="margin-bottom:clamp(28px,3.4vw,52px)">Nuestro equipo</h2>
  ${C.AREAS.map((a) => `
  <section class="grupo" aria-labelledby="grupo-${a.id}">
    <div class="grupo__cab"><h3 id="grupo-${a.id}">${a.nombre}</h3><a class="enlace" href="${a.href}">Ver el área</a></div>
    ${perfiles(C.EQUIPO[a.id])}
  </section>`).join('')}
</section>

<section class="seccion seccion--pegada" id="contacto" aria-labelledby="contacto-t">
  <div class="rejilla dos">
    <div class="dos__izq">
      <h2 class="titulo" id="contacto-t" data-sube>Contacto</h2>
      <ul class="contacto">
        ${C.CONTACTO.map((c, i) => `<li class="contacto__item" data-fila style="--d:${i * 70}ms">${icono(c.i)}<div><h3>${c.t}</h3><p>${c.p}</p></div></li>`).join('')}
      </ul>
    </div>
    <figure class="dos__der arco foto-fondo" data-abre style="aspect-ratio:1.5/1;--dome:56%">${foto('campus-anfiteatro')}</figure>
  </div>
</section>

${cierre({ titulo: 'Solicita acompañamiento', pregunta: '¿Quieres trabajar con nosotros en tu próximo curso?', fotoId: 'campus-puente' })}`,
});

/* ---------------- 8. Solicita acompañamiento ---------------- */
pagina({
  archivo: 'solicita-acompanamiento.html',
  titulo: 'Solicita acompañamiento · CEEDi · UAO',
  descripcion: 'No necesitas saber qué área o servicio necesitas. Cuéntanos brevemente tu idea, necesidad o reto y te orientaremos.',
  activa: 'solicita',
  cuerpo: `
<section class="portada portada--sinfoto c-rojo" style="--dome-hero:36%;--dome-h:7.75vw">
  <div class="portada__campo"></div>
  <div class="portada__titulo"><h1 class="display--medio lines">${lineas(['Cuéntanos qué', 'quieres lograr.'])}</h1></div>
  <div class="portada__texto" style="grid-column:2/-2">
    <p class="lead" data-llega style="--d:420ms;max-width:38em">No necesitas saber qué área o servicio necesitas. Cuéntanos brevemente tu idea, necesidad o reto y te orientaremos sobre la alternativa de acompañamiento más adecuada.</p>
  </div>
  <div class="domo portada__domo"></div>
</section>

<section class="seccion" style="padding-top:clamp(40px,5vw,72px)" aria-labelledby="eleccion-t">
  <form id="solicitud" action="#gracias" method="post">
    <h2 class="titulo" id="eleccion-t" data-sube style="margin-bottom:clamp(22px,2.6vw,36px)">¿Qué te trae por aquí?</h2>
    <fieldset class="opciones">
      <legend class="sr">Elige la opción que más se parece a lo que necesitas</legend>
      ${C.OPCIONES.map((o, i) => `
      <label class="opcion" data-sube style="--d:${i * 70}ms">
        <input type="radio" name="ruta" value="${o.v}">
        <span class="opcion__arco arco"><span class="opcion__txt">${o.t}</span><span class="opcion__foto">${foto(o.foto).replace(/alt="[^"]*"/, 'alt=""')}</span></span>
      </label>`).join('')}
    </fieldset>
    <p class="nota" data-aviso-ruta hidden style="margin-top:10px;font-weight:600;color:var(--vino)">Elige una opción para continuar. Si no estás seguro, marca “Tengo otra necesidad / No estoy seguro”.</p>
    <div class="campos">
      <div class="campos__pregunta" data-sube>
        <h2 class="titulo" data-pregunta-titulo>Cuéntanos qué tienes en mente.</h2>
        <p>Pedimos únicamente lo indispensable para comprender tu necesidad y canalizarla.</p>
      </div>
      <div class="campos__grupo">
        <div class="campo-f" data-sube>
          <label for="idea" data-pregunta-etiqueta>Cuéntanos brevemente tu idea, necesidad o reto.</label>
          <textarea id="idea" name="idea" required></textarea>
          <span class="error">Cuéntanos al menos una frase para poder orientarte.</span>
        </div>
        <div class="dos-campos" data-sube style="--d:70ms">
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
        </div>
        <div class="campo-f" data-sube style="--d:120ms">
          <label for="facultad">Facultad o departamento</label>
          <input id="facultad" name="facultad" type="text" autocomplete="organization" required>
          <span class="error">Escribe tu facultad o departamento.</span>
        </div>
        <div class="acciones" data-sube style="--d:170ms"><button class="btn" type="submit">Enviar solicitud</button></div>
      </div>
    </div>
  </form>
  <div class="gracias arco" id="gracias" hidden>
    <h2 class="titulo">Recibimos tu solicitud.</h2>
    <p>Te escribiremos a tu correo institucional con la alternativa de acompañamiento más adecuada.</p>
    <a class="enlace" href="index.html" style="--enlace-hover:var(--rosa)">Volver al inicio</a>
  </div>
</section>`,
});

console.log('Listo.');
