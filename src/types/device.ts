export type QueryType = 'vigilance' | 'pmcf';

export interface DeviceQuery {
  id: string;
  device_id: string;
  query_text: string;
  query_type: QueryType;
  created_at: string;
  updated_at: string;
}

export type DeviceCategory = 'III' | 'IIb' | 'IIa' | 'I' | 'NotBod';
export type ScheduleTimeFrame = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface DeviceSchedule {
  time_frame: ScheduleTimeFrame;
  report_types: string[];
  literature_sources: string[];
  is_active: boolean;
  next_run?: string;
}

export interface Device {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  manufacturer: string;
  model: string;
  device_type?: string;
  device_category: DeviceCategory;
  created_at: string;
  updated_at: string;
  schedule?: DeviceSchedule;
}