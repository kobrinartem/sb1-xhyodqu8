import { supabase } from '../../lib/supabase';
import type { ReportSchedule, Frequency, CreateScheduleData } from '../../types/report';
import { getNextScheduledRunDate } from './utils';

export async function getReportSchedules(companyId: string): Promise<ReportSchedule[]> {
  const { data, error } = await supabase
    .from('report_schedules')
    .select(`
      *,
      devices (name)
    `)
    .eq('company_id', companyId)
    .order('next_run', { ascending: true });

  if (error) throw new Error(`Failed to fetch report schedules: ${error.message}`);
  return data || [];
}

export async function createReportSchedule(
  companyId: string,
  scheduleData: CreateScheduleData
): Promise<ReportSchedule> {
  const nextRun = getNextScheduledRunDate(scheduleData.frequency);

  const { data, error } = await supabase
    .from('report_schedules')
    .insert({
      company_id: companyId,
      device_id: scheduleData.device_id,
      report_type: scheduleData.report_type,
      frequency: scheduleData.frequency,
      next_run: nextRun.toISOString(),
      is_active: true
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create report schedule: ${error.message}`);
  return data;
}

export async function toggleScheduleStatus(id: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('report_schedules')
    .update({ 
      is_active: isActive,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw new Error(`Failed to update schedule status: ${error.message}`);
}

export async function deleteReportSchedule(id: string): Promise<void> {
  const { error } = await supabase
    .from('report_schedules')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete report schedule: ${error.message}`);
}