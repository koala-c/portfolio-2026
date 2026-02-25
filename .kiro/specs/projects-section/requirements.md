# Requisitos: Sección de Proyectos

## 1. Visión General

Añadir una nueva sección de proyectos al portfolio personal que muestre proyectos destacados con previews interactivos, siguiendo el mismo estilo visual y de interacción que la sección de fotografía existente.

## 2. Historias de Usuario

### 2.1 Como visitante del portfolio
Quiero ver una sección de proyectos con previews visuales para poder explorar el trabajo de desarrollo del autor de manera atractiva y consistente con el resto del sitio.

### 2.2 Como visitante del portfolio
Quiero poder hacer hover sobre los proyectos para ver el preview completo sin el overlay teal, similar a como funciona en la sección de fotografía.

### 2.3 Como visitante del portfolio
Quiero poder hacer clic en un proyecto para visitarlo en una nueva pestaña o ventana.

## 3. Criterios de Aceptación

### 3.1 Estructura de la Sección
- La sección debe aparecer en la página principal después de la sección de código y antes de la sección de fotografía
- Debe tener el mismo formato de encabezado que otras secciones (label, heading, description)
- Debe usar el mismo espaciado y bordes que las secciones existentes (border-t, py-32)
- Debe ser responsive y adaptarse a diferentes tamaños de pantalla

### 3.2 Visualización de Proyectos
- Cada proyecto debe mostrarse como una tarjeta con:
  - Un iframe o imagen de preview del proyecto
  - Overlay teal (turquoise/50) por defecto
  - Barra superior teal de 0.5 altura que se expande en hover
  - Título del proyecto visible
  - Descripción breve del proyecto
  - Link al proyecto

### 3.3 Efectos de Hover
- Al hacer hover sobre un proyecto:
  - El overlay teal debe desaparecer (bg-transparent)
  - La imagen/preview debe hacer zoom suave (scale-105)
  - Si está en grayscale, debe mostrar colores completos
  - La barra superior teal debe expandirse (scale-x-100)
  - Transiciones suaves (duration-500 o duration-700)

### 3.4 Proyecto Inicial
- Debe incluir el proyecto "Calendar Flair Archive"
- URL: https://koala-c.github.io/calendar-flair-archive/
- Debe mostrar un preview del sitio web
- Título traducido:
  - ES: "Archivo Calendar Flair"
  - EN: "Calendar Flair Archive"
- Descripción traducida:
  - ES: "Archivo no oficial para comparar ilustraciones de keywords antiguas y nuevas de Google Calendar"
  - EN: "Unofficial archive to compare old and new keyword flair illustrations from Google Calendar"

### 3.5 Internacionalización
- Todos los textos deben estar preparados para i18n usando el hook useI18n
- Debe incluir traducciones en español e inglés para:
  - Encabezados de sección: projects.label, projects.heading, projects.description
  - Títulos de proyectos: projects.items[].title
  - Descripciones de proyectos: projects.items[].description
  - Textos de accesibilidad: projects.visitProject, etc.
- Los títulos y descripciones de cada proyecto deben traducirse dinámicamente según el idioma activo

### 3.6 Accesibilidad
- Los enlaces deben tener aria-labels descriptivos
- Los botones/enlaces deben ser navegables por teclado
- Debe haber indicadores de foco visibles
- Las imágenes deben tener alt text apropiado

### 3.7 Estructura de Datos
- Los proyectos deben estar definidos en un array de objetos con:
  - titleKey: string (key de traducción para el título)
  - descriptionKey: string (key de traducción para la descripción)
  - url: string
  - previewUrl: string (para iframe o imagen)
  - tags?: string[] (opcional, para futuras categorías)
- Las traducciones deben obtenerse dinámicamente usando el hook useI18n

## 4. Restricciones Técnicas

### 4.1 Framework y Librerías
- Usar Next.js 14+ con App Router
- Usar TypeScript
- Usar Tailwind CSS para estilos
- Usar componentes de shadcn/ui cuando sea apropiado
- Usar el sistema de i18n existente (@/lib/i18n)

### 4.2 Compatibilidad
- Debe funcionar en navegadores modernos (Chrome, Firefox, Safari, Edge)
- Debe ser responsive (mobile, tablet, desktop)
- Debe respetar las preferencias de tema (light/dark mode)

### 4.3 Rendimiento
- Las previews deben cargarse de manera eficiente
- Usar lazy loading para iframes si es posible
- Optimizar imágenes si se usan screenshots en lugar de iframes

## 5. Fuera de Alcance (Para Futuras Iteraciones)

- Sistema de filtrado por categorías/tags
- Lightbox para ver proyectos en detalle
- Carrusel de proyectos
- Integración con GitHub API para proyectos automáticos
- Sistema de búsqueda de proyectos
