"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, ChevronLeft, ChevronRight, Star, ShoppingBag, Heart, Eye } from "lucide-react";
import Link from "next/link";
import {
  PRODUCTS, CATEGORIES, SORT_OPTIONS, MATERIAL_OPTIONS, COLOR_OPTIONS, ENGASTE_OPTIONS,
  formatPrice, type Product,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

// ─── Quick View Modal ───────────────────────────────────────────────
function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-onyx/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-ivory max-w-3xl w-full rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 relative bg-pearl-gray">
          <div
            className="aspect-square bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url('${product.images[activeImage]}')` }}
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {product.images.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={cn("w-1.5 h-1.5 rounded-full transition-all", i === activeImage ? "bg-onyx scale-125" : "bg-onyx/30")}
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto hide-scrollbar">
          <button onClick={onClose} className="self-end mb-4 text-charcoal hover:text-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
          {product.badge && (
            <span className="bg-onyx text-white px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase inline-block mb-3 shadow-sm">
              {product.badge.replace("-", " ")}
            </span>
          )}
          <h2 className="font-serif text-2xl text-onyx mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "fill-gold" : "fill-transparent")} />
              ))}
            </div>
            <span className="text-xs text-charcoal">({product.reviews} reseñas)</span>
          </div>
          {/* Price — prominent gold */}
          <div className="mb-1">
            <span className="text-2xl font-normal text-onyx">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="ml-3 text-base text-charcoal/50 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <p className="text-[11px] text-charcoal tracking-wide mb-5">6 cuotas sin interés</p>
          <p className="text-base text-onyx/80 font-normal leading-relaxed mb-4">{product.description}</p>
          <p className="text-[11px] tracking-[0.15em] font-medium uppercase text-charcoal mb-1">Material</p>
          <p className="text-sm text-onyx mb-6">{product.material}</p>
          {product.sizes && (
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.15em] font-medium uppercase text-charcoal mb-3">Talla</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} className="w-10 h-10 border border-pearl-gray text-onyx text-sm hover:border-gold hover:text-gold transition-colors rounded-sm">{s}</button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-auto space-y-3 pt-6">
            <button 
              onClick={() => {
                addItem(product);
                onClose();
              }}
              className="w-full bg-onyx text-ivory py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold hover:text-onyx transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Agregar al Carrito
            </button>
            <Link href={`/productos/${product.slug}`}
              className="w-full border border-onyx text-onyx py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-onyx hover:text-ivory transition-colors duration-300 flex items-center justify-center gap-2">
              Ver Producto Completo
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Product Card — Cartier-style prominent price + Image Carousel ─
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [quickView, setQuickView] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100) : null;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] bg-white p-3 rounded-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setImageIndex(0); // Reset image gallery on leave
        }}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-pearl-gray mb-4 rounded-sm">
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-20">
              <span className="relative overflow-hidden bg-onyx text-white px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase inline-block shadow-sm">
                <span className="relative z-10">{product.badge === "oferta" && discount ? `-${discount}%` : product.badge.replace("-", " ")}</span>
                {/* Shimmer effect right to left (dorado, on hover, perfectly squared) */}
                <div className="absolute top-0 left-[100%] z-0 bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-transparent w-[150%] h-full skew-x-[-45deg] opacity-0 group-hover:opacity-100 group-hover:-translate-x-[200%] transition-all duration-[1500ms] ease-in-out pointer-events-none" />
              </span>
            </div>
          )}
          {/* Actions */}
          <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center text-onyx hover:text-gold transition-colors shadow-sm rounded-full"
              aria-label="Wishlist"
            >
              <Heart className={cn("w-4 h-4", wishlisted && "fill-gold text-gold")} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onClick={(e) => { e.preventDefault(); setQuickView(true); }}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center text-onyx hover:text-gold transition-colors shadow-sm rounded-full"
              aria-label="Vista rápida"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Images with Gallery/Carousel functionality */}
          <Link href={`/productos/${product.slug}`}>
            <AnimatePresence initial={false}>
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
                style={{ backgroundImage: `url('${product.images[imageIndex]}')` }}
              />
            </AnimatePresence>
            {/* Diagonal shimmer effect — sweeps left→right on hover */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[350%] transition-all duration-[1500ms] ease-in-out" />
            </div>
            {/* Subtle dark overlay to highlight product on hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
          </Link>

          {/* Carousel Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-onyx shadow-md transition-all duration-300 hover:bg-white hover:scale-110",
                  hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4 pr-0.5" />
              </button>
              <button
                onClick={nextImage}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-onyx shadow-md transition-all duration-300 hover:bg-white hover:scale-110",
                  hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                )}
              >
                <ChevronRight className="w-4 h-4 pl-0.5" />
              </button>
            </>
          )}

          {/* Home-style Buy Button (Compra Rápida) */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30 pointer-events-none">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="w-full bg-onyx text-ivory py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold transition-colors shadow-xl flex items-center justify-center gap-2 pointer-events-auto rounded-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Compra Rápida
            </button>
          </div>
        </div>

        {/* Text — Cartier-style hierarchy */}
        <div className="px-1">
          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-gold" : "fill-transparent")} />
              ))}
            </div>
            <span className="text-[11px] text-charcoal">({product.reviews})</span>
          </div>
          {/* Name */}
          <Link href={`/productos/${product.slug}`}>
            <h3 className="font-serif text-[15px] text-onyx hover:text-gold transition-colors mb-1.5 leading-snug">
              {product.name}
            </h3>
          </Link>
          {/* Material — light, secondary */}
          <p className="text-xs text-charcoal mb-3 font-normal tracking-wide truncate">{product.material}</p>
          {/* Price — PROMINENT Gold accent */}
          <div className="flex items-baseline gap-3">
            <span className="text-[17px] font-medium text-onyx tracking-wide">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-charcoal/60 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Accordion Filter Section (Cartier-style) ───────────────────────
