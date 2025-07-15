import {BusFront, ChartLine, Clock, HelpCircle, House, Settings, Ticket, Users} from "lucide-react";

export type UserRole = 'admin' | 'manager' | 'user';

export interface NavItem {
  path: string;
  icon: React.ComponentType<{ size?: number; }>;
  label: string;
  allowedRoles?: UserRole[];
}

// Note: These are now keys for translation - actual translations are handled in components
export const navItems: NavItem[] = [
  { path: "/admin", icon: House, label: "sidebar.dashboard", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/booking", icon: Ticket, label: "sidebar.booking", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/schedules", icon: Clock, label: "sidebar.schedule", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/buses", icon: BusFront, label: "sidebar.busManagement", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/routes", icon: BusFront, label: "sidebar.routeManagement", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/users", icon: Users, label: "sidebar.userManagement", allowedRoles: ['admin'] },
  { path: "/admin/reports", icon: ChartLine, label: "sidebar.report", allowedRoles: ['admin', 'manager'] },
];

export const bottomNavItems: NavItem[] = [
  { path: "/admin/settings", icon: Settings, label: "sidebar.settings" },
  { path: "/admin/support", icon: HelpCircle, label: "sidebar.helpSupport" },
];

