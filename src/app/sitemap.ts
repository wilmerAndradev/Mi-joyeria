import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumiere-joyeria.cl';

  // Rutas estáticas principales
  const staticRoutes = [
    '',
    '/colecciones/anillos',
    '/colecciones/collares',
    '/colecciones/aros',
    '/colecciones/pulseras',
    '/arma-tu-set',
    '/privacidad',
    '/terminos',
    '/devoluciones',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // En un caso real, aquí obtendríamos los slugs de productos desde la base de datos
  // const products = await getProducts();
  // const productRoutes = products.map(product => ({ ... }))
  
  const productRoutes = [
    '/productos/solitario-eternity-1ct',
    '/productos/collar-gota-diamante',
    '/productos/aros-cascada-brillantes',
    '/productos/pulsera-tennis-classic',
    '/productos/anillo-halo-zafiro',
    '/productos/collar-perlas-tahiti',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
