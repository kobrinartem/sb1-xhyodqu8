import { supabase } from '../../lib/supabase';
import type { Article } from '../../types/article';

export async function getReportArticles(reportId: string): Promise<Article[]> {
  // Get articles from the report_articles junction table
  const { data, error } = await supabase
    .from('report_articles')
    .select(`
      article_id,
      title,
      findings,
      relevant_to,
      received_date,
      articles (
        id,
        source,
        publication_name,
        analysis_part,
        issn,
        e_issn,
        pmid,
        pmcid,
        doi,
        authors,
        abstract,
        equipment_type,
        device_id
      )
    `)
    .eq('report_id', reportId)
    .order('received_date', { ascending: false });

  if (error) throw new Error(`Failed to fetch report articles: ${error.message}`);

  // Map the data to match the Article type
  return (data || []).map(item => ({
    id: item.article_id,
    // Use snapshot data for immutable fields
    title: item.title,
    findings: item.findings,
    relevant_to: item.relevant_to,
    received_date: item.received_date,
    // Use current data for other fields
    ...item.articles,
  }));
}