import type { Metadata } from "next";
import "../globals.css";
import { Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip"
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { UserProvider } from "@/context/userContext";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryProvider } from "@/context/reqct-query-provider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "TegaBus|Travel with us",
  description: "Team transportation solutions",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const queryClient = new QueryClient();
  return (
   <html lang={locale} suppressHydrationWarning>
      <body className={`${outfit.className} `}>
         <NextIntlClientProvider locale={locale} messages={messages}>
        
          
              <ReactQueryProvider>
                <TooltipProvider delayDuration={0}>
                <UserProvider>
                  {children}
                </UserProvider>
              </TooltipProvider>
              </ReactQueryProvider>
          
          </NextIntlClientProvider>
      </body>
    </html>
  );
}