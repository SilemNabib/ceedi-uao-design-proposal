// Contenido del micrositio.
// Los textos de la propuesta van tal cual. Lo marcado con "MUESTRA" es contenido de ejemplo
// que el CEEDi debe confirmar o reemplazar antes de publicar.

const R = 'var(--rojo)', V = 'var(--vino-o)', W = 'var(--vino)', K = 'var(--coral)', C = 'var(--crema)', B = 'var(--blanco)', P = 'var(--rosa)';

export const PICS = {
  // Fotografías del Manual de Identidad UAO (baja resolución: pedir originales a Comunicaciones)
  'profesor-en-aula': { src: 'assets/img/profesor-en-aula.jpg', w: 1000, h: 416, alt: 'Profesor explicando de pie frente a su grupo en un salón de clase de la UAO' },
  'profesora-explicando': { src: 'assets/img/profesora-explicando.jpg', w: 960, h: 480, alt: 'Profesora conversando con sus estudiantes durante una clase' },
  tablero: { src: 'assets/img/tablero.jpg', w: 558, h: 476, alt: 'Persona de espaldas escribiendo una fórmula en un tablero blanco' },
  'trabajo-en-grupo': { src: 'assets/img/trabajo-en-grupo.jpg', w: 552, h: 472, alt: 'Tres personas revisan un documento en una mesa del campus, frente a un edificio de ladrillo' },
  'sala-de-computo': { src: 'assets/img/sala-de-computo.jpg', w: 570, h: 404, alt: 'Sala de cómputo de la Universidad, con puestos de trabajo y una pantalla de proyección' },
  auditorio: { src: 'assets/img/auditorio.jpg', w: 570, h: 406, alt: 'Auditorio con público frente a una pantalla' },
  pasillo: { src: 'assets/img/pasillo.jpg', w: 552, h: 448, alt: 'Pasillo interior de la Universidad con ventanales' },
  'estudiantes-campus': { src: 'assets/img/estudiantes-campus.jpg', w: 568, h: 404, alt: 'Dos estudiantes revisan un documento sentados en el campus' },
  'lectura-campus': { src: 'assets/img/lectura-campus.jpg', w: 568, h: 404, alt: 'Grupo de estudiantes leyendo sentados en una banca del campus, entre plantas' },
  'diseno-en-equipo': { src: 'assets/img/diseno-en-equipo.jpg', w: 678, h: 640, alt: 'Dos personas trabajan juntas sobre una mesa de diseño, frente a una pared con bocetos' },
  // Wikimedia Commons, con crédito en el pie
  'campus-anfiteatro': { src: 'assets/universidad-autonoma-de-occidente-cali.jpg', w: 1920, h: 1440, alt: 'Campus de la Universidad Autónoma de Occidente en Cali: palmeras, edificios de ladrillo y la plazoleta circular' },
  'campus-puente': { src: 'assets/universidad-autonoma-de-occidente-cali-colombia-campus.jpg', w: 1920, h: 1280, alt: 'Edificios de ladrillo del campus de la UAO y el puente peatonal entre jardines' },
  'campus-panoramica': { src: 'assets/universidad-autonoma-de-occidente.jpg', w: 1920, h: 732, alt: 'Vista panorámica del campus de la UAO al atardecer, entre jardines y palmeras' },
};

export const LEGAL = 'Personería jurídica, Res. No. 0618, de la Gobernación del Valle del Cauca, del 20 de febrero de 1970. Universidad Autónoma de Occidente, Res. No. 2766, del Ministerio de Educación Nacional, del 13 de noviembre de 2003. Acreditación Institucional de Alta Calidad, Res. 23002 del 30 de noviembre de 2021, con vigencia hasta el 2025. Acreditación Internacional de Alta Calidad, acuerdo No. 85 del 26 de enero de 2022 del Cinda. Vigilada MinEducación.';

export const CREDITOS = 'Fotografías de campus: <a href="https://commons.wikimedia.org/w/index.php?curid=12123707">“Universidad Autonoma de Occidente Cali”</a> y <a href="https://commons.wikimedia.org/w/index.php?curid=23885498">“Universidad Autónoma de Occidente, Cali, Colombia (campus)”</a>, de Jyon, licencias <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a> y <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Universidad_Aut%C3%B3noma_de_Occidente.jpg">“Universidad Autónoma de Occidente”</a>, de Jisuca, licencia <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, vía Wikimedia Commons. Las demás fotografías provienen del Manual de Identidad UAO.';

