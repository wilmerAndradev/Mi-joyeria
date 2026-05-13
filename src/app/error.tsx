"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí se podría enviar el error a un servicio de reporte (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-serif text-3xl text-onyx mb-4">Algo salió mal</h1>
        <p className="text-charcoal mb-8">
          Ha ocurrido un error inesperado al procesar tu solicitud. Por favor, intenta de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-gold text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300"
          >
            Intentar de nuevo
          </button>
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
