"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export function SetPreview() {
  return (
    <section className="relative py-24 bg-onyx text-ivory overflow-hidden border-y border-white/10">
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
            <div className="flex items-center gap-2 mb-4 text-ivory/70">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium tracking-wider uppercase">Experiencia Exclusiva</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-ivory">
              Diseña tu <span className="text-gold italic">Set Perfecto</span>
            </h2>
            <p className="text-ivory/70 text-lg mb-8 max-w-md font-normal">
              Combina anillos, collares y aros para crear una colección única. Disfruta de un 15% de descuento automático al armar tu set de 3 o más piezas.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-sm font-serif text-gold shadow-sm">1</div>
                <p className="text-sm text-ivory">Elige un collar base</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-sm font-serif text-gold shadow-sm">2</div>
                <p className="text-sm text-ivory">Agrega aros combinables</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-sm font-serif text-gold shadow-sm">3</div>
                <p className="text-sm text-ivory">Completa con pulsera o anillo</p>
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
            className="relative h-[380px] md:h-[500px] rounded-lg border border-white/5 p-4 md:p-6 shadow-2xl overflow-hidden group bg-gradient-to-b from-onyx/40 to-black/60 mt-8 lg:mt-0"
          >
            {/* Ambient glow behind circles */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gold/10 rounded-full blur-[40px] md:blur-[60px] group-hover:bg-gold/20 transition-colors duration-700" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center Piece (Necklace) */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 w-36 md:w-52 h-36 md:h-52 rounded-full border-[3px] border-gold/50 bg-onyx flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(201,168,76,0.3)] md:shadow-[0_0_50px_rgba(201,168,76,0.3)]"
              >
                <Image src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop" alt="Collar Base" fill className="object-cover hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 144px, 208px" />
              </motion.div>

              {/* Orbiting Pieces Container */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute z-20 w-[260px] md:w-[360px] h-[260px] md:h-[360px] rounded-full border border-dashed border-gold/30"
              >
                {/* Ring (Top) */}
                <motion.div 
                  className="absolute -top-8 md:-top-12 left-1/2 w-16 md:w-24 h-16 md:h-24 rounded-full border-2 border-gold/40 bg-onyx overflow-hidden shadow-xl" 
                  style={{ x: "-50%" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <Image src="https://images.unsplash.com/photo-1605100804763-247f66156ce4?q=80&w=200&auto=format&fit=crop" alt="Anillo" fill className="object-cover" sizes="(max-width: 768px) 64px, 96px" />
                </motion.div>
                
                {/* Earrings (Bottom Right) */}
                <motion.div 
                  className="absolute bottom-4 md:bottom-6 right-0 md:right-2 w-14 md:w-20 h-14 md:h-20 rounded-full border-2 border-gold/40 bg-onyx overflow-hidden shadow-xl" 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <Image src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop" alt="Aros" fill className="object-cover" sizes="(max-width: 768px) 56px, 80px" />
                </motion.div>

                {/* Bracelet (Bottom Left) */}
                <motion.div 
                  className="absolute bottom-4 md:bottom-6 left-0 md:left-2 w-14 md:w-20 h-14 md:h-20 rounded-full border-2 border-gold/40 bg-onyx overflow-hidden shadow-xl" 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <Image src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop" alt="Pulsera" fill className="object-cover" sizes="(max-width: 768px) 56px, 80px" />
                </motion.div>
              </motion.div>
            </div>

            {/* Savings Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 10 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-10 right-10 z-40 bg-gold text-onyx font-serif font-medium w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(201,168,76,0.3)] border border-white/20"
            >
              <span className="text-xl leading-none text-onyx">-15%</span>
              <span className="text-[10px] uppercase tracking-wider text-onyx/80 mt-1">Ahorro</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
