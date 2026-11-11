import {
  ApprenticeProfile,
  InstructorProfile,
  InductionChecklistItem,
  NormativeArticle,
  CaseStudy,
  QuizQuestion,
  Flashcard,
  TrackedApprentice
} from '../types';

export const DEFAULT_INSTRUCTOR: InstructorProfile = {
  id: 'inst-001',
  name: 'Ing. Carlos Eduardo Martínez',
  roleTitle: 'Instructor Líder y Coordinador de Inducción',
  documentNumber: '14892301',
  email: 'cmartinez@sena.edu.co',
  phone: '312 456 7890',
  assignedFicha: '2834912',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
  regional: 'Regional Valle del Cauca',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
};

export const AVAILABLE_APPRENTICES: ApprenticeProfile[] = [
  {
    id: 'app-001',
    name: 'Alejandra Gómez Morales',
    documentType: 'CC',
    documentNumber: '1023847562',
    email: 'agomez.aprendiz@sena.edu.co',
    phone: '315 892 4103',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  },
  {
    id: 'app-002',
    name: 'Brayan Steven Ortiz',
    documentType: 'CC',
    documentNumber: '1006543210',
    email: 'bortiz.aprendiz@sena.edu.co',
    phone: '318 432 9901',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  },
  {
    id: 'app-003',
    name: 'Camila Andrea Restrepo',
    documentType: 'TI',
    documentNumber: '1112456789',
    email: 'crestrepo.aprendiz@sena.edu.co',
    phone: '311 776 5432',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  },
  {
    id: 'app-004',
    name: 'David Fernando Lozano',
    documentType: 'CC',
    documentNumber: '1088765432',
    email: 'dlozano.aprendiz@sena.edu.co',
    phone: '320 891 2234',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  },
  {
    id: 'app-005',
    name: 'Valentina Puentes Silva',
    documentType: 'CC',
    documentNumber: '1014998822',
    email: 'vpuentes.aprendiz@sena.edu.co',
    phone: '316 234 8876',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regional: 'Regional Valle del Cauca',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    enrollmentDate: 'Febrero 2026',
  },
];

export const INITIAL_APPRENTICE: ApprenticeProfile = AVAILABLE_APPRENTICES[0];

export const INITIAL_CHECKLIST: InductionChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'institucional',
    title: 'Conocer la Misión, Visión y Valores SENA',
    description: 'Comprender los principios éticos y la razón de ser de la entidad más querida por los colombianos.',
    required: true,
    completed: true,
    completedAt: '2026-02-02'
  },
  {
    id: 'chk-2',
    category: 'institucional',
    title: 'Identificar los Símbolos Institucionales',
    description: 'Estudiar el Escudo, la Bandera, el Logotipo y la letra del Himno del SENA.',
    required: true,
    completed: true,
    completedAt: '2026-02-03'
  },
  {
    id: 'chk-3',
    category: 'normativa',
    title: 'Lectura del Nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 y modif. Acuerdo 002 de 2026)',
    description: 'Revisión minuciosa de derechos, deberes, prohibiciones y las garantías del debido proceso actualizado.',
    required: true,
    completed: true,
    completedAt: '2026-02-04'
  },
  {
    id: 'chk-4',
    category: 'normativa',
    title: 'Comprender las Faltas y Medidas Formativas',
    description: 'Diferenciar entre faltas leves, graves, gravísimas, planes de mejoramiento y sanciones.',
    required: true,
    completed: false
  },
  {
    id: 'chk-5',
    category: 'normativa',
    title: 'Aprobar el Cuestionario de Normativa y Reglamento',
    description: 'Obtener un puntaje mínimo del 80% en la evaluación interactiva de normatividad.',
    required: true,
    completed: false
  },
  {
    id: 'chk-6',
    category: 'normativa',
    title: 'Participar en el Simulador de Comité de Evaluación',
    description: 'Resolver casos reales de dilemas éticos y disciplinarios como miembro del comité.',
    required: true,
    completed: false
  },
  {
    id: 'chk-7',
    category: 'plataformas',
    title: 'Activación de Correo @sena.edu.co y Territorium / Zajuna',
    description: 'Configurar credenciales institucionales, LMS y SOFIA Plus.',
    required: true,
    completed: true,
    completedAt: '2026-02-01'
  },
  {
    id: 'chk-8',
    category: 'bienestar',
    title: 'Conocer los Servicios de Bienestar al Aprendiz',
    description: 'Rutas de salud, deporte, arte, cultura, apoyos de sostenimiento y liderazgo.',
    required: false,
    completed: false
  },
  {
    id: 'chk-9',
    category: 'bienestar',
    title: 'Inducción de Etapa Productiva y Alternativas',
    description: 'Contrato de aprendizaje, proyecto productivo, pasantía, monitoría y vínculo laboral.',
    required: true,
    completed: false
  },
  {
    id: 'chk-10',
    category: 'institucional',
    title: 'Generar la Constancia Oficial de Culminación de Inducción',
    description: 'Descargar el certificado con código QR tras completar todos los requisitos formativos.',
    required: true,
    completed: false
  }
];

