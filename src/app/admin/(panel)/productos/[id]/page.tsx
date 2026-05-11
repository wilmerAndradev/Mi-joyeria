'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { getProductBySlug, PRODUCTS } from '@/data/products';

export default function AdminEditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  
  // En un caso real usaríamos un fetch, aquí simulamos con la data estática
  // ucharcoalo el ID del parámetro
  const productId = params.id as string;
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-white/50">Producto no encontrado</p>
        <Link href="/admin/productos" className="text-[#C9A84C] hover:underline">Volver a Productos</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save delay
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/productos');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/productos" className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] rounded-lg text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-white tracking-tight">Editar Producto</h1>
            <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
              ID: #{product.id}
            </p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#C9A84C] hover:bg-[#D4B55E] text-[#0D0D0F] px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-[#0D0D0F]/30 border-t-[#0D0D0F] rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide">Información Básica</h2>
            
            <div className="space-y-2">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Nombre del Producto</label>
              <input 
                type="text" 
                defaultValue={product.name}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Descripción</label>
              <textarea 
                rows={4}
                defaultValue={product.description}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide">Precios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Precio (CLP)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                  <input 
                    type="number" 
                    defaultValue={product.price}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Precio Comparación</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                  <input 
                    type="number" 
                    defaultValue={product.compareAtPrice || ''}
                    placeholder="Opcional"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Meta y Media */}
        <div className="space-y-6">
          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide">Organización</h2>
            
            <div className="space-y-2">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Estado</label>
              <select 
                defaultValue={product.inStock ? "active" : "draft"}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
              >
                <option value="active">Activo</option>
                <option value="draft">Borrador</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Categoría</label>
              <select 
                defaultValue={product.category}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
              >
                <option value="anillos">Anillos</option>
                <option value="collares">Collares</option>
                <option value="pulseras">Pulseras</option>
                <option value="aros">Aros</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">Material</label>
              <select 
                defaultValue={product.materialKey}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
              >
                <option value="oro-blanco">Oro Blanco 18k</option>
                <option value="oro-amarillo">Oro Amarillo 18k</option>
                <option value="oro-rosa">Oro Rosa 18k</option>
                <option value="plata">Plata 925</option>
              </select>
            </div>
          </div>

          <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-6 space-y-5">
            <h2 className="text-white text-base font-medium tracking-wide">Multimedia</h2>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-lg bg-white/[0.02] border border-white/[0.05] overflow-hidden relative group">
                  <Image src={img} alt={`Img ${idx}`} fill sizes="200px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="text-xs text-white">Cambiar</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] hover:border-[#C9A84C]/50 transition-colors cursor-pointer group">
              <Plus className="w-4 h-4 text-white/50 group-hover:text-[#C9A84C] mb-2" />
              <p className="text-xs text-white/80 font-medium">Añadir más</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Dummy Plus icon component since it wasn't imported from lucide-react above
function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
