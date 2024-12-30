import { QueryConfig } from '../types/query';

export function generateSearchQuery(config: QueryConfig): string {
  return config.groups
    .map((group, groupIndex) => {
      const terms = group.terms
        .filter(term => term.value.trim())
        .map((term, termIndex) => {
          const value = `(${term.value.trim()})`;
          if (termIndex === 0) return value;
          return `${term.operator} ${value}`;
        })
        .join(' ');
      
      if (!terms) return '';
      if (groupIndex === 0) return `(${terms})`;
      return ` OR (${terms})`;
    })
    .filter(Boolean)
    .join('');
}