"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="bg-ivory flex items-center justify-center min-h-screen p-6 font-sans text-onyx">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-3xl text-onyx mb-4">Error Crítico</h1>
          <p className="text-charcoal mb-8">
            Lo sentimos, ha ocurrido un error fatal en la aplicación. Por favor, intenta recargar la página.
          </p>
          <button
            onClick={() => reset()}
            className="bg-gold text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300"
          >
            Recargar la página
          </button>
        </div>
      </body>
    </html>
  );
}
