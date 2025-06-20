import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import MainLayout from "./MainLayout";


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"], 
  display: "swap",
});

export const metadata: Metadata = {
  title: "TegaBus",
  description: "Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
          {children}
        <MainLayout/>
      
      </body>
   
    </html>
  );
}