export const AREAS = [
  { id: 'experiencias', nombre: 'Diseño de Experiencias', href: 'diseno-de-experiencias.html', color: R, c: R, t: C,
    menu: 'Crea, transforma o fortalece una experiencia de aprendizaje.',
    breve: 'Diseñamos y fortalecemos experiencias formativas articulando propósitos, actividades, metodologías, evaluación y recursos.' },
  { id: 'recursos', nombre: 'Diseño de Recursos', href: 'diseno-de-recursos.html', color: V, c: V, t: C,
    menu: 'Convierte una idea o un contenido en un recurso educativo.',
    breve: 'Materializamos necesidades educativas mediante recursos gráficos, audiovisuales e interactivos.' },
  { id: 'cultura', nombre: 'Cultura Digital', href: 'cultura-digital.html', color: K, c: K, t: V,
    menu: 'Fortalece tu práctica con tecnologías, IA y herramientas.',
    breve: 'Promovemos la apropiación de tecnologías, herramientas y prácticas digitales para fortalecer la enseñanza.' },
];

export const PUERTAS = [
  { nombre: 'Diseñar una experiencia', clase: 'rojo', c: R, t: C, vt: 'puerta-experiencias',
    texto: '¿Quieres crear, transformar o fortalecer una experiencia de aprendizaje? Te acompañamos a estructurarla de acuerdo con tus propósitos y las necesidades de tus estudiantes.',
    boton: 'Quiero diseñar', destino: 'Diseño de Experiencias', href: 'diseno-de-experiencias.html', foto: 'profesor-en-aula', foco: '66% 26%' },
  { nombre: 'Crear un recurso', clase: 'vino', c: V, t: C, vt: 'puerta-recursos',
    texto: '¿Tienes un contenido, una idea o una necesidad educativa que quieres convertir en un recurso? Te acompañamos a encontrar y desarrollar el formato más pertinente.',
    boton: 'Quiero crear', destino: 'Diseño de Recursos', href: 'diseno-de-recursos.html', foto: 'diseno-en-equipo', foco: '50% 38%' },
  { nombre: 'Fortalecer mi práctica digital', clase: 'coral', c: K, t: V, vt: 'puerta-cultura',
    texto: 'Explora posibilidades para incorporar tecnologías, inteligencia artificial, herramientas institucionales y nuevas prácticas digitales a tu enseñanza.',
    boton: 'Quiero aprender', destino: 'Cultura Digital', href: 'cultura-digital.html', foto: 'sala-de-computo', foco: '50% 64%' },
];

// MUESTRA: recursos destacados de la home (máximo tres)
export const DESTACADOS = [
  { titulo: 'Cómo redactar resultados de aprendizaje', tipo: 'Guía', icono: 'guia', m: R, mi: C, href: 'recursos.html#diseno-y-ensenanza',
    texto: 'Pasos y ejemplos para expresar lo que esperas que tus estudiantes aprendan.' },
  { titulo: 'Plantilla para planear una sesión híbrida', tipo: 'Plantilla', icono: 'plantilla', m: V, mi: C, href: 'recursos.html#multimodalidad',
    texto: 'Coordina lo que ocurre en el salón y lo que ocurre en línea.' },
  { titulo: 'Criterios para usar IA con intención pedagógica', tipo: 'Orientación', icono: 'orientacion', m: P, mi: V, href: 'recursos.html#inteligencia-artificial',
    texto: 'Preguntas para decidir cuándo la IA aporta al aprendizaje y cuándo no.' },
];

// MUESTRA: actividades
export const PROXIMAS = [
  { nombre: 'Café Digital UAO: IA en la preparación de clases', fechaCorta: '19 de noviembre', fechaLarga: '19 nov', modo: 'Presencial', c: R, t: C, foto: 'trabajo-en-grupo',
    texto: 'Una conversación entre colegas sobre qué ha funcionado y qué no.' },
  { nombre: 'Taller: diseña una actividad para modalidad híbrida', fechaCorta: '26 de noviembre', fechaLarga: '26 nov', modo: 'Híbrida', c: V, t: C, foto: 'tablero',
    texto: 'Sales con una actividad lista para llevar a tu próximo curso.' },
  { nombre: 'Microcapacitación: evaluación en el aula virtual', fechaCorta: '3 de diciembre', fechaLarga: '3 dic', modo: 'Virtual', c: K, t: V, foto: 'sala-de-computo',
    texto: 'Treinta minutos para configurar rúbricas y retroalimentación.' },
];

