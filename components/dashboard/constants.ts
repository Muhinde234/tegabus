import {
  BusFront,
  ChartLine,
  Clock,
  HelpCircle,
  House,
  Settings,
  Ticket,
  Users, 
  LogOutIcon
} from "lucide-react";

export type UserRole = 'admin' | 'manager' | 'user';

export interface NavItem {
  path: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  allowedRoles?: UserRole[];
}

export const navItems: NavItem[] = [
  { path: "/admin", icon: House, label: "Dashboard", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/booking", icon: Ticket, label: "Booking", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/schedules", icon: Clock, label: "Schedule", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/buses", icon: BusFront, label: "Bus Management", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/routes", icon: BusFront, label: "Route Management", allowedRoles: ['admin', 'manager'] },
  { path: "/admin/users", icon: Users, label: "User Management", allowedRoles: ['admin'] },
  { path: "/admin/reports", icon: ChartLine, label: "Report", allowedRoles: ['admin', 'manager'] },
];

export const bottomNavItems: NavItem[] = [
  { path: "/admin/settings", icon: Settings, label: "Settings" },
  { path: "/admin/support", icon: HelpCircle, label: "Help & Support" },
  {path:"/login", icon:LogOutIcon,label:"Logout"}
];

