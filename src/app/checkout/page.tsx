"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/data/products";
import { useRouter } from "next/navigation";
import { OrderSummary } from "./OrderSummary";
import { REGIONS, SHIPPING_OPTIONS, PAYMENT_METHODS, TIERS, formatRut, arrivalDate, validate } from "./utils";
import { cn } from "@/lib/utils";
import { Lock, ChevronRight, ChevronLeft, Shield, Package, Building2, Smartphone, CreditCard, Check, AlertCircle, Calendar } from "lucide-react";

const PAYMENT_ICONS = { webpay: Building2, mercadopago: Smartphone, card: CreditCard };

type F = {
  name: string; email: string; phone: string; rut: string;
  address: string; commune: string; region: string;
  giftWrap: boolean; giftMessage: string;
  cardNumber: string; cardExpiry: string; cardCvv: string; cardName: string;
};

const INIT: F = { name:"", email:"", phone:"", rut:"", address:"", commune:"", region:"", giftWrap:false, giftMessage:"", cardNumber:"", cardExpiry:"", cardCvv:"", cardName:"" };

/* Field component with inline validation */
function Field({ label, error, children }: { label: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-charcoal/70 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

const inp = "w-full border border-pearl-gray bg-white px-4 py-3 text-sm text-onyx placeholder:text-charcoal/40 focus:outline-none focus:border-onyx focus:ring-1 focus:ring-onyx/30 transition-all rounded-sm";
const inpErr = "border-red-400 focus:border-red-400 focus:ring-red-400/20";
const inpOk = "border-emerald-400 focus:border-emerald-400";

/* Step indicator always visible */
function StepBar({ step }: { step: number }) {
  const steps = ["Contacto", "Envío", "Pago"];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all", done ? "bg-onyx text-ivory" : active ? "bg-onyx text-ivory" : "bg-pearl-gray text-charcoal/40")}>
                {done ? <Check className="w-4 h-4" /> : n}
              </div>
              <span className={cn("text-[10px] uppercase tracking-wider font-medium hidden sm:block", active ? "text-onyx" : done ? "text-onyx" : "text-charcoal/40")}>{s}</span>
            </div>
            {i < 2 && <div className={cn("flex-1 h-px mx-2 transition-all", step > n ? "bg-onyx" : "bg-pearl-gray")} />}
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<F>(INIT);
  const [touched, setTouch] = useState<Partial<Record<keyof F, boolean>>>({});
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("webpay");
  const [coupon, setCoupon] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const sub = subtotal();
  let disc = 0, freeShip = false;
  for (const t of TIERS) { if (sub >= t.threshold) { disc = t.discount; if (t.freeShipping) freeShip = true; } }
  const selShip = SHIPPING_OPTIONS.find(o => o.id === shipping)!;
  const shipCost = freeShip || selShip.id === "pickup" ? 0 : selShip.price;
  const total = sub - sub * disc + shipCost;

  const set = (k: keyof F, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));
  const touch = (k: keyof F) => setTouch(p => ({ ...p, [k]: true }));
  const err = (k: keyof F) => touched[k] ? validate(k, String(form[k])) : null;

  const step1Valid = !!form.name && !err("email") && !err("phone") && !!form.rut;
  const step2Valid = !!form.address && !!form.commune && !!form.region;

  if (!items.length) return (
    <div className="min-h-screen bg-ivory">
      <div className="flex flex-col items-center justify-center min-h-[60vh]"><Package className="w-12 h-12 text-charcoal/20 mx-auto mb-4" />
        <h2 className="font-serif text-2xl text-onyx mb-2">Tu carrito está vacío</h2>
        <a href="/colecciones" className="mt-6 inline-block bg-onyx text-ivory text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal transition-colors rounded-sm">Ver Colecciones</a>
      </div>
    </div>
  );

  const PayIcon = PAYMENT_ICONS[payment as keyof typeof PAYMENT_ICONS];
  const payLabel = PAYMENT_METHODS.find(m => m.id === payment)?.shortLabel ?? "Pagar";

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8 md:py-12">
        <StepBar step={step} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── FORM ── */}
          <div className="space-y-4">

            {/* STEP 1 — Contact */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="bg-white border border-pearl-gray rounded-sm shadow-sm p-6 space-y-4">
                  <h2 className="text-base font-semibold text-onyx tracking-wide mb-2">Información de contacto</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nombre completo *">
                      <input className={inp} placeholder="María González" value={form.name} autoComplete="name"
                        onChange={e => set("name", e.target.value)} onBlur={() => touch("name")} />
                    </Field>
                    <Field label="RUT *" error={err("rut")}>
                      <input className={cn(inp, err("rut") ? inpErr : form.rut ? inpOk : "")} placeholder="12.345.678-9" value={form.rut}
                        onChange={e => set("rut", formatRut(e.target.value))} onBlur={() => touch("rut")} maxLength={12} />
                    </Field>
                    <Field label="Email *" error={err("email")}>
                      <input className={cn(inp, err("email") ? inpErr : form.email ? inpOk : "")} type="email" placeholder="maria@ejemplo.cl" value={form.email} autoComplete="email"
                        onChange={e => set("email", e.target.value)} onBlur={() => touch("email")} />
                    </Field>
                    <Field label="Teléfono *" error={err("phone")}>
                      <input className={cn(inp, err("phone") ? inpErr : form.phone ? inpOk : "")} type="tel" inputMode="tel" placeholder="+56 9 1234 5678" value={form.phone} autoComplete="tel"
                        onChange={e => set("phone", e.target.value)} onBlur={() => touch("phone")} />
                    </Field>
                  </div>
                  {/* Gift wrap */}
                  <div className="border border-pearl-gray rounded-sm p-4 bg-white shadow-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => set("giftWrap", !form.giftWrap)} className={cn("w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 transition-all", form.giftWrap ? "bg-onyx border-onyx" : "border-pearl-gray")}>
                        {form.giftWrap && <Check className="w-3 h-3 text-ivory" />}
                      </div>
                      <div><p className="text-sm font-semibold text-onyx">Envolver como regalo</p><p className="text-xs text-charcoal/60">Caja especial, lazo y tarjeta personalizada</p></div>
                    </label>
                    <AnimatePresence>
                      {form.giftWrap && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden">
                          <textarea className={cn(inp, "mt-3 resize-none")} rows={2} placeholder="Mensaje para la tarjeta (opcional)..." value={form.giftMessage} onChange={e => set("giftMessage", e.target.value)} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button onClick={() => setStep(2)} disabled={!step1Valid}
                    className="w-full bg-onyx text-ivory rounded-sm text-xs uppercase tracking-widest py-4 hover:bg-charcoal transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    Continuar al envío <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — Shipping */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="bg-white border border-pearl-gray rounded-sm shadow-sm p-6 space-y-4">
                  <h2 className="text-base font-semibold text-onyx tracking-wide mb-2">Dirección de envío</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Dirección *" error={touched.address && !form.address ? "Requerido" : null}>
                      <input className={cn(inp, "sm:col-span-2")} placeholder="Av. Providencia 1234, Depto 5B" value={form.address} autoComplete="street-address"
                        onChange={e => set("address", e.target.value)} onBlur={() => touch("address")} />
                    </Field>
                    <Field label="Región *">
                      <select className={cn(inp, form.region ? inpOk : "")} value={form.region}
                        onChange={e => { set("region", e.target.value); set("commune", ""); }}>
                        <option value="">Selecciona región...</option>
                        {Object.keys(REGIONS).map(r => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                    <Field label="Comuna *" error={touched.commune && !form.commune ? "Selecciona una comuna" : null}>
                      <select className={cn(inp, form.commune ? inpOk : "")} value={form.commune} disabled={!form.region}
                        onChange={e => set("commune", e.target.value)} onBlur={() => touch("commune")}>
                        <option value="">Selecciona comuna...</option>
                        {(REGIONS[form.region] ?? []).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                  {/* Shipping method */}
                  <div className="space-y-2 mt-2">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/70 mb-2">Método de envío</p>
                    {SHIPPING_OPTIONS.map(opt => (
                      <label key={opt.id} className={cn("flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all", shipping === opt.id ? "border-onyx bg-onyx/5" : "border-pearl-gray hover:border-onyx/30")}>
                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0", shipping === opt.id ? "border-onyx" : "border-pearl-gray")}>
                          {shipping === opt.id && <div className="w-2 h-2 rounded-full bg-onyx" />}
                        </div>
                        <input type="radio" className="sr-only" checked={shipping === opt.id} onChange={() => setShipping(opt.id)} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-onyx">{opt.label}</p>
                          <p className="text-xs text-charcoal/70">{opt.desc}</p>
                          {shipping === opt.id && (
                            <p className="text-xs text-charcoal font-medium mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Llegada estimada: {arrivalDate(opt.days)}
                            </p>
                          )}
                        </div>
                        {opt.price === 0 ? <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Gratis</span>
                          : <span className="text-sm font-bold text-onyx">{formatPrice(opt.price)}</span>}
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-charcoal/60 text-xs uppercase tracking-wider hover:text-onyx transition-colors px-4 py-3">
                      <ChevronLeft className="w-4 h-4" /> Volver
                    </button>
                    <button onClick={() => setStep(3)} disabled={!step2Valid}
                      className="flex-1 bg-onyx text-ivory rounded-sm text-xs uppercase tracking-widest py-4 hover:bg-charcoal transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                      Continuar al pago <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Payment */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="bg-white border border-pearl-gray rounded-sm shadow-sm p-6 space-y-4">
                  <h2 className="text-base font-semibold text-onyx tracking-wide mb-2">Método de pago</h2>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map(m => {
                      const Icon = PAYMENT_ICONS[m.id as keyof typeof PAYMENT_ICONS];
                      return (
                        <label key={m.id} className={cn("flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all", payment === m.id ? "border-onyx bg-onyx/5" : "border-pearl-gray hover:border-onyx/30")}>
                          <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0", payment === m.id ? "border-onyx" : "border-pearl-gray")}>
                            {payment === m.id && <div className="w-2 h-2 rounded-full bg-onyx" />}
                          </div>
                          <input type="radio" className="sr-only" checked={payment === m.id} onChange={() => setPayment(m.id)} />
                          <Icon className="w-5 h-5 text-charcoal shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-onyx">{m.label}</p>
                            {m.id === "mercadopago" && <p className="text-xs text-charcoal/60">Cuotas sin interés disponibles</p>}
                            {m.id === "webpay" && <p className="text-xs text-charcoal/60">Débito y crédito nacional</p>}
                            {m.id === "card" && <p className="text-xs text-charcoal/60">Visa, Mastercard, Amex</p>}
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Card form */}
                  <AnimatePresence>
                    {payment === "card" && (
                      <motion.div ref={cardRef} initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden">
                        <div className="border border-pearl-gray bg-white shadow-sm rounded-sm p-4 space-y-3">
                          <p className="text-[11px] text-charcoal flex items-center gap-1.5"><Lock className="w-3 h-3 text-onyx" /> Tus datos están encriptados con SSL de 256 bits</p>
                          <Field label="Número de tarjeta" error={err("cardNumber")}>
                            <input className={cn(inp, err("cardNumber") ? inpErr : form.cardNumber.length > 12 ? inpOk : "")} placeholder="4242 4242 4242 4242"
                              value={form.cardNumber} onChange={e => set("cardNumber", e.target.value)} onBlur={() => touch("cardNumber")} inputMode="numeric" maxLength={19} />
                          </Field>
                          <Field label="Nombre en tarjeta">
                            <input className={inp} placeholder="MARÍA GONZÁLEZ" value={form.cardName} onChange={e => set("cardName", e.target.value.toUpperCase())} />
                          </Field>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Vencimiento" error={err("cardExpiry")}>
                              <input className={cn(inp, err("cardExpiry") ? inpErr : form.cardExpiry.length === 5 ? inpOk : "")} placeholder="MM/AA"
                                value={form.cardExpiry} onChange={e => { const v = e.target.value.replace(/\D/g,""); set("cardExpiry", v.length >= 3 ? v.slice(0,2)+"/"+v.slice(2,4) : v); }} onBlur={() => touch("cardExpiry")} maxLength={5} />
                            </Field>
                            <Field label="CVV" error={err("cardCvv")}>
                              <input className={cn(inp, err("cardCvv") ? inpErr : form.cardCvv.length >= 3 ? inpOk : "")} placeholder="123"
                                value={form.cardCvv} onChange={e => set("cardCvv", e.target.value)} onBlur={() => touch("cardCvv")} inputMode="numeric" type="password" maxLength={4} />
                            </Field>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Redirect notice */}
                  {(payment === "webpay" || payment === "mercadopago") && (
                    <div className="border border-pearl-gray rounded-sm p-3 bg-pearl-gray/30 text-center">
                      <p className="text-xs text-charcoal">Serás redirigido al portal seguro de {payment === "webpay" ? "Webpay Plus (Transbank)" : "MercadoPago"}</p>
                    </div>
                  )}

                  {/* Pre-CTA summary */}
                  <div className="bg-pearl-gray/20 border border-pearl-gray rounded-sm p-4 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal/60 mb-2">Resumen final</p>
                    <p className="text-sm text-onyx">{items.length} {items.length === 1 ? "producto" : "productos"} · {items.reduce((s,i) => s + i.quantity, 0)} {items.reduce((s,i) => s + i.quantity, 0) === 1 ? "pieza" : "piezas"}</p>
                    <p className="text-sm text-onyx">Envío: {shipCost === 0 ? "Gratis" : formatPrice(shipCost)} · {selShip.label}</p>
                    <p className="text-sm font-bold text-onyx">Total a pagar: {formatPrice(total)}</p>
                  </div>

                  {/* Payment logos */}
                  <div className="flex items-center justify-center gap-4 py-2">
                    {["Webpay","MercadoPago","Visa","Mastercard"].map(l => (
                      <span key={l} className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 border border-pearl-gray px-2 py-1 rounded">{l}</span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex items-center gap-1 text-charcoal/60 text-xs uppercase tracking-wider hover:text-onyx transition-colors px-4 py-3">
                      <ChevronLeft className="w-4 h-4" /> Volver
                    </button>
                    <button onClick={() => { clearCart(); router.push("/checkout/confirmacion"); }}
                      className="group relative flex-1 flex items-center justify-center gap-2 bg-onyx text-ivory rounded-sm py-4 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-charcoal transition-all duration-300 overflow-hidden shadow-sm">
                      <Lock className="w-4 h-4 shrink-0" />
                      Pagar {formatPrice(total)} con {payLabel}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-[11px] text-charcoal/60 flex items-center justify-center gap-1.5"><Shield className="w-3 h-3 text-onyx" /> Pago 100% seguro · Encriptación SSL</p>
                    <p className="text-[11px] text-charcoal/50">Devolución gratuita dentro de 30 días · Sin preguntas</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── ORDER SUMMARY (desktop sticky) ── */}
          <div className="hidden lg:block sticky top-24">
            <OrderSummary shippingCost={shipCost} coupon={coupon} couponValid={couponValid}
              onCouponChange={setCoupon} onCouponApply={() => setCouponValid(coupon === "WELCOME10")} />
          </div>
        </div>
      </div>
    </div>
  );
}
