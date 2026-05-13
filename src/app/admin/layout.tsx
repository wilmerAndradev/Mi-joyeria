import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración — Aleafar',
  description: 'Back-office de gestión para Aleafar Joyería Fina',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0F] font-sans">
      {children}
    </div>
  );
}
