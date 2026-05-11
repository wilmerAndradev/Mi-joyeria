"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulamos un delay de red y luego redirigimos al perfil
    setTimeout(() => {
      window.location.href = "/perfil";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna Izquierda - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-12">
            <Link href="/" className="font-serif italic text-2xl tracking-[0.15em] text-gold block mb-10">
              Lumière
            </Link>
            <h1 className="text-3xl font-serif text-gold mb-3">Bienvenido de nuevo</h1>
            <p className="text-gold/60 text-sm">
              Ingresa a tu cuenta para ver tus pedidos, lista de deseos y ofertas exclusivas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-gold/80">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" strokeWidth={1.5} />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-gold placeholder:text-gold/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold tracking-widest uppercase text-gold/80">
                  Contraseña
                </label>
                <Link href="#" className="text-xs text-gold hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" strokeWidth={1.5} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-gold placeholder:text-gold/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black py-4 rounded-xl font-medium tracking-wide hover:bg-charcoal transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-charcoal/30 text-center">
            <p className="text-gold/60 text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-gold font-medium hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Columna Derecha - Imagen */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?q=80&w=1200&auto=format&fit=crop"
          alt="Alta Joyería Lumière"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gold/20" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <blockquote className="text-2xl font-serif italic mb-4">
            "La joyería no cambia el mundo, pero sí cambia a las personas que la llevan."
          </blockquote>
          <p className="text-white/80 font-medium tracking-widest uppercase text-xs">
            — Colección Eterna
          </p>
        </div>
      </div>
    </div>
  );
}
