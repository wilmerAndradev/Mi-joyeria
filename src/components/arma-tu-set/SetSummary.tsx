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

  const nextTier = DISCOUNT_TIERS.find((t) => t.min > count);

  return (
    <aside className="w-full lg:w-[400px] shrink-0">
      <div className="sticky top-28 rounded-sm border border-pearl-gray overflow-hidden bg-ivory shadow-sm">

        {/* ── Header ─────────────────────────────────── */}
        <div className="px-6 py-6 border-b border-pearl-gray">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-serif text-onyx tracking-wide">
              Tu Set Aleafar
            </h3>
          </div>
          <p className="text-sm text-charcoal font-light ml-7">
            {count === 0
              ? "Selecciona al menos 2 piezas"
              : count === 1
              ? "1 pieza · Agrega 1 más para descuento"
              : `${count} piezas · ${pct}% de descuento aplicado`}
          </p>
        </div>

        {/* ── Discount tiers ─────────────────────────── */}
        <div className="px-6 py-6 border-b border-pearl-gray bg-white">
          <div className="flex justify-between mb-5">
            {DISCOUNT_TIERS.map((tier) => {
              const active = count >= tier.min;
              return (
                <div key={tier.min} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-500",
                      active
                        ? "border-gold bg-gold text-onyx shadow-md shadow-gold/20"
                        : "border-charcoal/30 text-charcoal bg-white"
                    )}
                  >
                    -{tier.pct}%
                  </div>
                  <span
                    className={cn(
                      "text-[11px] label-caps font-semibold tracking-widest",
                      active ? "text-gold" : "text-charcoal/70"
                    )}
                  >
                    {tier.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-pearl-gray rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
              animate={{ width: `${Math.min((count / 4) * 100, 100)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {nextTier && count < 4 && (
            <p className="text-xs text-onyx font-medium text-center mt-3 tracking-wide">
              ✦ {nextTier.min - count} pieza{nextTier.min - count > 1 ? "s" : ""} más para -{nextTier.pct}%
            </p>
          )}
        </div>

        {/* ── Selected items ─────────────────────────── */}
        <div className="px-6 py-5 space-y-3 min-h-[240px]">
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
                    /* ── Filled slot ── */
                    <div className="flex items-center gap-4 group p-2 rounded-sm hover:bg-pearl-gray/30 transition-colors">
                      <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-pearl-gray/30 shrink-0 border border-pearl-gray shadow-sm">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-serif text-onyx leading-tight truncate">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-charcoal/50 label-caps mt-0.5">
                          {step.label}
                        </p>
                        <p className="text-sm font-semibold text-gold mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeProduct(step.category as SetCategory)}
                        className="w-7 h-7 rounded-full border border-pearl-gray flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-onyx hover:bg-onyx hover:text-ivory shrink-0"
                        aria-label="Eliminar pieza"
                      >
                        <X className="w-3.5 h-3.5 text-charcoal group-hover:text-ivory transition-colors" />
                      </button>
                    </div>
                  ) : (
                    /* ── Empty slot — improved contrast ── */
                    <div className="flex items-center gap-4 p-2">
                      {/* Dashed placeholder thumbnail */}
                      <div className="w-14 h-14 rounded-sm border-2 border-dashed border-charcoal/25 bg-pearl-gray/40 flex items-center justify-center shrink-0">
                        <span className="text-lg text-charcoal/40 select-none">
                          {step.emoji}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-charcoal font-medium">
                          Sin {step.label.toLowerCase()}
                        </p>
                        <p className="text-xs text-charcoal/50 font-light mt-0.5">
                          Selecciona una pieza arriba
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Totals ─────────────────────────────────── */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-5 border-t border-pearl-gray space-y-3 bg-white"
            >
              <div className="flex justify-between text-sm text-charcoal/60 font-light">
                <span>Subtotal</span>
                <span>{formatPrice(originalTotal)}</span>
              </div>
              {pct > 0 && (
                <div className="flex justify-between text-sm text-gold font-semibold">
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

        {/* ── CTA ────────────────────────────────────── */}
        <div className="px-6 pb-6 pt-3 space-y-3 bg-ivory">
          <button
            onClick={handleAddToCart}
            disabled={count === 0}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-300 rounded-sm tracking-[0.1em] uppercase",
              count >= 2
                ? "bg-gold text-onyx hover:brightness-105 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
                : count === 1
                ? "bg-onyx text-ivory hover:bg-charcoal"
                : "bg-pearl-gray text-charcoal/50 cursor-not-allowed border border-charcoal/15"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
            {count === 0
              ? "Selecciona piezas"
              : count === 1
              ? "Agregar al carrito"
              : "Agregar set al carrito"}
            {count >= 2 && <ChevronRight className="w-4 h-4 ml-1" />}
          </button>

          {count > 0 && (
            <button
              onClick={clearSet}
              className="w-full text-center text-xs label-caps text-charcoal/40 hover:text-onyx transition-colors py-1.5"
            >
              Vaciar set
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Floating Action Bar ────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-pearl-gray p-4 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="flex justify-between items-center mb-3 px-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-0.5">
              Total ({count} {count === 1 ? 'pieza' : 'piezas'})
            </p>
            <p className="text-lg font-bold text-onyx leading-none">{formatPrice(finalTotal)}</p>
          </div>
          {pct > 0 && (
            <div className="bg-gold text-onyx text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-sm shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              -{pct}% OFF
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={count === 0}
          className={cn(
            "w-full h-12 text-xs font-semibold transition-all duration-300 rounded-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2",
            count >= 2
              ? "bg-gold text-onyx"
              : count === 1
              ? "bg-onyx text-ivory"
              : "bg-pearl-gray text-charcoal/50 cursor-not-allowed"
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          {count === 0 ? "SELECCIONA PIEZAS" : count === 1 ? "AGREGAR AL CARRITO" : "AGREGAR SET"}
        </button>
      </div>
    </aside>
  );
}
