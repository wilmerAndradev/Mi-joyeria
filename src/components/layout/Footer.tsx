"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    /* SRS §7.5 Homepage — Footer: fondo Ivory claro, texto Onyx/Charcoal */
    <footer className="bg-ivory text-charcoal/70 pt-20 pb-10 border-t border-pearl-gray">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-serif text-onyx tracking-wider uppercase mb-6">LUMIÈRE</h3>
            <p className="text-sm mb-6 leading-relaxed text-charcoal/70">
              Alta joyería diseñada para realzar tu luz interior. Cada pieza es elaborada con metales preciosos y gemas certificadas de la más alta calidad.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium tracking-wider uppercase">
              <a href="#" className="text-charcoal/60 hover:text-onyx transition-colors" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className="text-charcoal/60 hover:text-onyx transition-colors" aria-label="Facebook">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif text-onyx mb-6">Colecciones</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/colecciones/anillos" className="text-charcoal/60 hover:text-onyx transition-colors">Anillos</Link></li>
              <li><Link href="/colecciones/collares" className="text-charcoal/60 hover:text-onyx transition-colors">Collares</Link></li>
              <li><Link href="/colecciones/pulseras" className="text-charcoal/60 hover:text-onyx transition-colors">Pulseras</Link></li>
              <li><Link href="/colecciones/aros" className="text-charcoal/60 hover:text-onyx transition-colors">Aros</Link></li>
              <li><Link href="/arma-tu-set" className="text-gold hover:text-gold/80 transition-colors">Arma tu Set</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-serif text-onyx mb-6">Atención al Cliente</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/faq" className="text-charcoal/60 hover:text-onyx transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios" className="text-charcoal/60 hover:text-onyx transition-colors">Envíos y Entregas</Link></li>
              <li><Link href="/devoluciones" className="text-charcoal/60 hover:text-onyx transition-colors">Garantía y Devoluciones</Link></li>
              <li><Link href="/certificacion" className="text-charcoal/60 hover:text-onyx transition-colors">Certificación de Materiales</Link></li>
              <li><Link href="/contacto" className="text-charcoal/60 hover:text-onyx transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif text-onyx mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="text-charcoal/70">Alonso de Córdova 1234, Vitacura, Santiago</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-charcoal/70">+56 9 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-charcoal/70">contacto@lumierejoyeria.cl</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pearl-gray pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal/50">
          <p>&copy; {new Date().getFullYear()} Lumière Joyería. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-onyx transition-colors">Políticas de Privacidad</Link>
            <Link href="/terminos" className="hover:text-onyx transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
