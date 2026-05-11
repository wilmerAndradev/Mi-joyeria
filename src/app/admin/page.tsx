'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import AdminLoginPage from '@/components/admin/AdminLoginPage';

export default function AdminRootPage() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return <AdminLoginPage />;
}
