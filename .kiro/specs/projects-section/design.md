# Diseño: Sección de Proyectos

## 1. Arquitectura de Componentes

### 1.1 Componente Principal: ProjectsSection
- **Ubicación**: `components/projects-section.tsx`
- **Tipo**: Client Component ("use client")
- **Responsabilidades**:
  - Renderizar la estructura de la sección
  - Gestionar el estado de hover para cada proyecto
  - Obtener traducciones del hook useI18n
  - Renderizar la grid de proyectos

### 1.2 Integración en la Página Principal
- **Archivo**: `app/page.tsx`
- **Posición**: Entre CodeSection y PhotographySection
- **Import**: `import { ProjectsSection } from "@/components/projects-section"`

## 2. Estructura de Datos

### 2.1 Tipo de Proyecto
```typescript
type Project = {
  titleKey: string;        // Key de traducción para el título
  descriptionKey: string;  // Key de traducción para la descripción
  url: string;             // URL del proyecto
  previewUrl: string;      // URL para el preview (screenshot o iframe)
  tags?: string[];         // Tags opcionales para futuras categorías
};
```

### 2.2 Datos Iniciales
```typescript
const projects: Project[] = [
  {
    titleKey: "projects.calendarFlair.title",
    descriptionKey: "projects.calendarFlair.description",
    url: "https://koala-c.github.io/calendar-flair-archive/",
    previewUrl: "https://koala-c.github.io/calendar-flair-archive/",
    tags: ["web", "archive"]
  }
];
```

## 3. Sistema de Traducciones

### 3.1 Keys de i18n a Añadir

#### Inglés (en)
```typescript
"projects.label": "Projects",
"projects.heading": "Featured work",
"projects.description": "A selection of projects I've built. Click to visit each one.",
"projects.visitProject": "Visit project",
"projects.calendarFlair.title": "Calendar Flair Archive",
"projects.calendarFlair.description": "Unofficial archive to compare old and new keyword flair illustrations from Google Calendar",
```

#### Español (es)
```typescript
"projects.label": "Proyectos",
"projects.heading": "Trabajo destacado",
"projects.description": "Una selección de proyectos que he construido. Haz clic para visitar cada uno.",
"projects.visitProject": "Visitar proyecto",
"projects.calendarFlair.title": "Archivo Calendar Flair",
"projects.calendarFlair.description": "Archivo no oficial para comparar ilustraciones de keywords antiguas y nuevas de Google Calendar",
```

#### Catalán (cat)
```typescript
"projects.label": "Projectes",
"projects.heading": "Treball destacat",
"projects.description": "Una selecció de projectes que he construït. Fes clic per visitar cadascun.",
"projects.visitProject": "Visitar projecte",
"projects.calendarFlair.title": "Arxiu Calendar Flair",
"projects.calendarFlair.description": "Arxiu no oficial per comparar il·lustracions de keywords antigues i noves de Google Calendar",
```

#### Italiano (it)
```typescript
"projects.label": "Progetti",
"projects.heading": "Lavori in evidenza",
"projects.description": "Una selezione di progetti che ho costruito. Clicca per visitare ognuno.",
"projects.visitProject": "Visita progetto",
"projects.calendarFlair.title": "Archivio Calendar Flair",
"projects.calendarFlair.description": "Archivio non ufficiale per confrontare le illustrazioni delle parole chiave vecchie e nuove di Google Calendar",
```

## 4. Diseño Visual

### 4.1 Estructura HTML
```tsx
<section id="projects" className="border-t border-border py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
    <p className="font-mono text-xs tracking-widest text-primary uppercase">
      {t("projects.label")}
    </p>
    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      {t("projects.heading")}
    </h2>
    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
      {t("projects.description")}
    </p>

    {/* Grid de Proyectos */}
    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  </div>
</section>
```

### 4.2 Tarjeta de Proyecto (ProjectCard)
```tsx
<a
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative block aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  aria-label={t(project.titleKey)}
>
  {/* Preview Image/Iframe */}
  <div className="absolute inset-0">
    <Image
      src={project.previewUrl}
      alt={t(project.titleKey)}
      fill
      className="object-cover object-top grayscale brightness-75 transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
    />
  </div>

  {/* Barra superior teal */}
  <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />

  {/* Overlay teal */}
  <div className="absolute inset-0 bg-turquoise/50 transition-all duration-500 group-hover:bg-transparent" />

  {/* Información del proyecto */}
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6">
    <h3 className="text-lg font-semibold text-foreground">
      {t(project.titleKey)}
    </h3>
    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
      {t(project.descriptionKey)}
    </p>
  </div>
</a>
```

