import { supabase } from '../../lib/supabase';
import type { Device } from '../../types/device';

export async function getDevices(companyId?: string): Promise<Device[]> {
  let query = supabase
    .from('devices')
    .select('*')
    .order('name');

  if (companyId) {
    query = query.eq('company_id', companyId);
  }

  const { data, error } = await query;

  if (error) throw new Error(`Failed to fetch devices: ${error.message}`);
  return data || [];
}

export async function getDevice(id: string): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch device: ${error.message}`);
  if (!data) throw new Error('Device not found');

  return data;
}

export async function createDevice(device: Omit<Device, 'id' | 'created_at' | 'updated_at'>): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .insert(device)
    .select()
    .single();

  if (error) throw new Error(`Failed to create device: ${error.message}`);
  if (!data) throw new Error('Failed to create device');

  return data;
}

export async function updateDevice(id: string, updates: Partial<Device>): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update device: ${error.message}`);
  if (!data) throw new Error('Device not found');

  return data;
}