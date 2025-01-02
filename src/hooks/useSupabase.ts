import { useState, useEffect } from 'react';
import { supabase, checkDatabaseConnection } from '@/utils/supabase/server';

export function useSupabase() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkDatabaseConnection();
      setIsConnected(connected);
      setIsLoading(false);
    };

    checkConnection();
  }, []);

  return {
    supabase,
    isConnected,
    isLoading,
  };
}