export const NECESIDADES_EXP = [
  { t: 'Diseñar o transformar una experiencia', p: 'Estructura cursos, módulos, trayectorias o experiencias formativas a partir de lo que esperas que tus estudiantes aprendan.' },
  { t: 'Fortalecer actividades de aprendizaje', p: 'Revisa y diseña actividades, metodologías y estrategias que favorezcan una participación activa y estén articuladas con los resultados de aprendizaje.' },
  { t: 'Diseñar para diferentes modalidades', p: 'Explora alternativas para desarrollar experiencias presenciales, virtuales, híbridas o multimodales de acuerdo con las necesidades del proceso formativo.' },
  { t: 'Mejorar una experiencia existente', p: 'Identifica oportunidades de mejora en una experiencia que ya implementas y construye alternativas para fortalecerla.' },
];

// La secuencia es de la propuesta; las frases son MUESTRA, a validar con el área.
export const ETAPAS_EXP = [
  { nombre: 'Nos cuentas tu necesidad', c: V, t: C, foto: 'tablero', foco: '60% 40%', texto: 'Empieza por lo que quieres lograr. No necesitas tenerlo todo definido.' },
  { nombre: 'Comprendemos el reto', c: W, t: C, foto: 'profesora-explicando', foco: '64% 40%', texto: 'Conversamos sobre tus estudiantes, tu curso y tu contexto de enseñanza.' },
  { nombre: 'Diseñamos contigo', c: R, t: C, foto: 'diseno-en-equipo', foco: '55% 40%', texto: 'Construimos juntos la estructura, las actividades y la evaluación.' },
  { nombre: 'Acompañamos el desarrollo de la experiencia', c: K, t: V, foto: 'profesor-en-aula', foco: '63% 30%', texto: 'Seguimos a tu lado mientras la llevas a tus estudiantes.' },
];

// MUESTRA
export const RELACIONADOS_EXP = [
  { titulo: 'Cómo redactar resultados de aprendizaje', tipo: 'Guía', icono: 'guia', m: R, mi: C, href: 'recursos.html#diseno-y-ensenanza', texto: 'Pasos y ejemplos para expresar lo que esperas que tus estudiantes aprendan.' },
  { titulo: 'Plantilla para planear una sesión', tipo: 'Plantilla', icono: 'plantilla', m: V, mi: C, href: 'recursos.html#diseno-y-ensenanza', texto: 'Organiza propósito, actividades, tiempos y evaluación en una sola página.' },
  { titulo: 'Actividades para una participación activa', tipo: 'Orientación', icono: 'orientacion', m: P, mi: V, href: 'recursos.html#diseno-y-ensenanza', texto: 'Ideas para que tus estudiantes discutan, practiquen y tomen decisiones en clase.' },
];

export const CATEGORIAS_REC = [
  { t2: 'Recursos gráficos', c: V, t: C, ilus: 'grafico', p: 'Materiales visuales que organizan y presentan contenidos de manera clara para apoyar la comprensión y el aprendizaje.' },
  { t2: 'Recursos audiovisuales', c: R, t: C, ilus: 'audiovisual', p: 'Producciones que integran imagen, sonido y narrativa para comunicar contenidos y enriquecer experiencias formativas.' },
  { t2: 'Recursos interactivos', c: K, t: V, ilus: 'interactivo', p: 'Recursos que permiten explorar, practicar, tomar decisiones o interactuar con contenidos de manera activa.' },
];

// El flujo es de la propuesta; las frases son MUESTRA, a validar con el equipo.
export const FLUJO = [
  { t: 'Necesidad educativa', lleno: 0.0, c: K, p: 'Lo que tus estudiantes necesitan comprender o practicar.' },
  { t: 'Definición del recurso', lleno: 0.3, c: K, p: 'Elegimos contigo el formato más pertinente.' },
  { t: 'Diseño y desarrollo', lleno: 0.55, c: R, p: 'Le damos forma: guion, diseño y producción.' },
  { t: 'Revisión', lleno: 0.8, c: R, p: 'Revisas el recurso y ajustamos lo necesario.' },
  { t: 'Recurso final', lleno: 1, c: R, p: 'Listo para llevarlo a tu experiencia de aprendizaje.' },
];

