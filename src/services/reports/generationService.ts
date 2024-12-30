import { supabase } from '../../lib/supabase';
import type { GeneratedReport, GenerateReportData } from '../../types/report';
import { getDateRangeForReport } from './utils';

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

export async function generateReport(
  companyId: string, 
  reportData: GenerateReportData
): Promise<GeneratedReport> {
  // Start a transaction
  const { data: report, error: reportError } = await supabase
    .from('generated_reports')
    .insert({
      company_id: companyId,
      device_id: reportData.device_id,
      report_category: reportData.report_type,
      time_frame: reportData.time_frame,
      status: 'processing',
      generated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (reportError) throw new Error(`Failed to generate report: ${reportError.message}`);

  try {
    // Get relevant articles based on time frame and report type
    const { startDate } = getDateRangeForReport(reportData.time_frame);
    
    let query = supabase
      .from('articles')
      .select('*')
      .eq('device_id', reportData.device_id)
      .gte('received_date', startDate.toISOString());

    // For PMCF reports, include both PMCF and Vigilance articles
    if (reportData.report_type === 'pmcf') {
      query = query.in('relevant_to', ['pmcf', 'vigilance']);
    }

    const { data: articles, error: articlesError } = await query;
    
    if (articlesError) throw articlesError;

    // Store article references and snapshots
    if (articles && articles.length > 0) {
      const reportArticles = articles.map(article => ({
        report_id: report.id,
        article_id: article.id,
        title: article.title,
        findings: article.findings,
        relevant_to: article.relevant_to,
        received_date: article.received_date
      }));

      const { error: insertError } = await supabase
        .from('report_articles')
        .insert(reportArticles);

      if (insertError) throw insertError;
    }

    // Update report status to completed
    const { error: updateError } = await supabase
      .from('generated_reports')
      .update({ status: 'completed' })
      .eq('id', report.id);

    if (updateError) throw updateError;

    return report;
  } catch (error) {
    // Update report status to failed if something goes wrong
    await supabase
      .from('generated_reports')
      .update({ status: 'failed' })
      .eq('id', report.id);

    throw error;
  }
}