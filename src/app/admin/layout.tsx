import AdminGuard from '@/components/admin/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '@/styles/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AdminGuard>
          <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">{children}</div>
          </div>
        </AdminGuard>
      </body>
    </html>
  );
}
