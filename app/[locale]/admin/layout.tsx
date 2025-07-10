
import { ReactNode } from 'react';
import AppSidebar from "@/components/dashboard/app-side-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode; }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SidebarTrigger />
        <main className=" px-6 w-full min-h-screen bg-white">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}