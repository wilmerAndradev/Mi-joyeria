"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import Image from "next/image";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-24 flex flex-col items-center justify-center px-6">
        <Heart className="w-16 h-16 text-charcoal mb-6 stroke-1" />
        <h1 className="text-3xl font-serif text-gold mb-4">Tu lista de deseos está vacía</h1>
        <p className="text-ivory/60 text-center max-w-md mb-8">
          Explora nuestras colecciones y guarda tus piezas favoritas para comprarlas más tarde.
        </p>
        <Link 
          href="/colecciones"
          className="bg-gold text-black px-8 py-3 uppercase tracking-widest text-xs hover:bg-gold transition-colors duration-300"
        >
          Descubrir Colecciones
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <div>
            <h1 className="text-4xl font-serif text-gold mb-2">Mi Wishlist</h1>
            <p className="text-ivory/60">{items.length} {items.length === 1 ? 'artículo' : 'artículos'} guardados</p>
          </div>
          <button 
            onClick={clearWishlist}
            className="text-sm text-ivory/60 hover:text-gold underline underline-offset-4 mt-4 md:mt-0 transition-colors"
          >
            Vaciar lista
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((product) => (
            <motion.div key={product.id} variants={itemVariants} className="group relative bg-white border border-charcoal/30 rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
              <Link href={`/productos/${product.slug}`} className="relative aspect-[4/5] block overflow-hidden bg-charcoal/20">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.images[0]}')` }}
                />
              </Link>
              
              <button 
                onClick={() => removeItem(product.id)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur flex items-center justify-center rounded-full text-ivory/60 hover:text-red-500 hover:bg-white transition-colors"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="p-5 flex flex-col flex-grow">
                <Link href={`/productos/${product.slug}`} className="block flex-grow">
                  <h3 className="font-serif text-lg text-gold mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-sm text-ivory/70 mb-3">{product.category}</p>
                </Link>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/30">
                  <span className="text-lg font-medium text-gold">{formatPrice(product.price)}</span>
                  <button 
                    onClick={() => addItemToCart(product)}
                    className="flex items-center gap-2 bg-gold text-black px-4 py-2 text-xs uppercase tracking-wider hover:bg-gold transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
