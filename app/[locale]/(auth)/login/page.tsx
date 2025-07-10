"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputField"; 

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password123");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "password123") {
      router.push("/admin");
    } else {
      alert(t("invalidCredentials"));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="border border-gray-300 bg-white rounded-lg shadow-sm md:shadow-md w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{t("title")}</h2>
          <p className="mt-1 text-gray-500 text-sm">{t("subtitle")}</p>
        </div>

        <hr className="mb-6 border-gray-200" />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")}
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t("password")}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                required
                className="pr-10"
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:bg-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            <div className="text-right mt-2">
              <Link href="/forgot-password" className="text-sm text-green-700 hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0B3B2E] text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            {t("loginButton")}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            {t("noAccount")}{" "}
            <Link href="/register" className="text-green-700 hover:underline">
              {t("registerLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
