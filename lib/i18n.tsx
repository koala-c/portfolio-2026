"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "en" | "es" | "cat" | "it";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  cat: "CAT",
  it: "IT",
};

const SUPPORTED_LOCALES: Locale[] = ["en", "es", "cat", "it"];
const LOCALE_STORAGE_KEY = "portfolio-locale";

function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function mapLanguageTagToLocale(languageTag: string): Locale | null {
  const normalized = languageTag.toLowerCase();
  const base = normalized.split("-")[0]?.split("_")[0] ?? normalized;

  if (base === "ca") return "cat";
  if (base === "es") return "es";
  if (base === "it") return "it";
  if (base === "en") return "en";

  if (normalized.startsWith("ca")) return "cat";
  if (normalized.startsWith("es")) return "es";
  if (normalized.startsWith("it")) return "it";
  if (normalized.startsWith("en")) return "en";

  return null;
}

function detectLocaleFromDevice(): Locale {
  const browserLanguages = [...(navigator.languages ?? []), navigator.language].filter(Boolean);

  for (const lang of browserLanguages) {
    const mappedLocale = mapLanguageTagToLocale(lang);
    if (mappedLocale) return mappedLocale;
  }

  return "en";
}

const translations = {
  en: {
    "nav.about": "About",
    "nav.education": "Education",
    "nav.code": "Code",
    "nav.photography": "Photography",
    "nav.music": "Music",
    "nav.contact": "Contact",
    "nav.experience": "Experience",

    "hero.tagline": "Full Stack Developer / Photographer / Violinist",
    "hero.description": "A musician passionate about technology. Building mobile & web experiences, capturing moments through the lens, and making music with the violin.",
    "hero.viewWork": "View Work",
    "hero.getInTouch": "Get in Touch",
    "hero.scroll": "Scroll",
    "marquee.items": "React Native|Angular|Flutter|Ionic|JavaScript|TypeScript|.NET|PHP / Laravel|Firebase|PostgreSQL|Figma|Unity|Photography|Violin|Git / GitHub|Scrum|Docker|Kanban|Google Cloud|Java|C# / .NET|Kotlin|Python|MongoDB|NoSQL|Jira|HTML5 / CSS|First Aid|Group Facilitation|Biblical Counseling|Hermeneutics|PC Assembly|Microsoft Office|Networking|Cybersecurity|Server Administration|Web Apps|Programming|Databases|Markup Languages|Computer Systems|2D / 3D Design|Video Recording|Video Editing",

    "about.label": "About",
    "about.heading": "Code, light, and sound.",
    "about.p1": "I'm a Full Stack Developer with experience building mobile and web applications using JavaScript, React Native, Angular, Flutter, and Ionic Framework. On the backend I've worked with PHP/Laravel, .NET, GraphQL, Firebase, and PostgreSQL.",
    "about.p2": "I also design with Figma, Illustrator, and Photoshop, and I've developed videogames with Unity. I work with agile methodologies (Scrum), Git/GitHub for version control, and Jira for task management across dev, testing, and production environments.",
    "about.p3": "Beyond code, I'm a photographer and a violinist. Based in Girona, Catalonia. Currently available for development roles, photography commissions, and music collaborations.",
    "about.yearsDev": "Years in Tech",
    "about.projectsBuilt": "Projects Built",
    "about.languages": "Languages",
    "about.portrait": "Denise Evelyn Galloni portrait",
    "qualities.label": "Personal Qualities",
    "qualities.heading": "How I work",
    "qualities.description": "These strengths shape the way I collaborate, make decisions, and deliver consistent results across projects.",
    "qualities.group1": "Collaboration",
    "qualities.group2": "Execution",
    "qualities.group3": "Mindset",
    "qualities.list": "Communicative and transparent|Observant|Strong teamwork skills|Fast learner|Adaptable to change|Perfectionist mindset|Open to learning any role|Problem-solving|Critical thinking|Organization and time management|Responsibility and commitment|Proactivity and initiative|Empathy and active listening|Attention to detail|Prioritization skills|Results-oriented mindset|Autonomy|Curiosity and continuous improvement",

    "code.label": "Experience",
    "code.heading": "Professional experience",
    "code.github": "View LinkedIn",
    "code.meta": [
      { year: "2025 (7 months)", location: "Girona, Spain" },
      { year: "2024 (6 months)", location: "Schroon Lake, NY, USA" },
      { year: "2022-23 (1 year 4 months)", location: "Girona, Spain" },
      { year: "2018-21 (3 years 6 months)", location: "Girona, Spain" },
    ],
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Full Stack Developer. Built hospitality apps with Ionic/Angular, JavaScript, and React Native. Managed non-relational databases with Firebase.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Full Stack Developer. Designed the English Cafe app in Figma and developed its initial version in Flutter.",
      },
      {
        title: "Danzai Software",
        description: "Software Developer. Built hospitality apps with Ionic/Angular and .NET MAUI. Managed ERP configuration and databases.",
      },
      {
        title: "Copylowcost",
        description: "Digital printing, document scanning & editing, machine operation, hardware and software repair, POS installation and customer service.",
      },
    ],

    "photo.label": "Photography",
    "photo.heading": "Through the lens",
    "photo.description": "A curated selection of my photographic work. Click any image to view full size.",
    "photo.prev": "Prev",
    "photo.next": "Next",
    "photo.categories": {
      Landscape: "Landscape",
      Street: "Street",
      Architecture: "Architecture",
      Portrait: "Portrait",
      "Still Life": "Still Life",
    },

    "music.label": "Music",
    "music.heading": "The violin & beyond",
    "music.description": "Music has been a constant in my life. As a violinist, I explore classical repertoire and contemporary collaborations, blending acoustic warmth with creative expression.",
    "music.latestRelease": "About My Music",
    "music.albumDescription": "The violin is my instrument of expression. I'm passionate about exploring the connection between music and technology, always looking for new ways to create and share.",
    "music.listenSpotify": "More coming soon",
    "music.trackHeader": "Piece",
    "music.durationHeader": "Style",

    "contact.label": "Contact",
    "contact.heading": "Let's build something together.",
    "contact.description": "Whether you need a developer for your next project, a photographer for your brand, or a musician for your event. I'd love to hear from you.",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.locationValue": "Girona, Catalonia, Spain",
    "contact.availability": "Availability",
    "contact.availabilityValue": "Open for roles & collaborations",

    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js & Tailwind CSS",

    "education.label": "Education",
    "education.heading": "Academic background",
    "education.items": [
      {
        title: "Computer Science (Institut Rafael Campalans / Institut de Vidreres)",
        description:
          "CFGS, Web Application Development with a Virtual Reality and Web Video Games curriculum adaptation (EQF 5; UK approx.: Level 5 HTQ/HND/Foundation Degree; US approx.: Associate degree in a technical field) / 2023-2024\nCFGS, Multiplatform Application Development with a Professional Profile in Video Games and Digital Leisure (EQF 5; UK approx.: Level 5 HTQ/HND/Foundation Degree; US approx.: Associate degree in a technical field) / 2021-2023\nCFGM, Microcomputer Systems and Networks (EQF 4; UK approx.: Level 4 HNC/Level 4 Diploma; US approx.: postsecondary technical diploma or early Associate-level coursework) / 2015-2017",
      },
      {
        title: "Bible Institute (Word of Life Argentina · online mode)",
        description:
          "Theological Course (2nd and 3rd year) / 2025-2026\nBasic Course / 2020-2021",
      },
      {
        title: "Youth Activities Monitor (Escola l'Emporda)",
        description:
          "School lunch monitor / 2025-2026\nFood handling / 2025\nChild and youth leisure activities monitor / 2024",
      },
      {
        title: "Complementary Training (Non-formal courses)",
        description:
          "Category B driving license / 2021",
      },
    ],
  },

  es: {
    "nav.about": "Sobre mí",
    "nav.education": "Estudios",
    "nav.code": "Experiencia",
    "nav.photography": "Fotografía",
    "nav.music": "Música",
    "nav.contact": "Contacto",
    "nav.experience": "Experiencia",

    "hero.tagline": "Desarrolladora Full Stack / Fotógrafa / Violinista",
    "hero.description": "Una música apasionada por la tecnología. Construyo experiencias móviles y web, capturo momentos a través del objetivo y hago música con el violín.",
    "hero.viewWork": "Ver Trabajo",
    "hero.getInTouch": "Contactar",
    "hero.scroll": "Deslizar",
    "marquee.items": "React Native|Angular|Flutter|Ionic|JavaScript|TypeScript|.NET|PHP / Laravel|Firebase|PostgreSQL|Figma|Unity|Fotografía|Violín|Git / GitHub|Scrum|Docker|Kanban|Google Cloud|Java|C# / .NET|Kotlin|Python|MongoDB|NoSQL|Jira|HTML5 / CSS|Primeros auxilios|Dinamización de grupos|Aconsejamiento bíblico|Hermenéutica|Montaje de ordenadores|Microsoft Office|Redes|Ciberseguridad|Administración de servidores|Aplicaciones web|Programación|Bases de datos|Lenguajes de marcas|Sistemas informáticos|Diseño 2D / 3D|Grabación de vídeo|Edición de vídeo",

    "about.label": "Sobre mí",
    "about.heading": "Código, luz y sonido.",
    "about.p1": "Soy desarrolladora Full Stack con experiencia construyendo aplicaciones móviles y web utilizando JavaScript, React Native, Angular, Flutter e Ionic Framework. En el backend he trabajado con PHP/Laravel, .NET, GraphQL, Firebase y PostgreSQL.",
    "about.p2": "También diseño con Figma, Illustrator y Photoshop, y he desarrollado videojuegos con Unity. Trabajo con metodologías ágiles (Scrum), Git/GitHub para control de versiones y Jira para gestión de tareas en entornos de desarrollo, pruebas y producción.",
    "about.p3": "Además del código, soy fotógrafa y violinista. Radicada en Girona, Cataluña. Actualmente disponible para roles de desarrollo, encargos fotográficos y colaboraciones musicales.",
    "about.yearsDev": "Años en Tech",
    "about.projectsBuilt": "Proyectos",
    "about.languages": "Idiomas",
    "about.portrait": "Retrato de Denise Evelyn Galloni",
    "qualities.label": "Cualidades Personales",
    "qualities.heading": "Cómo trabajo",
    "qualities.description": "Estas cualidades definen mi forma de colaborar, tomar decisiones y mantener resultados consistentes en distintos proyectos.",
    "qualities.group1": "Colaboración",
    "qualities.group2": "Ejecución",
    "qualities.group3": "Mentalidad",
    "qualities.list": "Comunicativa y transparente|Observadora|Facilidad para trabajar en equipo|Aprendizaje rápido|Capacidad de adaptación a los cambios|Carácter perfeccionista|Dispuesta a aprender cualquier trabajo|Resolución de problemas|Pensamiento crítico|Organización y gestión del tiempo|Responsabilidad y compromiso|Proactividad e iniciativa|Empatía y escucha activa|Atención al detalle|Capacidad de priorización|Orientación a resultados|Autonomía|Curiosidad y mejora continua",

    "code.label": "Experiencia",
    "code.heading": "Experiencia profesional",
    "code.github": "Ver LinkedIn",
    "code.meta": [
      { year: "2025 (7 meses)", location: "Girona, España" },
      { year: "2024 (6 meses)", location: "Schroon Lake, NY, USA" },
      { year: "2022-23 (1 año 4 meses)", location: "Girona, España" },
      { year: "2018-21 (3 años 6 meses)", location: "Girona, España" },
    ],
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Desarrolladora Full Stack. Desarrollo de aplicaciones de hostelería con Ionic/Angular, JavaScript y React Native. Gestión de bases de datos no relacionales con Firebase.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Desarrolladora Full Stack. Diseño de la app English Cafe en Figma y desarrollo de la versión inicial en Flutter.",
      },
      {
        title: "Danzai Software",
        description: "Desarrolladora de Software. Desarrollo de aplicaciones de hostelería con Ionic/Angular y .NET MAUI. Configuración de ERP y gestión de bases de datos.",
      },
      {
        title: "Copylowcost",
        description: "Impresión digital, escaneo y edición de documentos, operación de máquinas, reparación de hardware y software, instalación de TPV y atención al cliente.",
      },
    ],

    "photo.label": "Fotografía",
    "photo.heading": "A través del objetivo",
    "photo.description": "Una selección de mi trabajo fotográfico. Haz clic en cualquier imagen para verla en tamaño completo.",
    "photo.prev": "Ant",
    "photo.next": "Sig",
    "photo.categories": {
      Landscape: "Paisaje",
      Street: "Calle",
      Architecture: "Arquitectura",
      Portrait: "Retrato",
      "Still Life": "Naturaleza Muerta",
    },

    "music.label": "Música",
    "music.heading": "El violín y más allá",
    "music.description": "La música ha sido una constante en mi vida. Como violinista, exploro el repertorio clásico y colaboraciones contemporáneas, mezclando calidez acústica con expresión creativa.",
    "music.latestRelease": "Sobre Mi Música",
    "music.albumDescription": "El violín es mi instrumento de expresión. Me apasiona explorar la conexión entre la música y la tecnología, siempre buscando nuevas formas de crear y compartir.",
    "music.listenSpotify": "Próximamente",
    "music.trackHeader": "Pieza",
    "music.durationHeader": "Estilo",

    "contact.label": "Contacto",
    "contact.heading": "Construyamos algo juntos.",
    "contact.description": "Ya sea que necesites una desarrolladora para tu próximo proyecto, una fotógrafa para tu marca, o una música para tu evento. Me encantaría saber de ti.",
    "contact.email": "Correo",
    "contact.location": "Ubicación",
    "contact.locationValue": "Girona, Cataluña, España",
    "contact.availability": "Disponibilidad",
    "contact.availabilityValue": "Disponible para roles y colaboraciones",

    "footer.rights": "Todos los derechos reservados.",
    "footer.builtWith": "Hecho con Next.js y Tailwind CSS",

    "education.label": "Estudios",
    "education.heading": "Formación académica",
    "education.items": [
      {
        title: "Informática (Institut Rafael Campalans / Institut de Vidreres)",
        description:
          "CFGS, Desarrollo de Aplicaciones Web con adaptación curricular de Realidad Virtual y Videojuegos Web / 2023-2024\nCFGS, Desarrollo de Aplicaciones Multiplataforma con Perfil Profesional en Videojuegos y Ocio Digital / 2021-2023\nCFGM, Sistemas Microinformáticos y Redes / 2015-2017",
      },
      {
        title: "Instituto Bíblico (Palabra de Vida Argentina · modalidad online)",
        description:
          "Curso Teológico (2º y 3º año) / 2025-2026\nCurso Básico / 2020-2021",
      },
      {
        title: "Monitora (Escola l'Empordà)",
        description:
          "Monitora de comedor / 2025-2026\nManipulación de alimentos / 2025\nMonitora de actividades de ocio infantil y juvenil / 2024",
      },
      {
        title: "Formación complementaria (Cursos no reglados)",
        description:
          "Carnet de conducir B / 2021",
      },
    ],
  },

  cat: {
    "nav.about": "Sobre mi",
    "nav.education": "Estudis",
    "nav.code": "Experiència",
    "nav.photography": "Fotografia",
    "nav.music": "Música",
    "nav.contact": "Contacte",
    "nav.experience": "Experiència",

    "hero.tagline": "Desenvolupadora Full Stack / Fotògrafa / Violinista",
    "hero.description": "Una música apassionada per la tecnologia. Construeixo experiències mòbils i web, capturo moments a través de l'objectiu i faig música amb el violí.",
    "hero.viewWork": "Veure Treball",
    "hero.getInTouch": "Contactar",
    "hero.scroll": "Desplacar",
    "marquee.items": "React Native|Angular|Flutter|Ionic|JavaScript|TypeScript|.NET|PHP / Laravel|Firebase|PostgreSQL|Figma|Unity|Fotografia|Violí|Git / GitHub|Scrum|Docker|Kanban|Google Cloud|Java|C# / .NET|Kotlin|Python|MongoDB|NoSQL|Jira|HTML5 / CSS|Primers auxilis|Dinamització de grups|Aconsegellament bíblic|Hermenèutica|Muntatge d'ordinadors|Microsoft Office|Xarxes|Ciberseguretat|Administració de servidors|Aplicacions web|Programació|Bases de dades|Llenguatges de marques|Sistemes informàtics|Disseny 2D / 3D|Gravació de vídeo|Edició de vídeo",

    "about.label": "Sobre mi",
    "about.heading": "Codi, llum i so.",
    "about.p1": "Soc desenvolupadora Full Stack amb experiència construint aplicacions mòbils i web utilitzant JavaScript, React Native, Angular, Flutter i Ionic Framework. Al backend he treballat amb PHP/Laravel, .NET, GraphQL, Firebase i PostgreSQL.",
    "about.p2": "També dissenyo amb Figma, Illustrator i Photoshop, i he desenvolupat videojocs amb Unity. Treballo amb metodologies àgils (Scrum), Git/GitHub per al control de versions i Jira per a la gestió de tasques en entorns de desenvolupament, proves i producció.",
    "about.p3": "A més del codi, soc fotògrafa i violinista. Amb base a Girona, Catalunya. Actualment disponible per a rols de desenvolupament, encàrrecs fotogràfics i col·laboracions musicals.",
    "about.yearsDev": "Anys en Tech",
    "about.projectsBuilt": "Projectes",
    "about.languages": "Idiomes",
    "about.portrait": "Retrat de Denise Evelyn Galloni",
    "qualities.label": "Qualitats Personals",
    "qualities.heading": "Com treballo",
    "qualities.description": "Aquestes qualitats defineixen la meva manera de col·laborar, prendre decisions i mantenir resultats consistents en diferents projectes.",
    "qualities.group1": "Col·laboració",
    "qualities.group2": "Execució",
    "qualities.group3": "Mentalitat",
    "qualities.list": "Comunicativa i transparent|Observadora|Facilitat per treballar en equip|Aprenentatge ràpid|Capacitat d'adaptació als canvis|Caràcter perfeccionista|Disposada a aprendre qualsevol feina|Resolució de problemes|Pensament crític|Organització i gestió del temps|Responsabilitat i compromís|Proactivitat i iniciativa|Empatia i escolta activa|Atenció al detall|Capacitat de priorització|Orientació a resultats|Autonomia|Curiositat i millora contínua",

    "code.label": "Experiència",
    "code.heading": "Experiència professional",
    "code.github": "Veure LinkedIn",
    "code.meta": [
      { year: "2025 (7 mesos)", location: "Girona, Espanya" },
      { year: "2024 (6 mesos)", location: "Schroon Lake, NY, USA" },
      { year: "2022-23 (1 any 4 mesos)", location: "Girona, Espanya" },
      { year: "2018-21 (3 anys 6 mesos)", location: "Girona, Espanya" },
    ],
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Desenvolupadora Full Stack. Desenvolupament d'aplicacions d'hostaleria amb Ionic/Angular, JavaScript i React Native. Gestió de bases de dades no relacionals amb Firebase.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Desenvolupadora Full Stack. Disseny de l'app English Cafe a Figma i desenvolupament de la versió inicial en Flutter.",
      },
      {
        title: "Danzai Software",
        description: "Desenvolupadora de Software. Desenvolupament d'aplicacions d'hostaleria amb Ionic/Angular i .NET MAUI. Configuració d'ERP i gestió de bases de dades.",
      },
      {
        title: "Copylowcost",
        description: "Impressió digital, escaneig i edició de documents, operació de màquines, reparació de hardware i software, instal·lació de TPV i atenció al client.",
      },
    ],

    "photo.label": "Fotografia",
    "photo.heading": "A través de l'objectiu",
    "photo.description": "Una selecció del meu treball fotogràfic. Fes clic a qualsevol imatge per veure-la a mida completa.",
    "photo.prev": "Ant",
    "photo.next": "Seg",
    "photo.categories": {
      Landscape: "Paisatge",
      Street: "Carrer",
      Architecture: "Arquitectura",
      Portrait: "Retrat",
      "Still Life": "Natura Morta",
    },

    "music.label": "Música",
    "music.heading": "El violí i més enllà",
    "music.description": "La música ha estat una constant a la meva vida. Com a violinista, exploro el repertori clàssic i col·laboracions contemporànies, barrejant calidesa acústica amb expressió creativa.",
    "music.latestRelease": "Sobre La Meva Música",
    "music.albumDescription": "El violí és el meu instrument d'expressió. M'apassiona explorar la connexió entre la música i la tecnologia, sempre buscant noves formes de crear i compartir.",
    "music.listenSpotify": "Properament",
    "music.trackHeader": "Peça",
    "music.durationHeader": "Estil",

    "contact.label": "Contacte",
    "contact.heading": "Construïm quelcom junts.",
    "contact.description": "Tant si necessites una desenvolupadora per al teu proper projecte, una fotògrafa per a la teva marca, o una música per al teu event. M'encantaria saber de tu.",
    "contact.email": "Correu",
    "contact.location": "Ubicació",
    "contact.locationValue": "Girona, Catalunya, Espanya",
    "contact.availability": "Disponibilitat",
    "contact.availabilityValue": "Disponible per a rols i col·laboracions",

    "footer.rights": "Tots els drets reservats.",
    "footer.builtWith": "Fet amb Next.js i Tailwind CSS",

    "education.label": "Educació",
    "education.heading": "Formació acadèmica",
    "education.items": [
      {
        title: "Informàtica (Institut Rafael Campalans / Institut de Vidreres)",
        description:
          "CFGS, Desenvolupament d'Aplicacions Web amb adaptació curricular de Realitat Virtual i Videojocs Web / 2023-2024\nCFGS, Desenvolupament d'Aplicacions Multiplataforma amb Perfil Professional en Videojocs i Oci Digital / 2021-2023\nCFGM, Sistemes Microinformàtics i Xarxes / 2015-2017",
      },
      {
        title: "Institut Bíblic (Paraula de Vida Argentina · modalitat en línia)",
        description:
          "Curs Teològic (2n i 3r any) / 2025-2026\nCurs Bàsic / 2020-2021",
      },
      {
        title: "Monitora (Escola l'Empordà)",
        description:
          "Monitora de menjador / 2025-2026\nManipulació d'aliments / 2025\nMonitora d'activitats de lleure infantil i juvenil / 2024",
      },
      {
        title: "Formació complementària (Cursos no reglats)",
        description:
          "Carnet de conduir B / 2021",
      },
    ],
  },

  it: {
    "nav.about": "Chi sono",
    "nav.education": "Studi",
    "nav.code": "Esperienza",
    "nav.photography": "Fotografia",
    "nav.music": "Musica",
    "nav.contact": "Contatti",
    "nav.experience": "Esperienza",

    "hero.tagline": "Sviluppatrice Full Stack / Fotografa / Violinista",
    "hero.description": "Una musicista appassionata di tecnologia. Costruisco esperienze mobile e web, catturo momenti attraverso l'obiettivo e faccio musica con il violino.",
    "hero.viewWork": "Vedi Lavori",
    "hero.getInTouch": "Contattami",
    "hero.scroll": "Scorri",
    "marquee.items": "React Native|Angular|Flutter|Ionic|JavaScript|TypeScript|.NET|PHP / Laravel|Firebase|PostgreSQL|Figma|Unity|Fotografia|Violino|Git / GitHub|Scrum|Docker|Kanban|Google Cloud|Java|C# / .NET|Kotlin|Python|MongoDB|NoSQL|Jira|HTML5 / CSS|Primo soccorso|Dinamizzazione dei gruppi|Consulenza biblica|Ermeneutica|Assemblaggio PC|Microsoft Office|Reti|Sicurezza informatica|Amministrazione di server|Applicazioni web|Programmazione|Basi di dati|Linguaggi di markup|Sistemi informatici|Design 2D / 3D|Registrazione video|Montaggio video",

    "about.label": "Chi sono",
    "about.heading": "Codice, luce e suono.",
    "about.p1": "Sono una sviluppatrice Full Stack con esperienza nella creazione di applicazioni mobile e web utilizzando JavaScript, React Native, Angular, Flutter e Ionic Framework. Nel backend ho lavorato con PHP/Laravel, .NET, GraphQL, Firebase e PostgreSQL.",
    "about.p2": "Progetto anche con Figma, Illustrator e Photoshop, e ho sviluppato videogiochi con Unity. Lavoro con metodologie agili (Scrum), Git/GitHub per il controllo versione e Jira per la gestione dei task in ambienti di sviluppo, test e produzione.",
    "about.p3": "Oltre al codice, sono fotografa e violinista. Con base a Girona, Catalogna, Spagna. Attualmente disponibile per ruoli di sviluppo, commissioni fotografiche e collaborazioni musicali.",
    "about.yearsDev": "Anni in Tech",
    "about.projectsBuilt": "Progetti",
    "about.languages": "Lingue",
    "about.portrait": "Ritratto di Denise Evelyn Galloni",
    "qualities.label": "Qualità Personali",
    "qualities.heading": "Come lavoro",
    "qualities.description": "Queste qualità definiscono il mio modo di collaborare, prendere decisioni e mantenere risultati costanti in progetti diversi.",
    "qualities.group1": "Collaborazione",
    "qualities.group2": "Esecuzione",
    "qualities.group3": "Mentalità",
    "qualities.list": "Comunicativa e trasparente|Osservatrice|Facilità nel lavoro di squadra|Apprendimento rapido|Capacità di adattamento ai cambiamenti|Carattere perfezionista|Disponibile a imparare qualsiasi lavoro|Problem solving|Pensiero critico|Organizzazione e gestione del tempo|Responsabilità e impegno|Proattività e iniziativa|Empatia e ascolto attivo|Attenzione ai dettagli|Capacità di prioritizzazione|Orientamento ai risultati|Autonomia|Curiosità e miglioramento continuo",

    "code.label": "Esperienza",
    "code.heading": "Esperienza professionale",
    "code.github": "Vedi LinkedIn",
    "code.meta": [
      { year: "2025 (7 mesi)", location: "Girona, Spagna" },
      { year: "2024 (6 mesi)", location: "Schroon Lake, NY, USA" },
      { year: "2022-23 (1 anno 4 mesi)", location: "Girona, Spagna" },
      { year: "2018-21 (3 anni 6 mesi)", location: "Girona, Spagna" },
    ],
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Sviluppatrice Full Stack. Sviluppo di app per la ristorazione con Ionic/Angular, JavaScript e React Native. Gestione di database non relazionali con Firebase.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Sviluppatrice Full Stack. Design dell'app English Cafe in Figma e sviluppo della versione iniziale in Flutter.",
      },
      {
        title: "Danzai Software",
        description: "Sviluppatrice Software. Sviluppo di app per la ristorazione con Ionic/Angular e .NET MAUI. Configurazione ERP e gestione database.",
      },
      {
        title: "Copylowcost",
        description: "Stampa digitale, scansione e modifica documenti, operazione macchine, riparazione hardware e software, installazione POS e servizio clienti.",
      },
    ],

    "photo.label": "Fotografia",
    "photo.heading": "Attraverso l'obiettivo",
    "photo.description": "Una selezione del mio lavoro fotografico. Clicca su qualsiasi immagine per vederla a dimensione piena.",
    "photo.prev": "Prec",
    "photo.next": "Succ",
    "photo.categories": {
      Landscape: "Paesaggio",
      Street: "Street",
      Architecture: "Architettura",
      Portrait: "Ritratto",
      "Still Life": "Natura Morta",
    },

    "music.label": "Musica",
    "music.heading": "Il violino e oltre",
    "music.description": "La musica è stata una costante nella mia vita. Come violinista, esploro il repertorio classico e collaborazioni contemporanee, fondendo calore acustico con espressione creativa.",
    "music.latestRelease": "Sulla Mia Musica",
    "music.albumDescription": "Il violino è il mio strumento di espressione. Sono appassionata nell'esplorare la connessione tra musica e tecnologia, sempre alla ricerca di nuovi modi per creare e condividere.",
    "music.listenSpotify": "Prossimamente",
    "music.trackHeader": "Brano",
    "music.durationHeader": "Stile",

    "contact.label": "Contatti",
    "contact.heading": "Costruiamo qualcosa insieme.",
    "contact.description": "Che tu abbia bisogno di una sviluppatrice per il tuo prossimo progetto, una fotografa per il tuo brand, o una musicista per il tuo evento. Mi piacerebbe sentirti.",
    "contact.email": "Email",
    "contact.location": "Posizione",
    "contact.locationValue": "Girona, Catalogna, Spagna",
    "contact.availability": "Disponibilità",
    "contact.availabilityValue": "Disponibile per ruoli e collaborazioni",

    "footer.rights": "Tutti i diritti riservati.",
    "footer.builtWith": "Fatto con Next.js e Tailwind CSS",

    "education.label": "Formazione",
    "education.heading": "Percorso accademico",
    "education.items": [
      {
        title: "Informatica (Institut Rafael Campalans / Institut de Vidreres)",
        description:
          "CFGS, Sviluppo di Applicazioni Web con adattamento curricolare in Realtà Virtuale e Videogiochi Web (EQF 5; equivalenza Italia: percorso ITS Academy di area ICT, livello terziario professionalizzante) / 2023-2024\nCFGS, Sviluppo di Applicazioni Multipiattaforma con Profilo Professionale in Videogiochi e Svago Digitale (EQF 5; equivalenza Italia: percorso ITS Academy di area ICT, livello terziario professionalizzante) / 2021-2023\nCFGM, Sistemi Microinformatici e Reti (EQF 4; equivalenza Italia: diploma professionale IeFP, quarto anno) / 2015-2017",
      },
      {
        title: "Istituto Biblico (Parola di Vita Argentina · modalità online)",
        description:
          "Corso Teologico (2º e 3º anno) / 2025-2026\nCorso Base / 2020-2021",
      },
      {
        title: "Monitrice (Escola l'Empordà)",
        description:
          "Monitrice di mensa / 2025-2026\nManipolazione degli alimenti / 2025\nMonitrice di attività ricreative per bambini e giovani / 2024",
      },
      {
        title: "Formazione complementare (Corsi non regolati)",
        description:
          "Patente di guida B / 2021",
      },
    ],
  },
} as const;

