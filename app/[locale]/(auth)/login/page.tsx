"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputField";
import useLogin from "@/hooks/useLogin";
import { useUser } from "@/context/userContext";
import type { User } from "@/lib/types";

type LoginResponse = {
  user: User;
  token: string;
};

type LoginFormInputs = {
  email: string;
  password: string;
  server?: {
    type: string;
    message: string;
  };
};

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const { error, isPending, mutate } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        const { user, token } = response;

        login(user, token);

        // TODO: They should also return the user after the login for simplicity when logging in
        if (user) {
          router.push("/");
        } else {
          router.push("/admin");
        }
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";
        setError("server", {
          type: "manual",
          message: errorMessage,
        });
      },
    });
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("emailInvalid"),
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t("password")}
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                {...register("password", {
                  required: t("passwordRequired"),
                })}
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
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? t("loggingIn") : t("loginButton")}
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
