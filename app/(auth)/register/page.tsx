"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      alert("Passwords don't match");
      return;
    }

    console.log("User registered:", formData);
    router.push("/login");
  };

  return (
    <div className="min-h-screen pt-18 flex flex-col items-center justify-start bg-white text-black px-4">
      <div className="bg-white  border border-gray-300 mt-10 px-8 py-6 rounded-md w-full max-w-xl">
        <Link href="/" className="flex justify-center items-center mb-6">
          <Logo />
      
        </Link>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">First name</label>
              <Input
                name="firstName"
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Last name</label>
              <Input
                name="lastName"
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="e.g. johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone number</label>
            <Input
              type="tel"
              name="phone"
              placeholder="e.g. +250788123456"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country of origin</label>
            <Select
              required
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rwanda">Rwanda</SelectItem>
                <SelectItem value="uganda">Uganda</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="tanzania">Tanzania</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-[#0B3B2E] hover:bg-green-700">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
