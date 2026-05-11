"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    id: 1,
    name: "Valentina S.",
    location: "Santiago",
    text: "El anillo de compromiso superó todas nuestras expectativas. La asesoría fue increíble y el diamante brilla espectacular. Totalmente recomendados.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Camila M.",
    location: "Viña del Mar",
    text: "Compré un set de aros y collar para mi matrimonio. La calidad del oro blanco y la presentación del empaque me enamoraron desde que lo abrí.",
    rating: 5,
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Roberto A.",
    location: "Las Condes",
    text: "Excelente servicio al cliente. Me ayudaron a personalizar una pulsera para el aniversario con mi esposa. El certificado GIA da mucha tranquilidad.",
    rating: 5,
    date: "Hace 2 meses"
  }
];

export function SocialProof() {
  return (
    <section className="py-24 bg-ivory border-t border-pearl-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-onyx mb-4"
          >
            Voces de <span className="text-gold italic">Lumière</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium tracking-wider uppercase text-charcoal"
          >
            4.9/5 Basado en +200 Reseñas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white p-8 rounded-sm border border-pearl-gray flex flex-col h-full hover:border-gold/50 transition-colors shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-charcoal leading-relaxed font-normal flex-grow mb-6">
                "{review.text}"
              </p>
              <div className="mt-auto">
                <p className="font-serif font-semibold text-onyx text-lg">{review.name}</p>
                <p className="text-sm text-charcoal/80 uppercase tracking-wider">{review.location} • {review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
