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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop')" }}
      />
      {/* Gradient vignette — onyx bottom, transparent top */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent" />
      
      <ParticleCanvas />

      <div className="container relative z-10 mx-auto px-6 text-center flex flex-col items-center pb-24 md:pb-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-ivory leading-[1.05] tracking-tight drop-shadow-lg mb-6 text-center"
        >
          Elegancia <br className="md:hidden" /><span className="italic text-gold font-light">Atemporal</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm md:text-base lg:text-lg text-ivory/80 max-w-2xl mb-10 md:mb-12 font-light tracking-wide leading-relaxed drop-shadow-md text-center"
        >
          Alta joyería diseñada a mano en Chile. Oro de 18k y diamantes certificados para acompañar tus momentos más memorables.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          {/* CTA Primary */}
          <Button asChild size="lg" className="w-full sm:w-auto bg-gold text-onyx hover:bg-ivory hover:text-onyx transition-all duration-500 text-xs font-semibold tracking-[0.2em] uppercase px-12 h-14 rounded-sm shadow-[0_0_20px_rgba(201,168,76,0.15)]">
            <Link href="/colecciones">
              Explorar Colección
            </Link>
          </Button>
          {/* CTA Secondary */}
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-xs font-semibold tracking-[0.2em] uppercase border-ivory/30 text-ivory hover:bg-ivory hover:text-onyx transition-all duration-500 px-10 h-14 rounded-sm bg-transparent backdrop-blur-sm">
            <Link href="/arma-tu-set">
              Diseñar Mi Set
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
