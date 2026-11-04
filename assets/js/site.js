// Micrositio CEEDi. Todo el contenido existe en el HTML; este archivo solo agrega comportamiento.
(() => {
  const fino = matchMedia('(hover: hover) and (pointer: fine)');
  const anchoPuertas = matchMedia('(min-width: 1180px)');
  const anchoEtapas = matchMedia('(min-width: 900px)');
  const calma = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Menú móvil y submenú ---------- */
  const nav = document.getElementById('menu');
  const abrir = document.querySelector('.cabecera__abrir');
  const cerrar = document.querySelector('.nav__cerrar');
  const setMenu = (on) => {
    nav.classList.toggle('is-open', on);
    abrir.setAttribute('aria-expanded', String(on));
    document.body.style.overflow = on ? 'hidden' : '';
    document.querySelectorAll('main, .pie, .cabecera__marca').forEach((el) => { el.inert = on; });
    if (on) cerrar.focus(); else abrir.focus();
  };
  if (abrir && nav) {
    abrir.addEventListener('click', () => setMenu(true));
    cerrar.addEventListener('click', () => setMenu(false));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false); });
  }
  document.querySelectorAll('.nav__grupo').forEach((grupo) => {
    const boton = grupo.querySelector('button');
    boton.addEventListener('click', () => {
      const on = !grupo.classList.contains('is-open');
      grupo.classList.toggle('is-open', on);
      boton.setAttribute('aria-expanded', String(on));
    });
    addEventListener('click', (e) => {
      if (!grupo.contains(e.target) && grupo.classList.contains('is-open')) {
        grupo.classList.remove('is-open');
        boton.setAttribute('aria-expanded', 'false');
      }
    });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && grupo.classList.contains('is-open')) {
        grupo.classList.remove('is-open');
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
      }
    });
  });

  /* ---------- La cabecera se aparta al bajar y vuelve al subir ---------- */
  const cabecera = document.querySelector('.cabecera');
  if (cabecera) {
    let ultimo = scrollY;
    let pendiente = false;
    addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        const baja = y > ultimo && y > 260;
        const abierto = cabecera.querySelector('.nav__grupo.is-open') || nav?.classList.contains('is-open');
        if (!abierto) cabecera.classList.toggle('is-oculta', baja);
        ultimo = y;
        pendiente = false;
      });
    }, { passive: true });
    cabecera.addEventListener('focusin', () => cabecera.classList.remove('is-oculta'));
  }

  /* ---------- Las tres puertas y las etapas: el arco que se abre ---------- */
  const acordeon = (raiz, itemSel, botonSel, conHover, ancho) => {
    const items = [...raiz.querySelectorAll(itemSel)];
    let espera = 0;
    const abre = (item) => items.forEach((x) => {
      const on = x === item;
      x.classList.toggle('is-open', on);
      x.querySelector(botonSel).setAttribute('aria-expanded', String(on));
    });
    items.forEach((item) => {
      item.querySelector(botonSel).addEventListener('click', () => abre(item));
      item.addEventListener('focusin', () => { if (ancho.matches) abre(item); });
      if (conHover) {
        item.addEventListener('pointerenter', () => {
          if (!fino.matches || !ancho.matches) return;
          clearTimeout(espera);
          espera = setTimeout(() => abre(item), 90);
        });
        item.addEventListener('pointerleave', () => clearTimeout(espera));
      }
    });
    abre(items.find((x) => x.classList.contains('is-open')) || items[0]);
  };
  document.querySelectorAll('[data-puertas]').forEach((r) => acordeon(r, '.puerta', '.puerta__abrir', true, anchoPuertas));
  document.querySelectorAll('[data-etapas]').forEach((r) => acordeon(r, '.etapa', '.etapa__abrir', false, anchoEtapas));

  /* ---------- Índice con vista previa, anclado a la fila ---------- */
  document.querySelectorAll('[data-indice]').forEach((raiz) => {
    const filas = [...raiz.querySelectorAll('.indice__fila')];
    const fotos = [...raiz.querySelectorAll('.indice__marco img')];
    const muestra = (i) => fotos.forEach((f, k) => f.classList.toggle('is-on', k === i));
    filas.forEach((fila, i) => {
      fila.addEventListener('pointerenter', () => muestra(i));
      fila.addEventListener('focus', () => muestra(i));
    });
    muestra(0);
  });

  /* ---------- Entradas por sección: una vez, sin dejar nada oculto ---------- */
  const entradas = document.querySelectorAll('[data-sube], [data-abre], [data-fila], [data-llena]');
  if (entradas.length) {
    if (!('IntersectionObserver' in window) || calma.matches) {
      entradas.forEach((el) => el.classList.add('is-in'));
    } else {
      // Una imagen perezosa recortada al 100 % nunca empieza a cargar: el navegador la da por invisible.
      // Por eso las fotos que se abren al entrar se piden desde el inicio.
      document.querySelectorAll('[data-abre] img').forEach((img) => { img.loading = 'eager'; });
      const io = new IntersectionObserver((lista) => {
        for (const e of lista) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      entradas.forEach((el) => io.observe(el));
      // Red de seguridad: nada en pantalla queda oculto si el observador no dispara.
      addEventListener('load', () => setTimeout(() => {
        entradas.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
        });
      }, 1800));
    }
  }

  /* ---------- Solicita acompañamiento ---------- */
  const form = document.getElementById('solicitud');
  if (form) {
    const preguntas = {
      disenar: {
        titulo: 'Cuéntanos sobre tu experiencia.',
        etiqueta: '¿Qué experiencia quieres crear, transformar o fortalecer?',
      },
      crear: {
        titulo: 'Cuéntanos sobre tu idea.',
        etiqueta: '¿Qué contenido, idea o necesidad quieres convertir en un recurso?',
      },
      fortalecer: {
        titulo: 'Cuéntanos sobre tu práctica.',
        etiqueta: '¿Qué aspecto de tu práctica digital quieres fortalecer?',
      },
      otra: {
        titulo: 'Cuéntanos qué tienes en mente.',
        etiqueta: 'Cuéntanos brevemente tu idea, necesidad o reto.',
      },
    };
    const titulo = form.querySelector('[data-pregunta-titulo]');
    const etiqueta = form.querySelector('[data-pregunta-etiqueta]');
    const pinta = (ruta) => {
      const p = preguntas[ruta];
      if (!p) return;
      titulo.textContent = p.titulo;
      etiqueta.textContent = p.etiqueta;
    };
    form.querySelectorAll('input[name="ruta"]').forEach((r) => r.addEventListener('change', () => pinta(r.value)));

    // La puerta elegida en otra página llega ya marcada.
    const elegida = new URLSearchParams(location.search).get('ruta');
    const radio = elegida && form.querySelector(`input[name="ruta"][value="${CSS.escape(elegida)}"]`);
    if (radio) { radio.checked = true; pinta(elegida); }

    const revisa = (campo) => {
      const ok = campo.checkValidity();
      campo.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    form.querySelectorAll('input:not([type=radio]), textarea').forEach((c) => {
      c.addEventListener('blur', () => { if (c.value) revisa(c); });
      c.addEventListener('input', () => { if (c.getAttribute('aria-invalid') === 'true') revisa(c); });
    });
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const campos = [...form.querySelectorAll('input:not([type=radio]), textarea')];
      const malos = campos.filter((c) => !revisa(c));
      const aviso = form.querySelector('[data-aviso-ruta]');
      const hayRuta = form.querySelector('input[name="ruta"]:checked');
      aviso.hidden = Boolean(hayRuta);
      if (!hayRuta) { aviso.scrollIntoView({ block: 'center' }); return; }
      if (malos.length) { malos[0].focus(); return; }
      // Prototipo: aquí se conecta el envío real al proceso de la Unidad.
      const gracias = document.getElementById('gracias');
      form.hidden = true;
      gracias.hidden = false;
      gracias.setAttribute('tabindex', '-1');
      gracias.focus();
      gracias.scrollIntoView({ block: 'center', behavior: calma.matches ? 'auto' : 'smooth' });
    });
  }
})();
