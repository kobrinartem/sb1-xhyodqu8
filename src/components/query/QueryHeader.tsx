import React from 'react';
import { Search } from 'lucide-react';

export const QueryHeader: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Search className="w-5 h-5" />
        Search Query Configuration
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        Build your search query using terms and operators.
      </p>
    </div>
  );
};