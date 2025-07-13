"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Logo from "@/components/common/logo";
import {
  Form,
  FormControl,
  FormDescription,
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
import type { RegisterRequest } from "@/lib/types";
import { authService } from "@/api/authService";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();

  // build schema with dynamic messages
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
      router.push("/login");
    });
  };

  return (
    <div className="min-h-screen pt-18 flex flex-col items-center justify-start bg-white text-black px-4">
      <div className="bg-white border border-gray-300 mt-10 px-8 py-6 rounded-md w-full max-w-xl">
        <Link href="/" className="flex justify-center items-center mb-6">
          <Logo />
        </Link>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("firstName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("firstNamePlaceholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("lastName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("lastNamePlaceholder")}
                      />
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
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("emailPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                    />
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
                  <FormLabel>{t("country")}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("countryPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rwanda">
                          {t("countries.rwanda")}
                        </SelectItem>
                        <SelectItem value="uganda">
                          {t("countries.uganda")}
                        </SelectItem>
                        <SelectItem value="kenya">
                          {t("countries.kenya")}
                        </SelectItem>
                        <SelectItem value="tanzania">
                          {t("countries.tanzania")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("passwordPlaceholder")}
                    />
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
                  <FormLabel>{t("confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4 bg-[#0B3B2E] hover:bg-green-700"
            >
              {t("registerButton")}
            </Button>
          </form>
        </Form>

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
