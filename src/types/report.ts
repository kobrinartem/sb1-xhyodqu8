export type ReportType = 'vigilance' | 'pmcf';
export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type ScheduleType = 'scheduled' | 'on_demand';
export type ReportStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type Frequency = 'daily' | 'weekly' | 'monthly';

export interface ReportSchedule {
  id: string;
  company_id: string;
  device_id: string;
  report_category: ReportType;
  frequency: Frequency;
  next_run: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  devices?: {
    name: string;
  };
}

export interface GeneratedReport {
  id: string;
  company_id: string;
  device_id: string;
  schedule_id?: string;
  report_category: ReportType;
  time_frame: TimeFrame;
  status: ReportStatus;
  generated_at: string | null;
  created_at: string;
  devices?: {
    name: string;
  };
}

export interface ReportFilters {
  search: string;
  timeFrame: string;
}

export interface GenerateReportData {
  device_id: string;
  report_type: ReportType;
  time_frame: TimeFrame;
}

export interface CreateScheduleData {
  device_id: string;
  report_type: ReportType;
  frequency: Frequency;
}