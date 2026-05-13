"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-pearl-gray rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-charcoal" />
        </div>
        <h1 className="font-serif text-3xl text-onyx mb-4">Página no encontrada</h1>
        <p className="text-charcoal mb-8">
          Lo sentimos, no pudimos encontrar la página que buscas. Es posible que haya sido movida o ya no exista.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/colecciones"
            className="bg-gold text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300"
          >
            Ver Colecciones
          </Link>
          <Link
            href="/"
            className="border border-onyx text-onyx px-8 py-3 text-xs tracking-widest uppercase hover:bg-onyx hover:text-ivory transition-colors duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
