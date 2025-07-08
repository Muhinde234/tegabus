'use client';

import { usePathname } from 'next/navigation';
import { bottomNavItems, navItems } from './constants';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("dashboard");

  return (
    <Sidebar className="bg-[#0B3B2E] text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <Link href="/admin" className="flex items-center gap-3 mb-3">
              <Logo />
            </Link>
          </SidebarHeader>

          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild size="lg" className={cn(
                    'text-md justify-start hover:bg-white/10',
                    isActive && 'bg-white/10'
                  )}>
                    <Link href={item.path}>
                      <item.icon size={20} />
                      <span>{t(item.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto border-t border-white/10 pt-2">
          <SidebarMenu>
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild size="lg" className={cn(
                    'text-md justify-start hover:bg-white/10',
                    isActive && 'bg-white/10'
                  )}>
                    <Link href={item.path}>
                      <item.icon size={20} />
                      <span>{t(item.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}