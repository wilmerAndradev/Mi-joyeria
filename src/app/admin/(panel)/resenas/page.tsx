'use client';

import { useState } from 'react';
import { Star, Search, Check, X, Eye, EyeOff, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  email: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  verified: boolean;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001', productId: '1', productName: 'Solitario Eternity 1ct',
    customer: 'María Antonieta Rojas', email: 'maria.rojas@ejemplo.cl',
    rating: 5, title: 'Absolutamente impresionante',
    body: 'El anillo superó todas mis expectativas. La calidad del diamante es extraordinaria y el acabado en oro blanco es perfecto. Lo recibí bien empacado y a tiempo.',
    date: '2023-11-20T10:30:00Z', status: 'aprobado', verified: true,
  },
  {
    id: 'rev-002', productId: '3', productName: 'Anillo Eternelle Dorado',
    customer: 'Valentina Cruz', email: 'vcruz@ejemplo.cl',
    rating: 4, title: 'Hermoso, muy recomendado',
    body: 'Me encantó el diseño y la calidad del material. El único detalle es que tardó un poco más de lo esperado en llegar, pero valió la pena la espera.',
    date: '2023-11-22T14:15:00Z', status: 'pendiente', verified: true,
  },
  {
    id: 'rev-003', productId: '4', productName: 'Tennis Necklace 3ct',
    customer: 'Andrés Morales', email: 'amorales@ejemplo.cl',
    rating: 2, title: 'Decepcionante para el precio',
    body: 'Esperaba más por lo que pagué. El collar es bonito pero el cierre se ve frágil y el brillo no es tan intenso como en las fotos.',
    date: '2023-11-24T09:00:00Z', status: 'pendiente', verified: false,
  },
  {
    id: 'rev-004', productId: '9', productName: 'Aros Trébol Pavé',
    customer: 'Sofía Mena', email: 's.mena@ejemplo.cl',
    rating: 5, title: '¡Perfectos para regalar!',
    body: 'Los compré como regalo de cumpleaños y quedaron preciosos. La presentación de la caja es lujosa y los aros brillan muchísimo. Totalmente recomendados.',
    date: '2023-11-25T16:45:00Z', status: 'aprobado', verified: true,
  },
  {
    id: 'rev-005', productId: '7', productName: 'Aros Argolla Diamante',
    customer: 'Roberto Pérez', email: 'rperez@ejemplo.cl',
    rating: 1, title: 'Producto no corresponde',
    body: 'Las fotos muestran una cosa y el producto llegó diferente. No estoy conforme y espero una respuesta del equipo.',
    date: '2023-11-26T11:30:00Z', status: 'rechazado', verified: true,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(n => (
      <Star key={n} className={`w-3.5 h-3.5 ${n <= rating ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-white/20'}`} />
    ))}
  </div>
);

const statusConfig = {
  pendiente: { label: 'Pendiente', classes: 'bg-amber-400/10 text-amber-400 border-amber-400/20' },
  aprobado: { label: 'Aprobado', classes: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
  rechazado: { label: 'Rechazado', classes: 'bg-red-400/10 text-red-400 border-red-400/20' },
};

export default function AdminResenasPage() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = reviews.filter(r => {
    const matchSearch = r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: Review['status']) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const pending = reviews.filter(r => r.status === 'pendiente').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white tracking-tight">Reseñas</h1>
          <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
            Modera y gestiona las opiniones de clientes
          </p>
        </div>
        {pending > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm text-amber-400">{pending} reseña{pending !== 1 ? 's' : ''} pendiente{pending !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar por cliente o producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111114] border border-white/[0.08] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-[#111114] border border-white/[0.08] text-white/70 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none min-w-[140px]"
        >
          <option value="all">Todas</option>
          <option value="pendiente">Pendientes</option>
          <option value="aprobado">Aprobadas</option>
          <option value="rechazado">Rechazadas</option>
        </select>
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {filtered.map(review => (
          <div key={review.id} className="bg-[#111114] border border-white/[0.07] rounded-xl overflow-hidden transition-all">
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <StarRating rating={review.rating} />
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${statusConfig[review.status].classes}`}>
                      {statusConfig[review.status].label}
                    </span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400/70 uppercase tracking-wider">
                        <Check className="w-3 h-3" /> Compra verificada
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{review.title}</h3>
                  <p className="text-xs text-white/40 mb-2">
                    <span className="text-white/60">{review.customer}</span>
                    {' · '}
                    <span className="text-[#C9A84C]/70">{review.productName}</span>
                    {' · '}
                    {new Date(review.date).toLocaleDateString('es-CL')}
                  </p>
                  <p className={`text-sm text-white/60 leading-relaxed ${expanded === review.id ? '' : 'line-clamp-2'}`}>
                    {review.body}
                  </p>
                  {review.body.length > 120 && (
                    <button
                      onClick={() => setExpanded(expanded === review.id ? null : review.id)}
                      className="text-xs text-white/30 hover:text-white/60 mt-1 transition-colors flex items-center gap-1"
                    >
                      {expanded === review.id ? <><EyeOff className="w-3 h-3" /> Mostrar menos</> : <><Eye className="w-3 h-3" /> Leer más</>}
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {review.status !== 'aprobado' && (
                    <button
                      onClick={() => updateStatus(review.id, 'aprobado')}
                      title="Aprobar"
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {review.status !== 'rechazado' && (
                    <button
                      onClick={() => updateStatus(review.id, 'rechazado')}
                      title="Rechazar"
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    title="Eliminar"
                    className="p-2 rounded-lg bg-white/[0.03] text-white/30 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.08] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/30 text-sm">
            No se encontraron reseñas
          </div>
        )}
      </div>
    </div>
  );
}
