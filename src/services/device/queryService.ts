import { supabase } from '../../lib/supabase';
import type { DeviceQuery, QueryType } from '../../types/device';

export async function getDeviceQueries(deviceId: string): Promise<DeviceQuery[]> {
  const { data, error } = await supabase
    .from('device_queries')
    .select('*')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch device queries: ${error.message}`);
  return data || [];
}

export async function createDeviceQuery(
  deviceId: string, 
  queryText: string,
  queryType: QueryType
): Promise<DeviceQuery> {
  const { data, error } = await supabase
    .from('device_queries')
    .insert({
      device_id: deviceId,
      query_text: queryText,
      query_type: queryType
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create device query: ${error.message}`);
  if (!data) throw new Error('Failed to create device query');

  return data;
}

export async function updateDeviceQuery(
  id: string, 
  queryText: string
): Promise<DeviceQuery> {
  const { data, error } = await supabase
    .from('device_queries')
    .update({
      query_text: queryText,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update device query: ${error.message}`);
  if (!data) throw new Error('Device query not found');

  return data;
}

export async function deleteDeviceQuery(id: string): Promise<void> {
  const { error } = await supabase
    .from('device_queries')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete device query: ${error.message}`);
}