"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Eye, EyeOff, ArrowLeft, ShieldCheck, Star} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/inputField";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogin} from "@/hooks/useAuth";
import {toast} from "sonner";
import bushero from "@/public/images/bushero.jpg";

const loginSchema = z.object({
  email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
  password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {mutate, isPending} = useLogin();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data, {
      onSuccess: (response) => {
        const {user} = response;
        if (user.role === "PASSENGER") {
          router.push("/");
          toast.success("Login successfull");
        } else {
          router.push("/admin");
          toast.success("Login successfull");
        }
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel — bus photo with bushero.jpg */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src={bushero}
          alt="TegaBus"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay - made darker for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3B2E]/92 via-[#0B3B2E]/85 to-[#071f17]/95" />

        <div className="relative z-10 flex flex-col justify-between h-full p-10 xl:p-14 text-white">
          {/* Back to Home */}
          <Link
            href="/"
            className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            <ArrowLeft size={14} />
            {t("panel.backToHome")}
          </Link>

          {/* Tagline */}
          <div className="space-y-7">
            <div className="space-y-4">
              <div className="w-10 h-1 rounded-full bg-green-400" />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                <Star size={13} className="text-yellow-300 fill-yellow-300" />
                {t("panel.badge")}
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15]">
                {t("panel.tagline1")}<br />
                <span className="text-green-300">{t("panel.tagline2")}</span>
              </h1>
              <p className="text-green-100/75 text-[15px] leading-relaxed max-w-[320px]">
                {t("panel.description")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "50K+", labelKey: "panel.stats.passengers" as const },
                { value: "120+", labelKey: "panel.stats.routes" as const },
                { value: "4.9★", labelKey: "panel.stats.rating" as const },
              ].map(({ value, labelKey }) => (
                <div key={labelKey} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="text-xs text-green-200 mt-0.5">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: trust badge */}
          <div className="flex items-center gap-2.5 text-sm text-white/40">
            <ShieldCheck size={15} className="text-green-300" />
            {t("panel.trust")}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-1/2 bg-gray-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-5 sm:px-10 py-10">
          <div className="w-full max-w-md">

            {/* Mobile back link */}
            <div className="flex justify-end mb-10 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <ArrowLeft size={14} />
                {t("panel.home")}
              </Link>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9">
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
                <p className="text-sm text-gray-400 mt-1">{t("subtitle")}</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">{t("email")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("emailPlaceholder")} {...field} type="email" className="bg-gray-50 border-gray-200 focus:bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">{t("password")}</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input {...field} type={showPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} className="pr-10 bg-gray-50 border-gray-200 focus:bg-white" />
                              </FormControl>
                              <Button variant="ghost" type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-0 px-2 flex items-center">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </Button>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-[#0B3B2E] hover:underline mt-2 inline-block">
                              {t("forgotPassword")}
                            </Link>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  {form.formState.errors.root && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                        {form.formState.errors.root.message}
                      </div>
                  )}

                  <Button type="submit" className="w-full h-11 bg-[#0B3B2E] hover:bg-[#0a3327] text-white text-sm font-semibold rounded-xl" disabled={isPending}>
                    {isPending ? t("loggingIn") : t("loginButton")}
                  </Button>
                </form>
              </Form>

              <p className="mt-5 text-center text-sm text-gray-500">
                {t("noAccount")}{" "}
                <Link href="/register" className="text-[#0B3B2E] font-semibold hover:underline">
                  {t("registerLink")}
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}