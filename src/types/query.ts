export interface QueryTerm {
  id: string;
  value: string;
  operator: 'AND' | 'OR' | 'NOT';
}

export interface QueryGroup {
  id: string;
  terms: QueryTerm[];
  operator: 'AND' | 'OR';
}

export interface QueryConfig {
  id?: string;
  query_text: string;
  groups: QueryGroup[];
  created_at?: string;
}