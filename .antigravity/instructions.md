# LUMIÈRE — Instrucciones del Proyecto para IA

> Este archivo es la fuente de verdad para cualquier agente o asistente IA que trabaje en este proyecto.
> Léelo completo antes de escribir cualquier línea de código.

---

## 1. Identidad del Proyecto

| Campo | Valor |
|---|---|
| **Nombre de marca** | LUMIÈRE |
| **Tipo** | E-commerce de alta joyería fina (Chile) |
| **Idioma** | Español (Chile) |
| **Moneda** | CLP — Peso Chileno. Siempre usar `formatPrice()` de `@/data/products` |
| **Directorio raíz** | `lumiere-joyeria/` |

---

## 2. Stack Técnico

| Tecnología | Versión / Detalle |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Lenguaje** | TypeScript estricto |
| **Estilos** | Tailwind CSS v4 — usar clases utilitarias, NO estilos inline |
| **Animaciones** | Framer Motion |
| **Estado global** | Zustand — store en `src/store/useCartStore.ts` |
| **Backend / DB** | ❌ **Sin Supabase, sin API externa**. Todo es mock/local |
| **Imágenes** | `next/image` con `fill` + `object-cover`. Usar Unsplash URLs del archivo `products.ts` |

---

## 3. Fuentes Tipográficas

| Variable CSS | Fuente Google | Uso |
|---|---|---|
| `--font-playfair` | Playfair Display | `font-serif` — Títulos, logo, headings de lujo |
| `--font-josefin` | Josefin Sans | `font-sans` (default) — Cuerpo, etiquetas, botones |

**Nunca usar fuentes del sistema.** Siempre respetar esta jerarquía tipográfica.

---

## 4. Design System — Tokens de Color

Los colores están definidos en `src/app/globals.css`. Usar **siempre** los alias semánticos:

| Token | Hex | Uso |
|---|---|---|
| `onyx` | `#1C1C1E` | Texto principal, fondos oscuros, botones primarios |
| `ivory` | `#FAF8F5` | Fondo principal, texto sobre fondos oscuros |
| `gold` | `#C9A84C` | Acento principal de lujo, CTAs hover, highlights |
| `pearl-gray` | `#E8E6E1` | Bordes, fondos secundarios, placeholders de imagen |
| `charcoal` | `#3A3A3C` | Texto secundario, subtítulos |

---

## 5. Archivos Clave — Mapa del Proyecto

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (Navbar + Footer + CartDrawer)
│   ├── page.tsx                ← Homepage con todas las secciones
│   ├── globals.css             ← Tokens CSS + fuentes
│   ├── checkout/
│   │   ├── layout.tsx          ← Layout CRO minimalista (sin nav global)
│   │   ├── page.tsx            ← Flujo checkout 3 pasos
│   │   └── confirmacion/
│   │       └── page.tsx        ← Página de éxito post-compra
│   ├── colecciones/
│   │   ├── page.tsx            ← PLP general
│   │   └── [categoria]/
│   │       └── page.tsx        ← PLP por categoría con filtros
│   ├── productos/
│   │   └── [slug]/
│   │       └── page.tsx        ← PDP (ficha de producto)
│   └── arma-tu-set/
│       └── page.tsx            ← Configurador de sets (Fase 5)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Navbar transparente → onyx al scroll
│   │   ├── Footer.tsx          ← Footer completo
│   │   └── CartDrawer.tsx      ← Cart lateral CRO con niveles de descuento
│   ├── sections/               ← Secciones de la homepage
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── FeaturedCollections.tsx
│   │   ├── BestsellersCarousel.tsx
│   │   ├── SetPreview.tsx      ← Preview "Arma tu Set"
│   │   ├── SocialProof.tsx
│   │   ├── NewsletterCTA.tsx
│   │   └── VideoSection.tsx
│   └── ui/                     ← Componentes base reutilizables
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── Input.tsx
├── data/
│   └── products.ts             ← FUENTE DE VERDAD de todos los productos
├── store/
│   └── useCartStore.ts         ← Estado global del carrito (Zustand)
└── lib/
    └── utils.ts                ← Helpers (cn, etc.)
