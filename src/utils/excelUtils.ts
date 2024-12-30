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

export function generateExcelData(articles: Article[]): ExcelRow[] {
  return articles.map(article => ({
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
  }));
}

export function downloadExcel(data: ExcelRow[], filename: string) {
  // Convert data to CSV format
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header as keyof ExcelRow];
        // Escape commas and quotes in cell values
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}