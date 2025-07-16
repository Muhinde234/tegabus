"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/inputField";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogin} from "@/hooks/useAuth";
import {toast} from "sonner";

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
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow p-8">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">{t("title")}</h2>
          <p className="text-center text-sm text-gray-500 mb-6">{t("subtitle")}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("email")}</FormLabel>
                        <FormControl>
                          <Input
                              placeholder={t("emailPlaceholder")}
                              {...field}
                              type="email"
                          />
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
                        <div className="relative">
                          <FormControl>
                            <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder={t("passwordPlaceholder")}
                                className="pr-10"
                            />
                          </FormControl>
                          <Button
                              variant="ghost"
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute inset-y-0 right-0 px-2 flex items-center"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </Button>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-green-700 hover:underline mt-2 inline-block text-right">
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

              <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
              >
                {isPending ? t("loggingIn") : t("loginButton")}
              </Button>
            </form>
          </Form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-green-700 hover:underline">
              {t("registerLink")}
            </Link>
          </p>
        </div>
      </div>
  );
}
