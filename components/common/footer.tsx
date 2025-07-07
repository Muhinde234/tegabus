"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/container";
import { Input } from "../ui/inputField";
import { Button } from "../ui/button";
import { links } from "../../helpers/constants";
import Link from "next/link";
import Logo from "./logo";
import { useTranslations } from "next-intl";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [, setError] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [emailAlert, setEmailAlert] = useState("");
  const pathname = usePathname();
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");

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
    <footer className="bg-[#0B3B2E] text-white p-4 lg:p-0">
      <Container className="pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Logo />
          </Link>
          <p>{t("latestTips")}</p>
          <p>{t("subscribe")}</p>

          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className="border-b border-white"
          />
          {emailAlert && (
            <p className="text-red-400 text-sm mt-1">{emailAlert}</p>
          )}

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
            <div className="relative w-5 h-5">
              <Input
                type="checkbox"
                onChange={(e) => setSubscribe(e.target.checked)}
                checked={!!subscribe}
                id="newsletter"
                className="peer appearance-none w-full h-full border border-white rounded-sm checked:bg-green-600 checked:border-transparent focus:outline-none cursor-pointer"
              />
              <svg
                className="absolute top-1 left-1 w-3 h-3 text-white pointer-events-none hidden peer-checked:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <span>{t("subscribeNewsletter")}</span>

            <Button
              onClick={handleSubscribe}
              className="bg-lime-500 text-white rounded-full font-semibold transition hover:bg-lime-400  py-4 px-6 cursor-pointer "
            >
              Send
            </Button>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="font-semibold text-lg">{t("quickLinks")}</h3>
          <div className="flex flex-col mt-4 gap-2">
            {translatedLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className={`hover:text-green-600 transition-colors duration-200 ${
                  pathname === link.path ? "font-medium text-green-600" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="font-semibold text-lg">{t("services")}</h3>
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/routes">{t("bus_routes")}</Link>
            <Link href="/login">{t("ticket_booking")}</Link>
            <Link href="/condition">{t("customer_support")}</Link>
            <Link href="/routes">{t("real_time_updates")}</Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-semibold text-lg">{t("contact")}</h3>
          <div className="flex flex-col gap-2 mt-4">
            <Link href="/">
              <span className="text-gray-400">{t("email_label")}:</span>{" "}
              support@tegabus.com
            </Link>
            <Link href="/">
              <span className="text-gray-400">{t("phone_label")}:</span>{" "}
              (+250)780396766
            </Link>
            <Link href="/">
              <span className="text-gray-400">{t("address_label")}:</span>{" "}
              Kigali, Rwanda
            </Link>
          </div>
        </div>
      </Container>

      <Container>
        <div className="text-center text-sm text-white py-6 border-t border-green-800">
          <p>
            © 2025 {t("companyName")}. {t("allRightsReserved")}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
