"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputField"; // ← Your reusable input

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("dosta@gmail.com");
  const [password, setPassword] = useState("password123");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "dosta@gmail.com" && password === "password123") {
      router.push("/schedule");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="border border-gray-300 bg-white rounded-lg shadow-md w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">User Login</h2>
          <p className="mt-1 text-gray-500 text-sm">Fill in your credentials to login</p>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dosta@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0B3B2E] text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link href="/register" className="text-green-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
