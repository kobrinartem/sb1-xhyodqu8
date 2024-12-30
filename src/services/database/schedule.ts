import { supabase } from '../../lib/supabase';
import type { DeviceSchedule } from '../../types/device';

export async function updateDeviceSchedule(deviceId: string, schedule: DeviceSchedule): Promise<void> {
  const { error } = await supabase
    .from('devices')
    .update({
      schedule_type: schedule.type === 'none' ? null : schedule.type,
      schedule_report_type: schedule.type === 'none' ? null : schedule.reportType,
      schedule_is_active: schedule.type !== 'none' && schedule.isActive,
      updated_at: new Date().toISOString()
    })
    .eq('id', deviceId);

  if (error) {
    throw new Error(`Failed to update device schedule: ${error.message}`);
  }
}

export async function deleteDeviceSchedule(deviceId: string): Promise<void> {
  const { error } = await supabase
    .from('devices')
    .update({
      schedule_type: null,
      schedule_report_type: null,
      schedule_next_run: null,
      schedule_is_active: false,
      updated_at: new Date().toISOString()
    })
    .eq('id', deviceId);

  if (error) {
    throw new Error(`Failed to delete device schedule: ${error.message}`);
  }
}

export async function toggleScheduleStatus(deviceId: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('devices')
    .update({
      schedule_is_active: isActive,
      updated_at: new Date().toISOString()
    })
    .eq('id', deviceId)
    .not('schedule_type', 'is', null)
    .not('schedule_type', 'eq', 'none')
    .single();

  if (error) {
    throw new Error(`Failed to toggle schedule status: ${error.message}`);
  }
}