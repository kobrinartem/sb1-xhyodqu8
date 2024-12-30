import { supabase } from '../lib/supabase';
import { User, SignInCredentials, SignUpData } from '../types/user';

export async function signIn({ email, password }: SignInCredentials): Promise<User> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) throw userError;
    if (!userData) throw new Error('User profile not found');

    return userData as User;
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to sign in');
  }
}

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

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    // Wait for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify user profile was created
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError || !userData) {
      // Manually create profile if trigger failed
      const { data: newUserData, error: createError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          full_name
        })
        .select()
        .single();

      if (createError) throw createError;
      if (!newUserData) throw new Error('Failed to create user profile');

      return newUserData as User;
    }

    return userData as User;
  } catch (error) {
    console.error('Sign up error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to sign up');
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (userError) throw userError;
    return userData as User;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}