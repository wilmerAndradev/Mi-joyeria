"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function SetPreview() {
  return (
    <section className="relative py-24 bg-ivory text-onyx overflow-hidden border-y border-pearl-gray">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4 text-charcoal">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium tracking-wider uppercase">Experiencia Exclusiva</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-onyx">
              Diseña tu <span className="text-gold italic">Set Perfecto</span>
            </h2>
            <p className="text-charcoal text-lg mb-8 max-w-md font-normal">
              Combina anillos, collares y aros para crear una colección única. Disfruta de un 15% de descuento automático al armar tu set de 3 o más piezas.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-pearl-gray bg-white flex items-center justify-center text-sm font-serif text-charcoal shadow-sm">1</div>
                <p className="text-sm text-onyx">Elige un collar base</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-pearl-gray bg-white flex items-center justify-center text-sm font-serif text-charcoal shadow-sm">2</div>
                <p className="text-sm text-onyx">Agrega aros combinables</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-pearl-gray bg-white flex items-center justify-center text-sm font-serif text-charcoal shadow-sm">3</div>
                <p className="text-sm text-onyx">Completa con pulsera o anillo</p>
              </div>
            </div>

            <Link href="/arma-tu-set">
              <Button size="lg" className="group">
                Comenzar a Crear
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Visual Representation of the Set Builder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] bg-white rounded-lg border border-pearl-gray p-6 shadow-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center Piece (Necklace) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 w-48 h-48 rounded-full border-2 border-gold/30 bg-gold/80 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
              </motion.div>

              {/* Orbiting Pieces */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 w-[340px] h-[340px] rounded-full border border-dashed border-black/20"
              >
                {/* Ring */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-gold/40 bg-gold overflow-hidden shadow-xl" style={{ transform: 'translateX(-50%) rotate(-360deg)' }}>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f66156ce4?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                </div>
                
                {/* Earrings */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border border-gold/40 bg-gold overflow-hidden shadow-xl" style={{ transform: 'translateX(-50%) rotate(-360deg)' }}>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                </div>
              </motion.div>
            </div>

            {/* Savings Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-10 right-10 z-40 bg-onyx text-ivory font-serif font-medium w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg border border-gold/20"
            >
              <span className="text-xl leading-none text-gold">-15%</span>
              <span className="text-[10px] uppercase tracking-wider text-ivory/80 mt-1">Ahorro</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
