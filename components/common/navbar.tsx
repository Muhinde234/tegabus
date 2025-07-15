"use client";

import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Container from "../ui/container";
import {Globe, SquareMenu, X} from "lucide-react";
import Logo from "../common/logo";
import Link from "next/link";
import {Button} from "../ui/button";
import {useLocale, useTranslations} from "next-intl";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {useUser} from "@/context/userContext";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {toast} from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
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

  const handleChangeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale in the URL
    const newPath = segments.join("/");
    router.replace(newPath);
    setIsLanguageOpen(false);
    setIsMenuOpen(false);
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

  // Generate initials from user's name
  const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
  };

  return (
      <div className="fixed w-full top-0 z-50 bg-white shadow-sm p-4 lg:p-0">
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
                      className={`hover:text-green-600 transition-colors duration-200 ${
                          pathname === link.path ? "font-medium text-green-600" : ""
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
                    className="p-2 border border-lime-300 rounded-full hover:text-green-600 transition-colors"
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
                                  currentLocale === lang.code ? "text-green-600 font-medium" : "text-gray-700"
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
                        href="/dashboard"
                        className="bg-[#0B3B2E] rounded-full py-2 px-4 text-white hover:bg-green-700 text-sm md:text-base"
                    >
                      {t("getStarted")}
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="h-10 w-10 cursor-pointer">
                          <AvatarFallback className="bg-[#0B3B2E] text-white">
                            {getInitials(user.fullName || "User")}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={handleLogout}>
                          {t("logout")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
              ) : (
                  <Link
                      href="/login"
                      className="bg-[#0B3B2E] rounded-full py-2 px-4 text-white hover:bg-green-700 text-sm md:text-base"
                  >
                    {t("getStarted")}
                  </Link>
              )}
            </div>

            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:text-green-600 transition-colors"
                  aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <SquareMenu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
              <div className="md:hidden mt-2 px-4 pb-4">
                <nav className="flex flex-col gap-4 text-[17px]">
                  {translatedLinks.map((link, idx) => (
                      <Link
                          key={idx}
                          href={link.path}
                          className={`py-2 px-3 rounded-lg hover:bg-gray-50 ${
                              pathname === link.path ? "text-green-600 font-medium" : ""
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                  ))}

                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <button
                        onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                        className="flex items-center gap-2 py-2 px-3 w-full text-left"
                    >
                      <Globe size={18} className="text-gray-500" />
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
                                          ? "text-green-600 font-medium"
                                          : "text-gray-700 hover:bg-gray-50"
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
                            className="mt-2 bg-[#0B3B2E] rounded-full py-2 px-4 text-white text-center hover:bg-green-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                          {t("getStarted")}
                        </Link>
                        <Button
                            variant="ghost"
                            className="mt-2 w-full text-left py-2 px-3 text-[17px] hover:bg-gray-50"
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
                          className="mt-2 bg-[#0B3B2E] rounded-full py-2 px-4 text-white text-center hover:bg-green-700"
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