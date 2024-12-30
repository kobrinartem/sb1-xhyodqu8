// src/components/article-detail/AuthorsList.tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getPubMedAuthorUrl } from '../../utils/pubmed';

interface AuthorsListProps {
  authors: string[];
}

export const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {authors.map((author, index) => (
        <a
          key={`${author}-${index}`}
          href={getPubMedAuthorUrl(author)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          {author}
          <ExternalLink className="w-3 h-3" />
        </a>
      ))}
    </div>
  );
};