export const RUTAS_CD = [
  { t: 'Inteligencia artificial', p: 'Explora criterios, posibilidades y recursos para incorporar la IA con intención pedagógica.', a: 'Explorar IA', href: 'recursos.html#inteligencia-artificial' },
  { t: 'Herramientas institucionales', p: 'Encuentra orientaciones para aprovechar las herramientas digitales disponibles en la Universidad.', a: 'Ver herramientas', href: 'recursos.html#herramientas-digitales' },
  { t: 'Competencias digitales', p: 'Fortalece conocimientos y habilidades para desenvolverte en entornos educativos mediados por tecnología.', a: 'Ver formación', href: 'formacion.html' },
  { t: 'Enseñanza híbrida y digital', p: 'Encuentra orientaciones para integrar recursos, interacción y tecnología en experiencias híbridas o digitales.', a: 'Explorar orientaciones', href: 'recursos.html#multimodalidad' },
];

// Las iniciativas son de la propuesta; las descripciones son MUESTRA.
export const APRENDE_CD = [
  { t: 'Café Digital UAO', p: 'Conversaciones entre colegas sobre prácticas digitales que puedes probar en tu próxima clase.' },
  { t: 'Microcapacitaciones', p: 'Sesiones breves para resolver una necesidad concreta con una herramienta o una práctica.' },
  { t: 'Rutas formativas', p: 'Trayectorias más largas para desarrollar una competencia y llevarla a tu práctica.' },
];

// MUESTRA: confirmar las herramientas institucionales
export const HERRAMIENTAS = [
  { i: 'aula', t: 'Aula virtual', p: 'Organiza tu curso, publica materiales y comunica fechas importantes.' },
  { i: 'camara', t: 'Videoconferencia', p: 'Mantén la interacción durante una sesión en línea.' },
  { i: 'evaluacion', t: 'Evaluación en línea', p: 'Configura rúbricas y retroalimentación para tus estudiantes.' },
];

const persona = (rol, frase, c, t) => ({ nombre: 'Nombre y apellido', rol, frase, c, t });
// MUESTRA: nombres, fotografías, roles y frases los entrega el CEEDi
export const EQUIPO = {
  experiencias: [
    persona('Diseño instruccional', 'Te acompaña a estructurar cursos y módulos a partir de lo que esperas que tus estudiantes aprendan.', R, C),
    persona('Diseño de experiencias', 'Revisa contigo actividades y metodologías para favorecer la participación activa.', P, V),
    persona('Asesoría en modalidades', 'Explora contigo alternativas presenciales, virtuales, híbridas o multimodales.', V, C),
  ],
  recursos: [
    persona('Diseño gráfico educativo', 'Organiza tus contenidos en materiales visuales claros.', V, C),
    persona('Producción audiovisual', 'Convierte tus ideas en piezas con imagen, sonido y narrativa.', R, C),
    persona('Desarrollo interactivo', 'Crea recursos para explorar, practicar y tomar decisiones.', P, V),
  ],
  cultura: [
    persona('Apropiación tecnológica', 'Te orienta en el uso de las herramientas institucionales.', P, V),
    persona('IA en educación', 'Explora contigo criterios para usar la IA con intención pedagógica.', V, C),
    persona('Formación docente', 'Coordina talleres, cursos y espacios como Café Digital UAO.', R, C),
  ],
};

