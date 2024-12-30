import React, { useRef } from 'react';
import { Article } from '../types/article';
import { X, FileText, FileSearch, Link, Calendar, BookOpen, Users, Tag, ExternalLink } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';
import { ArticleHeader } from './article-detail/ArticleHeader';
import { ArticleContent } from './article-detail/ArticleContent';

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <ArticleHeader article={article} onClose={onClose} />
        <ArticleContent article={article} />
      </div>
    </div>
  );
};