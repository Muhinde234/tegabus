import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import MainLayout from "./MainLayout";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "TegaBus",
  description: "Team transportation solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${outfit.className} bg-gray-100 `}>
        <div className="flex-1">
          {children}
          <MainLayout />
        </div>
      </body>
    </html>
  );
}