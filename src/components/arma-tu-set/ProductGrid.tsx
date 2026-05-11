"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Check, Plus, Tag } from "lucide-react";
import { PRODUCTS, formatPrice, Product } from "@/data/products";
import { SetCategory, useSetStore } from "@/store/useSetStore";
import { cn } from "@/lib/utils";

const BADGE_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  bestseller: "Bestseller",
  "edicion-limitada": "Ed. Limitada",
  oferta: "Oferta",
};

function ProductCard({
  product,
  isSelected,
  onSelect,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
      onClick={onSelect}
      className={cn(
        "relative group cursor-pointer rounded-sm overflow-hidden border transition-all duration-300",
        isSelected
          ? "border-onyx ring-1 ring-onyx shadow-lg shadow-onyx/10"
          : "border-pearl-gray bg-white hover:border-onyx hover:shadow-md"
      )}
    >
      {/* Image */}
      <div className="relative h-52 bg-pearl-gray/30 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isSelected ? "scale-105" : "group-hover:scale-105"
          )}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isSelected ? "bg-gold/10" : "bg-gold/0 group-hover:bg-gold/5"
          )}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className="label-caps bg-onyx text-ivory px-2 py-1">
              {BADGE_LABELS[product.badge]}
            </span>
          </div>
        )}

        {/* Selected overlay */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              key="selected-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gold/10 flex items-center justify-center z-20 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="w-12 h-12 rounded-full bg-onyx flex items-center justify-center shadow-xl"
              >
                <Check className="w-6 h-6 text-ivory" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Replace button */}
        {!isSelected && (
          <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-8 h-8 rounded-full bg-onyx/80 backdrop-blur-sm flex items-center justify-center">
              <Plus className="w-4 h-4 text-ivory" />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-white">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-[11px] text-charcoal/70">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <p className="font-serif text-sm text-onyx leading-tight line-clamp-2 mb-1">
          {product.name}
        </p>

        <p className="text-[11px] text-charcoal/60 font-light mb-2 line-clamp-1">
          {product.material}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-onyx">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-[11px] text-charcoal/50 line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          {product.compareAtPrice && (
            <div className="flex items-center gap-1 bg-onyx/5 px-1.5 py-0.5 rounded-sm">
              <Tag className="w-2.5 h-2.5 text-onyx" />
              <span className="text-[10px] text-onyx font-medium">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductGrid() {
  const { activeCategory, selection, selectProduct, removeProduct } =
    useSetStore();

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === activeCategory && p.inStock
  );

  const selectedProduct = selection[activeCategory as SetCategory];

  const handleSelect = (product: Product) => {
    if (selectedProduct?.id === product.id) {
      removeProduct(activeCategory as SetCategory);
    } else {
      selectProduct(activeCategory as SetCategory, product);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg text-onyx capitalize">
            {activeCategory === "aros" ? "Aros disponibles" : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} disponibles`}
          </h3>
          <p className="text-xs text-charcoal/60 mt-0.5 font-light">
            {categoryProducts.length} piezas · Toca para seleccionar
          </p>
        </div>
        {selectedProduct && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => removeProduct(activeCategory as SetCategory)}
            className="text-xs text-charcoal/60 hover:text-onyx underline underline-offset-2 transition-colors font-light"
          >
            Quitar selección
          </motion.button>
        )}
      </div>

      {/* Products grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onSelect={() => handleSelect(product)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {categoryProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-charcoal/50 font-light">
            No hay productos disponibles en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
}