```

---

## 6. Estado del Proyecto — Fases

| Fase | Descripción | Estado |
|---|---|---|
| **Fase 0** | Setup inicial | ✅ Completada |
| **Fase 1** | Design System + Layout base | ✅ Completada |
| **Fase 2** | Homepage inmersiva | ✅ Completada |
| **Fase 3** | Catálogo PLP + PDP | ✅ Completada |
| **Fase 4** | Carrito + Checkout completo | ✅ Completada |
| **Fase 5** | Módulo "Arma tu Set" | ✅ Completada |
| **Fase 6** | Panel de Administración | ✅ Completada |
| **Fase 7** | Features adicionales (Wishlist, Auth) | ✅ Completada |
| **Fase 8** | QA + Optimización + SEO + Light Mode | ✅ Completada |

**Progreso general estimado: 100%**

---

## 7. Lógica de Negocio Importante

### Sistema de Descuentos por Niveles (CartDrawer)
Implementado en `CartDrawer.tsx`. **No duplicar esta lógica.**

| Monto del carrito | Beneficio |
|---|---|
| ≥ $1.000.000 CLP | 5% de descuento |
| ≥ $2.000.000 CLP | 10% de descuento |
| ≥ $3.000.000 CLP | 10% de descuento + Envío Gratis |

### Estructura de un Producto (`products.ts`)
```typescript
{
  id: string;
  slug: string;
  name: string;
  price: number;           // En CLP, sin formato
  compareAtPrice?: number;
  category: string;        // "anillos" | "collares" | "pulseras" | "aros"
  material: string;
  images: string[];        // URLs de Unsplash
  rating: number;
  reviews: number;
  badge?: string;
  sizes?: string[];
  details: string[];
  care: string[];
  description: string;
  weight?: string;
}
```

---

## 8. Reglas Estrictas — LEER ANTES DE MODIFICAR

> [!IMPORTANT]
> ### ⚠️ Regla de No Regresión
> **NO modificar archivos de fases anteriores (0-4) sin que el usuario lo pida explícitamente.**
> Esto incluye: `Navbar.tsx`, `Footer.tsx`, `CartDrawer.tsx`, `layout.tsx`, `globals.css`,
> `useCartStore.ts`, `products.ts`, páginas PLP/PDP, y todas las secciones de la homepage.

> [!WARNING]
> ### Reglas de Código
> 1. **Sin `any`** — TypeScript estricto siempre.
> 2. **Sin estilos inline** (`style={{}}`) salvo para valores dinámicos (e.g. `width: progressPercent%`).
> 3. **Responsive primero** — Todas las vistas deben funcionar bien en móvil. Usar breakpoints `md:` y `lg:`.
> 4. **Framer Motion para animaciones** — No usar CSS `@keyframes` salvo para el shimmer del CSS puro.
> 5. **`next/image`** para todas las imágenes — nunca usar `<img>` nativo.
> 6. **`next/link`** para todas las navegaciones internas.
> 7. **`useCartStore` con selectores** — `useCartStore(s => s.field)` para evitar re-renders innecesarios.

---

## 9. Próximos Pasos (Fase 5)

El módulo **"Arma tu Set"** en `/arma-tu-set` debe permitir:
1. [x] Seleccionar una joya por categoría (anillo, collar, pulsera, aros)
2. [x] Ver un preview visual del set en tiempo real (Base funcional)
3. [x] Calcular el ahorro automático vs. compra individual
4. [x] Agregar el set completo al carrito con un solo clic
5. Ver sets predefinidos por ocasión (Boda, Regalo, Aniversario...)

El componente `SetPreview.tsx` ya existe como placeholder en `src/components/sections/`.

---

## 10. Guardado 
Regla obligatoria: antes de aplicar cualquier cambio visual o de estilos, hacer un commit de Git con mensaje descriptivo. Después de cada subfase completada, hacer otro commit.

*Última actualización: 2026-05-11 | Progreso: 100% - Plataforma lista para producción con el Elegant Light Mode*
