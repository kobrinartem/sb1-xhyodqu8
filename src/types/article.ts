import { Range } from './common';

export type ArticleStatus = 'pending' | 'processing' | 'processed' | 'failed';
export type AnalysisPart = 'FT' | 'A&I';
export type RelevantTo = 'vigilance' | 'pmcf' | 'not_relevant';

export interface Article {
  id: string;
  device_id?: string;
  device_name?: string;
  source: string;
  publication_name: string;
  title: string;
  analysis_part: AnalysisPart;
  findings: string;
  relevant_to: RelevantTo;
  status: ArticleStatus;
  publication_date: string | null;
  received_date: string;
  created_at: string;
  issn?: string;
  e_issn?: string;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  authors: string[];
  abstract?: string;
  equipment_type?: string;
  
  // New fields
  publication_date?: string;
  publication_type?: string;
  keywords?: string[];
  mesh_terms?: string[];
  language?: string;
  journal_iso?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  citations_count?: number;
  full_text_available?: boolean;
  pdf_url?: string;
  pubmed_url?: string;
  funding_info?: string[];
  conflict_of_interest?: string;
  study_type?: string;
  sample_size?: number;
  study_period?: Range<string>;
  metadata_last_updated?: string;
  article_version?: string;
  retracted?: boolean;
  retraction_notice?: string;
  correction_notice?: string;
}