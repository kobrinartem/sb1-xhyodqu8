export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string;
          company_id: string;
          name: string;
          description?: string;
          manufacturer: string;
          model: string;
          device_type?: string;
          device_category: 'III' | 'IIb' | 'IIa' | 'I' | 'NotBod';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['devices']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['devices']['Insert']>;
      };
    };
  };
}