'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';

// Map routes to display names
const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/pedidos': 'Pedidos',
  '/admin/productos': 'Productos',
  '/admin/inventario': 'Inventario',
  '/admin/resenas': 'Reseñas',
  '/admin/cupones': 'Cupones',
  '/admin/envios': 'Envíos',
  '/admin/exportar': 'Exportar CSV',
  '/admin/configuracion': 'Configuración',
};

function getPageTitle(pathname: string): string {
  for (const [route, title] of Object.entries(PAGE_TITLES)) {
    if (pathname === route || pathname.startsWith(route + '/')) return title;
  }
  return 'Admin';
}

export default function AdminHeader() {
  const pathname = usePathname();
  const user = useAdminStore((s) => s.user);
  const logout = useAdminStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const title = getPageTitle(pathname);
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#111114] border-b border-white/[0.07] flex-shrink-0">
      {/* Left: breadcrumb / page title */}
      <div>
        <h2 className="text-white text-base font-serif tracking-tight leading-none">{title}</h2>
        <p className="text-white/30 text-[11px] tracking-widest font-light mt-1 capitalize">{dateStr}</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Search trigger (stub) */}
        <button
          id="admin-header-search"
          className="hidden sm:flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08]
                     rounded-lg px-3 py-2 text-white/30 text-xs tracking-wider transition-all duration-200 group"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span>Buscar...</span>
          <span className="ml-2 bg-white/[0.06] rounded px-1.5 py-0.5 text-[10px]">⌘K</span>
        </button>

        {/* Notifications (stub) */}
        <button
          id="admin-header-notifications"
          className="relative w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08]
                     flex items-center justify-center text-white/40 hover:text-white/70 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
        </button>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            id="admin-header-user-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08]
                       rounded-lg px-3 py-2 transition-all duration-200 group"
          >
            <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A84C] text-[11px] font-medium">
                {user?.name?.charAt(0) ?? 'A'}
              </span>
            </div>
            <span className="hidden sm:block text-white/60 text-xs font-light tracking-wide">
              {user?.name?.split(' ')[0]}
            </span>
            <svg
              className={`w-3 h-3 text-white/30 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 z-20 bg-[#1A1A1E] border border-white/[0.10] rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.07]">
                  <p className="text-white/80 text-xs font-light">{user?.name}</p>
                  <p className="text-white/30 text-[10px] tracking-wider mt-0.5">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-white/50 hover:text-white/80 hover:bg-white/[0.04] text-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Mi Perfil
                  </button>
                  <Link
                    href="/admin/configuracion"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-white/50 hover:text-white/80 hover:bg-white/[0.04] text-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configuración
                  </Link>
                  <div className="my-1 border-t border-white/[0.06]" />
                  <button
                    id="admin-dropdown-logout"
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] text-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
