"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
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
    <div className="min-h-screen flex flex-row-reverse">
      {/* Columna Derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10">
            <Link href="/" className="font-serif italic text-2xl tracking-[0.15em] text-gold block mb-10">
              Aleafar
            </Link>
            <h1 className="text-3xl font-serif text-onyx mb-3">Únete a nosotros</h1>
            <p className="text-charcoal text-sm">
              Crea una cuenta para disfrutar de una experiencia de compra personalizada y beneficios exclusivos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-onyx">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" strokeWidth={1.5} />
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-onyx placeholder:text-charcoal/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-onyx">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" strokeWidth={1.5} />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-onyx placeholder:text-charcoal/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-onyx">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" strokeWidth={1.5} />
                <input
                  type="password"
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-12 pr-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-onyx placeholder:text-charcoal/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black py-4 rounded-xl font-medium tracking-wide hover:bg-charcoal transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Crear Cuenta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="text-[10px] text-charcoal/60 text-center mt-2">
              Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-charcoal/30 text-center">
            <p className="text-charcoal text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-gold font-medium hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Columna Izquierda - Imagen */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gold">
        <Image
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop"
          alt="Alta Joyería Aleafar - Creación"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gold/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-3xl font-serif mb-3 drop-shadow-md">El arte de lo eterno</h2>
          <p className="text-white/80 font-light max-w-md">
            Descubre piezas diseñadas con maestría, hechas para capturar tus momentos más preciados.
          </p>
        </div>
      </div>
    </div>
  );
}
