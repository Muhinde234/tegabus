'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/common/logo'; // adjust if needed

export default function RegisterPage() {
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

        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. Dastina"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Muhinda"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. datax@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 07800096778"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Country of origin</label>
            <select
              name="country"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={handleChange}
            >
              <option value="">Select the country</option>
              <option value="rwanda">Rwanda</option>
              <option value="uganda">Uganda</option>
              <option value="kenya">Kenya</option>
              <option value="tanzania">Tanzania</option>
              {/* Add more countries if needed */}
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
