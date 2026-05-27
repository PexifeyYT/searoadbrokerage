'use client';

import { useState, createContext, useContext } from 'react';
import AdminSidebar from './AdminSidebar';

const SidebarCtx = createContext<{ open: () => void } | null>(null);

export function useSidebar() {
  return useContext(SidebarCtx);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarCtx.Provider value={{ open: () => setIsOpen(true) }}>
      <div className="flex min-h-screen">
        <AdminSidebar mobileOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {children}
        </div>
      </div>
    </SidebarCtx.Provider>
  );
}
