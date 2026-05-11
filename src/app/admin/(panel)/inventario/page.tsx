'use client';

import { useState } from 'react';
import { Search, AlertTriangle, ArrowUpDown, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import Image from 'next/image';

// Asignamos stock mock a los productos para simular
const MOCK_INVENTORY = PRODUCTS.map((product, idx) => ({
  ...product,
  stock: product.stock ?? (
    idx % 5 === 0 ? 0 : // Sin stock
    idx % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : // Poco stock (1-5)
    Math.floor(Math.random() * 20) + 10 // Stock normal (10-30)
  )
}));

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all, low, out

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.id.toLowerCase().includes(search.toLowerCase());
    
    let matchesFilter = true;
    if (filter === 'low') matchesFilter = item.stock > 0 && item.stock <= 5;
    if (filter === 'out') matchesFilter = item.stock === 0;

    return matchesSearch && matchesFilter;
  });

  const handleStockUpdate = (id: string, newStock: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, stock: newStock } : item
    ));
  };

  const lowStockCount = inventory.filter(i => i.stock > 0 && i.stock <= 5).length;
  const outOfStockCount = inventory.filter(i => i.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Inventario</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Control de stock y alertas de reposición
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/50 mb-1">Total Productos</p>
              <p className="text-2xl font-serif text-white">{inventory.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white/30" />
            </div>
          </div>
        </div>

        <div className="bg-[#111114] border border-amber-500/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] -mr-10 -mt-10 rounded-full pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm font-medium text-amber-500/80 mb-1">Stock Crítico (≤ 5)</p>
              <p className="text-2xl font-serif text-amber-500">{lowStockCount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-[#111114] border border-red-500/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] -mr-10 -mt-10 rounded-full pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm font-medium text-red-500/80 mb-1">Sin Stock</p>
              <p className="text-2xl font-serif text-red-500">{outOfStockCount}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col">
        {/* Filters bar */}
        <div className="p-4 border-b border-white/[0.07] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar producto o ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] text-white/70 px-4 py-2 rounded-lg text-sm font-medium tracking-wide focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none min-w-[140px]"
            >
              <option value="all">Todo el Inventario</option>
              <option value="low">Stock Crítico</option>
              <option value="out">Sin Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Producto</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">ID / SKU</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Categoría</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Stock Actual</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 relative overflow-hidden shrink-0">
                        {item.images[0] && (
                          <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-white/90 truncate max-w-[200px]">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-white/50">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/50 capitalize">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number"
                        min="0"
                        value={item.stock}
                        onChange={(e) => handleStockUpdate(item.id, parseInt(e.target.value) || 0)}
                        className={`w-20 bg-transparent border ${
                          item.stock === 0 ? 'border-red-500/50 text-red-400 focus:border-red-500' :
                          item.stock <= 5 ? 'border-amber-500/50 text-amber-400 focus:border-amber-500' :
                          'border-white/[0.1] text-white focus:border-[#C9A84C]'
                        } rounded px-2 py-1 text-sm outline-none transition-colors`}
                      />
                      <span className="text-xs text-white/30">unidades</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.stock === 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider bg-red-500/10 text-red-500 border-red-500/20">
                        <AlertCircle className="w-3 h-3" /> Sin Stock
                      </span>
                    ) : item.stock <= 5 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider bg-amber-500/10 text-amber-500 border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" /> Bajo Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> En Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40 text-sm">
                    No se encontraron productos con ese filtro
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
