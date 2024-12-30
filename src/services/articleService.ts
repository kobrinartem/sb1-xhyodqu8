import { supabase } from '../lib/supabase';
import { Article } from '../types/article';
import { FilterOptions } from '../types/filters';
import { getDateRange } from '../utils/dateUtils';

export async function getArticles(filters?: FilterOptions): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select(`
      id,
      source,
      publication_name,
      title,
      analysis_part,
      findings,
      relevant_to,
      status,
      received_date,
      publication_date,
      created_at,
      issn,
      e_issn,
      pmid,
      pmcid,
      doi,
      authors,
      abstract,
      equipment_type,
      device_id,
      devices (name)
    `)
    .order('received_date', { ascending: false });


  if (filters?.companyId) {
    query = query.eq('company_id', filters.companyId);
  }

  if (filters?.deviceId) {
    query = query.eq('device_id', filters.deviceId);
  }

  if (filters?.reportType && filters.reportType !== 'all') {
    query = query.eq('relevant_to', filters.reportType);
  }

  if (filters?.timeFrame && filters.timeFrame !== 'all') {
    const { start } = getDateRange(filters.timeFrame);
    query = query.gte('received_date', start.toISOString());
  }

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    query = query.or(`
      title.ilike.%${searchTerm}%,
      findings.ilike.%${searchTerm}%,
      publication_name.ilike.%${searchTerm}%,
      source.ilike.%${searchTerm}%
    `);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }

  return data || [];
}