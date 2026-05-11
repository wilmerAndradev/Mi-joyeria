"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    /* SRS §7.5 — Newsletter: Fondo Onyx oscuro. Propuesta de valor clara.
       Input email + CTA Gold. "10% off en tu primera compra" */
    <section className="py-24 bg-pearl-gray relative overflow-hidden border-t border-gold/10">
      {/* Subtle radial glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white border border-gold/15 rounded-sm p-10 md:p-16 text-center shadow-xl"
        >
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-gold" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-onyx mb-4">
            El Mundo <span className="text-gold italic">Lumière</span>
          </h2>
          
          <p className="text-charcoal mb-8 max-w-lg mx-auto font-normal">
            Únete a nuestra lista exclusiva y recibe un{" "}
            <span className="text-gold font-semibold">10% de descuento</span> en tu primera compra,
            además de acceso anticipado a nuevas colecciones.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-pearl-gray text-onyx placeholder:text-charcoal/50 focus-visible:ring-gold"
            />
            <Button type="submit" className="whitespace-nowrap sm:w-auto w-full bg-onyx text-ivory hover:bg-gold hover:text-onyx transition-colors">
              {isSubmitted ? "¡Suscrito! ✓" : "Suscribirme"}
            </Button>
          </form>
          
          <p className="text-xs text-charcoal/60 uppercase tracking-wider mt-6">
            Al suscribirte, aceptas nuestras políticas de privacidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
