"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/container";
import { Input } from "../ui/inputField";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "./logo";
import { useLocale, useTranslations } from "next-intl";
import { Apple, Smartphone, Facebook, Twitter, Linkedin, Instagram} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [, setError] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [emailAlert, setEmailAlert] = useState("");
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");

  const footerLabels = {
    en: {
      pages: "Pages",
      highlights: "Highlights",
      account: "My Account",
      downloadApp: "Download App",
      dashboard: "User Dashboard",
      appStore: "Download on the App Store",
      googlePlay: "Get it on Google Play",
      followUs: "Follow us",
      myAccount: "My account",
    },
    fr: {
      pages: "Pages",
      highlights: "À la une",
      account: "Mon Compte",
      downloadApp: "Télécharger l'application",
      dashboard: "Tableau de bord",
      appStore: "Disponible sur l'App Store",
      googlePlay: "Disponible sur Google Play",
      followUs: "Suivez-nous",
      myAccount: "Mon compte",
    },
    rw: {
      pages: "Amapaji",
      highlights: "Iby'ingenzi",
      account: "Konti Yanjye",
      downloadApp: "Kuramo Porogaramu",
      dashboard: "Dashboard",
      appStore: "Kuboneka kuri App Store",
      googlePlay: "Kuboneka kuri Google Play",
      followUs: "Dukurikirane",
      myAccount: "Konti yanjye",
    },
  } as const;

  const copy = footerLabels[locale as keyof typeof footerLabels] ?? footerLabels.en;

  const translatedLinks = [
    { path: "/", label: nav("home") },
    { path: "/about", label: nav("about") },
    { path: "/route", label: nav("routes") },
    { path: "/conditions", label: nav("conditions") },
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setSubscribe(true);
      setError("");
      setEmailAlert("");
    }
  }, [email]);

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailAlert(t("enterEmail"));
      return;
    }

    if (!validateEmail(email)) {
      setError(t("invalidEmail"));
      setEmailAlert("");
    } else {
      setError("");
      setEmailAlert("");
      alert(`Subscribed: ${email}`);
      setEmail("");
      setSubscribe(false);
    }
  };

  return (
    <footer className="bg-[#0B3B2E] text-white">
      <Container className="pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-gray-300 max-w-xs">{t("companyDescription")}</p>
            <div className="text-sm text-gray-400">
              <div>{t("address_label")}: Kigali, Rwanda</div>
              <div>{t("phone_label")}: (+250) 780 396 766</div>
              <div>{t("email_label")} : support@tegabus.com</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{copy.pages}</h4>
            <ul className="space-y-2 text-gray-300">
              {translatedLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{copy.highlights}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/routes" className="hover:text-white">{t("bus_routes")}</Link></li>
              <li><Link href="/booking" className="hover:text-white">{t("ticket_booking")}</Link></li>
              <li><Link href="/support" className="hover:text-white">{t("customer_support")}</Link></li>
              <li><Link href="/updates" className="hover:text-white">{t("real_time_updates")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{copy.account}</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/dashboard" className="hover:text-white">{copy.dashboard}</Link></li>
              <li><Link href="/account" className="hover:text-white">{copy.myAccount}</Link></li>
              <li><Link href="/listings" className="hover:text-white">My Listings</Link></li>
              <li><Link href="/favorites" className="hover:text-white">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{copy.downloadApp}</h4>
            <div className="space-y-3">
              <a href="https://apps.apple.com/app/idYOUR_APP_ID" target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-gray-700 rounded-lg p-3 hover:bg-white/5">
                <div className="p-3 bg-[#062d23] rounded-md">
                  <Apple className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">App Store</div>
                  <div className="font-semibold">{copy.appStore}</div>
                </div>
              </a>

              <a href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME" target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-gray-700 rounded-lg p-3 hover:bg-white/5">
                <div className="p-3 bg-[#062d23] rounded-md">
                  <Smartphone className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Google Play</div>
                  <div className="font-semibold">{copy.googlePlay}</div>
                </div>
              </a>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">{copy.followUs}</h4>
              <div className="flex items-center gap-3">
                <Link href="https://facebook.com/tegabus" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5"><Facebook size={18} /></Link>
                <Link href="https://twitter.com/tegabus" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5"><Twitter size={18} /></Link>
                <Link href="https://linkedin.com/company/tegabus" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5"><Linkedin size={18} /></Link>
                <Link href="https://instagram.com/tegabus" target="_blank" rel="noreferrer" className="p-2 rounded bg-white/5"><Instagram size={18} /></Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-green-900 mt-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between py-6 text-sm text-gray-300">
            <div>© 2025 {t("companyName")}. {t("allRightsReserved")}</div>
            <div className="mt-3 md:mt-0">Designed by 360 Hive by Queens</div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
