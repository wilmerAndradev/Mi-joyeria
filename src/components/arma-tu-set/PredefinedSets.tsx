"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useSetStore } from "@/store/useSetStore";
import { formatPrice } from "@/data/products";

const PREDEFINED_SETS = [
  {
    id: "diamante-clasico",
    name: "Clásico Diamante",
    description: "La elegancia atemporal del oro blanco y diamantes para brillar en ocasiones especiales.",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop",
    productIds: ["1", "4", "7", "10"],
  },
  {
    id: "oro-everyday",
    name: "Oro Everyday",
    description: "Minimalismo en oro amarillo 18k, diseñado para acompañarte todos los días.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    productIds: ["3", "6", "9", "11"],
  },
  {
    id: "elegancia-zafiro",
    name: "Elegancia Zafiro",
    description: "El azul profundo del zafiro combinado con plata y oro blanco para un toque sofisticado.",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800&auto=format&fit=crop",
    productIds: ["2", "5", "8", "12"],
  },
];

export function PredefinedSets() {
  const applyPredefinedSet = useSetStore((s) => s.applyPredefinedSet);

  const handleApplySet = (productIds: string[]) => {
    const productsToApply = PRODUCTS.filter((p) => productIds.includes(p.id));
    applyPredefinedSet(productsToApply);
    
    // Scroll smoothly to the main builder area
    window.scrollTo({ top: document.getElementById("builder-area")?.offsetTop || 400, behavior: "smooth" });
  };

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-gold" />
        <h2 className="text-2xl font-serif text-onyx">Inspiración por Ocasión</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PREDEFINED_SETS.map((set, i) => {
          const productsInSet = PRODUCTS.filter((p) => set.productIds.includes(p.id));
          const originalPrice = productsInSet.reduce((acc, p) => acc + p.price, 0);
          const finalPrice = originalPrice * 0.8; // 20% discount for 4 items

          return (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-sm border border-pearl-gray bg-white overflow-hidden flex flex-col hover:border-gold/50 transition-colors shadow-sm"
            >
              <div className="relative h-48 w-full bg-pearl-gray/30 overflow-hidden">
                <Image
                  src={set.image}
                  alt={set.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-serif text-white">{set.name}</h3>
                  <p className="text-xs text-white/80 font-light mt-1">{set.description}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex -space-x-2 mb-4">
                  {productsInSet.map((p) => (
                    <div key={p.id} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-pearl-gray">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-lg font-medium text-onyx">{formatPrice(finalPrice)}</span>
                    <span className="text-xs text-charcoal/50 line-through mb-1">{formatPrice(originalPrice)}</span>
                  </div>
                  <button
                    onClick={() => handleApplySet(set.productIds)}
                    className="w-full py-2.5 border border-onyx text-onyx text-sm font-medium hover:bg-onyx hover:text-ivory transition-colors flex items-center justify-center gap-2 rounded-sm"
                  >
                    Aplicar este set
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
