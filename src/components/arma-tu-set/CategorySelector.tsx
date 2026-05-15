"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SET_STEPS, SetCategory, useSetStore } from "@/store/useSetStore";
import { cn } from "@/lib/utils";

const CATEGORY_IMAGES: Record<SetCategory, string> = {
  collares:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
  anillos:
    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=600&auto=format&fit=crop",
  aros: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  pulseras:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
};

export function CategorySelector() {
  const { activeCategory, selection, setActiveCategory } = useSetStore();

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-8">
        <p className="label-caps text-gold mb-2 tracking-widest">Paso 1 de 4</p>
        <h2 className="text-2xl font-serif text-onyx">
          ¿Con qué pieza quieres comenzar?
        </h2>
        <p className="text-sm text-charcoal/60 mt-1 font-light">
          Puedes elegir en cualquier orden — el set se forma a tu ritmo.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SET_STEPS.map((step, i) => {
          const isActive = activeCategory === step.category;
          const isSelected = selection[step.category] !== null;
          const selectedProduct = selection[step.category];

          return (
            <motion.button
              key={step.category}
              onClick={() => setActiveCategory(step.category)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative group text-left rounded-sm overflow-hidden cursor-pointer transition-all duration-300",
                isActive
                  ? "ring-2 ring-gold shadow-xl shadow-gold/20"
                  : isSelected
                  ? "ring-1 ring-gold/40 shadow-lg shadow-gold/10"
                  : "ring-1 ring-transparent hover:ring-gold/30 shadow-md hover:shadow-xl hover:shadow-gold/15"
              )}
            >
              {/* Image container — full bleed */}
              <div className="relative h-52 overflow-hidden bg-onyx">
                {/* Background photo */}
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-transform duration-700",
                    isActive || isSelected ? "scale-110" : "scale-100 group-hover:scale-110"
                  )}
                  style={{
                    backgroundImage: `url(${
                      selectedProduct?.images[0] ?? CATEGORY_IMAGES[step.category]
                    })`,
                  }}
                />

                {/* Permanent dark gradient scrim — bottom-heavy for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />

                {/* Active/hover gold vignette overlay */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-400",
                    isActive
                      ? "bg-gold/15 opacity-100"
                      : "bg-gold/10 opacity-0 group-hover:opacity-100"
                  )}
                />

                {/* Selected check badge — top right */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg z-10"
                  >
                    <Check className="w-4 h-4 text-onyx" strokeWidth={2.5} />
                  </motion.div>
                )}

                {/* Active gold border ring overlay */}
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute inset-0 border-2 border-gold/60 pointer-events-none z-10"
                  />
                )}

                {/* Bottom text content — overlaid on the gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  {/* Category label */}
                  <p
                    className={cn(
                      "font-serif text-lg leading-tight transition-colors duration-300",
                      isActive ? "text-gold" : "text-ivory group-hover:text-gold"
                    )}
                  >
                    {step.label}
                  </p>
                  {/* Product name or description */}
                  <p className="text-xs text-ivory/60 font-light mt-0.5 truncate">
                    {selectedProduct ? selectedProduct.name : step.description}
                  </p>
                </div>

                {/* Gold accent bottom line — animates in on active/hover */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-500",
                    isActive
                      ? "w-full"
                      : isSelected
                      ? "w-3/4"
                      : "w-0 group-hover:w-1/2"
                  )}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
