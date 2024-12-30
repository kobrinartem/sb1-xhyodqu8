type OrderConfig = {
  column?: string;
  ascending?: boolean;
};

export class QueryBuilder {
  private table: string;
  private filters: Record<string, any> = {};
  private orderConfig: OrderConfig | null = null;
  private data: any[];

  constructor(table: string, data: any[]) {
    this.table = table;
    this.data = [...data];
  }

  select(columns?: string | string[]) {
    return this;
  }

  eq(column: string, value: any) {
    this.filters[column] = value;
    return this;
  }

  order(column: string, { ascending = true } = {}) {
    this.orderConfig = { column, ascending };
    return this;
  }

  single() {
    const results = this.execute();
    return {
      data: results[0] || null,
      error: null
    };
  }

  async then(resolve: (value: any) => void) {
    resolve({
      data: this.execute(),
      error: null
    });
  }

  private execute() {
    let results = [...this.data];

    // Apply filters
    Object.entries(this.filters).forEach(([column, value]) => {
      results = results.filter(item => item[column] === value);
    });

    // Apply ordering
    if (this.orderConfig) {
      const { column, ascending } = this.orderConfig;
      results.sort((a, b) => {
        if (!column) return 0;
        const aVal = a[column];
        const bVal = b[column];
        return ascending ? 
          aVal.localeCompare(bVal) :
          bVal.localeCompare(aVal);
      });
    }

    return results;
  }
}