"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/container";
import { SquareMenu, X } from "lucide-react";
import Logo from "../common/logo";
import { links } from "../../helpers/constants";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 

  return (
    <div className="fixed w-full top-0 z-50 bg-white border-b border-green-800 shadow-sm p-4 lg:p-0">
      <Container>
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[18px] lg:text-[17px]">
            {links.map((link, idx) => (
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
         <Link href="/login" className="bg-[#0B3B2E] rounded-full py-2 px-4  text-white hover:bg-green-700">
         Get started
         </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:text-green-600 focus:outline-none transition-colors duration-200"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={24} className="mr-8" /> : <SquareMenu size={24} className="mr-8" />}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
