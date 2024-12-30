import { supabase } from '../../lib/supabase';
import type { Device, CreateDeviceData, UpdateDeviceData } from './types';
import { mapDatabaseToDevice } from './utils';

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
  return (data || []).map(mapDatabaseToDevice);
}

export async function getDevice(id: string): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch device: ${error.message}`);
  if (!data) throw new Error('Device not found');

  return mapDatabaseToDevice(data);
}

export async function createDevice(deviceData: CreateDeviceData): Promise<Device> {
  const { schedule, ...device } = deviceData;
  
  const dbData = {
    ...device,
    schedule_time_frame: schedule?.time_frame,
    schedule_report_types: schedule?.report_types || [],
    schedule_is_active: schedule?.is_active || false
  };

  const { data, error } = await supabase
    .from('devices')
    .insert(dbData)
    .select()
    .single();

  if (error) throw new Error(`Failed to create device: ${error.message}`);
  if (!data) throw new Error('Failed to create device');

  return mapDatabaseToDevice(data);
}

export async function updateDevice(id: string, updates: UpdateDeviceData): Promise<Device> {
  const { schedule, ...deviceUpdates } = updates;
  
  const dbUpdates = {
    ...deviceUpdates,
    ...(schedule && {
      schedule_time_frame: schedule.time_frame,
      schedule_report_types: schedule.report_types,
      schedule_is_active: schedule.is_active
    }),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('devices')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update device: ${error.message}`);
  if (!data) throw new Error('Device not found');

  return mapDatabaseToDevice(data);
}