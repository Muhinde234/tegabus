"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "../ui/container";
import { Globe, SquareMenu, X } from "lucide-react";
import Logo from "../common/logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/userContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("navigation");
  const { user, logout } = useUser();

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "rw", name: "Kinyarwanda" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
    setIsLanguageOpen(false);
    setIsMenuOpen(false);
  };

  const navigate = () => {
    router.push("/admin");
  };

  const handleLogout = () => {
    logout();
    toast.warning("Logout successful");
  };

  const translatedLinks = [
    { path: "/", label: t("home") },
    { path: "/about", label: t("about") },
    { path: "/route", label: t("routes") },
    { path: "/conditions", label: t("conditions") },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-all duration-300 p-4 lg:p-0 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/">
            <Logo />
          </Link>

       
          <nav className="hidden md:flex items-center gap-6 text-[18px] lg:text-[17px]">
            {translatedLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className={`transition-colors duration-200 ${
                  pathname === link.path
                    ? `font-medium ${scrolled ? "text-green-600" : "text-green-400"}`
                    : scrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white hover:text-green-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        
          <div className="hidden md:flex items-center gap-4">
            <div className="relative language-selector">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`p-2 border rounded-full transition-colors duration-200 ${
                  scrolled
                    ? "border-lime-800 text-gray-700 hover:text-green-600"
                    : "border-white/50 text-white hover:text-green-300"
                }`}
                aria-label={t("language")}
              >
                <Globe size={28} />
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((lang) => (
                    <Button
                      variant="ghost"
                      key={lang.code}
                      onClick={() => handleChangeLocale(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        currentLocale === lang.code
                          ? "text-green-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                <Link
                  href="/login"
                  className={`rounded-full py-2 px-4 text-sm md:text-base font-medium transition-all duration-200 hover:scale-105 ${
                    scrolled
                      ? "bg-green-800 text-white hover:bg-green-700"
                      : "bg-white/15 backdrop-blur-sm text-white border border-white/40 hover:bg-white/25"
                  }`}
                >
                  {t("getStarted")}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarFallback className="bg-green-600 text-white">
                        {getInitials(user.fullName || "User")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleLogout}>
                      {t("logout")}
                    </DropdownMenuItem>
                    {user.role == "ADMIN" && (
                      <DropdownMenuItem onClick={navigate}>
                        Go to Dashboard
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                href="/login"
                className={`rounded-full py-2 px-4 text-sm md:text-base font-medium transition-all duration-200 hover:scale-105 ${
                  scrolled
                    ? "bg-green-800 text-white hover:bg-green-700"
                    : "bg-white/15 backdrop-blur-sm text-white border border-white/40 hover:bg-white/25"
                }`}
              >
                {t("getStarted")}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors duration-200 ${
                scrolled
                  ? "text-gray-700 hover:text-green-600"
                  : "text-white hover:text-green-300"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <SquareMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-2 px-4 pb-4 rounded-xl ${
              scrolled ? "bg-white" : "bg-black/80 backdrop-blur-md"
            }`}
          >
            <nav className="flex flex-col gap-4 text-[17px]">
              {translatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.path}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    pathname === link.path
                      ? `font-medium ${scrolled ? "text-green-600" : "text-green-400"}`
                      : scrolled
                      ? "hover:bg-gray-50 text-gray-700"
                      : "hover:bg-white/10 text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className={`pt-2 mt-2 border-t ${scrolled ? "border-gray-100" : "border-white/20"}`}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`flex items-center gap-2 py-2 px-3 w-full text-left ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  <Globe size={18} className={scrolled ? "text-gray-500" : "text-white/70"} />
                  <span>{t("language")}</span>
                </button>
                {isLanguageOpen && (
                  <div className="pl-8 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleChangeLocale(lang.code)}
                        className={`block w-full text-left py-1.5 px-2 text-sm rounded ${
                          currentLocale === lang.code
                            ? "text-green-400 font-medium"
                            : scrolled
                            ? "text-gray-700 hover:bg-gray-50"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mt-2 bg-[#0B3B2E] rounded-full py-2 px-4 text-white text-center hover:bg-green-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("getStarted")}
                  </Link>
                  <Button
                    variant="ghost"
                    className={`mt-2 w-full text-left py-2 px-3 text-[17px] ${
                      scrolled ? "hover:bg-gray-50 text-gray-700" : "hover:bg-white/10 text-white"
                    }`}
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 bg-[#0B3B2E] rounded-full py-2 px-4 text-white text-center hover:bg-green-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("getStarted")}
                </Link>
              )}
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
