"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { PRODUCTS } from "@/data/products";


const SHOPPABLE_VIDEOS = [
  {
    id: 1,
    productId: "1",
    productName: "Anillo Solitario Diamante",
    price: "$1.250.000",
    category: "Anillos",
    // Using stable mp4 video placeholders from coverr - substitute these with real product videos
    videoSrc: "https://cdn.coverr.co/videos/coverr-woman-wearing-diamond-ring-3814/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1605100804763-247f66156ce4?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    productId: "4",
    productName: "Collar Tennis Oro Blanco",
    price: "$2.890.000",
    category: "Collares",
    videoSrc: "https://cdn.coverr.co/videos/coverr-woman-with-flowers-3846/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    productId: "7",
    productName: "Aros Argolla Diamantes",
    price: "$850.000",
    category: "Aros",
    videoSrc: "https://cdn.coverr.co/videos/coverr-woman-jewelry-7891/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    productId: "11",
    productName: "Pulsera Eslabones Oro",
    price: "$1.100.000",
    category: "Pulseras",
    videoSrc: "https://cdn.coverr.co/videos/coverr-woman-hands-ring-3812/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    productId: "2",
    productName: "Anillo Zafiro",
    price: "$1.650.000",
    category: "Anillos",
    videoSrc: "https://cdn.coverr.co/videos/coverr-woman-jewelry-3847/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=400&auto=format&fit=crop",
  },
];

interface VideoCardProps {
  item: typeof SHOPPABLE_VIDEOS[0];
  index: number;
  isInView: boolean;
}

function VideoCard({ item, index, isInView }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (product) {
      addItem(product);
    }
  };


  // Auto-play on hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex-none w-[240px] md:w-[280px] relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Container */}
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-pearl-gray shadow-md">
        {/* Video element */}
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.poster}
          muted={isMuted}
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dark gradient overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

        {/* Top area: category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-ivory bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {item.category}
          </span>
        </div>

        {/* Top area: mute button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-ivory hover:bg-gold/80 transition-colors"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Center play/pause overlay — appears when not hovering */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-ivory ml-1" fill="currentColor" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom: product info */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
          <p className="text-ivory font-serif text-base leading-tight mb-1">{item.productName}</p>
          <p className="text-gold text-sm font-medium mb-3">{item.price}</p>

          {/* CTA button — slides in on hover */}
          <motion.div
            initial={false}
            animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button 
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-white text-onyx text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-lg hover:bg-gold hover:text-onyx transition-colors duration-300"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Agregar al Carrito
            </button>
          </motion.div>
        </div>

        {/* Gold shimmer border on hover */}
        <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-gold/50 transition-all duration-500 z-30 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function ShoppableVideos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-ivory overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.3em] uppercase text-charcoal mb-3"
            >
              Lumière en Movimiento
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-onyx leading-tight"
            >
              Piezas <span className="text-gold italic">Vivas</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-charcoal mt-3 max-w-sm text-sm font-normal"
            >
              Descubre cómo cada joya cobra vida. Desliza y explora nuestra colección en movimiento.
            </motion.p>
          </div>

          {/* Nav arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-pearl-gray text-charcoal flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-pearl-gray text-charcoal flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Cards scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SHOPPABLE_VIDEOS.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {SHOPPABLE_VIDEOS.map((_, i) => (
            <div key={i} className={`h-px transition-all duration-300 ${i === 0 ? "w-8 bg-onyx" : "w-4 bg-pearl-gray"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