export const INSTITUTIONAL_INFO = {
  foundation: {
    year: '1957',
    date: '21 de junio de 1957',
    founder: 'Rodolfo Martínez Tono',
    decree: 'Decreto Ley 118 de 1957',
    context: 'Nació durante el gobierno de la Junta Militar con el respaldo de organizaciones sindicales y empresariales para brindar formación técnica integral a trabajadores colombianos.'
  },
  mision: 'El Servicio Nacional de Aprendizaje (SENA) está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el 2026, el SENA se consolidará como una entidad referente de formación integral para el trabajo y el desarrollo humano, reconocida a nivel nacional e internacional por su aporte a la productividad, la innovación social, la transición energética y la equidad.',
  valores: [
    { name: 'Honestidad', description: 'Actuamos con coherencia, transparencia, sinceridad y verdad en todo momento.' },
    { name: 'Respeto', description: 'Reconocemos, valoramos y tratamos con dignidad a todas las personas y sus diferencias.' },
    { name: 'Compromiso', description: 'Asumimos con pasión y responsabilidad nuestra formación y el servicio al país.' },
    { name: 'Diligencia', description: 'Cumplimos las labores con prontitud, esmero, eficacia y optimización de recursos.' },
    { name: 'Justicia', description: 'Garantizamos igualdad, equidad y el debido proceso en cada circunstancia.' },
    { name: 'Solidaridad', description: 'Apoyamos a nuestros compañeros y a la comunidad en situaciones de dificultad.' },
    { name: 'Lealtad', description: 'Fieles a los principios institucionales y a los acuerdos formativos contraídos.' }
  ],
  simbolos: {
    escudo: {
      name: 'El Escudo del SENA',
      imageUrl: 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png',
      description: 'El escudo del SENA representa en su composición los tres grandes sectores económicos de la economía nacional en los que forma la institución.',
      elements: [
        {
          name: 'La Rueda Dentada (Piñón)',
          sector: 'Sector Industria y Construcción',
          description: 'Simboliza el trabajo mecánico, la producción, la manufactura, la ingeniería y el desarrollo industrial del país.'
        },
        {
          name: 'El Caduceo de Mercurio',
          sector: 'Sector Comercio y Servicios',
          description: 'Representa las actividades mercantiles, logísticas, contables, turísticas, financieras y la gestión de servicios.'
        },
        {
          name: 'La Rama de Café',
          sector: 'Sector Agropecuario',
          description: 'Simboliza el campo colombiano, la producción agrícola, pecuaria, forestal y agroindustrial nacional.'
        }
      ]
    },
    bandera: {
      name: 'La Bandera del SENA',
      description: 'Fondo totalmente blanco con el escudo institucional del SENA en el centro.',
      significado: 'El color blanco simboliza la paz, la tranquilidad, la libertad y la transparencia de las acciones institucionales. En el centro descansa el escudo en tonos verde institucional que proyecta la esperanza y vitalidad.'
    },
    logotipo: {
      name: 'El Logotipo / Isotipo',
      description: 'Creado a comienzos de la década de 1970, el logotipo muestra una figura humana geométrica en movimiento.',
      significado: 'Representa al aprendiz o trabajador colombiano que avanza con paso firme hacia el horizonte y el futuro, construyendo su propio camino sobre sus propios pasos.'
    },
    himno: {
      titulo: 'Himno del SENA',
      youtubeUrl: 'https://youtu.be/PvwEJWhSjYE',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/PvwEJWhSjYE',
      autores: {
        letra: 'Jesús Briceño S. y Luis Alfredo Sarmiento',
        musica: 'Daniel Marlez'
      },
      estrofas: [
        {
          tipo: 'CORO',
          lineas: [
            'Estudiantes del SENA, ¡adelante!',
            'Por Colombia luchad con amor,',
            'Con el ánimo noble y radiante,',
            'Transformemos el mundo en mejor.'
          ]
        },
        {
          tipo: 'I ESTROFA',
          lineas: [
            'De la patria el futuro destino,',
            'En las manos del joven está,',
            'El trabajo es seguro camino,',
            'Que a la inmensa grandeza nos da.'
          ]
        },
        {
          tipo: 'II ESTROFA',
          lineas: [
            'En la forja del SENA se forman,',
            'Hombres libres que saben triunfar,',
            'Con la ciencia y la técnica adoran,',
            'Al Creador y a la patria en su altar.'
          ]
        },
        {
          tipo: 'III ESTROFA',
          lineas: [
            'Hoy la patria nos llama a la lucha,',
            'Del trabajo que engendra la paz,',
            'Nuestra voz en la historia se escucha,',
            'Con un grito triunfante y audaz.'
          ]
        }
      ]
    }
  }
};

