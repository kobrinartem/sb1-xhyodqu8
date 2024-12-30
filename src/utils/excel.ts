import { utils, writeFile } from 'xlsx';
import { Article } from '../types/article';

interface ExcelRow {
  Source: string;
  'ISSN': string;
  'e-ISSN': string;
  PMID: string;
  PMCID: string;
  'Publication Name': string;
  DOI: string;
  'Article Title': string;
  Authors: string;
  'Analysis Type': string;
  Findings: string;
  'Relevant To': string;
  'Received Date': string;
}

function formatArticleForExcel(article: Article): ExcelRow {
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

export function generateExcelFile(articles: Article[], filename: string) {
  try {
    // Convert articles to Excel format
    const data: ExcelRow[] = articles.map(formatArticleForExcel);

    // Create workbook and worksheet
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Articles');

    // Auto-size columns
    const colWidths = Object.keys(data[0]).map(key => ({
      wch: Math.max(
        key.length,
        ...data.map(row => String(row[key as keyof ExcelRow]).length)
      ),
    }));
    worksheet['!cols'] = colWidths;

    // Generate Excel file
    writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error('Failed to generate Excel file:', error);
    throw error;
  }
}