import React from 'react';
import { X, FileText, FileSearch } from 'lucide-react';
import { Article } from '../../types/article';
import { StatusBadge } from '../shared/badges/StatusBadge';

interface ArticleHeaderProps {
  article: Article;
  onClose: () => void;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onClose }) => {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {article.analysis_part === 'FT' ? (
            <FileText className="w-5 h-5 text-blue-500" />
          ) : (
            <FileSearch className="w-5 h-5 text-purple-500" />
          )}
          <h2 className="text-xl font-semibold">
            {article.analysis_part === 'FT' ? 'Full Text Analysis' : 'Abstract Analysis'}
          </h2>
        </div>
        <StatusBadge status={article.status} />
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};