import { supabase } from '../../lib/supabase';
import type { GeneratedReport } from '../../types/report';
import type { Device } from '../../types/device';

export async function getGeneratedReports(companyId: string): Promise<GeneratedReport[]> {
  const { data, error } = await supabase
    .from('generated_reports')
    .select(`
      *,
      devices (name)
    `)
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch generated reports: ${error.message}`);
  return data || [];
}

// Get devices with active schedules
export async function getScheduledDevices(companyId: string): Promise<Device[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('company_id', companyId)
    .not('schedule_type', 'is', null)
    .not('schedule_type', 'eq', 'none')
    .eq('schedule_is_active', true)
    .order('schedule_next_run', { ascending: true });

  if (error) throw new Error(`Failed to fetch scheduled devices: ${error.message}`);

  // Map database fields to Device interface with schedule
  return (data || []).map(device => ({
    ...device,
    schedule: device.schedule_type ? {
      type: device.schedule_type,
      reportType: device.schedule_report_type || 'vigilance',
      nextRun: device.schedule_next_run,
      isActive: device.schedule_is_active
    } : undefined
  }));
}

export async function getReportArticles(reportId: string) {
  const { data, error } = await supabase
    .from('report_articles')
    .select(`
      article_id,
      title,
      findings,
      relevant_to,
      received_date,
      articles (*)
    `)
    .eq('report_id', reportId);

  if (error) throw new Error(`Failed to fetch report articles: ${error.message}`);
  return data || [];
}