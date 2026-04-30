"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/inputField";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { authService } from "@/api/authService";
import { useSignUp } from "@/hooks/useAuth";
import { ArrowLeft, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const{mutate,isPending}=useSignUp();

  
  const registerFormSchema = z
    .object({
      firstName: z.string().nonempty(t("firstNameRequired")),
      lastName: z.string().nonempty(t("lastNameRequired")),
      email: z.string().nonempty(t("emailRequired")).email(t("emailInvalid")),
      phoneNumber: z
        .string()
        .nonempty(t("phoneRequired"))
        .regex(/^\+?\d{10,15}$/, t("phoneInvalid")),
      nationality: z.string().nonempty(t("countryPlaceholder")),
      password: z
        .string()
        .nonempty(t("passwordRequired"))
        .min(8, t("passwordTooShort")),
      confirmPassword: z.string().nonempty(t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordMismatch"),
    });

  type RegisterFormValues = z.infer<typeof registerFormSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      nationality: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...submitData } = data;
    authService.signup(submitData).then(() => {
      router.push("/email-sent");
    });
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel — bus photo */}
      <div className="hidden lg:flex lg:w-1/2 overflow-hidden sticky top-0 h-screen">
        <Image
          src="/images/home.jpg"
          alt={t("panel.imageAlt")}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#0B3B2E]/92 via-[#0B3B2E]/78 to-[#071f17]/90" />

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
              <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15]">
                {t("panel.tagline1")}<br />
                <span className="text-green-300">{t("panel.tagline2")}</span>
              </h1>
              <p className="text-sm text-green-100/75 leading-relaxed max-w-xs">
                {t("panel.description")}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: MapPin,      textKey: "panel.features.routes" as const },
                { icon: Clock,       textKey: "panel.features.tracking" as const },
                { icon: ShieldCheck, textKey: "panel.features.payments" as const },
              ].map(({ icon: Icon, textKey }) => (
                <div key={textKey} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-green-300" />
                  </div>
                  <span className="text-sm text-green-100/85">{t(textKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-sm text-white/40">
            {t("haveAccount")}{" "}
            <Link href="/login" className="text-green-300 font-medium hover:text-white transition-colors underline underline-offset-2">
              {t("panel.signIn")}
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-1/2 bg-gray-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-5 sm:px-10 py-10">
          <div className="w-full max-w-lg">

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

                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t("panel.personalInfo")}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">{t("firstName")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("firstNamePlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">{t("lastName")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("lastNamePlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">{t("email")}</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder={t("emailPlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">{t("phone")}</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" placeholder={t("phonePlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">{t("country")}</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                                <SelectValue placeholder={t("countryPlaceholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rwanda">{t("countries.rwanda")}</SelectItem>
                                <SelectItem value="uganda">{t("countries.uganda")}</SelectItem>
                                <SelectItem value="kenya">{t("countries.kenya")}</SelectItem>
                                <SelectItem value="tanzania">{t("countries.tanzania")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">{t("panel.accountSecurity")}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">{t("password")}</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" placeholder={t("passwordPlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">{t("confirmPassword")}</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" placeholder={t("confirmPasswordPlaceholder")} className="bg-gray-50 border-gray-200 focus:bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 bg-[#0B3B2E] hover:bg-[#0a3327] text-white text-sm font-semibold rounded-xl"
                  >
                    {isPending ? t("register") : t("registerButton")}
                  </Button>
                </form>
              </Form>

              <p className="mt-5 text-center text-sm text-gray-500">
                {t("haveAccount")}{" "}
                <Link href="/login" className="text-[#0B3B2E] font-semibold hover:underline">
                  {t("loginLink")}
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
