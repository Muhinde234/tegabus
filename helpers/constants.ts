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




export const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/route", label: "Routes" },
  { path: "/conditions", label: "Terms & Conditions" },
];

export const navItems = [
  { path: "/dashboard", icon: House, label: "Dashboard", allowedRoles:['admin', 'manager']},
  { path: "/dashboard/bookings", icon: Ticket, label: "Booking", allowedRoles:['admin', 'manager'] },
  { path: "/dashboard/schedules", icon: Clock, label: "Schedule", allowedRoles:['admin', 'manager'] },
  { path: "/dashboard/buses", icon: BusFront, label: "Bus Management", allowedRoles:['admin', 'manager'] },
  { path: "/dashboard/routes", icon: Route, label: "Route Management", allowedRoles:['admin', 'manager'] },
  { path: "/dashboard/users", icon: Users, label: "User Management", allowedRoles:['admin'] },
  { path: "/dashboard/report", icon: ChartLine, label: "Report", allowedRoles:['admin', 'manager'] },
];

export const bottomNavItems = [
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/support", icon: HelpCircle, label: "Help & Support" },
];
