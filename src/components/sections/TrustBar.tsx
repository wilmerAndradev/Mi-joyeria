"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Truck, Clock, RefreshCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Materiales Certificados",
    description: "Oro 18k y diamantes GIA",
  },
  {
    icon: Truck,
    title: "Envío Asegurado",
    description: "A todo Chile sin costo",
  },
  {
    icon: Clock,
    title: "Garantía 1 Año",
    description: "Mantenimiento incluido",
  },
  {
    icon: RefreshCcw,
    title: "30 Días Devolución",
    description: "Satisfacción garantizada",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function TrustBar() {
  return (
    /* SRS §7.5 — Barra de Confianza: franja con 4 íconos, fondo ivory/gold-light,
       comunica autoridad en segundos */
    <section className="bg-ivory py-12 border-y border-pearl-gray">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 shadow-sm flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md border border-gold/20">
                  <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-medium text-onyx mb-1">{item.title}</h3>
                <p className="text-sm text-charcoal font-normal">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