export const NORMATIVE_ARTICLES: NormativeArticle[] = [
  {
    id: 'norm-1',
    category: 'derechos',
    title: 'Recibir Formación Profesional Integral (FPI)',
    articleRef: 'Acuerdo 009 de 2024 - Capítulo de Derechos',
    summary: 'Derecho a recibir formación de calidad en ambientes presenciales, virtuales y bimodales.',
    details: 'El nuevo reglamento garantiza al aprendiz acceso a formación integral gratuita, instructores calificados, ambientes pedagógicos adecuados, acceso a plataformas digitales (Zajuna LMS, bibliotecas virtuales) y acompañamiento formativo y socioemocional.',
    tags: ['Calidad', 'FPI', 'Zajuna', 'Ambientes'],
    practicalExample: 'Disponer de conectividad, laboratorios tecnológicos y talleres en las jornadas concertadas.'
  },
  {
    id: 'norm-2',
    category: 'derechos',
    title: 'Identificación Institucional (Carné Físico y Digital)',
    articleRef: 'Acuerdo 009 de 2024 - Derechos del Aprendiz',
    summary: 'Derecho a portar el carné oficial que acredita la calidad de aprendiz activo del SENA.',
    details: 'El SENA expide la credencial institucional física o digital con código QR seguro para acceder a todas las sedes del país, bibliotecas, rutas de transporte en convenio y bienestar al aprendiz.',
    tags: ['Carné Digital', 'Identificación', 'Seguridad'],
    practicalExample: 'Presentar el carné físico o la credencial digital desde el móvil en los torniquetes de acceso institucional.'
  },
  {
    id: 'norm-3',
    category: 'derechos',
    title: 'Garantía del Debido Proceso y Defensa (Art. 48)',
    articleRef: 'Acuerdo 009 de 2024 modificado por Acuerdo 002 de 2026 - Art. 48',
    summary: 'Blindaje procesal: Notificación formal digital, término perentorio de descargos y contradicción de pruebas.',
    details: 'El Acuerdo 002 de 2026 fortaleció las garantías procesales del Artículo 48 del Acuerdo 009 de 2024. El aprendiz debe ser citado formalmente mediante su correo institucional @sena.edu.co con la descripción clara de los hechos imputados, cuenta con 3 días hábiles perentorios para rendir descargos y aportar pruebas ante el Comité de Evaluación y Seguimiento, y tiene derecho al recurso de reposición.',
    tags: ['Acuerdo 002 de 2026', 'Artículo 48', 'Debido Proceso', 'Descargos'],
    practicalExample: 'Recibir citación electrónica oficial con 3 días hábiles para adjuntar testimonios, documentos o pruebas técnicas ante el comité.'
  },
  {
    id: 'norm-4',
    category: 'deberes',
    title: 'Cumplimiento Formativo y Entrega de Evidencias',
    articleRef: 'Acuerdo 009 de 2024 - Capítulo de Deberes',
    summary: 'Participar activamente y subir oportunamente las evidencias en el LMS oficial (Zajuna).',
    details: 'Asistir con puntualidad a las sesiones formativas presenciales o sincronías virtuales, desarrollar las guías de aprendizaje y reportar oportunamente cualquier novedad que impida la entrega de evidencias.',
    tags: ['Puntualidad', 'Evidencias', 'Zajuna LMS'],
    practicalExample: 'Cargar el informe de desarrollo de software antes de la medianoche del día pactado en el plan concertado.'
  },
  {
    id: 'norm-5',
    category: 'deberes',
    title: 'Portar el Carné en Lugar Visible y Cuidar la Identidad',
    articleRef: 'Acuerdo 009 de 2024 - Deberes Institucionales',
    summary: 'Obligación de mantener visible la identificación dentro de cualquier sede o ambiente de aprendizaje.',
    details: 'Portar el carné en el pecho durante toda la permanencia en el centro de formación, empresas y salidas pedagógicas para garantizar la seguridad comunitaria.',
    tags: ['Carné Visible', 'Seguridad', 'Identidad SENA'],
    practicalExample: 'Llevar el carné con el cordón institucional verde en talleres, laboratorios y áreas comunes.'
  },
  {
    id: 'norm-6',
    category: 'deberes',
    title: 'Cuidado de Bienes, Equipos y Ciberseguridad',
    articleRef: 'Acuerdo 009 de 2024 - Deberes con los Bienes Públicos',
    summary: 'Uso ético y responsable de maquinaria, software con licencia e infraestructura institucional.',
    details: 'Proteger las instalaciones físicas y plataformas virtuales. Se prohíbe el uso no autorizado de software malicioso o alteración de configuraciones informáticas de las salas.',
    tags: ['Ciberseguridad', 'Equipos', 'Bienes Públicos'],
    practicalExample: 'Cerrar la sesión de usuario en las computadoras del centro y dejar el taller en perfecto orden y aseo.'
  },
  {
    id: 'norm-7',
    category: 'prohibiciones',
    title: 'Plagio, Suplantación y Uso Indebido de Inteligencia Artificial',
    articleRef: 'Acuerdo 009 de 2024 - Prohibiciones Éticas y Académicas',
    summary: 'Falta académica y disciplinaria grave: apropiarse de trabajos ajenos o usar IA sin atribución ética.',
    details: 'El nuevo reglamento sanciona expresamente el fraude en evaluaciones, la suplantación de identidad en plataformas digitales y la presentación de código, textos o diseños generados por terceros o IA sin la debida citación y validación de autoría.',
    tags: ['Plagio', 'Ética Digital', 'IA Responsable', 'Falta Grave'],
    practicalExample: 'Presentar un algoritmo descargado o generado con IA haciéndolo pasar como elaboración propia sin referenciar fuentes.'
  },
  {
    id: 'norm-8',
    category: 'prohibiciones',
    title: 'Sustancias Psicoactivas, Porte de Armas y Violencia',
    articleRef: 'Acuerdo 009 de 2024 - Faltas Gravísimas a la Convivencia',
    summary: 'Falta gravísima: comercializar o consumir licor/drogas, portar armas o intimidar a miembros de la comunidad.',
    details: 'Constituye causal de proceso disciplinario prioritario ante el Comité de Evaluación y Seguimiento, acarreando sanción severa y cancelación inmediata de la matrícula conforme a la ley.',
    tags: ['Falta Gravísima', 'Convivencia', 'Seguridad Integral'],
    practicalExample: 'Ingresar con bebidas alcohólicas o participar en actos de agresión física o ciberacoso hacia compañeros.'
  },
  {
    id: 'norm-9',
    category: 'novedades',
    title: 'Incumplimiento Injustificado y Causal de Deserción',
    articleRef: 'Acuerdo 009 de 2024 - Régimen de Novedades y Deserción',
    summary: 'Diferenciación entre incumplimiento justificado e injustificado, y causal de 3 días consecutivos.',
    details: 'El Acuerdo 009 de 2024 clarifica taxativamente la deserción: a) Inasistencia injustificada durante tres (3) días hábiles continuos; b) No reincorporación tras finalizar el aplazamiento; c) No inicio de la alternativa de etapa productiva en los plazos fijados por el centro.',
    tags: ['Deserción', 'Incumplimientos', '3 Días Hábiles'],
    practicalExample: 'Faltar sin justificación médica de EPS por 3 días hábiles consecutivos genera reporte de presunta deserción.'
  },
  {
    id: 'norm-10',
    category: 'medidas',
    title: 'Medidas Formativas (Pedagógicas y de Acompañamiento)',
    articleRef: 'Acuerdo 009 de 2024 - Capítulo de Medidas Formativas',
    summary: 'Llamado de atención verbal y Plan de Mejoramiento concertado con el aprendiz.',
    details: 'Tienen carácter netamente formativo y pedagógico. El plan de mejoramiento establece compromisos concretos, entregables y fechas para nivelar deficiencias académicas o de convivencia antes de pasar a instancias sancionatorias.',
    tags: ['Pedagogía', 'Plan de Mejoramiento', 'Formativo'],
    practicalExample: 'Concertar con el instructor un cronograma de 5 días hábiles para entregar evidencias formativas pendientes.'
  },
  {
    id: 'norm-11',
    category: 'sanciones',
    title: 'Régimen Sancionatorio y Cancelación de Matrícula',
    articleRef: 'Acuerdo 009 de 2024 - Capítulo de Sanciones Disciplinarias',
    summary: 'Llamado de atención escrito a hoja de vida, condicionamiento y cancelación con inhabilidad.',
    details: 'Son impuestas únicamente mediante acto administrativo motivado por el Subdirector de Centro, previo concepto motivado del Comité de Evaluación y Seguimiento. La cancelación genera inhabilidad de 6 meses a 2 años en el sistema SOFIA Plus / Zajuna.',
    tags: ['Sanciones', 'Condicionamiento', 'Cancelación', 'Inhabilidad'],
    practicalExample: 'La cancelación de matrícula inhabilita temporalmente al aprendiz para participar en nuevas convocatorias formativas del SENA.'
  },
  {
    id: 'norm-12',
    category: 'medidas',
    title: 'Comité de Evaluación y Seguimiento (Reforma Acuerdo 002 de 2026)',
    articleRef: 'Acuerdo 009 de 2024 modificado por Acuerdo 002 de 2026 - Art. 48',
    summary: 'Instancia colegiada y participativa que analiza casos y recomienda medidas garantistas.',
    details: 'Integrado por la coordinación académica, voceros de los aprendices, instructores y bienestar. Analiza de manera objetiva los descargos y pruebas aportadas por el aprendiz antes de emitir recomendación a la Subdirección.',
    tags: ['Acuerdo 002 de 2026', 'Comité de Evaluación', 'Representación Aprendiz'],
    practicalExample: 'El representante de los aprendices asiste con voz y voto a la sesión del comité para velar por los derechos del estudiante.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'El caso del carné prestado en el acceso',
    protagonist: 'Julián (Aprendiz ADSO)',
    scenario: 'Julián olvidó su carné institucional en casa. Para ingresar a tiempo a la sesión presencial de bases de datos, su compañero Camilo le prestó su carné para que lo presentara ante el guarda de seguridad en el torniquete. El guardia notó que la foto no correspondía.',
    category: 'disciplinaria',
    regulationRef: 'Acuerdo 009 de 2024 - Prohibiciones e Identidad Institucional',
    options: [
      {
        text: 'Es un favor entre compañeros, solo deben dejarlo entrar y no amerita ninguna acción formativa.',
        isCorrect: false,
        feedback: 'Incorrecto. Prestar documentos de identificación institucional es una falta disciplinaria que compromete la seguridad del centro.'
      },
      {
        text: 'Constituye falta disciplinaria: suplantación y uso indebido del carné institucional. Corresponde llamado de atención y análisis de antecedentes.',
        isCorrect: true,
        severity: 'Grave',
        measure: 'Llamado de atención escrito / Plan de mejoramiento disciplinario',
        feedback: '¡Correcto! El carné del SENA es personal e intransferible. El uso indebido o suplantación es una falta disciplinaria sancionable según el nuevo reglamento Acuerdo 009 de 2024.'
      },
      {
        text: 'Amerita cancelación inmediata de la matrícula sin derecho a descargos ni audiencia.',
        isCorrect: false,
        feedback: 'Incorrecto. Todo proceso disciplinario en el SENA debe respetar el Debido Proceso constitucional y el Art. 48 reformado por el Acuerdo 002 de 2026.'
      }
    ],
    lessonLearned: 'El carné institucional es un documento oficial, personal e intransferible que garantiza la seguridad de toda la comunidad del centro.'
  },
  {
    id: 'case-2',
    title: 'Ausencia por calamidad médica sin soporte de EPS',
    protagonist: 'Marcela (Aprendiz Gestión Administrativa)',
    scenario: 'Marcela tuvo un cuadro fuerte de gastroenteritis y no pudo asistir a clases durante 4 días seguidos. Al regresar al quinto día, el instructor le informó que estaba en reporte de presunta deserción. Marcela trajo una nota escrita a mano por la farmacia de su barrio.',
    category: 'tramite',
    regulationRef: 'Acuerdo 009 de 2024 - Incumplimientos y Deserción',
    options: [
      {
        text: 'La nota de la farmacia es válida siempre y cuando esté firmada por el boticario.',
        isCorrect: false,
        feedback: 'Incorrecto. Las incapacidades médicas válidas deben ser expedidas o transcritas por la EPS o entidad de salud reconocida.'
      },
      {
        text: 'Debe solicitar cita prioritaria en su EPS para la respectiva transcripción médica y presentarla en los 3 días hábiles siguientes ante la coordinación.',
        isCorrect: true,
        measure: 'Justificación formal y plan de entrega de evidencias',
        feedback: '¡Excelente! Conforme al Acuerdo 009 de 2024, el aprendiz tiene el deber de justificar inasistencias dentro de los 3 días hábiles siguientes con certificado médico formal de su EPS o soporte oficial comprobable.'
      },
      {
        text: 'Ya no puede hacer nada porque pasaron más de 3 días y queda automáticamente expulsada del SENA de por vida.',
        isCorrect: false,
        feedback: 'Incorrecto. Antes de la declaratoria definitiva de deserción, el centro envía citación formal garantizando el debido proceso del Art. 48.'
      }
    ],
    lessonLearned: 'Siempre debes notificar oportunamente a tus instructores y aportar incapacidades de EPS en los plazos legales para evitar procesos de deserción.'
  },
  {
    id: 'case-3',
    title: 'El proyecto final clonado de un repositorio público',
    protagonist: 'Andrés y Felipe (Aprendices Multimedia)',
    scenario: 'Andrés y Felipe debían entregar una animación y sitio web interactivo como evidencia final de fase. Al evaluar la evidencia, el instructor evidenció que descargaron una plantilla comercial con derechos reservados y borraron el nombre del autor original poniendo sus nombres.',
    category: 'academica',
    regulationRef: 'Acuerdo 009 de 2024 - Prohibición de Plagio y Derechos de Autor',
    options: [
      {
        text: 'Como está en internet es de uso público y no constituye falta alguna.',
        isCorrect: false,
        feedback: 'Incorrecto. El código y contenido en internet cuenta con licencias y derechos de autor morales y patrimoniales que deben respetarse.'
      },
      {
        text: 'Constituye falta académica y disciplinaria grave por plagio y violación de propiedad intelectual. Amerita citación a Comité de Evaluación.',
        isCorrect: true,
        severity: 'Grave',
        measure: 'Comité de Evaluación (Art. 48), Plan de mejoramiento y llamado formal',
        feedback: '¡Muy bien! El plagio vulnera la ética formativa del SENA y constituye una falta académica y disciplinaria grave según el Acuerdo 009 de 2024.'
      },
      {
        text: 'Se les califica con 100% pero se les pide que le den las gracias al creador original en Twitter.',
        isCorrect: false,
        feedback: 'Incorrecto. No se puede certificar una competencia técnica plagiada.'
      }
    ],
    lessonLearned: 'La honestidad intelectual es un valor fundacional del SENA. Siempre cita fuentes y desarrolla tus propias evidencias de aprendizaje.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    moduleId: 'institucional',
    question: '¿En qué año fue fundado el SENA y quién fue su fundador principal?',
    options: [
      'En 1970 por el presidente Carlos Lleras Restrepo.',
      'En 1957 por Rodolfo Martínez Tono mediante Decreto 118.',
      'En 1948 por Jorge Eliécer Gaitán.',
      'En 1982 por Belisario Betancur.'
    ],
    correctIndex: 1,
    explanation: 'El SENA fue creado el 21 de junio de 1957 por iniciativa del economista y cartagenero Rodolfo Martínez Tono.',
    hint: 'Ocurrió a finales de la década de los 50 durante la Junta Militar.'
  },
  {
    id: 'q-2',
    moduleId: 'institucional',
    question: '¿Qué representa la Rueda Dentada (piñón) en el escudo del SENA?',
    options: [
      'El sector comercio y telecomunicaciones.',
      'El sector agropecuario y de pesca.',
      'El sector de la industria y la construcción.',
      'El engranaje del transporte público.'
    ],
    correctIndex: 2,
    explanation: 'La rueda dentada representa al sector industrial y de la construcción, simbolizando el trabajo productivo y la manufactura.',
    hint: 'Los piñones son el corazón de la maquinaria pesada y fábricas.'
  },
  {
    id: 'q-3',
    moduleId: 'institucional',
    question: '¿Cuál es el significado del color blanco en la bandera institucional del SENA?',
    options: [
      'La nieve de los nevados colombianos.',
      'La paz, la tranquilidad, la libertad y la transparencia.',
      'La neutralidad política únicamente.',
      'La modernidad de la infraestructura tecnológica.'
    ],
    correctIndex: 1,
    explanation: 'El fondo blanco representa la paz, la tranquilidad y la libertad, sobre el cual descansa el escudo que convoca al progreso nacional.',
    hint: 'Es el color universal asociado con la paz y la rectitud ética.'
  },
  {
    id: 'q-4',
    moduleId: 'normativa',
    question: '¿Cuál es el Reglamento del Aprendiz actualmente vigente en el SENA?',
    options: [
      'El anterior Acuerdo 007 de 2012 (ya derogado).',
      'El Acuerdo 009 de 2024 (actualizado por el Acuerdo 002 de 2026).',
      'El Decreto 2420 de 2015.',
      'La Resolución 001 de 1957.'
    ],
    correctIndex: 1,
    explanation: 'El Consejo Directivo Nacional adoptó el nuevo Reglamento del Aprendiz mediante el Acuerdo 009 de 2024 (derogando el Acuerdo 007 de 2012), y blindó las garantías procesales del Artículo 48 mediante el Acuerdo 002 de 2026.',
    hint: 'Es la normativa de 2024 con la reforma procesal garantista de 2026.'
  },
  {
    id: 'q-5',
    moduleId: 'normativa',
    question: '¿Cuántos días de inasistencia consecutiva injustificada causan la presunción de deserción?',
    options: [
      '1 día de inasistencia.',
      '3 días hábiles consecutivos.',
      '15 días calendario.',
      '30 días lectivos.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 009 de 2024 establece que la inasistencia injustificada durante tres (3) días hábiles consecutivos configura causal de deserción de la formación.',
    hint: 'Es un número impar menor a 5 días hábiles.'
  },
  {
    id: 'q-6',
    moduleId: 'normativa',
    question: '¿Cuál es el plazo que tiene un aprendiz para presentar la justificación médica o de fuerza mayor por inasistencia?',
    options: [
      'Al finalizar el trimestre de formación.',
      'Dentro de los 3 días hábiles siguientes a la ocurrencia del hecho.',
      'El mismo día en un plazo máximo de 1 hora.',
      'No es necesario justificar si el instructor es flexible.'
    ],
    correctIndex: 1,
    explanation: 'El aprendiz debe radicar su justificación o incapacidad de EPS dentro de los 3 días hábiles posteriores ante el instructor o coordinación.',
    hint: '3 días hábiles es el estándar del debido proceso SENA.'
  },
  {
    id: 'q-7',
    moduleId: 'normativa',
    question: '¿Cuál de las siguientes acciones constituye una FALTA GRAVÍSIMA según el reglamento?',
    options: [
      'Llegar 5 minutos tarde a una sesión de formación.',
      'Olvidar la libreta de apuntes en el casillero.',
      'Ingresar al centro con armas de fuego o comercializar estupefacientes.',
      'Hacer preguntas técnicas al instructor fuera de clase.'
    ],
    correctIndex: 2,
    explanation: 'Portar armas o comercializar/consumir sustancias psicoactivas atenta contra la vida e integridad comunitaria y es causal directa de máxima sanción.',
    hint: 'Vulnera la seguridad colectiva y la ley penal.'
  },
  {
    id: 'q-8',
    moduleId: 'normativa',
    question: '¿Cuál es el órgano colegiado encargado de analizar los casos disciplinarios y académicos antes de recomendar una sanción?',
    options: [
      'El Comité de Cafetería y Alimentos.',
      'El Comité de Evaluación y Seguimiento del Centro (Art. 48).',
      'La Policía Nacional.',
      'El Ministerio de Educación Nacional directamente.'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento está regulado en el Artículo 48 del Acuerdo 009 de 2024, reformado por el Acuerdo 002 de 2026 para garantizar la notificación formal digital, el derecho pleno a descargos y la representación de los aprendices.',
    hint: 'Regulado en el Artículo 48 del reglamento.'
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'historia',
    question: '¿Quién fundó el SENA y en qué fecha?',
    answer: 'Rodolfo Martínez Tono, el 21 de junio de 1957.',
    extraInfo: 'Fue creado mediante el Decreto Ley 118 de 1957.'
  },
  {
    id: 'fc-2',
    category: 'simbolos',
    question: '¿Qué simboliza el Caduceo en el escudo del SENA?',
    answer: 'El sector de Comercio y Servicios.',
    extraInfo: 'Representa las ramas contable, turística, comercial y administrativa.'
  },
  {
    id: 'fc-3',
    category: 'simbolos',
    question: '¿Qué representa la figura del logotipo del SENA?',
    answer: 'Un alumno/trabajador que avanza firme construyendo su camino hacia el futuro.',
    extraInfo: 'Fue rediseñado en los años 70 y es el isotipo oficial.'
  },
  {
    id: 'fc-4',
    category: 'normativa',
    question: '¿Qué es el Acuerdo 009 de 2024 y qué reformó el Acuerdo 002 de 2026?',
    answer: 'El Acuerdo 009 de 2024 es el NUEVO Reglamento del Aprendiz SENA. El Acuerdo 002 de 2026 reformó el Art. 48 fortaleciendo las garantías del Debido Proceso.',
    extraInfo: 'Derogó el anterior Acuerdo 007 de 2012 e introdujo pautas de ciberseguridad, ética en IA, entornos virtuales y descargos obligatorios.'
  },
  {
    id: 'fc-5',
    category: 'normativa',
    question: '¿Cuál es la diferencia entre falta académica y falta disciplinaria?',
    answer: 'La académica afecta los resultados de aprendizaje (evidencias, competencias); la disciplinaria afecta la convivencia, el orden y los deberes institucionales.',
    extraInfo: 'Ambas pueden dar lugar a planes de mejoramiento o sanciones.'
  },
  {
    id: 'fc-6',
    category: 'etapas',
    question: '¿Cuáles son las dos etapas del ciclo de formación en el SENA?',
    answer: 'Etapa Lectiva (adquisición de competencias en ambientes de aprendizaje) y Etapa Productiva (aplicación en el sector real).',
    extraInfo: 'La etapa productiva puede ser mediante contrato de aprendizaje, proyecto, pasantía o vínculo laboral.'
  }
];

export const MOCK_TRACKED_APPRENTICES: TrackedApprentice[] = [
  {
    id: 'trk-1',
    name: 'Alejandra Gómez Morales',
    documentNumber: '1023847562',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software',
    progressPercent: 70,
    quizScoreAverage: 92,
    inductionStatus: 'En Proceso',
    completedMilestones: 7,
    totalMilestones: 10,
    lastActive: 'Hoy, 09:30 AM',
    notes: 'Excelente participación en módulos institucionales y reglamento.'
  },
  {
    id: 'trk-2',
    name: 'Brayan Steven Ortiz',
    documentNumber: '1006543210',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software',
    progressPercent: 100,
    quizScoreAverage: 98,
    inductionStatus: 'Aprobada',
    completedMilestones: 10,
    totalMilestones: 10,
    lastActive: 'Ayer, 04:15 PM',
    notes: 'Completó todos los cuestionarios y generó certificado de inducción.'
  },
  {
    id: 'trk-3',
    name: 'Camila Andrea Restrepo',
    documentNumber: '1112456789',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software',
    progressPercent: 40,
    quizScoreAverage: 75,
    inductionStatus: 'En Proceso',
    completedMilestones: 4,
    totalMilestones: 10,
    lastActive: 'Hace 2 días',
    notes: 'Pendiente de realizar el simulador de comité y quiz de normativa.'
  },
  {
    id: 'trk-4',
    name: 'David Fernando Lozano',
    documentNumber: '1088765432',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software',
    progressPercent: 20,
    quizScoreAverage: 60,
    inductionStatus: 'En Riesgo',
    completedMilestones: 2,
    totalMilestones: 10,
    lastActive: 'Hace 4 días',
    notes: 'Alerta: inasistencias a sesiones de inducción presencial.'
  },
  {
    id: 'trk-5',
    name: 'Valentina Puentes Silva',
    documentNumber: '1014998822',
    fichaNumber: '2834912',
    programName: 'Análisis y Desarrollo de Software',
    progressPercent: 90,
    quizScoreAverage: 95,
    inductionStatus: 'En Proceso',
    completedMilestones: 9,
    totalMilestones: 10,
    lastActive: 'Hoy, 08:10 AM',
    notes: 'Solo falta descarga final de constancia de inducción.'
  }
];
