"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function ParticleCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#C9A84C"; // Gold particles
      
      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
}

export function Hero() {
  return (
    /* SRS §7.5 — Hero: Fondo negro full-viewport. Fotografía ambiental.
       Headline elegante en serif. 2 CTAs. Sin distracciones. */
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-onyx text-ivory">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?q=80&w=2000&auto=format&fit=crop')" }}
      />
      {/* Gradient vignette — onyx bottom, transparent top */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent" />
      
      <ParticleCanvas />

      <div className="container relative z-10 mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-3 text-xs font-normal tracking-[0.35em] text-gold/80 uppercase"
        >
          <span className="w-6 h-px bg-gold/40" />
          Colección Otoño — Invierno
          <span className="w-6 h-px bg-gold/40" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-ivory mb-8 leading-[1.1] max-w-3xl tracking-tight"
        >
          El Arte de <br className="hidden md:block" /> lo <span className="italic text-gold">Eterno</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm md:text-base text-ivory/70 max-w-md mb-12 font-normal tracking-wide leading-loose"
        >
          Joyería fina diseñada en Chile. Metales nobles y diamantes certificados para acompañar tus momentos más memorables.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* CTA Primary — Fondo Onyx, texto Ivory (SRS § 7.4 Primary) */}
          <Button asChild size="lg" className="bg-gold text-onyx hover:brightness-110 text-xs font-normal tracking-[0.3em] uppercase px-10">
            <Link href="/colecciones">
              Ver Colección
            </Link>
          </Button>
          {/* CTA Secondary — Borde gold, texto gold (SRS § 7.4 Secondary) */}
          <Button asChild size="lg" variant="outline" className="text-xs font-normal tracking-[0.3em] uppercase border-ivory/30 text-ivory hover:bg-ivory hover:text-onyx px-10">
            <Link href="/arma-tu-set">
              Arma tu Set
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-xs tracking-wider uppercase text-ivory/60 mb-2">Descubrir</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
