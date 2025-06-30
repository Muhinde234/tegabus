<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/common/logo';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Placeholder for sending registration data
    console.log('User registered:', formData);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black">
      <div className="w-full bg-green-900 py-6 text-center text-white text-3xl font-semibold">
        Register
      </div>

      <div className="bg-white shadow-md border border-gray-200 mt-10 px-8 py-6 rounded-md w-full max-w-xl">
        <Link href="/" className="flex justify-center items-center mb-6">
          <Logo />
          <span className="text-2xl font-semibold ml-2 text-green-900">TegaBus</span>
        </Link>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. John"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
=======
"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="border border-gray-300 bg-white rounded-lg shadow-md w-full max-w-xl p-8">
     <div className="flex justify-center mb-3">
          <Link href="/">
            <Logo />
          </Link>
        </div>


        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">User Registration</h2>
          <p className="mt-1 text-gray-500 text-sm">Fill in your details to register</p>
        </div>

        <hr className="mb-6 border-gray-200" />

        <form className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="e.g: Dositha"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="e.g: Muhinde"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
>>>>>>> origin/main
              />
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. johndoe@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
=======
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g: dosta@gmail.com"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
>>>>>>> origin/main
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm mb-1">Phone number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +250788123456"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
=======
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="e.g: 07800396778"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
>>>>>>> origin/main
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm mb-1">Country of origin</label>
            <select
              name="country"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
            >
              <option value="">Select the country</option>
              <option value="rwanda">Rwanda</option>
              <option value="uganda">Uganda</option>
              <option value="kenya">Kenya</option>
              <option value="tanzania">Tanzania</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter the password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-900 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
=======
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country of origin
            </label>
           
            
              <Select>
                <SelectTrigger className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600">
                  <SelectValue placeholder="Select the country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Rwanda</SelectItem>
                  <SelectItem value="dark">Kenya</SelectItem>
                  <SelectItem value="green">Uganda</SelectItem>
                  <SelectItem value="yellow">Tanzania</SelectItem>
                  <SelectItem value="white">Burundi</SelectItem>
                </SelectContent>
              </Select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter the password"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

        
          <Button
           variant="ghost"
            type="submit"
            className="w-full  bg-[#0B3B2E] text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Register
          </Button>
          
        </form>
          <div className="mt-6 text-center text-sm text-gray-600">
          <p>
             have an account?{" "}
            <Link href="/login" className="text-green-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
>>>>>>> origin/main
