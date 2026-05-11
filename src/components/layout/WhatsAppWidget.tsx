"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasBecomeVisible, setHasBecomeVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // 1. Determinar si es una ruta válida (Homepage, PDPs, Checkout)
  const isValidPath = 
    pathname === "/" || 
    pathname?.startsWith("/productos/") || 
    pathname?.startsWith("/checkout");

  // 2. Timer de aparición (4 segundos al entrar a la web)
  useEffect(() => {
    if (!isValidPath || hasBecomeVisible) return;

    const timer = setTimeout(() => {
      setHasBecomeVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isValidPath, hasBecomeVisible]);

  // 3. Ocultar al hacer scroll
  useEffect(() => {
    if (!isValidPath || !hasBecomeVisible) return;

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // Solo ocultar en dispositivos móviles
      if (window.innerWidth >= 768) return;

      setIsScrolling(true);
      if (isOpen) setIsOpen(false); // Cerrar popup si se hace scroll
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 500); // Reaparece 500ms después de detener el scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isValidPath, hasBecomeVisible, isOpen]);

  const phoneNumber = "56912345678"; // Dummy phone number
  const defaultMessage = "Hola Lumière, me interesa consultar sobre...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // No renderizar si no es ruta válida o si no han pasado los 8s idle
  if (!isValidPath || !hasBecomeVisible) return null;

  return (
    <div 
      className={cn(
        "fixed right-4 bottom-20 md:right-6 md:bottom-6 z-[100] flex flex-col items-end transition-all duration-500 ease-in-out",
        isScrolling ? "translate-x-24 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
      )}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white border border-charcoal/30 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] mb-5 w-[300px] sm:w-[320px] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gold p-5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#C9A84C] opacity-10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center border border-[#C9A84C]/40 shadow-inner">
                  <span className="text-[#C9A84C] font-serif italic text-xl drop-shadow-sm">L</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white font-semibold tracking-wide text-base leading-tight drop-shadow-sm">Lumière Joyería</h3>
                  <p className="text-white/70 text-xs mt-0.5 font-light tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse shadow-[0_0_8px_rgba(201,168,76,0.8)]"></span>
                    Asesoría en línea
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 bg-[#f8f7f5] relative min-h-[120px]">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23000000\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] inline-block max-w-[90%] border border-[#C9A84C]/20 relative z-10"
              >
                <p className="text-[15px] text-gold font-medium leading-snug">¡Hola! 👋</p>
                <p className="text-sm text-gold/80 mt-1.5 leading-relaxed font-normal">¿En qué podemos ayudarte a brillar hoy?</p>
                <span className="text-[10px] text-[#C9A84C] block mt-2 font-medium text-right uppercase tracking-wider">Justo ahora</span>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-5 bg-white border-t border-charcoal/20">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gold text-black py-3.5 rounded-full flex items-center justify-center gap-2.5 text-[15px] font-semibold tracking-wide hover:bg-charcoal transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98] border border-gold hover:border-[#C9A84C]/50 group"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="w-5 h-5 text-[#C9A84C] group-hover:scale-110 transition-transform" />
                Iniciar Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-full shadow-[0_8px_25px_-5px_rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-all duration-300 relative group",
          isOpen ? "bg-gold hover:bg-charcoal shadow-gold/30" : "bg-gold hover:bg-charcoal shadow-[#C9A84C]/20"
        )}
        aria-label="Contactar por WhatsApp"
      >
        {/* Continuous pulse ring when closed (slower frequency) */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#C9A84C] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30 group-hover:opacity-0 transition-opacity"></span>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#C9A84C]" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7 text-[#C9A84C] drop-shadow-sm">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
