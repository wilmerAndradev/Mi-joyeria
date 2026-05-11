"use client";

// ── Utilities & helpers for the checkout flow ──────────────────────────────

export const REGIONS: Record<string, string[]> = {
  "Región Metropolitana": ["Santiago","Providencia","Las Condes","Vitacura","Maipú","Ñuñoa","La Florida","Peñalolén","San Miguel","Renca","Pudahuel","Lo Barnechea"],
  "Valparaíso": ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana","San Antonio","Los Andes"],
  "Biobío": ["Concepción","Talcahuano","Chillán","Los Ángeles","Coronel"],
  "La Araucanía": ["Temuco","Villarrica","Pucón","Angol"],
  "Los Lagos": ["Puerto Montt","Osorno","Puerto Varas","Castro"],
  "Antofagasta": ["Antofagasta","Calama","Tocopilla"],
  "Coquimbo": ["La Serena","Coquimbo","Ovalle","Illapel"],
  "Maule": ["Talca","Curicó","Linares","Constitución"],
  "O'Higgins": ["Rancagua","San Fernando","Pichilemu"],
  "Tarapacá": ["Iquique","Alto Hospicio"],
  "Atacama": ["Copiapó","Vallenar"],
  "Ñuble": ["Chillán","San Carlos"],
  "Los Ríos": ["Valdivia","La Unión"],
  "Arica y Parinacota": ["Arica","Putre"],
  "Magallanes": ["Punta Arenas","Puerto Natales"],
  "Aysén": ["Coyhaique","Cochrane"],
};

export const SHIPPING_OPTIONS = [
  { id: "standard", label: "Envío Estándar", desc: "3–5 días hábiles", price: 0, days: 5 },
  { id: "express", label: "Envío Express", desc: "24 hrs (Solo R.M.)", price: 4990, days: 1 },
  { id: "pickup", label: "Retiro en tienda", desc: "Disponible hoy · Providencia 1234", price: 0, days: 0 },
];

export const PAYMENT_METHODS = [
  { id: "webpay",      label: "Webpay Plus",              shortLabel: "Webpay" },
  { id: "mercadopago", label: "MercadoPago",              shortLabel: "MercadoPago" },
  { id: "card",        label: "Tarjeta Crédito / Débito", shortLabel: "Tarjeta" },
];

export const TIERS = [
  { threshold: 1000000, discount: 0.05,  freeShipping: false },
  { threshold: 2000000, discount: 0.10,  freeShipping: false },
  { threshold: 3000000, discount: 0.10,  freeShipping: true },
];

/** Format RUT as XX.XXX.XXX-X while typing */
export function formatRut(value: string): string {
  const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length === 0) return "";
  const dv = clean.slice(-1);
  const num = clean.slice(0, -1);
  if (num.length === 0) return dv;
  const formatted = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

/** Returns arrival date string given days from now */
export function arrivalDate(days: number): string {
  if (days === 0) return "Hoy mismo en tienda";
  const d = new Date();
  d.setDate(d.getDate() + days + 1);
  // skip weekends
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
}

/** Inline validation rules */
export function validate(field: string, value: string): string | null {
  if (!value.trim()) return "Este campo es obligatorio";
  switch (field) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Email inválido";
    case "phone":
      return /^\+?[\d\s\-]{7,}$/.test(value) ? null : "Teléfono inválido";
    case "rut":
      return value.length >= 9 ? null : "RUT inválido";
    case "cardNumber":
      return value.replace(/\s/g, "").length >= 13 ? null : "Número de tarjeta inválido";
    case "cardExpiry":
      return /^\d{2}\/\d{2}$/.test(value) ? null : "Formato MM/AA";
    case "cardCvv":
      return value.length >= 3 ? null : "CVV inválido";
    default:
      return null;
  }
}
