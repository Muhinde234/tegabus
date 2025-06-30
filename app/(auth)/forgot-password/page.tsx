"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    setSubmitted(true);

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="border border-gray-200 bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex justify-center mb-3">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Forgot Password</h2>
          <p className="mt-1 text-gray-500 text-sm">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <hr className="mb-6 border-gray-200" />

        {!submitted ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <Button
               variant="ghost"
              type="submit"
              className="w-full bg-[#0B3B2E] text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-700">
             If an account exists for <strong>{email}</strong>, you’ll receive a reset link shortly.<br />
            Redirecting to login...
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="text-green-700 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
