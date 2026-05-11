'use client';

import { useState } from 'react';
import { Plus, Tag, Trash2, Copy, Check, ToggleLeft, ToggleRight } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

const MOCK_COUPONS: Coupon[] = [
  { id: '1', code: 'LUMIERE20', type: 'percentage', value: 20, minOrder: 200000, maxUses: 100, usedCount: 34, expiresAt: '2024-01-31', active: true },
  { id: '2', code: 'BIENVENIDA', type: 'fixed', value: 50000, minOrder: 150000, maxUses: 500, usedCount: 210, expiresAt: '2024-03-31', active: true },
  { id: '3', code: 'NAVIDAD15', type: 'percentage', value: 15, maxUses: 200, usedCount: 200, expiresAt: '2023-12-31', active: false },
  { id: '4', code: 'VIP30', type: 'percentage', value: 30, minOrder: 500000, maxUses: 50, usedCount: 8, expiresAt: '2024-06-30', active: true },
];

const emptyForm: { code: string; type: 'percentage' | 'fixed'; value: number; minOrder: string | number; maxUses: number; expiresAt: string } = { code: '', type: 'percentage', value: 10, minOrder: '', maxUses: 100, expiresAt: '' };

export default function AdminCuponesPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleToggle = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const handleDelete = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const handleCreate = () => {
    const newCoupon: Coupon = {
      id: String(Date.now()),
      code: form.code.toUpperCase().trim(),
      type: form.type,
      value: form.value,
      minOrder: form.minOrder ? parseInt(form.minOrder as string) : undefined,
      maxUses: form.maxUses,
      usedCount: 0,
      expiresAt: form.expiresAt,
      active: true,
    };
    setCoupons(prev => [newCoupon, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const formatDiscount = (c: Coupon) => c.type === 'percentage' ? `${c.value}%` : `$${c.value.toLocaleString('es-CL')}`;
  const usagePercent = (c: Coupon) => Math.round((c.usedCount / c.maxUses) * 100);
  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Cupones</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Gestiona descuentos y promociones
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-[#0D0D0F] rounded-lg text-sm font-medium hover:bg-[#E0C070] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Cupón
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-[#111114] border border-[#C9A84C]/30 rounded-xl p-6 space-y-4">
          <h2 className="text-white text-base font-medium">Crear Nuevo Cupón</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Código</label>
              <input
                type="text"
                placeholder="Ej: DESCUENTO20"
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Tipo</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
              >
                <option value="percentage">Porcentaje (%)</option>
                <option value="fixed">Monto Fijo ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                Valor ({form.type === 'percentage' ? '%' : '$'})
              </label>
              <input
                type="number"
                min={1}
                value={form.value}
                onChange={e => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Pedido Mínimo ($)</label>
              <input
                type="number"
                placeholder="Sin mínimo"
                value={form.minOrder}
                onChange={e => setForm({ ...form, minOrder: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Usos Máximos</label>
              <input
                type="number"
                min={1}
                value={form.maxUses}
                onChange={e => setForm({ ...form, maxUses: Number(e.target.value) })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Vence</label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={e => setForm({ ...form, expiresAt: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              disabled={!form.code.trim()}
              className="px-5 py-2.5 bg-[#C9A84C] text-[#0D0D0F] rounded-lg text-sm font-medium hover:bg-[#E0C070] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Crear Cupón
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(emptyForm); }}
              className="px-5 py-2.5 bg-white/[0.05] text-white/60 rounded-lg text-sm font-medium hover:bg-white/[0.08] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map(coupon => {
          const expired = isExpired(coupon.expiresAt);
          const usage = usagePercent(coupon);
          return (
            <div key={coupon.id} className={`bg-[#111114] border rounded-xl p-5 space-y-4 transition-all ${coupon.active && !expired ? 'border-white/[0.07]' : 'border-white/[0.04] opacity-60'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                    <Tag className="w-4.5 h-4.5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-medium text-sm">{coupon.code}</span>
                      <button onClick={() => handleCopy(coupon.code)} className="text-white/30 hover:text-white/60 transition-colors">
                        {copied === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">
                      Descuento: <span className="text-[#C9A84C] font-medium">{formatDiscount(coupon)}</span>
                      {coupon.minOrder && <span className="ml-1">· Mín. ${coupon.minOrder.toLocaleString('es-CL')}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {expired && <span className="text-[10px] text-red-400/70 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-400/20 uppercase tracking-wider">Vencido</span>}
                  <button onClick={() => handleToggle(coupon.id)} className={`transition-colors ${coupon.active ? 'text-[#C9A84C]' : 'text-white/20'}`}>
                    {coupon.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button onClick={() => handleDelete(coupon.id)} className="text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Usage bar */}
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-1.5">
                  <span>Usos: {coupon.usedCount} / {coupon.maxUses}</span>
                  <span>{usage}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${usage >= 90 ? 'bg-red-500' : usage >= 70 ? 'bg-amber-500' : 'bg-[#C9A84C]'}`}
                    style={{ width: `${Math.min(usage, 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-white/30">
                Vence: {new Date(coupon.expiresAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
