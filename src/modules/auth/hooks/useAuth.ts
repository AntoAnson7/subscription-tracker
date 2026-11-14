import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '@/modules/common/utils/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(() => Boolean(supabase && isSupabaseConfigured));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      return;
    }

    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message);
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    if (!supabase) return false;
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (err) {
      setError(err.message);
      return false;
    }
    return true;
  };

  const signUp = async (email: string, pass: string): Promise<boolean> => {
    if (!supabase) return false;
    setError(null);
    const { error: err } = await supabase.auth.signUp({
      email,
      password: pass,
    });
    if (err) {
      setError(err.message);
      return false;
    }
    return true;
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    isConfigured: isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
  };
}
