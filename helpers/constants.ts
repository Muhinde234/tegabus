import {
  BusFront,
  ChartLine,
  Clock,
  HelpCircle,
  House,
  Route,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

// These labels are now translation keys, to be used with useTranslations("navigation")
export const links = [
  { path: "/", label: "home" },
  { path: "/about", label: "about" },
  { path: "/route", label: "routes" },
  { path: "/conditions", label: "conditions" },
];

export const navItems = [
  { path: "/dashboard", icon: House, label: "Dashboard", allowedRoles: ['admin', 'manager'] },
  { path: "/dashboard/bookings", icon: Ticket, label: "Booking", allowedRoles: ['admin', 'manager'] },
  { path: "/dashboard/schedules", icon: Clock, label: "Schedule", allowedRoles: ['admin', 'manager'] },
  { path: "/dashboard/buses", icon: BusFront, label: "Bus Management", allowedRoles: ['admin', 'manager'] },
  { path: "/dashboard/routes", icon: Route, label: "Route Management", allowedRoles: ['admin', 'manager'] },
  { path: "/dashboard/users", icon: Users, label: "User Management", allowedRoles: ['admin'] },
  { path: "/dashboard/report", icon: ChartLine, label: "Report", allowedRoles: ['admin', 'manager'] },
];

export const bottomNavItems = [
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/support", icon: HelpCircle, label: "Help & Support" },
];
