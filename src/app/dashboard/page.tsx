'use client';

import { useEffect, useState } from 'react';
import { account } from '../../config/appwrite';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setIsLoading(false);
      } catch (error) {
        console.log('No active session');
        router.push('/auth');
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          This is your Qontext Dashboard
        </h1>
      </div>
    </div>
  );
}
