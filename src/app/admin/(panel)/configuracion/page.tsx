'use client';

import { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, CheckCircle2, Save } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

type Section = 'perfil' | 'seguridad' | 'notificaciones';

export default function AdminConfiguracionPage() {
  const user = useAdminStore((s) => s.user);
  const [activeSection, setActiveSection] = useState<Section>('perfil');
  const [saved, setSaved] = useState(false);

  // Perfil state
  const [name, setName] = useState(user?.name ?? 'Valentina Morales');
  const [email, setEmail] = useState(user?.email ?? 'valentina@aleafarjoyas.cl');
  const [phone, setPhone] = useState('+56 9 8765 4321');

  // Seguridad state
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Notificaciones state
  const [notifs, setNotifs] = useState({
    newOrders: true,
    lowStock: true,
    newReviews: false,
    marketing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const sections = [
    { id: 'perfil' as Section, label: 'Perfil', icon: User },
    { id: 'seguridad' as Section, label: 'Seguridad', icon: Shield },
    { id: 'notificaciones' as Section, label: 'Notificaciones', icon: Bell },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-[#C9A84C]' : 'bg-white/10'}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Configuración</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Preferencias de cuenta y sistema
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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="lg:w-48 shrink-0">
          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-2 flex lg:flex-col gap-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left w-full transition-colors ${
                  activeSection === id
                    ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-light tracking-wide">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-6">

          {activeSection === 'perfil' && (
            <>
              <h2 className="text-white text-base font-medium border-b border-white/[0.07] pb-4">Información de Perfil</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nombre completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Teléfono</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Rol</label>
                  <input
                    type="text"
                    value={user?.role ?? 'ADMIN'}
                    disabled
                    className="w-full bg-white/[0.01] border border-white/[0.05] rounded-lg px-4 py-2.5 text-sm text-white/30 cursor-not-allowed"
                  />
                </div>
              </div>
            </>
          )}

          {activeSection === 'seguridad' && (
            <>
              <h2 className="text-white text-base font-medium border-b border-white/[0.07] pb-4">Seguridad de la Cuenta</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Contraseña actual</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Nueva contraseña</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Confirmar contraseña</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                  <div>
                    <p className="text-sm font-medium text-white">Autenticación en dos pasos</p>
                    <p className="text-xs text-white/40 mt-0.5">Agrega una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                </div>
                <div className="pt-2 border-t border-white/[0.05]">
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Tiempo de expiración de sesión</label>
                  <select
                    value={sessionTimeout}
                    onChange={e => setSessionTimeout(e.target.value)}
                    className="bg-white/[0.03] border border-white/[0.08] text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none min-w-[200px]"
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="480">8 horas</option>
                    <option value="0">Nunca</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeSection === 'notificaciones' && (
            <>
              <h2 className="text-white text-base font-medium border-b border-white/[0.07] pb-4">Preferencias de Notificaciones</h2>
              <div className="space-y-5">
                {[
                  { key: 'newOrders' as const, label: 'Nuevos pedidos', desc: 'Recibe alertas cuando entre un pedido nuevo' },
                  { key: 'lowStock' as const, label: 'Stock bajo', desc: 'Aviso cuando un producto baja de 5 unidades' },
                  { key: 'newReviews' as const, label: 'Nuevas reseñas', desc: 'Notificación por cada reseña que requiera moderación' },
                  { key: 'marketing' as const, label: 'Informes de marketing', desc: 'Resumen semanal de métricas y rendimiento' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                    </div>
                    <Toggle checked={notifs[key]} onChange={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
