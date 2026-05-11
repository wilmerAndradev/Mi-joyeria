"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ShoppingBag, Sparkles, ChevronRight } from "lucide-react";
import { formatPrice } from "@/data/products";
import { SET_STEPS, SetCategory, useSetStore } from "@/store/useSetStore";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

const DISCOUNT_TIERS = [
  { min: 2, pct: 10, label: "2 piezas" },
  { min: 3, pct: 15, label: "3 piezas" },
  { min: 4, pct: 20, label: "Set completo" },
];

export function SetSummary() {
  const {
    selection,
    removeProduct,
    selectedCount,
    subtotalOriginal,
    discountPercent,
    discountAmount,
    subtotalWithDiscount,
    selectedProducts,
    clearSet,
  } = useSetStore();

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setIsOpen);

  const count = selectedCount();
  const originalTotal = subtotalOriginal();
  const pct = discountPercent();
  const discountAmt = discountAmount();
  const finalTotal = subtotalWithDiscount();
  const products = selectedProducts();

  const handleAddToCart = () => {
    products.forEach((p) => addItem(p));
    setCartOpen(true);
  };

  // Next discount tier
  const nextTier = DISCOUNT_TIERS.find((t) => t.min > count);

  return (
    <aside className="w-full lg:w-[400px] shrink-0">
      <div className="sticky top-28 rounded-sm border border-pearl-gray overflow-hidden bg-white shadow-sm">
        {/* Header */}
        <div className="bg-pearl-gray/30 px-6 py-6 border-b border-pearl-gray">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-onyx" />
            <h3 className="text-xl font-serif text-onyx tracking-wide">
              Tu Set Lumière
            </h3>
          </div>
          <p className="text-sm text-charcoal/60 mt-1 font-light">
            {count === 0
              ? "Selecciona al menos 2 piezas"
              : count === 1
              ? "1 pieza · Agrega 1 más para obtener descuento"
              : `${count} piezas · ${pct}% de descuento aplicado`}
          </p>
        </div>

        {/* Discount progress */}
        <div className="px-6 py-5 border-b border-pearl-gray bg-white">
          <div className="flex justify-between mb-4">
            {DISCOUNT_TIERS.map((tier) => (
              <div key={tier.min} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-500",
                    count >= tier.min
                      ? "border-onyx bg-onyx text-ivory shadow-sm shadow-onyx/10"
                      : "border-pearl-gray text-charcoal/40"
                  )}
                >
                  -{tier.pct}%
                </div>
                <span className="text-xs text-charcoal/60 label-caps font-medium">
                  {tier.label}
                </span>
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-pearl-gray rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-onyx rounded-full"
              animate={{ width: `${Math.min((count / 4) * 100, 100)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          {nextTier && count < 4 && (
            <p className="text-xs text-onyx mt-3 font-medium text-center">
              ✦ {nextTier.min - count} pieza{nextTier.min - count > 1 ? "s" : ""} más para -{nextTier.pct}%
            </p>
          )}
        </div>

        {/* Selected items */}
        <div className="px-6 py-5 space-y-4 min-h-[220px]">
          <AnimatePresence>
            {SET_STEPS.map((step) => {
              const product = selection[step.category as SetCategory];
              return (
                <motion.div
                  key={step.category}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {product ? (
                    <div className="flex items-center gap-4 group">
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden bg-pearl-gray/30 shrink-0 border border-pearl-gray shadow-sm">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-serif text-onyx leading-tight truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-charcoal/50 font-light label-caps mt-1">
                          {step.label}
                        </p>
                        <p className="text-sm font-medium text-onyx mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeProduct(step.category as SetCategory)}
                        className="w-7 h-7 rounded-full border border-pearl-gray flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-onyx hover:bg-onyx hover:text-ivory shrink-0"
                      >
                        <X className="w-4 h-4 text-charcoal/40 hover:text-ivory transition-colors" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 opacity-80 group hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-sm border border-dashed border-pearl-gray/50 bg-pearl-gray/10 flex items-center justify-center shrink-0 transition-colors group-hover:border-pearl-gray">
                        <span className="font-serif text-2xl text-charcoal/20">
                          {step.emoji}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-charcoal/80 font-medium">
                          Sin {step.label.toLowerCase()}
                        </p>
                        <p className="text-xs text-charcoal/50 font-light mt-0.5">
                          Selecciona arriba
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Totals */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-5 border-t border-pearl-gray space-y-3"
            >
              <div className="flex justify-between text-sm text-charcoal/70 font-light">
                <span>Subtotal</span>
                <span>{formatPrice(originalTotal)}</span>
              </div>
              {pct > 0 && (
                <div className="flex justify-between text-sm text-onyx font-medium">
                  <span>Descuento set ({pct}%)</span>
                  <span>-{formatPrice(discountAmt)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-serif text-onyx pt-2 border-t border-pearl-gray">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="px-6 pb-6 pt-2 space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={count === 0}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-4 text-base font-medium transition-all duration-300 rounded-sm",
              count >= 2
                ? "bg-onyx text-ivory hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                : count === 1
                ? "bg-onyx text-ivory hover:bg-charcoal"
                : "bg-pearl-gray text-charcoal/50 cursor-not-allowed"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            {count === 0
              ? "Selecciona piezas"
              : count === 1
              ? "Agregar al carrito"
              : `Agregar set al carrito`}
            {count >= 2 && <ChevronRight className="w-5 h-5 ml-1" />}
          </button>

          {count > 0 && (
            <button
              onClick={clearSet}
              className="w-full text-center text-xs label-caps text-charcoal/50 hover:text-onyx transition-colors py-2"
            >
              Vaciar set
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
