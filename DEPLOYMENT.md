# Guía de Despliegue (Deployment)

Esta guía explica cómo llevar **LUMIÈRE Alta Joyería** a un entorno de producción, garantizando el máximo rendimiento, SEO y seguridad.

## Despliegue en Vercel (Recomendado)

Vercel es la plataforma ideal para desplegar aplicaciones Next.js, ya que está desarrollada por los mismos creadores del framework y soporta nativamente funciones como Image Optimization, Edge Functions, Server Components y caché dinámica.

### Pasos de Despliegue

1. **Subir el código a GitHub, GitLab o Bitbucket**: Asegúrate de que el código esté en tu repositorio remoto.
2. **Crear el proyecto en Vercel**:
   - Inicia sesión en [Vercel](https://vercel.com).
   - Haz clic en "Add New..." y luego en "Project".
   - Importa tu repositorio de Git.
3. **Configuración de Variables de Entorno**:
   En el panel de configuración de Vercel (Environment Variables), asegúrate de definir:
   - `NEXT_PUBLIC_BASE_URL`: El dominio principal (ej: `https://lumiere-joyeria.cl`), usado por el sitemap y metadatos SEO.
4. **Build y Despliegue**:
   - Vercel detectará automáticamente que es un proyecto Next.js y ejecutará `npm run build`.
   - Una vez finalizado, te proporcionará un dominio temporal (ej. `lumiere-joyeria.vercel.app`).

### Configuración de Dominio Personalizado

1. En el panel de Vercel de tu proyecto, ve a la pestaña **Settings > Domains**.
2. Añade tu dominio principal (ej: `lumiere-joyeria.cl`) y también la versión con `www` (que redirigirá a la versión sin `www` para mejorar el SEO).
3. Configura los registros DNS (A Record y CNAME) en tu proveedor de dominio siguiendo las instrucciones de Vercel. Una vez propagado, Vercel generará automáticamente los certificados SSL.

## Consideraciones Post-Despliegue

- **Google Search Console**: Verifica la propiedad de tu dominio en Search Console e ingresa la URL de tu sitemap (`https://lumiere-joyeria.cl/sitemap.xml`) para forzar la indexación.
- **Rendimiento**: Realiza un Lighthouse Audit final en el dominio de producción, ya que en localhost no hay compresión gzip/brotli automática ni caché de imágenes por CDN.
- **Analíticas (Google Analytics / Facebook Pixel)**: Asegúrate de configurar los IDs de seguimiento en tus variables de entorno antes de lanzar campañas pagadas.
