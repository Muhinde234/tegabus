
import { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import AppSidebar from "@/components/dashboard/app-side-bar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
            <SidebarTrigger />
            <main className="bg-gray-50 w-full min-h-screen">
                {children}
            </main>
        </div>
    </SidebarProvider>
  );
}
