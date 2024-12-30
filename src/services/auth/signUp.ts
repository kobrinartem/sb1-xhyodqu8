import { supabase } from '../../lib/supabase';
import { User, SignUpData } from '../../types/user';
import { handleAuthError, ProfileCreationError } from './errors';
import { createUserProfile, getUserProfile } from './userProfile';

export async function signUp({ email, password, full_name }: SignUpData): Promise<User> {
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    });

    if (authError) throw handleAuthError(authError);
    if (!authData.user) throw new ProfileCreationError();

    // Wait for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create user profile
    const profile = await createUserProfile({
      id: authData.user.id,
      email,
      full_name
    });

    // Sign in the user immediately after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw handleAuthError(signInError);

    return profile;
  } catch (error) {
    throw handleAuthError(error);
  }
}