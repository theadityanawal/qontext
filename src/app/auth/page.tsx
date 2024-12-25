'use client';

import { useState, useEffect } from 'react';
import { account, ID } from "../../config/appwrite";
import { useRouter } from 'next/navigation';

interface AuthState {
  email: string;
  userId: string | null;
  isLoading: boolean;
  error: string | null;
  showOTPInput: boolean;
  otp: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    email: '',
    userId: null,
    isLoading: false,
    error: null,
    showOTPInput: false,
    otp: ''
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        await account.get();
        // If we get here, session exists
        router.push('/dashboard');
      } catch (error) {
        // No active session, do nothing (stay on login page)
        console.log('No active session');
      }
    };

    checkSession();
  }, [router]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const sessionToken = await account.createEmailToken(
        ID.unique(),
        state.email
      );
      setState(prev => ({
        ...prev,
        userId: sessionToken.userId,
        showOTPInput: true,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to send verification email',
        isLoading: false
      }));
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (!state.userId) throw new Error('User ID not found');

      const session = await account.createSession(
        state.userId,
        state.otp  // This is the secret/OTP sent to email
      );

      router.push('/dashboard');
    } catch (error) {
      console.error('Session creation error:', error);
      setState(prev => ({
        ...prev,
        error: 'Invalid verification code',
        isLoading: false
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {!state.showOTPInput ? (
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={state.email}
                onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))} />
            </div>

            <div>
              <button
                type="submit"
                disabled={state.isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {state.isLoading ? 'Sending...' : 'Send verification code'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="otp" className="sr-only">Enter OTP</label>
              <input
                id="otp"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter verification code"
                value={state.otp}
                onChange={(e) => setState(prev => ({ ...prev, otp: e.target.value }))} />
            </div>

            <div>
              <button
                type="submit"
                disabled={state.isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {state.isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}

        {state.error && (
          <div className="mt-3 text-center text-sm text-red-600">
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}
