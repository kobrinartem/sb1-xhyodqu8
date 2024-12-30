import { supabase } from '../../lib/supabase';
import type { Company } from '../../types/company';

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');

  if (error) throw new Error(`Failed to fetch companies: ${error.message}`);
  return data || [];
}

export async function getCompany(id: string): Promise<Company> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch company: ${error.message}`);
  if (!data) throw new Error('Company not found');
  
  return data;
}

export async function createCompany(name: string): Promise<Company> {
  const { data, error } = await supabase
    .from('companies')
    .insert({ name })
    .select()
    .single();

  if (error) throw new Error(`Failed to create company: ${error.message}`);
  if (!data) throw new Error('Failed to create company');

  return data;
}

export async function updateCompany(id: string, name: string): Promise<Company> {
  const { data, error } = await supabase
    .from('companies')
    .update({ 
      name, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update company: ${error.message}`);
  if (!data) throw new Error('Company not found');

  return data;
}