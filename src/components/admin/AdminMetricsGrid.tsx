'use client';

import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, Gem } from 'lucide-react';

const METRICS = [
  {
    label: 'Ingresos Totales',
    value: '$12.450.000',
    change: '+14.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Pedidos del Mes',
    value: '142',
    change: '+5.2%',
    trend: 'up',
    icon: ShoppingBag,
  },
  {
    label: 'Nuevos Clientes',
    value: '38',
    change: '-2.1%',
    trend: 'down',
    icon: Users,
  },
  {
    label: 'Productos Activos',
    value: '284',
    change: '+12',
    trend: 'neutral',
    icon: Gem,
  },
];

export default function AdminMetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {METRICS.map((metric, idx) => (
        <div
          key={idx}
          className="bg-[#111114] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-white/[0.03] rounded-lg">
              <metric.icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
            </div>
            {metric.trend !== 'neutral' && (
              <div
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
                  metric.trend === 'up'
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-red-400 bg-red-400/10'
                }`}
              >
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                ) : (
                  <ArrowDownRight className="w-3 h-3" strokeWidth={2} />
                )}
                {metric.change}
              </div>
            )}
            {metric.trend === 'neutral' && (
              <div className="text-white/40 text-[11px] font-medium px-2 py-1">
                {metric.change}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-white text-2xl font-serif tracking-tight">{metric.value}</h3>
            <p className="text-white/40 text-xs tracking-wide font-light mt-1">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
