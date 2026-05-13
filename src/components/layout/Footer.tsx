"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-onyx text-ivory/60 pt-20 pb-10 border-t border-gold/15">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-serif text-gold tracking-wider uppercase mb-2">
              ALEAFAR
            </h3>
            <p className="font-serif italic text-ivory/80 text-sm mb-6 tracking-wide">
              Esto es tuyo. Siempre lo fue.
            </p>
            <p className="text-sm mb-6 leading-relaxed text-ivory/50">
              Alta joyería diseñada para realzar tu luz interior. Cada pieza es elaborada con metales preciosos y gemas certificadas de la más alta calidad.
            </p>
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase">
              <a
                href="#"
                className="text-ivory/40 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-ivory/40 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.2em] uppercase text-ivory mb-6">
              Colecciones
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/colecciones/anillos" className="text-ivory/50 hover:text-gold transition-colors duration-200">Anillos</Link></li>
              <li><Link href="/colecciones/collares" className="text-ivory/50 hover:text-gold transition-colors duration-200">Collares</Link></li>
              <li><Link href="/colecciones/pulseras" className="text-ivory/50 hover:text-gold transition-colors duration-200">Pulseras</Link></li>
              <li><Link href="/colecciones/aros" className="text-ivory/50 hover:text-gold transition-colors duration-200">Aros</Link></li>
              <li><Link href="/arma-tu-set" className="text-gold hover:text-gold/70 transition-colors duration-200">Arma tu Set ✦</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.2em] uppercase text-ivory mb-6">
              Atención al Cliente
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/faq" className="text-ivory/50 hover:text-gold transition-colors duration-200">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios" className="text-ivory/50 hover:text-gold transition-colors duration-200">Envíos y Entregas</Link></li>
              <li><Link href="/devoluciones" className="text-ivory/50 hover:text-gold transition-colors duration-200">Garantía y Devoluciones</Link></li>
              <li><Link href="/certificacion" className="text-ivory/50 hover:text-gold transition-colors duration-200">Certificación de Materiales</Link></li>
              <li><Link href="/contacto" className="text-ivory/50 hover:text-gold transition-colors duration-200">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.2em] uppercase text-ivory mb-6">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="text-ivory/50">Alonso de Córdova 1234, Vitacura, Santiago</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-ivory/50">+56 9 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-ivory/50">contacto@aleafar.cl</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with gold tint */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/30">
          <p>&copy; {new Date().getFullYear()} Aleafar Joyería. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-gold transition-colors duration-200">
              Políticas de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-gold transition-colors duration-200">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