function FilterAccordion({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-pearl-gray">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-xs tracking-[0.15em] uppercase font-semibold text-onyx">
          {title}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-charcoal transition-transform duration-300 group-hover:text-gold", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Filter Option Button ───────────────────────────────────────────
function FilterOption({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left text-sm py-1.5 transition-all duration-150 flex items-center gap-2 group",
        active ? "text-gold font-medium" : "text-charcoal hover:text-gold"
      )}
    >
      {/* Radio-style indicator */}
      <span className={cn(
        "w-3.5 h-3.5 rounded-full border flex-none transition-all",
        active ? "border-gold bg-gold" : "border-pearl-gray group-hover:border-gold"
      )}>
        {active && <span className="block w-full h-full rounded-full scale-[0.4] bg-white" />}
      </span>
      {label}
    </button>
  );
}

// ─── Filters Sidebar — Cartier-style, no box ────────────────────────
function FiltersSidebar({
  activeCategory, setActiveCategory,
  sortBy, setSortBy,
  activeMaterial, setActiveMaterial,
  activeColor, setActiveColor,
  activeEngaste, setActiveEngaste,
  priceRange, setPriceRange,
  onlyInStock, setOnlyInStock,
  onClose,
}: {
  activeCategory: string; setActiveCategory: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
  activeMaterial: string; setActiveMaterial: (v: string) => void;
  activeColor: string; setActiveColor: (v: string) => void;
  activeEngaste: string; setActiveEngaste: (v: string) => void;
  priceRange: [number, number]; setPriceRange: (v: [number, number]) => void;
  onlyInStock: boolean; setOnlyInStock: (v: boolean) => void;
  onClose?: () => void;
}) {
  return (
    <div>
      {onClose && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-pearl-gray">
          <span className="text-xs tracking-[0.15em] uppercase font-semibold text-onyx">Filtros</span>
          <button onClick={onClose} className="text-charcoal hover:text-gold transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ORDENAR POR */}
      <FilterAccordion title="Ordenar por" defaultOpen>
        {SORT_OPTIONS.map((opt) => (
          <FilterOption
            key={opt.id}
            label={opt.label}
            active={sortBy === opt.id}
            onClick={() => setSortBy(opt.id)}
          />
        ))}
      </FilterAccordion>

      {/* CATEGORÍA */}
      <FilterAccordion title="Categoría">
        {CATEGORIES.map((cat) => (
          <FilterOption
            key={cat.id}
            label={cat.label}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          />
        ))}
      </FilterAccordion>

      {/* PRECIO */}
      <FilterAccordion title="Precio">
        {[
          [0, 500000, "Hasta $500.000"],
          [500000, 1000000, "$500.000 – $1.000.000"],
          [1000000, 2000000, "$1.000.000 – $2.000.000"],
          [2000000, Infinity, "Más de $2.000.000"],
        ].map(([min, max, label]) => (
          <FilterOption
            key={String(label)}
            label={String(label)}
            active={priceRange[0] === Number(min) && priceRange[1] === Number(max)}
            onClick={() => setPriceRange([Number(min), Number(max)])}
          />
        ))}
      </FilterAccordion>

      {/* MATERIAL */}
      <FilterAccordion title="Material" defaultOpen={false}>
        <FilterOption label="Todos" active={activeMaterial === ""} onClick={() => setActiveMaterial("")} />
        {MATERIAL_OPTIONS.map((m) => (
          <FilterOption
            key={m.id}
            label={m.label}
            active={activeMaterial === m.id}
            onClick={() => setActiveMaterial(activeMaterial === m.id ? "" : m.id)}
          />
        ))}
      </FilterAccordion>

      {/* COLOR */}
      <FilterAccordion title="Color" defaultOpen={false}>
        <FilterOption label="Todos" active={activeColor === ""} onClick={() => setActiveColor("")} />
        {COLOR_OPTIONS.map((c) => (
          <FilterOption
            key={c.id}
            label={c.label}
            active={activeColor === c.id}
            onClick={() => setActiveColor(activeColor === c.id ? "" : c.id)}
          />
        ))}
      </FilterAccordion>

      {/* ENGASTE */}
      <FilterAccordion title="Engaste" defaultOpen={false}>
        <FilterOption label="Todos" active={activeEngaste === ""} onClick={() => setActiveEngaste("")} />
        {ENGASTE_OPTIONS.map((e) => (
          <FilterOption
            key={e.id}
            label={e.label}
            active={activeEngaste === e.id}
            onClick={() => setActiveEngaste(activeEngaste === e.id ? "" : e.id)}
          />
        ))}
      </FilterAccordion>

      {/* DISPONIBILIDAD */}
      <FilterAccordion title="Disponibilidad" defaultOpen={false}>
        <button
          onClick={() => setOnlyInStock(!onlyInStock)}
          className="w-full text-left text-sm py-1.5 flex items-center gap-2 group"
        >
          <span className={cn(
            "w-3.5 h-3.5 rounded-full border flex-none transition-all",
            onlyInStock ? "border-gold bg-gold" : "border-pearl-gray group-hover:border-gold"
          )}>
            {onlyInStock && <span className="block w-full h-full rounded-full scale-[0.4] bg-white" />}
          </span>
          <span className={cn("transition-colors", onlyInStock ? "text-gold font-medium" : "text-charcoal hover:text-gold")}>
            Solo disponibles
          </span>
        </button>
      </FilterAccordion>

      {/* Reset */}
      <button
        onClick={() => {
          setActiveCategory("all"); setPriceRange([0, Infinity]); setOnlyInStock(false);
          setActiveMaterial(""); setActiveColor(""); setActiveEngaste(""); setSortBy("featured");
        }}
        className="mt-5 text-xs tracking-[0.15em] uppercase text-charcoal hover:text-gold transition-colors flex items-center gap-2"
      >
        <span className="w-6 h-px bg-current" />
        Limpiar filtros
      </button>
    </div>
  );
}

// ─── Main PLP Page Component ─────────────────────────────────────────
export default function CatalogPage({ initialCategory = "all" }: { initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeEngaste, setActiveEngaste] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (onlyInStock) result = result.filter((p) => p.inStock);
    if (activeMaterial) result = result.filter((p) => p.materialKey === activeMaterial);
    if (activeColor) result = result.filter((p) => p.color === activeColor);
    if (activeEngaste) result = result.filter((p) => p.engaste === activeEngaste);
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.badge === "nuevo" ? 1 : 0) - (a.badge === "nuevo" ? 1 : 0)); break;
    }
    return result;
  }, [activeCategory, sortBy, priceRange, onlyInStock, activeMaterial, activeColor, activeEngaste]);

  const sidebarProps = {
    activeCategory, setActiveCategory,
    sortBy, setSortBy,
    activeMaterial, setActiveMaterial,
    activeColor, setActiveColor,
    activeEngaste, setActiveEngaste,
    priceRange, setPriceRange,
    onlyInStock, setOnlyInStock,
  };

  return (
    <div className="pb-24 min-h-screen bg-ivory text-onyx">
      {/* Page Header — onyx band with gold serif heading */}
      <div className="bg-onyx pt-24 border-b border-gold/10">
        <div className="container mx-auto px-6 pb-10">
          <p className="text-xs tracking-[0.35em] uppercase text-gold/60 mb-3">— Aleafar —</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-2 leading-tight">
            {activeCategory === "all"
              ? "Toda la Colección"
              : CATEGORIES.find((c) => c.id === activeCategory)?.label}
          </h1>
          <p className="text-sm font-normal text-ivory/50 tracking-[0.1em]">
            {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"}
          </p>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden container mx-auto px-6 pt-6 pb-2">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-normal text-onyx hover:text-gold transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros y ordenar
        </button>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <div className="flex gap-12">
          {/* Sidebar — desktop, no box */}
          <aside className="hidden md:block w-52 flex-none pt-1">
            <FiltersSidebar {...sidebarProps} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="hidden md:flex items-center justify-between mb-8 pb-4 border-b border-pearl-gray">
              <p className="text-xs tracking-[0.1em] uppercase text-charcoal">
                {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"}
              </p>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <p className="font-serif text-2xl text-onyx mb-4">Sin resultados</p>
                  <p className="text-sm text-charcoal font-normal">Intenta ajustar los filtros</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + sortBy + activeMaterial + activeColor + activeEngaste}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                >
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-onyx/60 backdrop-blur-sm md:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-ivory text-onyx p-8 overflow-y-auto border-r border-pearl-gray"
              onClick={(e) => e.stopPropagation()}
            >
              <FiltersSidebar {...sidebarProps} onClose={() => setShowMobileFilters(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
