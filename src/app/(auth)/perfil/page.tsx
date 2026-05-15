"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Package, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const MOCK_USER = {
  name: "Victoria C.",
  email: "victoria.c@example.com",
  memberSince: "Octubre 2023",
  tier: "Aleafar Gold",
};

const MOCK_ORDERS = [
  {
    id: "ORD-8492-CL",
    date: "12 Mar 2024",
    status: "Entregado",
    total: "$1.250.000",
    item: "Solitario Eternity 1ct",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "ORD-7104-CL",
    date: "05 Ene 2024",
    status: "Entregado",
    total: "$420.000",
    item: "Anillo Eternelle Dorado",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("pedidos");

  const tabs = [
    { id: "pedidos", label: "Mis Pedidos", icon: Package },
    { id: "detalles", label: "Detalles de Cuenta", icon: User },
    { id: "direcciones", label: "Libreta de Direcciones", icon: MapPin },
    { id: "wishlist", label: "Lista de Deseos", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-pearl-gray">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gold text-white flex items-center justify-center rounded-full text-2xl font-serif italic shadow-md">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-serif text-onyx mb-1">Hola, {MOCK_USER.name}</h1>
              <p className="text-charcoal text-sm">Miembro desde {MOCK_USER.memberSince} • <span className="text-gold font-medium">{MOCK_USER.tier}</span></p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-left ${
                      isActive 
                        ? "bg-onyx text-ivory shadow-md" 
                        : "text-charcoal hover:bg-white hover:text-onyx hover:shadow-sm"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                    <span className="font-medium text-sm tracking-wide">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === "pedidos" && (
                <motion.div
                  key="pedidos"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-serif text-onyx mb-6">Historial de Pedidos</h2>
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-charcoal/30 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <div className="w-24 h-24 bg-charcoal/20 rounded-xl overflow-hidden shrink-0">
                        <Image src={order.image} alt={order.item} width={100} height={100} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                          <p className="text-xs font-semibold tracking-widest text-charcoal uppercase">Pedido {order.id}</p>
                          <span className="px-3 py-1 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-medium rounded-full">
                            {order.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-onyx mb-1">{order.item}</h3>
                        <p className="text-sm text-charcoal">Realizado el {order.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3 sm:border-l sm:border-charcoal/30 sm:pl-6">
                        <p className="font-medium text-lg text-onyx">{order.total}</p>
                        <button className="text-sm font-medium text-gold hover:underline flex items-center gap-1">
                          Ver detalles <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "detalles" && (
                <motion.div
                  key="detalles"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-charcoal/30 max-w-2xl"
                >
                  <h2 className="text-xl font-serif text-onyx mb-8">Información Personal</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-widest uppercase text-onyx">Nombre</label>
                        <input type="text" defaultValue="Victoria" className="w-full px-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold text-onyx" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold tracking-widest uppercase text-onyx">Apellidos</label>
                        <input type="text" defaultValue="C." className="w-full px-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold text-onyx" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-widest uppercase text-onyx">Correo Electrónico</label>
                      <input type="email" defaultValue={MOCK_USER.email} className="w-full px-4 py-3 bg-charcoal/10 border border-charcoal/30 rounded-xl focus:outline-none focus:border-gold text-onyx" />
                    </div>
                    <button type="button" className="bg-gold text-black px-8 py-3 rounded-xl font-medium tracking-wide hover:bg-charcoal transition-colors">
                      Guardar Cambios
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === "direcciones" && (
                <motion.div
                  key="direcciones"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif text-onyx">Mis Direcciones</h2>
                    <button className="text-sm font-medium text-gold hover:underline">Añadir nueva</button>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-charcoal/30 max-w-md relative">
                    <span className="absolute top-6 right-6 px-2 py-1 bg-gold text-black text-[10px] uppercase tracking-wider rounded-md">Principal</span>
                    <h3 className="font-medium text-onyx mb-2">Casa</h3>
                    <p className="text-sm text-charcoal leading-relaxed mb-4">
                      Victoria C.<br/>
                      Av. Vitacura 2808, Depto 402<br/>
                      Vitacura, Región Metropolitana<br/>
                      Chile
                    </p>
                    <div className="flex gap-4">
                      <button className="text-xs font-medium text-gold hover:text-gold transition-colors">Editar</button>
                      <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">Eliminar</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-12"
                >
                  <Heart className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
                  <h2 className="text-xl font-serif text-onyx mb-2">Tu lista de deseos</h2>
                  <p className="text-charcoal mb-6">Administra tus favoritos desde la página dedicada.</p>
                  <Link href="/wishlist" className="inline-block bg-gold text-black px-8 py-3 rounded-xl font-medium tracking-wide hover:bg-charcoal transition-colors">
                    Ir a Wishlist
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
