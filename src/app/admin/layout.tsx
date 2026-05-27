import AdminGuard from '@/components/admin/AdminGuard';
import AdminShell from '@/components/admin/AdminShell';
import '@/styles/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AdminGuard>
          <AdminShell>{children}</AdminShell>
        </AdminGuard>
      </body>
    </html>
  );
}
