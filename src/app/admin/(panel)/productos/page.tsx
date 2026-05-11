'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { PRODUCTS, formatPrice } from '@/data/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.includes(search)
  );

  const handleDelete = (id: string) => {
    if (confirm('¿Estás segura de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Productos</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Gestiona el catálogo de joyas ({products.length} totales)
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-[#C9A84C] hover:bg-[#D4B55E] text-[#0D0D0F] px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Link>
      </div>

      <div className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col">
        {/* Filters bar */}
        <div className="p-4 border-b border-white/[0.07] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/70 px-4 py-2 rounded-lg text-sm font-medium tracking-wide flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" />
              Filtrar
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Producto</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">ID</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Categoría</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Precio</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase">Stock</th>
                <th className="px-6 py-4 text-[11px] font-medium text-white/40 tracking-wider uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-white/[0.05] border border-white/[0.08] overflow-hidden flex-shrink-0 relative">
                        <Image src={product.images[0]} alt={product.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{product.name}</div>
                        {product.badge && (
                          <div className="text-[10px] text-[#C9A84C] mt-0.5 tracking-wider uppercase">
                            {product.badge}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/50 font-mono">#{product.id}</td>
                  <td className="px-6 py-4 text-sm text-white/70 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-serif text-white">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                      product.inStock 
                        ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                        : 'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {product.inStock ? 'En Stock' : 'Agotado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/productos/${product.id}`} className="p-1.5 text-white/40 hover:text-[#C9A84C] transition-colors rounded">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-white/40 hover:text-red-400 transition-colors rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40 text-sm">
                    No se encontraron productos
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
