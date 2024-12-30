import { mockData } from './data';
import { QueryBuilder } from './queryBuilder';

export const mockSupabaseClient = {
  auth: {
    signInWithPassword: async () => ({ data: { user: null }, error: null }),
    signUp: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null })
  },
  from: (table: string) => {
    const tableData = (mockData as any)[table] || [];
    return new QueryBuilder(table, tableData);
  }
};