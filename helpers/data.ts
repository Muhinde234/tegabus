import { ShieldCheckIcon, TicketIcon } from "lucide-react";
import { Bus, Clock, Lock, Search, Phone, BadgePercent,BookText, ShieldCheck,  CreditCard  } from "lucide-react";


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


    const popularRoutes = [
    { from: "Kigali", to: "Rusizi", buses: 50 },
    { from: "Kigali", to: "Kampala", buses: 45 },
    { from: "Kigali", to: "Goma", buses: 30 },
  ];

 

 const busCompanies = [
  {
    name: "Ritco",
    numberOfBuses: 25,
    routes: [
      { from: "Kigali", to: "Huye", price: "5,000 RWF" },
      { from: "Kigali", to: "Rubavu", price: "6,000 RWF" },
    ],
  },
  {
    name: "Trinity",
    numberOfBuses: 18,
    routes: [
      { from: "Kigali", to: "Musanze", price: "4,500 RWF" },
      { from: "Kigali", to: "Nyagatare", price: "6,200 RWF" },
    ],
  },
  {
    name: "Horizon",
    numberOfBuses: 30,
    routes: [
      { from: "Kigali", to: "Rusizi", price: "7,000 RWF" },
      { from: "Kigali", to: "Ngoma", price: "5,800 RWF" },
    ],
  },
];

const termsData = [
  {
    title: "General Terms",
    icon: BookText,
    content:
      "All bookings are subject to seat availability and must comply with our policies. Changes may occur without prior notice.",
  },
  {
    title: "Safety and Security",
    icon: ShieldCheck,
    content:
      "Passenger safety is our top priority. Please follow all driver instructions and report any suspicious activity.",
  },
  {
    title: "Booking & Cancellations",
    icon: CreditCard,
    content:
      "Bookings are confirmed once payment is received. Cancellations may incur fees based on how early they are made.",
  },
  {
    title: "Bus Routes and Delays",
    icon: Bus,
    content:
      "Routes are subject to change. Delays may occur due to weather or traffic, but we strive to inform customers promptly.",
  },
];

  const busData = Array.from({ length: 16}, () => ({
  route: 'RAC 205 C',
  price: '12,000 Rwf',
  date: '23rd 10 2025',
  seatsLeft: 20,
  departure: 'Kigali',
  arrival: 'Uganda',
  depTime: '09:45',
  arrTime: '20:00',
}));

export {infos,features,steps,busData,popularRoutes,busCompanies,termsData};
