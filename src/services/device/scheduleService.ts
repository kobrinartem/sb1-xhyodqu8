import { supabase } from '../../lib/supabase';
import type { Device, DeviceSchedule } from './types';
import { mapDatabaseToDevice } from './utils';

export async function updateDeviceSchedule(deviceId: string, schedule: DeviceSchedule): Promise<void> {
  const { error } = await supabase
    .from('devices')
    .update({
      schedule_time_frame: schedule.time_frame,
      schedule_report_types: schedule.report_types,
      schedule_literature_sources: schedule.literature_sources,
      schedule_is_active: schedule.is_active,
      schedule_next_run: schedule.next_run,
      updated_at: new Date().toISOString()
    })
    .eq('id', deviceId);

  if (error) throw new Error(`Failed to update device schedule: ${error.message}`);
}