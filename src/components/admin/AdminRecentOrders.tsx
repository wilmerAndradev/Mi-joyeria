'use client';

import { MoreHorizontal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const RECENT_ORDERS = [
  { id: '#ORD-092', customer: 'Carolina Herrera', date: 'Hoy, 14:30', amount: '$1.450.000', status: 'Pendiente' },
  { id: '#ORD-091', customer: 'Javiera Silva', date: 'Hoy, 11:15', amount: '$850.000', status: 'Procecharcoalo' },
  { id: '#ORD-090', customer: 'Mateo Valenzuela', date: 'Ayer, 18:45', amount: '$2.100.000', status: 'Enviado' },
  { id: '#ORD-089', customer: 'Sofía Reyes', date: 'Ayer, 09:20', amount: '$450.000', status: 'Entregado' },
  { id: '#ORD-088', customer: 'Luis Montes', date: '07 May, 16:10', amount: '$1.150.000', status: 'Pendiente' },
];

const STATUS_COLORS: Record<string, string> = {
  'Pendiente': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  'Procecharcoalo': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Enviado': 'bg-purple-400/10 text-purple-400 border-purple-400/20',
  'Entregado': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
};

export default function AdminRecentOrders() {
  return (
    <div className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-white/[0.07] flex items-center justify-between">
        <h3 className="text-white text-sm font-medium tracking-wide">Pedidos Recientes</h3>
        <Link href="/admin/pedidos" className="text-[#C9A84C] hover:text-[#D4B55E] text-xs font-medium tracking-wider flex items-center gap-1 transition-colors">
          Ver Todos <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
              <th className="px-6 py-3 text-[11px] font-medium text-white/40 tracking-wider uppercase">ID Pedido</th>
              <th className="px-6 py-3 text-[11px] font-medium text-white/40 tracking-wider uppercase">Cliente</th>
              <th className="px-6 py-3 text-[11px] font-medium text-white/40 tracking-wider uppercase">Estado</th>
              <th className="px-6 py-3 text-[11px] font-medium text-white/40 tracking-wider uppercase">Total</th>
              <th className="px-6 py-3 text-[11px] font-medium text-white/40 tracking-wider uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {RECENT_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="text-sm text-white font-medium">{order.id}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{order.date}</div>
                </td>
                <td className="px-6 py-4 text-sm text-white/80">{order.customer}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-serif text-white tracking-wide">{order.amount}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-white/30 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
