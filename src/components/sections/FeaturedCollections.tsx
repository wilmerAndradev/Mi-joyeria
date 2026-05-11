"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    title: "Anillos de Compromiso",
    price: "Desde $450.000",
    image: "https://images.unsplash.com/photo-1605100804763-247f66156ce4?q=80&w=1000&auto=format&fit=crop",
    href: "/colecciones/anillos",
  },
  {
    title: "Alta Joyería",
    price: "Desde $890.000",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?q=80&w=1000&auto=format&fit=crop",
    href: "/colecciones/alta-joyeria",
  },
  {
    title: "Colección Esenciales",
    price: "Desde $120.000",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    href: "/colecciones/pulseras",
  },
];

export function FeaturedCollections() {
  return (
    /* Sección ivory: fondo claro elegante, títulos onyx, acentos gold */
    <section className="py-24 bg-ivory border-t border-pearl-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.35em] uppercase text-gold mb-3"
            >
              — Colecciones —
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-onyx mb-4"
            >
              Colecciones Exclusivas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-charcoal text-sm leading-relaxed max-w-md"
            >
              Descubre nuestras piezas más emblemáticas, donde la artesanía tradicional se encuentra con el diseño contemporáneo.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link href="/colecciones" className="group flex items-center text-sm font-medium tracking-wider uppercase text-onyx hover:text-gold transition-colors border-b border-onyx pb-0.5 hover:border-gold">
              Ver todo
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group overflow-hidden bg-pearl-gray rounded-sm h-[400px] md:h-[500px]"
            >
              <Link href={item.href} className="block w-full h-full">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                
                {/* Overlay: oscuro-abajo para legibilidad del título */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-gold text-sm font-normal transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 flex items-center gap-3">
                      {item.price}
                      <span className="w-6 h-px bg-gold inline-block" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
