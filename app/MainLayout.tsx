'use client'

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function MainLayout() {
  const pathname = usePathname();
  const hideNavbarFooter = ['/terms'].includes(pathname);

  return (
      <>
        {!hideNavbarFooter && <Navbar />}
      
        {!hideNavbarFooter && <Footer />}
        </>
         )

}