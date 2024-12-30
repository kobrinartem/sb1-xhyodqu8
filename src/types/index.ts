export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'all';
export type ArticleType = 'FT' | 'A&I';

export interface Article {
  id: string;
  source: string;
  publicationName: string;
  title: string;
  type: ArticleType;
  findings: string;
  relevance: boolean;
}