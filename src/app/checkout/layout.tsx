import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Lock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Finalizar Compra | LUMIÈRE",
  description: "Completa tu pedido de manera segura.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Minimal CRO Header — no nav links, no footer, no distractions */}
      <header className="bg-gold border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif italic text-xl tracking-[0.15em] text-black hover:text-gold transition-colors duration-300"
          >
            Lumière
          </Link>

          {/* Security badge — trust signal at the top */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="tel:+56912345678"
              className="hidden md:flex items-center gap-2 text-xs text-black/50 hover:text-black transition-colors tracking-widest uppercase"
            >
              <Phone className="w-3.5 h-3.5" />
              ¿Necesitas ayuda?
            </a>
            <div className="flex items-center gap-2 text-xs text-gold/80 tracking-widest uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compra 100% Segura</span>
              <span className="sm:hidden">Seguro</span>
            </div>
          </div>
        </div>
      </header>

      {/* CartDrawer still needed for store access */}
      <CartDrawer />

      {/* No padding-top needed since header is not fixed */}
      <main className="flex-1 w-full">{children}</main>
    </>
  );
}
