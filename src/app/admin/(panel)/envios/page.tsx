'use client';

import { useState } from 'react';
import { Truck, Package, Clock, Save, CheckCircle2 } from 'lucide-react';

interface ShippingZone {
  id: string;
  name: string;
  regions: string[];
  price: number;
  freeThreshold: number | null;
  estimatedDays: string;
  active: boolean;
}

const INITIAL_ZONES: ShippingZone[] = [
  {
    id: 'rm',
    name: 'Región Metropolitana',
    regions: ['Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa'],
    price: 3990,
    freeThreshold: 150000,
    estimatedDays: '1-2',
    active: true,
  },
  {
    id: 'norte',
    name: 'Zona Norte',
    regions: ['Arica', 'Iquique', 'Antofagasta', 'Atacama', 'Coquimbo'],
    price: 5990,
    freeThreshold: 250000,
    estimatedDays: '3-5',
    active: true,
  },
  {
    id: 'centro',
    name: 'Zona Centro',
    regions: ["O'Higgins", 'Maule', 'Ñuble', 'Biobío'],
    price: 4990,
    freeThreshold: 200000,
    estimatedDays: '2-3',
    active: true,
  },
  {
    id: 'sur',
    name: 'Zona Sur',
    regions: ['La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'],
    price: 7990,
    freeThreshold: 350000,
    estimatedDays: '5-8',
    active: true,
  },
];

export default function AdminEnviosPage() {
  const [zones, setZones] = useState<ShippingZone[]>(INITIAL_ZONES);
  const [saved, setSaved] = useState(false);
  const [freeShippingGlobal, setFreeShippingGlobal] = useState(false);
  const [expressEnabled, setExpressEnabled] = useState(true);
  const [expressPrice, setExpressPrice] = useState(9990);

  const updateZone = (id: string, field: keyof ShippingZone, value: unknown) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, [field]: value } : z));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Configuración de Envíos</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Zonas, tarifas y condiciones de despacho
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-[#C9A84C] text-[#0D0D0F] hover:bg-[#E0C070]'
          }`}
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Guardado' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Global Settings */}
      <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-5">
        <h2 className="text-white text-base font-medium border-b border-white/[0.07] pb-4">Configuración Global</h2>

        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-sm font-medium text-white">Envío Gratuito Global</p>
            <p className="text-xs text-white/40 mt-0.5">Activa envío gratis para todos los pedidos (ignora umbrales por zona)</p>
          </div>
          <button
            onClick={() => setFreeShippingGlobal(!freeShippingGlobal)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${freeShippingGlobal ? 'bg-[#C9A84C]' : 'bg-white/10'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${freeShippingGlobal ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-white/[0.05]">
          <div>
            <p className="text-sm font-medium text-white">Envío Express (24h)</p>
            <p className="text-xs text-white/40 mt-0.5">Ofrecer opción de despacho exprés con cargo adicional</p>
          </div>
          <div className="flex items-center gap-4">
            {expressEnabled && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">$</span>
                <input
                  type="number"
                  value={expressPrice}
                  onChange={e => setExpressPrice(Number(e.target.value))}
                  className="w-24 bg-white/[0.03] border border-white/[0.08] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            )}
            <button
              onClick={() => setExpressEnabled(!expressEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${expressEnabled ? 'bg-[#C9A84C]' : 'bg-white/10'}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${expressEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="space-y-4">
        <h2 className="text-white text-base font-medium">Zonas de Despacho</h2>
        {zones.map(zone => (
          <div key={zone.id} className={`bg-[#111114] border rounded-xl p-5 transition-all ${zone.active ? 'border-white/[0.07]' : 'border-white/[0.03] opacity-50'}`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white/40" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{zone.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{zone.regions.slice(0, 3).join(', ')}{zone.regions.length > 3 && ` +${zone.regions.length - 3} más`}</p>
                </div>
              </div>
              <button
                onClick={() => updateZone(zone.id, 'active', !zone.active)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${zone.active ? 'bg-[#C9A84C]' : 'bg-white/10'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${zone.active ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Precio de Envío ($)</label>
                <input
                  type="number"
                  value={zone.price}
                  onChange={e => updateZone(zone.id, 'price', Number(e.target.value))}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Envío Gratis desde ($)</label>
                <input
                  type="number"
                  value={zone.freeThreshold ?? ''}
                  placeholder="Sin umbral"
                  onChange={e => updateZone(zone.id, 'freeThreshold', e.target.value ? Number(e.target.value) : null)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Días Estimados
                </label>
                <input
                  type="text"
                  value={zone.estimatedDays}
                  onChange={e => updateZone(zone.id, 'estimatedDays', e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
