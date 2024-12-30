import { Article } from '../../types/article';

export interface ColumnConfig {
  key: keyof Article;
  label: string;
  width: string;
}

export const TABLE_COLUMNS: ColumnConfig[] = [
  { key: 'source', label: 'Source', width: 'w-[150px]' },
  { key: 'publication_name', label: 'Publisher Name', width: 'w-[180px]' },
  { key: 'title', label: 'Article Name', width: 'w-[250px]' },
  { key: 'analysis_part', label: 'Analysis Type', width: 'w-[120px]' },
  { key: 'findings', label: 'Findings', width: 'w-[300px]' },
  { key: 'relevant_to', label: 'Relevant To', width: 'w-[120px]' },
  { key: 'status', label: 'Status', width: 'w-[120px]' },
  { key: 'received_date', label: 'Date', width: 'w-[100px]' }
];