const rec = (titulo, tipo, texto) => {
  const m = { Guía: ['guia', R, C], Plantilla: ['plantilla', V, C], Orientación: ['orientacion', P, V] }[tipo];
  return { titulo, tipo, texto, icono: m[0], m: m[1], mi: m[2], href: '#' };
};
// Las categorías son de la propuesta; los recursos son MUESTRA.
export const BANCO = [
  { id: 'diseno-y-ensenanza', nombre: 'Diseño y enseñanza', foto: 'profesor-en-aula', items: [
    rec('Cómo redactar resultados de aprendizaje', 'Guía', 'Pasos y ejemplos para expresar lo que esperas que tus estudiantes aprendan.'),
    rec('Plantilla para planear una sesión', 'Plantilla', 'Organiza propósito, actividades, tiempos y evaluación en una sola página.'),
    rec('Actividades para una participación activa', 'Orientación', 'Ideas para que tus estudiantes discutan, practiquen y tomen decisiones en clase.'),
    rec('Rúbricas que orientan el aprendizaje', 'Guía', 'Cómo construir criterios claros y compartirlos con tus estudiantes.'),
  ] },
  { id: 'recursos-educativos-digitales', nombre: 'Recursos educativos digitales', foto: 'diseno-en-equipo', items: [
    rec('¿Qué formato necesita tu contenido?', 'Guía', 'Criterios para elegir entre un recurso gráfico, audiovisual o interactivo.'),
    rec('Guion para un video educativo', 'Plantilla', 'Estructura tu mensaje antes de grabar: idea central, imagen y sonido.'),
  ] },
  { id: 'inteligencia-artificial', nombre: 'Inteligencia artificial', foto: 'tablero', items: [
    rec('Criterios para usar IA con intención pedagógica', 'Orientación', 'Preguntas para decidir cuándo la IA aporta al aprendizaje y cuándo no.'),
    rec('Evaluar cuando tus estudiantes usan IA', 'Guía', 'Alternativas para valorar el proceso y no solo el producto final.'),
  ] },
  { id: 'herramientas-digitales', nombre: 'Herramientas digitales', foto: 'sala-de-computo', items: [
    rec('Primeros pasos en el aula virtual', 'Guía', 'Organiza tu curso, publica materiales y comunica fechas importantes.'),
    rec('Clases por videoconferencia', 'Orientación', 'Recomendaciones para mantener la interacción durante una sesión en línea.'),
  ] },
  { id: 'multimodalidad', nombre: 'Multimodalidad', foto: 'auditorio', items: [
    rec('Plantilla para planear una sesión híbrida', 'Plantilla', 'Coordina lo que ocurre en el salón y lo que ocurre en línea.'),
    rec('Presencial, virtual, híbrida o multimodal', 'Guía', 'Diferencias entre modalidades y cuándo conviene cada una.'),
  ] },
];

// MUESTRA
export const RUTAS_F = [
  { t: 'Diseño de experiencias de aprendizaje', p: 'Estructurarás un curso a partir de resultados de aprendizaje, actividades y evaluación.' },
  { t: 'IA para la docencia', p: 'Desarrollarás criterios para incorporar inteligencia artificial con intención pedagógica.' },
  { t: 'Enseñanza híbrida y digital', p: 'Integrarás recursos, interacción y tecnología en experiencias híbridas o digitales.' },
];

// MUESTRA
export const AGENDA = [
  ['19 nov 2026', 'Café Digital UAO: IA en la preparación de clases', 'Presencial'],
  ['26 nov 2026', 'Taller: diseña una actividad para modalidad híbrida', 'Híbrida'],
  ['3 dic 2026', 'Microcapacitación: evaluación en el aula virtual', 'Virtual'],
  ['21 ene 2027', 'Café Digital UAO: herramientas para iniciar el semestre', 'Presencial'],
  ['28 ene 2027', 'Taller: rúbricas y retroalimentación', 'Virtual'],
  ['11 feb 2027', 'Microcapacitación: videoconferencia con interacción', 'Virtual'],
];

// Pendiente: la propuesta pide publicar solo canales vigentes y confirmados.
export const CONTACTO = [
  { i: 'correo', t: 'Correo', p: 'Por confirmar' },
  { i: 'ubicacion', t: 'Ubicación', p: 'Por confirmar' },
  { i: 'reloj', t: 'Horario de atención', p: 'Por confirmar' },
];

export const OPCIONES = [
  { v: 'disenar', foto: 'profesor-en-aula', t: 'Quiero diseñar o mejorar una experiencia de aprendizaje.' },
  { v: 'crear', foto: 'diseno-en-equipo', t: 'Quiero desarrollar un recurso educativo.' },
  { v: 'fortalecer', foto: 'sala-de-computo', t: 'Quiero fortalecer mi práctica digital.' },
  { v: 'otra', foto: 'estudiantes-campus', t: 'Tengo otra necesidad / No estoy seguro.' },
];
