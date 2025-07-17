import { Book, Shield, CreditCard, X, User, Info } from "lucide-react";
import Logo from "../components/common/logo";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface TermsSidebarProps {
  className?: string;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactElement;
}

const TermsSidebar: React.FC<TermsSidebarProps> = ({
  className = "",
  isMobileOpen,
  onMobileClose,
}) => {
  const t = useTranslations("termsPage");

  const sections: Section[] = [
    { id: "general", title: t("sections.general.title"), icon: <Book size={18} /> },
    { id: "booking", title: t("sections.booking.title"), icon: <Shield size={18} /> },
    { id: "payments", title: t("sections.payments.title"), icon: <CreditCard size={18} /> },
    { id: "cancellations", title: t("sections.cancellations.title"), icon: <X size={18} /> },
    { id: "user", title: t("sections.userResponsibilities.title"), icon: <User size={18} /> },
    { id: "privacy", title: t("sections.privacy.title"), icon: <Shield size={18} /> },
    { id: "contact", title: t("sections.contact.title"), icon: <Info size={18} /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });

      if (isMobileOpen) {
        onMobileClose();
      }
    }
  };

  return (
    <aside
      className={`
        bg-[#0B3B2E] min-h-screen transition-all duration-300 ease-in-out
        ${isMobileOpen
          ? "fixed inset-y-0 left-0 z-40 w-64 shadow-lg"
          : "hidden lg:block w-64 fixed self-start"
        }
        ${className}
      `}
    >
      {isMobileOpen && (
        <div className="flex justify-end p-4">
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <X size={24} />
          </button>
        </div>
      )}

      <div className="p-3">
        <Link href="/" className="text-white">
          <Logo />
        </Link>

        <nav className="space-y-1 mt-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-gray-200 rounded-md hover:bg-gray-200 hover:text-black cursor-pointer transition-colors text-left focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {section.icon}
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TermsSidebar;
aaaaaaaaaaaaaaaaaaaaaaaaaa