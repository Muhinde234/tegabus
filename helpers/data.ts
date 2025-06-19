import { ShieldCheckIcon, TicketIcon } from "lucide-react";
import { Bus, Clock, Lock, Search, Phone, BadgePercent } from "lucide-react";

const infos = [
  {
    icon: TicketIcon,
    title: "Fast & Easy Booking",
    description: "Reserve your seat in seconds with our intuitive platform",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payments",
    description: "Pay with confidence using reliable and safe payment options",
  },
  {
    icon: TicketIcon,
    title: "Real-Time Availability",
    description: "Get instant updates on bus schedules and seat availability",
  },
];
  const features = [
    {
      title: "One-Stop Booking",
      description: "Multiple bus operators in one place.",
      icon: Bus ,
    },
    {
      title: "Real-Time Availability",
      description: "Instant confirmations & live seat tracking.",
      icon: Clock ,
    },
    {
      title: "Secure Payments",
      description: "UPI, cards, wallets, and more.",
      icon: Lock ,
    },
    {
      title: "Smart Search",
      description: "Filters for routes, timings, and amenities.",
      icon: Search,
    },
    {
      title: "24/7 Support",
      description: "Dedicated help via chat, email, or phone.",
      icon: Phone ,
    },
    {
      title: "Exclusive Discounts",
      description: "Loyalty programs for frequent travelers.",
      icon: BadgePercent ,
    },
  ];
   const steps = [
    { step: "1", title: "Search", desc: "Enter route, date, and passengers." },
    { step: "2", title: "Compare", desc: "Choose buses, seats, and prices." },
    { step: "3", title: "Book & Pay", desc: "Secure checkout." },
    { step: "4", title: "E-Ticket", desc: "Receive via SMS/email." },
  ];

export {infos,features,steps};
