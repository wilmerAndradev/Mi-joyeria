'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle2, XCircle, Clock, MapPin, Mail, Phone, CreditCard } from 'lucide-react';
import { getOrderById, Order } from '@/data/orders';
import { formatPrice } from '@/data/products';

const statusColors = {
  pendiente: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  procecharcoalo: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  enviado: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
  entregado: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  cancelado: 'bg-red-400/10 text-red-400 border-red-400/20',
};

const statusIcons = {
  pendiente: Clock,
  procecharcoalo: Package,
  enviado: Truck,
  entregado: CheckCircle2,
  cancelado: XCircle,
};

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  // Use state to allow local simulation of status changes
  const [order, setOrder] = useState<Order | undefined>(() => getOrderById(orderId));

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-white/50">Pedido no encontrado</p>
        <Link href="/admin/pedidos" className="text-[#C9A84C] hover:underline">Volver a Pedidos</Link>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status];

  const handleStatusChange = (newStatus: Order['status']) => {
    setOrder({ ...order, status: newStatus });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/pedidos" className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] rounded-lg text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-serif text-white tracking-tight">Pedido #{order.id}</h1>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider flex items-center gap-1.5 ${statusColors[order.status]}`}>
                <StatusIcon className="w-3 h-3" />
                {order.status}
              </span>
            </div>
            <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
              {new Date(order.date).toLocaleString('es-CL', {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        {/* Acciones de estado */}
        <div className="flex items-center gap-2">
          <select 
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
            className="bg-[#111114] border border-white/[0.08] text-white px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none min-w-[160px]"
          >
            <option value="pendiente">Marcar Pendiente</option>
            <option value="procecharcoalo">Marcar Procecharcoalo</option>
            <option value="enviado">Marcar Enviado</option>
            <option value="entregado">Marcar Entregado</option>
            <option value="cancelado">Cancelar Pedido</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Items y Resumen */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-white/[0.07]">
              <h2 className="text-white text-base font-medium tracking-wide">Artículos ({order.items.reduce((acc, item) => acc + item.quantity, 0)})</h2>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{item.name}</h3>
                      <p className="text-xs text-white/40 mt-0.5">ID: {item.productId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-serif text-white">{formatPrice(item.price)}</p>
                    <p className="text-xs text-white/40 mt-0.5">Cant: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-white/[0.01] border-t border-white/[0.07]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/50">Subtotal</span>
                <span className="text-sm text-white">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-white/50">Envío</span>
                <span className="text-sm text-white">Calculado</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/[0.05]">
                <span className="text-base font-medium text-white">Total</span>
                <span className="text-xl font-serif text-[#C9A84C]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Cliente e Info */}
        <div className="space-y-6">
          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide border-b border-white/[0.07] pb-4">Cliente</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-white">{order.customerName}</p>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-white/30" />
                <a href={`mailto:${order.email}`} className="text-blue-400 hover:underline">{order.email}</a>
              </div>
              
              {order.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-white/30" />
                  <a href={`tel:${order.phone}`} className="text-white/70 hover:text-white transition-colors">{order.phone}</a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide border-b border-white/[0.07] pb-4">Dirección de Envío</h2>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-white/30 mt-0.5" />
              <p className="text-sm text-white/70 leading-relaxed">
                {order.address || 'No especificada (Retiro en tienda)'}
              </p>
            </div>
          </div>

          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide border-b border-white/[0.07] pb-4">Pago</h2>
            
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-white/30" />
              <div>
                <p className="text-sm text-white/70 capitalize">
                  {order.paymentMethod === 'credit_card' ? 'Tarjeta de Crédito' : 
                   order.paymentMethod === 'debit_card' ? 'Tarjeta de Débito' : 'Transferencia'}
                </p>
                <p className="text-xs text-emerald-400 mt-1">Pago verificado</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
