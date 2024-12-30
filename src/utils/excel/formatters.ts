import { Article } from '../../types/article';
import { ExcelRow } from './types';

export function formatArticleForExcel(article: Article): ExcelRow {
  return {
    Source: article.source || '',
    'ISSN': article.issn || '',
    'e-ISSN': article.e_issn || '',
    PMID: article.pmid || '',
    PMCID: article.pmcid || '',
    'Publication Name': article.publication_name || '',
    DOI: article.doi || '',
    'Article Title': article.title || '',
    Authors: article.authors?.join('; ') || '',
    'Analysis Type': article.analysis_part === 'FT' ? 'Full Text' : 'Abstract',
    Findings: article.findings || '',
    'Relevant To': article.relevant_to === 'pmcf' ? 'PMCF' : 
                  article.relevant_to === 'vigilance' ? 'Vigilance' : 
                  'Not Relevant',
    'Received Date': new Date(article.received_date).toLocaleDateString(),
  };
}