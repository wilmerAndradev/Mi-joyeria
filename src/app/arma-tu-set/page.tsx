"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CategorySelector } from "@/components/arma-tu-set/CategorySelector";
import { ProductGrid } from "@/components/arma-tu-set/ProductGrid";
import { SetSummary } from "@/components/arma-tu-set/SetSummary";
import { PredefinedSets } from "@/components/arma-tu-set/PredefinedSets";

export default function ArmatuSetPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Page Hero ─────────────────────────────────────── */}
      <section className="relative bg-onyx pt-28 pb-16 overflow-hidden border-b border-gold/20">
        {/* Ambient gold glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/8 rounded-full blur-[80px] pointer-events-none" />
        {/* Fine diagonal grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3L3 1' stroke='%23C9A84C' stroke-width='0.5'/%3E%3C/svg%3E\")" }} />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/colecciones"
              className="inline-flex items-center gap-2 text-ivory/40 hover:text-gold transition-colors text-xs label-caps group"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Volver al catálogo
            </Link>
          </motion.div>

          {/* Heading */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-4 text-gold"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="label-caps tracking-widest text-gold/70">Experiencia exclusiva</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-ivory leading-tight mb-4"
            >
              Arma tu{" "}
              <em className="text-gold not-italic">Set Perfecto</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-ivory/60 text-base font-light max-w-lg leading-relaxed"
            >
              Combina piezas de distintas categorías y obtén hasta un{" "}
              <strong className="text-gold font-semibold">20% de descuento</strong>{" "}
              automático al completar tu set.
            </motion.p>
          </div>

          {/* Discount tiers badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {[
              { label: "2 piezas", pct: "10% OFF" },
              { label: "3 piezas", pct: "15% OFF" },
              { label: "Set completo (4)", pct: "20% OFF" },
            ].map((tier, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-gold/30 px-4 py-2 rounded-sm bg-white/5 backdrop-blur-sm"
              >
                <span className="label-caps text-ivory/50">{tier.label}</span>
                <span className="text-gold text-xs font-semibold tracking-wider">{tier.pct}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main Builder ──────────────────────────────────── */}
      <section className="container mx-auto px-6 py-12" id="builder-area">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left / Main area */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Category Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CategorySelector />
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-pearl-gray" />
              <span className="label-caps text-charcoal/50 text-[10px]">
                Productos disponibles
              </span>
              <div className="flex-1 h-px bg-pearl-gray" />
            </div>

            {/* Product Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProductGrid />
            </motion.div>
          </div>

          {/* Right / Set Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-auto"
          >
            <SetSummary />
          </motion.div>
        </div>
      </section>

      {/* ── Predefined Sets (Moved Below) ─────────────────── */}
      <section className="container mx-auto px-6 pb-12">
        <PredefinedSets />
      </section>

      {/* ── Bottom note ───────────────────────────────────── */}
      <div className="border-t border-pearl-gray py-6 mt-4 pb-32 lg:pb-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-[13px] text-charcoal/70 font-light">
            ✦ Los descuentos de set se aplican automáticamente al agregar al carrito · Válido para sets de 2 a 4 piezas de distintas categorías
          </p>
        </div>
      </div>
    </div>
  );
}