### 4.3 Clases de Tailwind Utilizadas

#### Contenedor de Sección
- `border-t border-border`: Borde superior
- `py-32`: Padding vertical
- `mx-auto max-w-7xl px-6 lg:px-8`: Contenedor centrado con padding horizontal

#### Grid de Proyectos
- `mt-16`: Margen superior
- `grid gap-8`: Grid con gap de 8
- `sm:grid-cols-2 lg:grid-cols-3`: 1 columna en mobile, 2 en tablet, 3 en desktop

#### Tarjeta de Proyecto
- `group`: Para efectos de hover en elementos hijos
- `relative block`: Posicionamiento relativo
- `aspect-[4/3]`: Ratio de aspecto 4:3
- `overflow-hidden`: Ocultar contenido que sobresale
- `focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`: Accesibilidad de foco

#### Preview
- `absolute inset-0`: Posicionamiento absoluto que cubre todo el contenedor
- `object-cover object-top`: Cubrir el área manteniendo el top visible
- `grayscale brightness-75`: Filtros por defecto
- `transition-[transform,filter] duration-700`: Transiciones suaves
- `group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100`: Efectos de hover

#### Barra Teal
- `absolute inset-x-0 top-0`: Posicionamiento en la parte superior
- `h-0.5`: Altura de 0.5 (2px)
- `scale-x-0`: Escala inicial 0 (invisible)
- `bg-turquoise`: Color teal
- `transition-transform duration-500`: Transición suave
- `group-hover:scale-x-100`: Expandir en hover

#### Overlay Teal
- `absolute inset-0`: Cubrir toda la tarjeta
- `bg-turquoise/50`: Color teal con 50% de opacidad
- `transition-all duration-500`: Transición suave
- `group-hover:bg-transparent`: Transparente en hover

#### Información del Proyecto
- `absolute inset-x-0 bottom-0`: Posicionamiento en la parte inferior
- `bg-gradient-to-t from-background/95 to-transparent`: Gradiente de fondo
- `p-6`: Padding
- `line-clamp-2`: Limitar a 2 líneas de texto

## 5. Consideraciones Técnicas

### 5.1 Imágenes vs Iframes
Para el preview, usaremos screenshots estáticos en lugar de iframes por:
- Mejor rendimiento
- Evitar problemas de CORS y X-Frame-Options
- Carga más rápida
- Mejor control sobre el aspecto visual

### 5.2 Optimización de Imágenes
- Usar Next.js Image component para optimización automática
- Lazy loading por defecto
- Responsive images con sizes apropiados

### 5.3 Accesibilidad
- Links con aria-label descriptivos
- Navegación por teclado funcional
- Indicadores de foco visibles
- Alt text en imágenes
- Target="_blank" con rel="noopener noreferrer" para seguridad

### 5.4 Responsive Design
- Grid adaptativo: 1 columna (mobile) → 2 columnas (tablet) → 3 columnas (desktop)
- Padding y márgenes ajustados por breakpoint
- Texto responsive con clases md: y lg:

## 6. Plan de Implementación

### Fase 1: Estructura Base
1. Crear componente ProjectsSection
2. Añadir traducciones al archivo i18n.tsx
3. Integrar en app/page.tsx

### Fase 2: Estilos y Efectos
1. Implementar grid responsive
2. Añadir efectos de hover (overlay, barra teal, zoom)
3. Implementar gradiente de información

### Fase 3: Contenido
1. Crear screenshot del proyecto Calendar Flair Archive
2. Añadir imagen a /public/projects/
3. Configurar datos del proyecto

### Fase 4: Testing y Refinamiento
1. Verificar responsive en diferentes tamaños
2. Probar accesibilidad (teclado, screen readers)
3. Verificar traducciones en todos los idiomas
4. Ajustar transiciones y efectos si es necesario

## 7. Extensibilidad Futura

### 7.1 Múltiples Proyectos
El diseño está preparado para escalar a múltiples proyectos simplemente añadiendo más objetos al array `projects`.

### 7.2 Filtrado por Tags
La estructura incluye `tags` opcionales que pueden usarse para implementar filtrado en el futuro.

### 7.3 Lightbox/Modal
Similar a la sección de fotografía, se podría añadir un lightbox para ver más detalles del proyecto sin salir de la página.

### 7.4 Animaciones de Entrada
Se podrían añadir animaciones de entrada usando Intersection Observer o librerías como Framer Motion.
