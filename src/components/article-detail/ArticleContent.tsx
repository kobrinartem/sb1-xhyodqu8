import React from 'react';
import { Tag, Cpu } from 'lucide-react';
import { Article } from '../../types/article';
import { ArticleIdentifiers } from './ArticleIdentifiers';
import { ArticleAnalysis } from './ArticleAnalysis';
import { AuthorsList } from './AuthorsList';
import {
  PublicationInfo,
  StudyInfo,
  KeywordsAndTerms,
  AdditionalInfo
} from './sections';

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Title and Source */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h3>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{article.source}</span>
          </div>
          {article.device_name && (
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>{article.device_name}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Authors */}
      <div className="space-y-2">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Authors</h4>
        <AuthorsList authors={article.authors} />
      </div>
      </div>

      <ArticleIdentifiers article={article} />
      <PublicationInfo article={article} />
      <StudyInfo article={article} />
      <KeywordsAndTerms article={article} />
      <ArticleAnalysis article={article} />
      <AdditionalInfo article={article} />
    </div>
  );
};