import { User } from '@supabase/supabase-js';

export type AuthMode = 'signin' | 'signup';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
