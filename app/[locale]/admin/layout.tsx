
import Sidebar from '@/components/dashboard/sidebar';
import { ReactNode } from 'react';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar/>
      
      <main className="flex-1 ml-64  bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
