import { supabase } from '../../lib/supabase';
import { User } from '../../types/user';
import { getUserProfile } from './userProfile';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    return await getUserProfile(session.user.id);
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}