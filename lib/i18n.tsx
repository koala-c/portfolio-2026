"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "en" | "es" | "cat" | "it";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  cat: "CAT",
  it: "IT",
};

const translations = {
  en: {
    "nav.about": "About",
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

    "about.label": "About",
    "about.heading": "Code, light, and sound.",
    "about.p1": "I'm a Full Stack Developer with experience building mobile and web applications using JavaScript, React Native, Angular, Flutter, and Ionic Framework. On the backend I've worked with PHP/Laravel, .NET, GraphQL, Firebase, and PostgreSQL.",
    "about.p2": "I also design with Figma, Illustrator, and Photoshop, and I've developed videogames with Unity. I work with agile methodologies (Scrum), Git/GitHub for version control, and Jira for task management across dev, testing, and production environments.",
    "about.p3": "Beyond code, I'm a photographer and a violinist. Based in Girona, Catalonia. Currently available for development roles, photography commissions, and music collaborations.",
    "about.yearsDev": "Years in Tech",
    "about.projectsBuilt": "Projects Built",
    "about.languages": "Languages",
    "about.portrait": "Denise Galloni portrait",

    "code.label": "Experience",
    "code.heading": "Professional experience",
    "code.github": "View LinkedIn",
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Full Stack Developer. Built hospitality apps with Ionic/Angular, JavaScript, and React Native. Managed non-relational databases with Firebase. Jan 2025 - Jul 2025.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Full Stack Developer. Designed the English Cafe app in Figma and developed its initial version in Flutter. Schroon Lake, NY. Jun 2024 - Nov 2024.",
      },
      {
        title: "Danzai Software",
        description: "Software Developer. Built hospitality apps with Ionic/Angular and .NET MAUI. Managed ERP configuration and databases. Apr 2022 - Jul 2023.",
      },
      {
        title: "Copylowcost",
        description: "Digital printing, document scanning & editing, machine operation, hardware and software repair, POS installation and customer service. Jan 2018 - Jun 2021.",
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
    "contact.description": "Whether you need a developer for your next project, a photographer for your brand, or a musician for your event -- I'd love to hear from you.",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.locationValue": "Girona, Catalonia, Spain",
    "contact.availability": "Availability",
    "contact.availabilityValue": "Open for roles & collaborations",

    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js & Tailwind CSS",

    "education.label": "Education",
    "education.heading": "Academic background",
  },

  es: {
    "nav.about": "Sobre mí",
    "nav.code": "Experiència",
    "nav.photography": "Fotografía",
    "nav.music": "Música",
    "nav.contact": "Contacto",
    "nav.experience": "Experiencia",

    "hero.tagline": "Desarrolladora Full Stack / Fotógrafa / Violinista",
    "hero.description": "Una música apasionada por la tecnología. Construyo experiencias móviles y web, capturo momentos a través del objetivo y hago música con el violín.",
    "hero.viewWork": "Ver Trabajo",
    "hero.getInTouch": "Contactar",
    "hero.scroll": "Deslizar",

    "about.label": "Sobre mí",
    "about.heading": "Código, luz y sonido.",
    "about.p1": "Soy desarrolladora Full Stack con experiencia construyendo aplicaciones móviles y web utilizando JavaScript, React Native, Angular, Flutter e Ionic Framework. En el backend he trabajado con PHP/Laravel, .NET, GraphQL, Firebase y PostgreSQL.",
    "about.p2": "También diseño con Figma, Illustrator y Photoshop, y he desarrollado videojuegos con Unity. Trabajo con metodologías ágiles (Scrum), Git/GitHub para control de versiones y Jira para gestión de tareas en entornos de desarrollo, pruebas y producción.",
    "about.p3": "Además del código, soy fotógrafa y violinista. Radicada en Girona, Cataluña. Actualmente disponible para roles de desarrollo, encargos fotográficos y colaboraciones musicales.",
    "about.yearsDev": "Años en Tech",
    "about.projectsBuilt": "Proyectos",
    "about.languages": "Idiomas",
    "about.portrait": "Retrato de Denise Galloni",

    "code.label": "Experiencia",
    "code.heading": "Experiencia profesional",
    "code.github": "Ver LinkedIn",
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Desarrolladora Full Stack. Desarrollo de aplicaciones de hostelería con Ionic/Angular, JavaScript y React Native. Gestión de bases de datos no relacionales con Firebase. Ene 2025 - Jul 2025.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Desarrolladora Full Stack. Diseño de la app English Cafe en Figma y desarrollo de la versión inicial en Flutter. Schroon Lake, NY. Jun 2024 - Nov 2024.",
      },
      {
        title: "Danzai Software",
        description: "Desarrolladora de Software. Desarrollo de aplicaciones de hostelería con Ionic/Angular y .NET MAUI. Configuración de ERP y gestión de bases de datos. Abr 2022 - Jul 2023.",
      },
      {
        title: "Copylowcost",
        description: "Impresión digital, escaneo y edición de documentos, operación de máquinas, reparación de hardware y software, instalación de TPV y atención al cliente. Ene 2018 - Jun 2021.",
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
    "contact.description": "Ya sea que necesites una desarrolladora para tu próximo proyecto, una fotógrafa para tu marca, o una música para tu evento -- me encantaría saber de ti.",
    "contact.email": "Correo",
    "contact.location": "Ubicación",
    "contact.locationValue": "Girona, Cataluña, España",
    "contact.availability": "Disponibilidad",
    "contact.availabilityValue": "Disponible para roles y colaboraciones",

    "footer.rights": "Todos los derechos reservados.",
    "footer.builtWith": "Hecho con Next.js y Tailwind CSS",

    "education.label": "Educación",
    "education.heading": "Formación académica",
  },

  cat: {
    "nav.about": "Sobre mi",
    "nav.code": "Experiencia",
    "nav.photography": "Fotografia",
    "nav.music": "Música",
    "nav.contact": "Contacte",
    "nav.experience": "Experiència",

    "hero.tagline": "Desenvolupadora Full Stack / Fotògrafa / Violinista",
    "hero.description": "Una música apassionada per la tecnologia. Construeixo experiències mòbils i web, capturo moments a través de l'objectiu i faig música amb el violí.",
    "hero.viewWork": "Veure Treball",
    "hero.getInTouch": "Contactar",
    "hero.scroll": "Desplacar",

    "about.label": "Sobre mi",
    "about.heading": "Codi, llum i so.",
    "about.p1": "Soc desenvolupadora Full Stack amb experiència construint aplicacions mòbils i web utilitzant JavaScript, React Native, Angular, Flutter i Ionic Framework. Al backend he treballat amb PHP/Laravel, .NET, GraphQL, Firebase i PostgreSQL.",
    "about.p2": "També dissenyo amb Figma, Illustrator i Photoshop, i he desenvolupat videojocs amb Unity. Treballo amb metodologies àgils (Scrum), Git/GitHub per al control de versions i Jira per a la gestió de tasques en entorns de desenvolupament, proves i producció.",
    "about.p3": "A més del codi, soc fotògrafa i violinista. Amb base a Girona, Catalunya. Actualment disponible per a rols de desenvolupament, encàrrecs fotogràfics i col·laboracions musicals.",
    "about.yearsDev": "Anys en Tech",
    "about.projectsBuilt": "Projectes",
    "about.languages": "Idiomes",
    "about.portrait": "Retrat de Denise Galloni",

    "code.label": "Experiència",
    "code.heading": "Experiència professional",
    "code.github": "Veure LinkedIn",
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Desenvolupadora Full Stack. Desenvolupament d'aplicacions d'hostaleria amb Ionic/Angular, JavaScript i React Native. Gestió de bases de dades no relacionals amb Firebase. Gen 2025 - Jul 2025.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Desenvolupadora Full Stack. Disseny de l'app English Cafe a Figma i desenvolupament de la versió inicial en Flutter. Schroon Lake, NY. Jun 2024 - Nov 2024.",
      },
      {
        title: "Danzai Software",
        description: "Desenvolupadora de Software. Desenvolupament d'aplicacions d'hostaleria amb Ionic/Angular i .NET MAUI. Configuració d'ERP i gestió de bases de dades. Abr 2022 - Jul 2023.",
      },
      {
        title: "Copylowcost",
        description: "Impressió digital, escaneig i edició de documents, operació de màquines, reparació de hardware i software, instal·lació de TPV i atenció al client. Gen 2018 - Jun 2021.",
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
    "contact.description": "Tant si necessites una desenvolupadora per al teu proper projecte, una fotògrafa per a la teva marca, o una música per al teu event -- m'encantaria saber de tu.",
    "contact.email": "Correu",
    "contact.location": "Ubicació",
    "contact.locationValue": "Girona, Catalunya, Espanya",
    "contact.availability": "Disponibilitat",
    "contact.availabilityValue": "Disponible per a rols i col·laboracions",

    "footer.rights": "Tots els drets reservats.",
    "footer.builtWith": "Fet amb Next.js i Tailwind CSS",

    "education.label": "Educació",
    "education.heading": "Formació acadèmica",
  },

  it: {
    "nav.about": "Chi sono",
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

    "about.label": "Chi sono",
    "about.heading": "Codice, luce e suono.",
    "about.p1": "Sono una sviluppatrice Full Stack con esperienza nella creazione di applicazioni mobile e web utilizzando JavaScript, React Native, Angular, Flutter e Ionic Framework. Nel backend ho lavorato con PHP/Laravel, .NET, GraphQL, Firebase e PostgreSQL.",
    "about.p2": "Progetto anche con Figma, Illustrator e Photoshop, e ho sviluppato videogiochi con Unity. Lavoro con metodologie agili (Scrum), Git/GitHub per il controllo versione e Jira per la gestione dei task in ambienti di sviluppo, test e produzione.",
    "about.p3": "Oltre al codice, sono fotografa e violinista. Con base a Girona, Catalogna, Spagna. Attualmente disponibile per ruoli di sviluppo, commissioni fotografiche e collaborazioni musicali.",
    "about.yearsDev": "Anni in Tech",
    "about.projectsBuilt": "Progetti",
    "about.languages": "Lingue",
    "about.portrait": "Ritratto di Denise Galloni",

    "code.label": "Esperienza",
    "code.heading": "Esperienza professionale",
    "code.github": "Vedi LinkedIn",
    "code.projects": [
      {
        title: "MyChefTool",
        description: "Sviluppatrice Full Stack. Sviluppo di app per la ristorazione con Ionic/Angular, JavaScript e React Native. Gestione di database non relazionali con Firebase. Gen 2025 - Lug 2025.",
      },
      {
        title: "Word of Life Fellowship",
        description: "Sviluppatrice Full Stack. Design dell'app English Cafe in Figma e sviluppo della versione iniziale in Flutter. Schroon Lake, NY. Giu 2024 - Nov 2024.",
      },
      {
        title: "Danzai Software",
        description: "Sviluppatrice Software. Sviluppo di app per la ristorazione con Ionic/Angular e .NET MAUI. Configurazione ERP e gestione database. Apr 2022 - Lug 2023.",
      },
      {
        title: "Copylowcost",
        description: "Stampa digitale, scansione e modifica documenti, operazione macchine, riparazione hardware e software, installazione POS e servizio clienti. Gen 2018 - Giu 2021.",
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
    "music.albumDescription": "Il violino e il mio strumento di espressione. Sono appassionata nell'esplorare la connessione tra musica e tecnologia, sempre alla ricerca di nuovi modi per creare e condividere.",
    "music.listenSpotify": "Prossimamente",
    "music.trackHeader": "Brano",
    "music.durationHeader": "Stile",

    "contact.label": "Contatti",
    "contact.heading": "Costruiamo qualcosa insieme.",
    "contact.description": "Che tu abbia bisogno di una sviluppatrice per il tuo prossimo progetto, una fotografa per il tuo brand, o una musicista per il tuo evento -- mi piacerebbe sentirti.",
    "contact.email": "Email",
    "contact.location": "Posizione",
    "contact.locationValue": "Girona, Catalogna, Spagna",
    "contact.availability": "Disponibilità",
    "contact.availabilityValue": "Disponibile per ruoli e collaborazioni",

    "footer.rights": "Tutti i diritti riservati.",
    "footer.builtWith": "Fatto con Next.js e Tailwind CSS",

    "education.label": "Formazione",
    "education.heading": "Percorso accademico",
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
  const [locale, setLocale] = useState<Locale>("es");

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
