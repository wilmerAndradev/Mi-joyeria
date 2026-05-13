"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCTS, formatPrice, type Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

function BestsellerCard({ product, index, isInView }: { product: Product; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const addWishlist = useWishlistStore((state) => state.addItem);
  const removeWishlist = useWishlistStore((state) => state.removeItem);
  const items = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted ? items.some((item) => item.id === product.id) : false;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeWishlist(product.id);
    } else {
      addWishlist(product);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start group cursor-pointer flex flex-col relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] bg-white p-3 rounded-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setImageIndex(0);
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-pearl-gray/30 mb-4 rounded-sm">
        {product.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="relative overflow-hidden bg-onyx text-white px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase inline-block shadow-sm">
              <span className="relative z-10">{product.badge.replace("-", " ")}</span>
              {/* Shimmer effect right to left (dorado, on hover, perfectly squared) */}
              <div className="absolute top-0 left-[100%] z-0 bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-transparent w-[150%] h-full skew-x-[-45deg] opacity-0 group-hover:opacity-100 group-hover:-translate-x-[200%] transition-all duration-[1500ms] ease-in-out pointer-events-none" />
            </span>
          </div>
        )}

        <button
          onClick={toggleWishlist}
          className={cn(
            "absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300",
            isWishlisted ? "text-red-500 opacity-100" : "text-charcoal opacity-0 group-hover:opacity-100 hover:text-red-500"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Star className="w-4 h-4 hidden" /> {/* dummy to avoid unused import error later, actually we can just use Heart */}
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>
        
        {/* Images with Gallery/Carousel functionality */}
        <Link href={`/productos/${product.slug}`}>
          <AnimatePresence initial={false}>
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
              style={{ backgroundImage: `url('${product.images[imageIndex]}')` }}
            />
          </AnimatePresence>
          {/* Diagonal shimmer effect — sweeps left→right on hover */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            <div className="
              absolute top-0 -left-full h-full w-1/2
              bg-gradient-to-r from-transparent via-white/25 to-transparent
              skew-x-[-20deg]
              opacity-0 group-hover:opacity-100
              group-hover:translate-x-[350%]
              transition-all duration-[1500ms] ease-in-out
            " />
          </div>
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        </Link>

        {/* Carousel Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center text-gold shadow-md transition-all duration-300 hover:bg-black hover:scale-110",
                hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
              )}
            >
              <ChevronLeft className="w-4 h-4 pr-0.5" />
            </button>
            <button
              onClick={nextImage}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center text-gold shadow-md transition-all duration-300 hover:bg-black hover:scale-110",
                hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
              )}
            >
              <ChevronRight className="w-4 h-4 pl-0.5" />
            </button>
          </>
        )}

        {/* Add to cart quick action */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30 pointer-events-none">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full bg-onyx text-ivory py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold hover:text-onyx transition-colors shadow-xl flex items-center justify-center gap-2 pointer-events-auto"
          >
            <ShoppingBag className="w-4 h-4" /> Compra Rápida
          </button>
        </div>
      </div>

      <div className="text-left flex flex-col flex-grow px-1">
        {/* Star Rating Section */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-gold' : 'fill-transparent'}`} />
            ))}
          </div>
          <span className="text-[11px] text-charcoal ml-1">({product.reviews})</span>
        </div>

        <Link href={`/productos/${product.slug}`} className="block">
          <h3 className="font-serif text-[15px] text-onyx mb-1.5 hover:text-gold transition-colors leading-snug">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-3">
            <span className="text-[17px] font-medium text-onyx tracking-wide">{formatPrice(product.price)}</span>
          </div>
          <p className="text-[11px] text-charcoal mt-1">6 cuotas sin interés</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Bestsellers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const bestsellers = PRODUCTS.filter(p => p.badge === "bestseller").slice(0, 8);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we're at the end (with a small 10px threshold)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll approximately one card width smoothly
          scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 bg-white border-t border-pearl-gray overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-4xl font-serif text-onyx mb-4"
          >
            Los Más Deseados
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-charcoal text-sm"
          >
            Las piezas favoritas de nuestros clientes.
          </motion.p>
        </div>
        
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-pearl-gray flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors shadow-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-pearl-gray flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition-colors shadow-sm"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 md:px-12 pb-8 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product, index) => (
            <BestsellerCard key={product.id} product={product} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
