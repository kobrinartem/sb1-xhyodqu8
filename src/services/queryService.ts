import { supabase } from '../lib/supabase';
import { QueryConfig } from '../types/query';
import { generateSearchQuery } from '../utils/queryUtils';

export async function saveQuery(queryConfig: QueryConfig) {
  const queryText = generateSearchQuery(queryConfig);
  
  const { data, error } = await supabase
    .from('queries')
    .insert({
      query_text: queryText,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save query: ${error.message}`);
  }

  return data;
}

export async function getQueries() {
  const { data, error } = await supabase
    .from('queries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch queries: ${error.message}`);
  }

  return data;
}