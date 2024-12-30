import { utils, writeFile } from 'xlsx';
import { Article } from '../../types/article';
import { ExcelRow } from './types';
import { formatArticleForExcel } from './formatters';

export function generateExcelFile(articles: Article[], filename: string) {
  try {
    // Convert articles to Excel format
    const data: ExcelRow[] = articles.map(formatArticleForExcel);

    // Create workbook and worksheet
    const worksheet = utils.json_to_sheet(data, {
      header: Object.keys(data[0]),
      skipHeader: false
    });

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
    writeFile(workbook, `${filename}.xlsx`, { bookType: 'xlsx' });
  } catch (error) {
    console.error('Failed to generate Excel file:', error);
    throw error;
  }
}