"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, Mail, Truck, ArrowRight, Download } from "lucide-react";

const ORDER_NUMBER = `LM-${Math.floor(100000 + Math.random() * 900000)}`;

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-5 py-16">
      <div className="max-w-lg w-full text-center">

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-100"
        >
          <CheckCircle className="w-12 h-12 text-emerald-500" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-charcoal mb-3">
            — ¡Pedido Confirmado! —
          </p>
          <h1 className="font-serif text-4xl text-onyx mb-4 leading-tight">
            Gracias por tu compra
          </h1>
          <p className="text-base text-charcoal leading-relaxed mb-8">
            Hemos recibido tu pedido y lo estamos procesando con el cuidado que tus joyas merecen.
          </p>
        </motion.div>

        {/* Order number card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="bg-white border border-pearl-gray rounded-sm px-8 py-6 mb-6 shadow-sm"
        >
          <p className="text-xs text-charcoal/50 uppercase tracking-widest mb-2">Número de pedido</p>
          <p className="font-serif text-2xl text-onyx font-semibold tracking-widest">{ORDER_NUMBER}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="bg-white border border-pearl-gray rounded-sm px-6 py-6 mb-8 text-left shadow-sm"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-onyx mb-5">¿Qué sigue?</h3>
          <div className="space-y-5">
            {[
              { icon: Mail, title: "Confirmación por email", desc: "Recibirás un email con todos los detalles de tu pedido en los próximos minutos.", done: true },
              { icon: Package, title: "Preparación del pedido", desc: "Nuestro equipo preparará tu joya con embalaje premium.", done: false },
              { icon: Truck, title: "Despacho express", desc: "Enviaremos tu pedido y te notificaremos con el número de tracking.", done: false },
            ].map(({ icon: Icon, title, desc, done }, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-emerald-100" : "bg-pearl-gray"}`}>
                  <Icon className={`w-4 h-4 ${done ? "text-emerald-600" : "text-charcoal/40"}`} strokeWidth={1.5} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${done ? "text-onyx" : "text-charcoal/60"}`}>{title}</p>
                  <p className="text-xs text-charcoal/50 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button className="flex-1 flex items-center justify-center gap-2 border border-pearl-gray text-onyx text-xs uppercase tracking-widest py-4 hover:border-onyx hover:bg-pearl-gray/20 transition-all rounded-sm bg-white shadow-sm">
            <Download className="w-4 h-4" />
            Descargar boleta
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-onyx text-ivory text-xs uppercase tracking-widest py-4 hover:bg-charcoal transition-all rounded-sm shadow-sm"
          >
            Seguir comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-charcoal/50 mt-8"
        >
          ¿Tienes preguntas? Escríbenos a <a href="mailto:hola@lumiere.cl" className="underline hover:text-onyx transition-colors">hola@lumiere.cl</a>
        </motion.p>
      </div>
    </div>
  );
}
