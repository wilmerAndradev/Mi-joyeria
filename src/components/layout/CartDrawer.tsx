"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Shield,
  Package,
  RotateCcw,
  ChevronRight,
  Gem,
  Truck,
  Lock,
  Star,
  Check,
  Tag,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, PRODUCTS } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import confetti from "canvas-confetti";

// ── CRO Config ──────────────────────────────────────────────────────

const TIERS = [
  { threshold: 1000000, label: "5% OFF", icon: Tag, discount: 0.05, isFreeShipping: false },
  { threshold: 2000000, label: "10% OFF", icon: Tag, discount: 0.10, isFreeShipping: false },
  { threshold: 3000000, label: "Envío Gratis", icon: Truck, discount: 0.10, isFreeShipping: true }, // Maintains 10% and adds Free Shipping
];
const MAX_THRESHOLD = TIERS[TIERS.length - 1].threshold;

// Trust signals
const TRUST_SIGNALS = [
  { icon: Shield, label: "Compra segura" },
  { icon: RotateCcw, label: "Devolución 30 días" },
  { icon: Package, label: "Despacho 24-48 hrs" },
];

// Micro-upsell
const RECOMMENDED_IDS = ["1", "4", "10"];

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } =
    useCartStore();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [achievedTiers, setAchievedTiers] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  const subtotalValue = subtotal();
  
  // Fire confetti when a new tier is reached
  useEffect(() => {
    // Check which tiers are currently reached
    const newlyReached: number[] = [];
    const currentlyReached = TIERS.map((tier, index) => {
      if (subtotalValue >= tier.threshold) {
        if (!achievedTiers.includes(index)) {
          newlyReached.push(index);
        }
        return index;
      }
      return -1;
    }).filter(i => i !== -1);

    if (newlyReached.length > 0 && isOpen && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true
      });
      // Fire elegant confetti burst! Black, Gold, White
      myConfetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C9A84C', '#1c1c1c', '#ffffff'],
        disableForReducedMotion: true,
        gravity: 0.8,
        ticks: 200
      });
    }

    // Update state to match currently reached (allows firing again if they drop below and go back up)
    setAchievedTiers(currentlyReached);
  }, [subtotalValue, isOpen]); // React to subtotal changes
  
  // Calculate active benefits
  let activeDiscount = 0;
  let hasFreeShipping = false;
  let nextTier = TIERS[0];

  for (let i = 0; i < TIERS.length; i++) {
    if (subtotalValue >= TIERS[i].threshold) {
      activeDiscount = TIERS[i].discount;
      if (TIERS[i].isFreeShipping) hasFreeShipping = true;
      nextTier = TIERS[i + 1]; // Can be undefined if max tier reached
    } else {
      nextTier = TIERS[i];
      break;
    }
  }

  const discountAmount = subtotalValue * activeDiscount;
  const finalTotal = subtotalValue - discountAmount;
  
  // Progress bar calculation
  const progressPercent = Math.min(100, (subtotalValue / MAX_THRESHOLD) * 100);

  const recommendedProducts = PRODUCTS.filter(
    (p) =>
      RECOMMENDED_IDS.includes(p.id) && !items.find((i) => i.id === p.id)
  ).slice(0, 2);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleRemove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 300);
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-onyx/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-ivory shadow-2xl z-[70] flex flex-col"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[100]" />
            {/* ── Header ─────────────────────────────────────────── */}
            <div className="px-5 md:px-8 py-4 md:py-6 border-b border-pearl-gray flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 bg-onyx rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-onyx tracking-widest uppercase">
                    Tu Carrito
                  </h2>
                  <p className="text-sm text-charcoal tracking-wide mt-0.5">
                    {items.length === 0
                      ? "Vacío"
                      : `${items.reduce((s, i) => s + i.quantity, 0)} ${
                          items.reduce((s, i) => s + i.quantity, 0) === 1
                            ? "pieza seleccionada"
                            : "piezas seleccionadas"
                        }`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-pearl-gray flex items-center justify-center text-charcoal hover:text-gold hover:border-gold hover:bg-ivory transition-all duration-200"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Tiered Progress Rewards ──────────────────────── */}
            {items.length > 0 && (
              <div className="px-5 md:px-8 py-5 md:py-6 bg-pearl-gray/50 border-b border-pearl-gray shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="text-sm text-onyx">
                    {nextTier ? (
                      <span>
                        Faltan <span className="font-bold text-onyx">{formatPrice(nextTier.threshold - subtotalValue)}</span> para desbloquear <span className="font-semibold text-gold">{nextTier.label}</span>
                      </span>
                    ) : (
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-bold text-emerald-600 flex items-center gap-2"
                      >
                        ¡Felicidades! Tienes todos los beneficios <Check className="w-4 h-4" />
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-2 bg-gold/10 rounded-full mt-6 mb-8 mx-6 md:mx-8">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  {/* Checkpoints */}
                  {TIERS.map((tier, idx) => {
                    const isReached = subtotalValue >= tier.threshold;
                    const position = (tier.threshold / MAX_THRESHOLD) * 100;

                    return (
                      <div 
                        key={idx}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                        style={{ left: `${position}%` }}
                      >
                        {/* Icon Node */}
                        <motion.div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                            isReached 
                              ? "bg-gold border-gold text-white shadow-[0_0_10px_rgba(201,168,76,0.5)] scale-110" 
                              : "bg-white border-gold/20 text-gold/30"
                          }`}
                          initial={false}
                          animate={isReached ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.4 }}
                        >
                          {isReached ? <Check className="w-3.5 h-3.5" /> : <tier.icon className="w-3.5 h-3.5" />}
                        </motion.div>

                        {/* Label */}
                        <span className={`absolute top-8 text-[9px] md:text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-colors duration-300 ${
                          isReached ? "text-onyx" : "text-charcoal/50"
                        }`}>
                          {tier.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Scrollable Body ─────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* ── Empty State ── */
                <div className="flex flex-col items-center justify-center h-full px-6 md:px-10 text-center py-10 md:py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-pearl-gray flex items-center justify-center mb-6"
                  >
                    <Gem className="w-12 h-12 text-charcoal/40" />
                  </motion.div>
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-serif text-2xl text-onyx mb-3">
                      Tu joyero está vacío
                    </h3>
                    <p className="text-base text-charcoal leading-relaxed mb-8">
                      Descubre nuestras piezas únicas en oro 18k y diamantes
                      certificados.
                    </p>
                    <Link
                      href="/colecciones"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 bg-onyx text-ivory text-sm uppercase tracking-[0.25em] px-8 py-4 hover:bg-gold hover:text-onyx transition-all duration-300 font-medium rounded-sm"
                    >
                      Explorar Colección
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>

                  {/* Suggested in empty state */}
                  {recommendedProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="w-full mt-12 text-left"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50 mb-5">
                        Más vendidos
                      </p>
                      <div className="space-y-4">
                        {recommendedProducts.map((p) => (
                          <MiniProductCard
                            key={p.id}
                            product={p}
                            onClose={() => setIsOpen(false)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* ── Items List ── */
                <div className="px-5 md:px-8 py-4 md:py-6 mt-2 md:mt-4 space-y-5 md:space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: removingId === item.id ? 0 : 1,
                          y: 0,
                          x: removingId === item.id ? 30 : 0,
                        }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 md:gap-5 group"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-24 md:w-28 md:h-32 bg-pearl-gray rounded-md overflow-hidden shrink-0 shadow-sm border border-pearl-gray">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Qty badge */}
                          {item.quantity > 1 && (
                            <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-onyx text-ivory rounded-full text-xs flex items-center justify-center font-bold shadow-md">
                              {item.quantity}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-1.5">
                              <Link
                                href={`/productos/${item.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-semibold text-onyx tracking-tight hover:text-gold transition-colors leading-snug"
                              >
                                {item.name}
                              </Link>
                              <button
                                onClick={() => handleRemove(item.id)}
                                className="text-charcoal/40 hover:text-red-500 transition-colors shrink-0 mt-0.5 p-1"
                                aria-label="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs font-medium text-charcoal uppercase tracking-widest">
                              {item.material.split("·")[0].trim()}
                            </p>
                          </div>

                          <div className="flex justify-between items-end mt-3 md:mt-4">
                            {/* Quantity stepper */}
                            <div className="flex items-center border border-pearl-gray rounded-md overflow-hidden bg-white">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gold hover:text-onyx transition-all duration-200"
                                aria-label="Reducir cantidad"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-10 text-center text-sm font-semibold text-onyx select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-gold hover:text-onyx transition-all duration-200"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-base font-bold text-onyx">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs font-medium text-charcoal mt-0.5">
                                  {formatPrice(item.price)} c/u
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Divider */}
                  {recommendedProducts.length > 0 && (
                    <div className="border-t border-pearl-gray pt-6 mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50 mb-5">
                        También te puede gustar
                      </p>
                      <div className="space-y-4">
                        {recommendedProducts.map((p) => (
                          <MiniProductCard
                            key={p.id}
                            product={p}
                            onClose={() => setIsOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer ─────────────────────────────────────────── */}
            {items.length > 0 && (
              <div className="shrink-0 bg-white border-t border-pearl-gray px-5 md:px-8 py-5 md:py-6 space-y-4 md:space-y-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                {/* Order Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-charcoal tracking-wide font-medium">Subtotal</span>
                    <span className="font-semibold text-onyx">
                      {formatPrice(subtotalValue)}
                    </span>
                  </div>
                  
                  {activeDiscount > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gold font-medium tracking-wide">Descuento ({activeDiscount * 100}%)</span>
                      <span className="font-bold text-gold">
                        - {formatPrice(discountAmount)}
                      </span>
                    </motion.div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-charcoal font-medium">Envío</span>
                    <span
                      className={
                        hasFreeShipping
                          ? "text-emerald-600 font-bold tracking-wide uppercase text-xs"
                          : "text-charcoal italic"
                      }
                    >
                      {hasFreeShipping ? "Gratis" : "Calculado al pagar"}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-pearl-gray">
                  <span className="text-sm md:text-base font-bold text-charcoal uppercase tracking-widest">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-serif text-onyx">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="group relative w-full flex items-center justify-center gap-3 bg-onyx text-ivory py-4 rounded-sm text-sm uppercase tracking-[0.25em] font-semibold hover:bg-gold hover:text-onyx transition-all duration-300 overflow-hidden shadow-xl"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Finalizar compra segura</span>
                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  {/* Shimmer */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Link>

                {/* Trust Signals */}
                <div className="border-t border-pearl-gray pt-5">
                  <div className="flex justify-between items-center gap-3">
                    {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-2 text-center flex-1"
                      >
                        <Icon className="w-5 h-5 text-onyx" strokeWidth={1.5} />
                        <span className="text-xs font-medium text-charcoal leading-tight tracking-wide">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Mini Product Card (Upsell) ──────────────────────────────────── */
function MiniProductCard({
  product,
  onClose,
}: {
  product: (typeof PRODUCTS)[0];
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 group bg-white p-2 rounded-md border border-pearl-gray shadow-sm hover:border-gold transition-colors">
      <Link href={`/productos/${product.slug}`} onClick={onClose} className="shrink-0">
        <div className="relative w-16 h-16 bg-pearl-gray rounded overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/productos/${product.slug}`} onClick={onClose}>
          <p className="text-sm font-semibold text-onyx truncate leading-snug hover:text-gold transition-colors">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating)
                  ? "text-gold fill-gold"
                  : "text-pearl-gray"
              }`}
            />
          ))}
          <span className="text-xs font-medium text-charcoal ml-1">
            ({product.reviews})
          </span>
        </div>
        <p className="text-sm font-bold text-onyx mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      <button
        onClick={handleAdd}
        className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm ${
          added
            ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20"
            : "bg-pearl-gray border-pearl-gray text-onyx hover:border-gold hover:text-onyx hover:bg-gold shadow-sm"
        }`}
        aria-label="Añadir al carrito"
      >
        {added ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold"
          >
            ✓
          </motion.span>
        ) : (
          <Plus className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
