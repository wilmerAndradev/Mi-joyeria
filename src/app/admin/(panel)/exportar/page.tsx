'use client';

import { useState } from 'react';
import { Download, FileText, ShoppingCart, Package, Users, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, formatPrice } from '@/data/products';
import { ORDERS } from '@/data/orders';

type ExportType = 'productos' | 'pedidos' | 'inventario' | 'clientes';

interface ExportOption {
  id: ExportType;
  label: string;
  description: string;
  icon: React.ReactNode;
  rowCount: number;
  columns: string[];
}

const exportOptions: ExportOption[] = [
  {
    id: 'productos',
    label: 'Catálogo de Productos',
    description: 'Todos los productos con precios, categorías y detalles de material.',
    icon: <Package className="w-5 h-5" />,
    rowCount: PRODUCTS.length,
    columns: ['ID', 'Nombre', 'Slug', 'Categoría', 'Precio', 'Precio Comparación', 'Material', 'Color', 'En Stock', 'Badge', 'Rating', 'Reseñas'],
  },
  {
    id: 'pedidos',
    label: 'Historial de Pedidos',
    description: 'Exporta todos los pedidos con cliente, total, estado y método de pago.',
    icon: <ShoppingCart className="w-5 h-5" />,
    rowCount: ORDERS.length,
    columns: ['ID Pedido', 'Fecha', 'Cliente', 'Email', 'Total', 'Estado', 'Método Pago', 'Dirección'],
  },
  {
    id: 'inventario',
    label: 'Estado del Inventario',
    description: 'Stock actual por producto con alertas de reposición.',
    icon: <FileText className="w-5 h-5" />,
    rowCount: PRODUCTS.length,
    columns: ['ID', 'Nombre', 'Categoría', 'Material', 'En Stock', 'Stock (unidades)', 'Estado'],
  },
  {
    id: 'clientes',
    label: 'Base de Clientes',
    description: 'Lista de clientes únicos extraída del historial de pedidos.',
    icon: <Users className="w-5 h-5" />,
    rowCount: ORDERS.length,
    columns: ['Nombre', 'Email', 'Teléfono', 'Dirección', 'Total Gastado', 'Pedidos'],
  },
];

function arrayToCsv(headers: string[], rows: string[][]): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [headers.map(escape).join(',')];
  for (const row of rows) {
    lines.push(row.map(escape).join(','));
  }
  return lines.join('\r\n');
}

function downloadCsv(filename: string, csv: string) {
  const bom = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildCsv(type: ExportType): { filename: string; csv: string } {
  const date = new Date().toISOString().split('T')[0];

  if (type === 'productos') {
    const headers = ['ID', 'Nombre', 'Slug', 'Categoría', 'Precio', 'Precio Comparación', 'Material', 'Color', 'En Stock', 'Badge', 'Rating', 'Reseñas'];
    const rows = PRODUCTS.map(p => [
      p.id, p.name, p.slug, p.category,
      String(p.price), String(p.compareAtPrice ?? ''),
      p.material, p.color,
      p.inStock ? 'Sí' : 'No',
      p.badge ?? '', String(p.rating), String(p.reviews),
    ]);
    return { filename: `aleafar_productos_${date}.csv`, csv: arrayToCsv(headers, rows) };
  }

  if (type === 'pedidos') {
    const headers = ['ID Pedido', 'Fecha', 'Cliente', 'Email', 'Total', 'Estado', 'Método Pago', 'Dirección'];
    const rows = ORDERS.map(o => [
      o.id,
      new Date(o.date).toLocaleDateString('es-CL'),
      o.customerName, o.email,
      String(o.total), o.status, o.paymentMethod,
      o.address ?? '',
    ]);
    return { filename: `aleafar_pedidos_${date}.csv`, csv: arrayToCsv(headers, rows) };
  }

  if (type === 'inventario') {
    const headers = ['ID', 'Nombre', 'Categoría', 'Material', 'En Stock', 'Stock (unidades)', 'Estado'];
    const rows = PRODUCTS.map((p, idx) => {
      const stock = p.stock ?? (idx % 5 === 0 ? 0 : idx % 3 === 0 ? 3 : 15);
      const estado = stock === 0 ? 'Sin Stock' : stock <= 5 ? 'Bajo Stock' : 'En Stock';
      return [p.id, p.name, p.category, p.material, p.inStock ? 'Sí' : 'No', String(stock), estado];
    });
    return { filename: `aleafar_inventario_${date}.csv`, csv: arrayToCsv(headers, rows) };
  }

  // clientes
  const headers = ['Nombre', 'Email', 'Teléfono', 'Dirección', 'Total Gastado', 'Pedidos'];
  const rows = ORDERS.map(o => [
    o.customerName, o.email, o.phone ?? '', o.address ?? '',
    String(o.total), '1',
  ]);
  return { filename: `aleafar_clientes_${date}.csv`, csv: arrayToCsv(headers, rows) };
}

export default function AdminExportPage() {
  const [downloading, setDownloading] = useState<ExportType | null>(null);
  const [downloaded, setDownloaded] = useState<ExportType[]>([]);

  const handleDownload = async (type: ExportType) => {
    setDownloading(type);
    await new Promise(r => setTimeout(r, 600)); // Simulate brief processing
    const { filename, csv } = buildCsv(type);
    downloadCsv(filename, csv);
    setDownloading(null);
    setDownloaded(prev => [...prev, type]);
    setTimeout(() => setDownloaded(prev => prev.filter(t => t !== type)), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif text-white tracking-tight">Exportar Datos</h1>
        <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
          Descarga datos del sistema como archivos CSV compatibles con Excel
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-xl">
        <FileSpreadsheet className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-white/80">Formato CSV con codificación UTF-8 + BOM</p>
          <p className="text-xs text-white/40 mt-0.5">Los archivos incluyen BOM para compatibilidad directa con Microsoft Excel y Google Sheets. Los caracteres especiales (tildes, ñ) se preservan correctamente.</p>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exportOptions.map(opt => {
          const isLoading = downloading === opt.id;
          const isDone = downloaded.includes(opt.id);
          return (
            <div key={opt.id} className="bg-[#111114] border border-white/[0.07] rounded-xl p-5 flex flex-col gap-4 hover:border-white/[0.12] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0 text-[#C9A84C]">
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white">{opt.label}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{opt.description}</p>
                </div>
              </div>

              {/* Columns preview */}
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Columnas incluidas</p>
                <div className="flex flex-wrap gap-1.5">
                  {opt.columns.map(col => (
                    <span key={col} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.06]">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.05]">
                <span className="text-xs text-white/30">{opt.rowCount} registros</span>
                <button
                  onClick={() => handleDownload(opt.id)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isDone
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                      : isLoading
                        ? 'bg-white/[0.05] text-white/40 cursor-wait'
                        : 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25 hover:bg-[#C9A84C]/25'
                  }`}
                >
                  {isDone ? (
                    <><CheckCircle2 className="w-4 h-4" /> Descargado</>
                  ) : isLoading ? (
                    <><span className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" /> Generando…</>
                  ) : (
                    <><Download className="w-4 h-4" /> Descargar CSV</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
