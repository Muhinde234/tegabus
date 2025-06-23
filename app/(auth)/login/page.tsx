'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/common/logo';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder auth logic
    if (email && password) {
      localStorage.setItem('loggedIn', 'true');
      router.push('/');
    } else {
      alert('Please enter email and password');
    }
  };

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

        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm">E-mail:</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded"
              required
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
              required
            />
          </div>

          <div className="text-sm text-green-800 hover:underline">
            <Link href="/forgot-password">Forget password?</Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-900 text-white rounded hover:bg-green-800 transition"
          >
            Login
          </button>
        </form>

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
