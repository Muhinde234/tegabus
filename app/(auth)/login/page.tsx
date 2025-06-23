'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/common/logo';// adjust the import path if needed

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white text-black">
      <div className="w-full bg-green-900 py-6 text-center text-white text-3xl font-semibold">
        Login Page
      </div>

      <div className="mt-16 flex flex-col items-center w-full max-w-md px-6">
        <Link href="/" className="flex items-center mb-6">
          <Logo />
          <span className="text-2xl font-medium ml-2">TegaBus</span>
        </Link>

        <div className="w-full space-y-4">
          <div>
            <label className="block mb-1 text-sm">E-mail:</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password:</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded"
            />
          </div>

          <div className="text-sm text-green-800 hover:underline cursor-pointer">
            <Link href="/forgot-password">Forget password?</Link>
          </div>

          <button className="w-full py-2 bg-green-900 text-white rounded hover:bg-green-800 transition">
            Login
          </button>
        </div>

        <div className="mt-6 text-sm">
          Don’t have account?{' '}
          <Link href="/register" className="text-green-900 underline">
            register
          </Link>
        </div>
      </div>
    </div>
  );
}
