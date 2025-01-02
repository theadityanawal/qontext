'use client';

import ResumeForm from '@/components/ResumeForm'
import { useSupabase } from '@/hooks/useSupabase';

export default function ResumePage() {
  const { isConnected, isLoading } = useSupabase();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return <div>Error connecting to database</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Editor</h1>
      <ResumeForm />
    </div>
  )
}
