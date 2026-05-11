import AdminMetricsGrid from '@/components/admin/AdminMetricsGrid';
import AdminSalesChart from '@/components/admin/AdminSalesChart';
import AdminRecentOrders from '@/components/admin/AdminRecentOrders';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-serif text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1 font-light tracking-wider">
          Resumen de actividad y métricas clave
        </p>
      </div>

      {/* Metrics Row */}
      <AdminMetricsGrid />

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AdminSalesChart />
        </div>
        <div className="xl:col-span-1">
          <AdminRecentOrders />
        </div>
      </div>
    </div>
  );
}
