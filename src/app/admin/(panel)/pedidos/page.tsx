'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, ChevronRight } from 'lucide-react';
import { ORDERS, Order } from '@/data/orders';
import { formatPrice } from '@/data/products';

const statusColors = {
  pendiente: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  procecharcoalo: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  enviado: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
  entregado: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  cancelado: 'bg-red-400/10 text-red-400 border-red-400/20',
};

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
                          o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Pedidos</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Gestiona y haz seguimiento a las órdenes de compra
          </p>
        </div>
      </div>

      <div className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col">
        {/* Filters bar */}
        <div className="p-4 border-b border-white/[0.07] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar por ID o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] text-white/70 px-4 py-2 rounded-lg text-sm font-medium tracking-wide focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none min-w-[140px]"
            >
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="procecharcoalo">Procecharcoalo</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Pedido</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Fecha</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Cliente</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Total</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Estado</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-white/90">
                    <Link href={`/admin/pedidos/${order.id}`} className="hover:text-[#C9A84C] transition-colors">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">
                    {new Date(order.date).toLocaleDateString('es-CL', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white/90">{order.customerName}</div>
                    <div className="text-xs text-white/40 mt-0.5">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-serif text-white">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/pedidos/${order.id}`} className="inline-flex items-center justify-center p-2 text-white/40 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40 text-sm">
                    No se encontraron pedidos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
