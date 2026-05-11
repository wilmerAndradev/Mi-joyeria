"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, formatPrice } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Search logic
  const searchResults = query.trim() === "" 
    ? [] 
    : PRODUCTS.filter((product) => {
        const searchTerms = query.toLowerCase().split(" ");
        const productText = `${product.name} ${product.category} ${product.subcategory} ${product.material} ${product.tags.join(" ")}`.toLowerCase();
        
        return searchTerms.every(term => productText.includes(term));
      }).slice(0, 5); // Limit to 5 results

  const popularSearches = [
    "Anillo de compromiso",
    "Oro blanco",
    "Pulsera tennis",
    "Zafiro",
    "Regalo",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6 md:pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Cerrar fondo"
          />

          {/* Search Box / Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[70vh] border border-pearl-gray"
          >
            {/* Input Header */}
            <div className="relative flex items-center p-4 border-b border-pearl-gray bg-white z-10 shrink-0">
              <Search className="w-6 h-6 text-charcoal/40 ml-2 shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar joyas, colecciones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-onyx text-xl placeholder:text-charcoal/40 px-4 focus:outline-none"
              />
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="text-xs font-medium text-charcoal/60 hover:text-onyx transition-colors px-2"
                >
                  Limpiar
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 ml-2 text-charcoal/50 hover:text-onyx bg-pearl-gray/30 rounded-full hover:bg-pearl-gray transition-colors shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Results Body */}
            <div className="overflow-y-auto p-4 md:p-6 bg-ivory grow">
              {query === "" ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal/60 px-2">Búsquedas Populares</h3>
                  <div className="flex flex-wrap gap-2 px-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-white border border-pearl-gray rounded-lg text-sm text-onyx hover:border-onyx hover:text-onyx transition-colors shadow-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal/60">Resultados ({searchResults.length})</h3>
                    <button className="text-xs font-medium text-onyx hover:text-gold flex items-center gap-1 transition-colors">
                      Ver todos <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <ul className="flex flex-col gap-2">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <Link 
                          href={`/productos/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-pearl-gray/20 border border-transparent hover:border-pearl-gray hover:shadow-sm transition-all group"
                        >
                          <div className="w-14 h-14 bg-pearl-gray/30 rounded-md overflow-hidden shrink-0">
                            <Image 
                              src={product.images[0]} 
                              alt={product.name} 
                              width={60} 
                              height={60} 
                              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-onyx truncate group-hover:text-onyx transition-colors">{product.name}</h4>
                            <p className="text-xs text-charcoal/60 truncate mt-0.5">{product.material}</p>
                          </div>
                          <div className="text-right shrink-0 flex flex-col items-end">
                            <p className="font-medium text-sm text-onyx">{formatPrice(product.price)}</p>
                            <ChevronRight className="w-4 h-4 text-charcoal/30 group-hover:text-onyx group-hover:translate-x-1 transition-all mt-1" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <Search className="w-5 h-5 text-charcoal/30" />
                  </div>
                  <p className="text-base text-onyx font-medium">No se encontraron resultados</p>
                  <p className="text-sm text-charcoal/60 mt-1">Intenta con "oro", "anillo" o "diamante".</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
