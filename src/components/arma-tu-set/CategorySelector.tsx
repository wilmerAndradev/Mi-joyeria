"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SET_STEPS, SetCategory, useSetStore } from "@/store/useSetStore";
import { cn } from "@/lib/utils";

const CATEGORY_IMAGES: Record<SetCategory, string> = {
  collares:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
  anillos:
    "https://images.unsplash.com/photo-1605100804763-247f66156ce4?q=80&w=600&auto=format&fit=crop",
  aros:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  pulseras:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
};

export function CategorySelector() {
  const { activeCategory, selection, setActiveCategory } = useSetStore();

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-8">
        <p className="label-caps text-charcoal mb-2">Paso 1 de 4</p>
        <h2 className="text-2xl font-serif text-onyx">
          ¿Con qué pieza quieres comenzar?
        </h2>
        <p className="text-sm text-charcoal/70 mt-1 font-light">
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
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative group text-left rounded-sm overflow-hidden border transition-all duration-300 cursor-pointer",
                isActive
                  ? "border-gold ring-1 ring-gold shadow-lg shadow-gold/20"
                  : isSelected
                  ? "border-gold/30 shadow-md"
                  : "border-charcoal hover:border-gold/30"
              )}
            >
              {/* Product image or placeholder */}
              <div className="relative h-44 overflow-hidden bg-charcoal/50">
                {/* Background image */}
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105",
                    isActive || isSelected ? "scale-105" : "scale-100"
                  )}
                  style={{
                    backgroundImage: `url(${
                      selectedProduct?.images[0] ?? CATEGORY_IMAGES[step.category]
                    })`,
                  }}
                />
                {/* Dark overlay */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive
                      ? "bg-gold/20"
                      : isSelected
                      ? "bg-gold/10"
                      : "bg-gold/30 group-hover:bg-gold/15"
                  )}
                />

                {/* Selected check badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-md z-10"
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </motion.div>
                )}

                {/* Active indicator ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute inset-0 border-2 border-gold pointer-events-none z-10"
                  />
                )}

                {/* Category symbol */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span
                    className={cn(
                      "font-serif text-2xl leading-none",
                      isActive ? "text-gold" : "text-black/80"
                    )}
                  >
                    {step.emoji}
                  </span>
                </div>
              </div>

              {/* Label */}
              <div
                className={cn(
                  "p-4 transition-colors duration-300",
                  isActive
                    ? "bg-gold text-black"
                    : isSelected
                    ? "bg-gold/5 text-gold"
                    : "bg-black text-gold"
                )}
              >
                <p
                  className={cn(
                    "font-serif text-base leading-tight",
                    isActive ? "text-black" : "text-gold"
                  )}
                >
                  {step.label}
                </p>
                <p
                  className={cn(
                    "text-xs font-light mt-0.5 truncate",
                    isActive ? "text-black/60" : "text-ivory/60"
                  )}
                >
                  {selectedProduct
                    ? selectedProduct.name
                    : step.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
