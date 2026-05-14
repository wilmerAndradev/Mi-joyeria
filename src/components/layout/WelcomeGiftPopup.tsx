"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";

const STORAGE_KEY = "aleafar-welcome-gift-seen-v5";

export function WelcomeGiftPopup() {
  // Lazy initializer runs synchronously on the very first render.
  // This prevents any flash of the underlying page before the overlay appears.
  const [step, setStep] = useState<1 | 2 | 3>(() => {
    if (typeof window === "undefined") return 1; // SSR fallback — won't render anyway
    return localStorage.getItem(STORAGE_KEY) ? 3 : 1;
  });

  // Remove the server-rendered blur div once React has hydrated and taken control.
  // For first-time visitors: our motion.div overlay covers the page seamlessly.
  // For returning visitors: the blur fades out quickly.
  useEffect(() => {
    const el = document.getElementById("initial-blur");
    if (!el) return;
    if (step === 3) {
      // Returning visitor — fade out the server blur quickly
      el.style.transition = "opacity 0.4s ease";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 400);
    } else {
      // First-time visitor — popup motion.div is already covering the page,
      // remove the server blur instantly so they don't stack
      el.remove();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseImmediately = () => {
    setStep(3);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const fireConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 120 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#C9A84C", "#1A1A1A", "#F2EFE8"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#C9A84C", "#1A1A1A", "#F2EFE8"],
      });
    }, 250);
  };

  const handleAcceptGift = () => {
    setStep(2);
    localStorage.setItem(STORAGE_KEY, "true");
    fireConfetti();

    // After exactly 3 seconds fade out everything together
    setTimeout(() => setStep(3), 3000);
  };

  // If already seen — render nothing at all
  if (step === 3) return null;

  return (
    <AnimatePresence>
      {/* Single motion.div wraps BOTH the backdrop AND the content.
          When step→3 it exits as one unit: blur + text disappear together. */}
      <motion.div
        key="popup-wrapper"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-onyx/60 backdrop-blur-md"
          onClick={step === 1 ? handleCloseImmediately : undefined}
        />

        {/* Switching between card and celebration */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.35 }}
              className="relative w-full max-w-[460px] z-10 overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #1c1c1c 0%, #111111 100%)",
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08) inset",
              }}
            >
              {/* Gold shimmer top bar */}
              <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

              {/* Close button */}
              <button
                onClick={handleCloseImmediately}
                className="absolute top-4 right-4 z-10 transition-colors duration-200"
                style={{ color: "rgba(201,168,76,0.45)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(201,168,76,0.45)")}
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* Card body */}
              <div className="px-10 pt-10 pb-10 md:px-14 md:pt-12 md:pb-12 flex flex-col items-center text-center">

                {/* ① Brand mark — visual anchor, smallest but top position */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    color: "#C9A84C",
                    marginBottom: "1.25rem",
                  }}
                >
                  A L E A F A R
                </motion.p>

                {/* ② Decorative ornament */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <span style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0L7.5 4.5H12L8.25 7.5L9.75 12L6 9L2.25 12L3.75 7.5L0 4.5H4.5Z" fill="#C9A84C" fillOpacity="0.8"/>
                  </svg>
                  <span style={{ width: 40, height: 1, background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
                </motion.div>

                {/* ③ Headline — largest, highest weight, first thing the eye reads */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.6rem, 5vw, 2.1rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#F2EFE8",
                    lineHeight: 1.2,
                    marginBottom: "1.5rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  Un regalo hecho
                  <br />
                  <span style={{ color: "#C9A84C" }}>solo para ti.</span>
                </motion.h2>

                {/* ④ Body — medium size, the core message */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(1rem, 3vw, 1.15rem)",
                    color: "rgba(242,239,232,0.78)",
                    lineHeight: 1.75,
                    marginBottom: "1.25rem",
                  }}
                >
                  <p>
                    Hoy ese sueño dejó de ser solo una idea.<br />
                    Tiene diseño, tiene estructura, tiene identidad.
                  </p>
                  <p style={{ marginTop: "0.9rem" }}>
                    Solo falta lo más importante:<br />
                    llevarlo a donde siempre imaginaste.
                  </p>
                  <p style={{ marginTop: "0.9rem" }}>
                    Este es el comienzo.<br />
                    <strong style={{ color: "#F2EFE8", fontWeight: 600 }}>Bienvenida a Aleafar.</strong>
                  </p>
                </motion.div>

                {/* Thin divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  style={{ width: "100%", height: 1, background: "rgba(201,168,76,0.18)", marginBottom: "1.1rem" }}
                />

                {/* ⑤ Attribution — smallest, lightest — bottom of hierarchy */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "0.88rem",
                    fontStyle: "italic",
                    color: "rgba(242,239,232,0.42)",
                    marginBottom: "2rem",
                    lineHeight: 1.6,
                  }}
                >
                  Si algo no te gusta, lo cambiamos.<br />
                  Aquí estoy para ayudarte a materializar tus sueños.
                </motion.p>

                {/* ⑥ CTA — gold, high contrast, unmissable */}
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.45, duration: 0.5 }}
                  onClick={handleAcceptGift}
                  className="w-full relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(90deg, #b8922e, #C9A84C, #b8922e)",
                    backgroundSize: "200% 100%",
                    padding: "14px 24px",
                    color: "#111111",
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    fontWeight: 600,
                    transition: "background-position 0.5s ease, box-shadow 0.3s ease",
                    boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "right center";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(201,168,76,0.45)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "left center";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(201,168,76,0.25)";
                  }}
                >
                  VER MI REGALO &nbsp;→
                </motion.button>
              </div>

              {/* Gold shimmer bottom bar */}
              <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-20 text-center px-4 pointer-events-none"
            >
              <h1
                className="text-5xl md:text-7xl lg:text-8xl text-ivory tracking-widest uppercase drop-shadow-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Feliz
                <br />
                <span className="text-gold italic font-light normal-case">
                  Cumpleaños
                </span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
