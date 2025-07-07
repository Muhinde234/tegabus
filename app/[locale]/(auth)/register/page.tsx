"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Input } from "@/components/ui/inputField";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert(t("passwordMismatch"));
      return;
    }

    console.log("User registered:", formData);
    router.push("/login");
  };

  return (
    <div className="min-h-screen pt-18 flex flex-col items-center justify-start bg-white text-black px-4">
      <div className="bg-white border border-gray-300 mt-10 px-8 py-6 rounded-md w-full max-w-xl">
        <Link href="/" className="flex justify-center items-center mb-6">
          <Logo />
        </Link>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">{t("firstName")}</label>
              <Input
                name="firstName"
                placeholder={t("firstNamePlaceholder")}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">{t("lastName")}</label>
              <Input
                name="lastName"
                placeholder={t("lastNamePlaceholder")}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">{t("email")}</label>
            <Input
              type="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("phone")}</label>
            <Input
              type="tel"
              name="phone"
              placeholder={t("phonePlaceholder")}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("country")}</label>
            <Select
              required
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("countryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rwanda">{t("countries.rwanda")}</SelectItem>
                <SelectItem value="uganda">{t("countries.uganda")}</SelectItem>
                <SelectItem value="kenya">{t("countries.kenya")}</SelectItem>
                <SelectItem value="tanzania">{t("countries.tanzania")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-1">{t("password")}</label>
            <Input
              type="password"
              name="password"
              placeholder={t("passwordPlaceholder")}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("confirmPassword")}</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder={t("confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#0B3B2E] hover:bg-green-700">
            {t("registerButton")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t("haveAccount")}{" "}
          <Link href="/login" className="text-green-700 hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
