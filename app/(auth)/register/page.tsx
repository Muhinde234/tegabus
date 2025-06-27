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
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g: dosta@gmail.com"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="e.g: 07800396778"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
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
