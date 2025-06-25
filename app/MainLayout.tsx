// app/MainLayout.tsx
'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function MainLayout() {
  const pathname = usePathname();

 
  const hideNavbarFooter = [
    '/login',
    '/register',
    '/terms',
    '/admin',
  ].some((route) => pathname.startsWith(route)); 
  if (hideNavbarFooter) return null;

  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
