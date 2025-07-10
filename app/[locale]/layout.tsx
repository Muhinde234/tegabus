import type { Metadata } from "next";
import "../globals.css";
import { Outfit } from "next/font/google";
import Providers from '@/components/progressProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
  return (
   <html lang={locale} suppressHydrationWarning>
      <body className={`${outfit.className} `}>
         <NextIntlClientProvider locale={locale} messages={messages}>
        
          <Providers>
            {children}
          </Providers>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}