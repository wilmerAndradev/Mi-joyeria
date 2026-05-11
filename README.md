# LUMIÈRE | Alta Joyería

LUMIÈRE es una plataforma de e-commerce de alta joyería construida con **Next.js 15** (App Router), React, Tailwind CSS y Framer Motion. Está diseñada con un enfoque riguroso en UI/UX, rendimiento, SEO y accesibilidad.

## Características Principales

- **Diseño Premium**: Interfaz elegante, dark mode en el panel de administración, y paletas de colores cuidadosamente seleccionadas (Ivory, Charcoal, Onyx, Gold).
- **Rendimiento (Core Web Vitals)**: Optimización de imágenes (WebP), fuentes (Next/font), y carga diferida.
- **SEO Dinámico**: Implementación de metadatos completos, OpenGraph, JSON-LD Schema.org, sitemap dinámico y robots.txt.
- **Micro-interacciones**: Animaciones fluidas impulsadas por Framer Motion.
- **Panel de Administración**: Gestión completa de productos, inventario y configuración.

## Estructura del Proyecto

```text
src/
├── app/                  # App Router: Páginas y Layouts (frontend y admin)
├── components/           # Componentes reutilizables (UI, layouts)
├── data/                 # Mock data para productos e inventario
├── lib/                  # Utilidades (cn para tailwind-merge)
└── store/                # Estado global con Zustand (carrito, wishlist)
```

## Requisitos Previos

- Node.js (v18+)
- npm, yarn o pnpm

## Instalación y Desarrollo

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) con tu navegador.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor en modo de producción.
- `npm run lint`: Ejecuta ESLint para asegurar la calidad del código.

## Fases de Desarrollo

Este proyecto se desarrolló en 8 fases, culminando en la actual (Fase 8: QA, Optimización y Production Ready). Se incorporaron límites de error, fallbacks, Next/Image y directrices estrictas de SEO técnico.

## Licencia

LUMIÈRE es un proyecto propietario. Todos los derechos reservados.
