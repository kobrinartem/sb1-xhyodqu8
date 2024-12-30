import { supabase } from '../../lib/supabase';
import { User, SignInCredentials } from '../../types/user';
import { handleAuthError, UserNotFoundError } from './errors';
import { getUserProfile } from './userProfile';

export async function signIn({ email, password }: SignInCredentials): Promise<User> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw handleAuthError(authError);
    if (!authData.user) throw new UserNotFoundError();

    return await getUserProfile(authData.user.id);
  } catch (error) {
    throw handleAuthError(error);
  }
}