type TranslationKeys = keyof typeof translations.en;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys) => string;
  tArray: (key: TranslationKeys) => Array<{ title: string; description: string }>;
  tCategories: (key: TranslationKeys) => Record<string, string>;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (storedLocale && isLocale(storedLocale)) {
        setLocale(storedLocale);
        return;
      }
    } catch {
      // no-op
    }

    setLocale(detectLocaleFromDevice());
  }, []);

  useEffect(() => {
    const htmlLang = locale === "cat" ? "ca" : locale;
    document.documentElement.lang = htmlLang;

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // no-op
    }
  }, [locale]);

  const t = useCallback(
    (key: TranslationKeys): string => {
      const value = translations[locale]?.[key] ?? translations.en[key] ?? key;
      return typeof value === "string" ? value : key;
    },
    [locale]
  );

  const tArray = useCallback(
    (key: TranslationKeys): Array<{ title: string; description: string }> => {
      const value = translations[locale]?.[key] ?? translations.en[key];
      return Array.isArray(value) ? value : [];
    },
    [locale]
  );

  const tCategories = useCallback(
    (key: TranslationKeys): Record<string, string> => {
      const value = translations[locale]?.[key] ?? translations.en[key];
      return typeof value === "object" && !Array.isArray(value)
        ? (value as Record<string, string>)
        : {};
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, tCategories }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}


