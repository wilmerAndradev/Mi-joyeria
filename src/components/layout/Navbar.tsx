"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { SearchOverlay } from "./SearchOverlay";

const NAV_LINKS = [
  { name: "Anillos", href: "/colecciones/anillos" },
  { name: "Collares", href: "/colecciones/collares" },
  { name: "Pulseras", href: "/colecciones/pulseras" },
  { name: "Aros", href: "/colecciones/aros" },
  { name: "Arma tu Set", href: "/arma-tu-set" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const [mounted, setMounted] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ── All hooks must be called before any conditional return ──────────
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(!isHome);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHome) setIsScrolled(latest > 60);
  });

  React.useEffect(() => {
    setIsScrolled(!isHome || scrollY.get() > 60);
  }, [isHome, scrollY]);

  // ── Conditional render AFTER all hooks ──────────────────────────────
  if (pathname.startsWith("/admin")) return null;

  const totalItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  // Three visual states:
  // 1. home + not scrolled → fully transparent, ivory text (hero mode)
  // 2. home + scrolled    → onyx bg, ivory/gold text (scrolled mode)
  // 3. any other page     → onyx bg, ivory/gold text (always solid)
  const solid = isScrolled || !isHome;

  const textColor = "text-ivory";
  const textMuted = solid ? "text-ivory/70" : "text-ivory/80";

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-400",
        solid
          ? "bg-onyx/95 backdrop-blur-md py-4 border-b border-gold/20 shadow-sm"
          : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top transparent shimmer when over hero */}
      {!solid && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      )}

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button className={cn("md:hidden p-2 -ml-2", textColor)} aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className={cn("font-serif italic text-xl md:text-2xl tracking-[0.15em] font-normal hover:text-gold transition-colors duration-300", textColor)}
        >
          Aleafar
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs font-normal tracking-[0.1em] uppercase transition-colors hover:text-gold relative group",
                pathname.startsWith(link.href)
                  ? "text-gold"
                  : link.name === "Arma tu Set"
                  ? "text-gold"
                  : textMuted
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className={cn("flex items-center gap-5 md:gap-7", textMuted)}>
          <button 
            aria-label="Buscar" 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-gold transition-colors duration-200"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="relative hidden md:block hover:text-gold transition-colors duration-200">
            <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {mounted && wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-ivory text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/login" aria-label="Cuenta" className="hidden md:block hover:text-gold transition-colors duration-200">
            <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <button 
            aria-label="Carrito" 
            onClick={() => setIsOpen(true)}
            className="relative hover:text-gold transition-colors duration-200"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {mounted && totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-ivory text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
    </>
  );
}
