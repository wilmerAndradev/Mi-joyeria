"use client";

import { useState } from "react";
import Image from "next/image";
import { Tag, Shield, Truck, RotateCcw, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/data/products";
import { TIERS } from "./utils";
import { cn } from "@/lib/utils";

interface Props {
  shippingCost: number;
  coupon: string;
  couponValid: boolean;
  onCouponChange: (v: string) => void;
  onCouponApply: () => void;
}

export function OrderSummary({ shippingCost, coupon, couponValid, onCouponChange, onCouponApply }: Props) {
  const items = useCartStore(s => s.items);
  const subtotal = useCartStore(s => s.subtotal)();
  const [open, setOpen] = useState(false);

  let discount = 0;
  let freeShipping = false;
  for (const t of TIERS) {
    if (subtotal >= t.threshold) { discount = t.discount; if (t.freeShipping) freeShipping = true; }
  }
  const discountAmt = subtotal * discount;
  const shipping = freeShipping ? 0 : shippingCost;
  const total = subtotal - discountAmt + shipping;

  return (
    <div className="bg-white border border-pearl-gray rounded-sm shadow-sm overflow-hidden">
      {/* Mobile toggle */}
      <button onClick={() => setOpen(v => !v)} className="lg:hidden w-full flex items-center justify-between px-5 py-4 border-b border-pearl-gray">
        <span className="text-sm font-semibold text-onyx tracking-wide">Resumen del pedido</span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-onyx">{formatPrice(total)}</span>
          {open ? <ChevronUp className="w-4 h-4 text-charcoal/50" /> : <ChevronDown className="w-4 h-4 text-charcoal/50" />}
        </div>
      </button>

      {/* Desktop header */}
      <div className="hidden lg:block px-6 py-4 border-b border-pearl-gray">
        <h3 className="text-xs font-bold uppercase tracking-widest text-onyx">Tu Pedido</h3>
      </div>

      {/* Body — hidden on mobile when closed */}
      <div className={cn("lg:block", open ? "block" : "hidden")}>
        {/* Items */}
        <div className="px-5 py-4 space-y-3 max-h-56 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="relative shrink-0 w-14 h-14">
                <Image src={item.images[0]} alt={item.name} fill className="object-cover rounded" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-onyx text-ivory rounded-full text-[10px] font-bold flex items-center justify-center">{item.quantity}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-onyx truncate">{item.name}</p>
                <p className="text-xs text-charcoal/60 truncate">{item.material.split("·")[0].trim()}</p>
              </div>
              <p className="text-sm font-bold text-onyx shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        {/* Coupon */}
        <div className="px-5 py-3 border-t border-pearl-gray">
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={e => onCouponChange(e.target.value.toUpperCase())}
              placeholder="Código de descuento"
              className={cn("flex-1 border px-3 py-2.5 text-sm text-onyx placeholder:text-charcoal/40 focus:outline-none focus:border-onyx transition-all rounded-sm bg-white",
                couponValid ? "border-emerald-400" : "border-pearl-gray"
              )}
            />
            <button onClick={onCouponApply} className="px-4 py-2.5 bg-onyx text-ivory text-xs uppercase tracking-wider hover:bg-charcoal transition-colors rounded-sm whitespace-nowrap">
              {couponValid ? <Check className="w-4 h-4" /> : "Aplicar"}
            </button>
          </div>
          {couponValid && <p className="text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1"><Check className="w-3 h-3" /> Código aplicado</p>}
        </div>

        {/* Totals */}
        <div className="px-5 py-4 border-t border-pearl-gray space-y-2.5">
          <div className="flex justify-between text-sm"><span className="text-charcoal">Subtotal</span><span className="font-medium text-onyx">{formatPrice(subtotal)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5 text-onyx font-medium"><Tag className="w-3.5 h-3.5" /> Descuento ({discount * 100}%)</span>
              <span className="font-bold text-onyx">− {formatPrice(discountAmt)}</span>
            </div>
          )}
          {couponValid && (
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><Tag className="w-3.5 h-3.5" /> Cupón WELCOME10</span>
              <span className="font-bold text-emerald-600">− {formatPrice(subtotal * 0.1)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-charcoal">Envío</span>
            <span className={shipping === 0 ? "font-bold text-emerald-600 text-xs uppercase" : "font-medium text-onyx"}>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-pearl-gray">
            <span className="text-sm font-bold text-onyx uppercase tracking-widest">Total</span>
            <span className="text-2xl font-bold text-onyx">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Trust */}
        <div className="px-5 py-4 border-t border-pearl-gray bg-pearl-gray/10">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[{I: Shield, l:"Compra segura"},{I: Truck, l:"Despacho rápido"},{I: RotateCcw, l:"30 días devolución"}].map(({I, l}) => (
              <div key={l} className="flex flex-col items-center gap-1.5">
                <I className="w-4 h-4 text-charcoal" strokeWidth={1.5} />
                <span className="text-[10px] text-charcoal/60 font-medium leading-tight">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
