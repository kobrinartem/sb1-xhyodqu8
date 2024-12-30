import type { Device } from './types';

export function mapDatabaseToDevice(data: any): Device {
  return {
    ...data,
    schedule: data.schedule_time_frame ? {
      time_frame: data.schedule_time_frame,
      report_types: data.schedule_report_types || [],
      literature_sources: data.schedule_literature_sources || [],
      is_active: data.schedule_is_active || false,
      next_run: data.schedule_next_run
    } : undefined
  };
}