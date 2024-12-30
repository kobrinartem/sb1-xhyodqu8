import { supabase } from '../../lib/supabase';
import { User } from '../../types/user';
import { UserNotFoundError, ProfileCreationError } from './errors';

export async function getUserProfile(userId: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  if (!data) throw new UserNotFoundError();

  return data as User;
}

export async function createUserProfile(profile: {
  id: string;
  email: string;
  full_name: string;
}): Promise<User> {
  // First check if profile already exists
  try {
    const existingProfile = await getUserProfile(profile.id);
    return existingProfile;
  } catch (error) {
    if (!(error instanceof UserNotFoundError)) {
      throw error;
    }
  }

  // Create new profile if it doesn't exist
  const { data, error } = await supabase
    .from('users')
    .insert(profile)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique violation
      // Profile was created by trigger, try to fetch it
      return await getUserProfile(profile.id);
    }
    throw error;
  }
  if (!data) throw new ProfileCreationError();

  return data as User;
}