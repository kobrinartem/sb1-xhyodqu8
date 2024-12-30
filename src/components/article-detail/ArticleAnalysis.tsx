import React from 'react';
import { Article } from '../../types/article';
import { RelevanceBadge } from '../shared/badges/RelevanceBadge';

interface ArticleAnalysisProps {
  article: Article;
}

export const ArticleAnalysis: React.FC<ArticleAnalysisProps> = ({ article }) => {
  return (
    <div className="space-y-4">
      <section>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Findings</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-3">
            <RelevanceBadge relevantTo={article.relevant_to} />
          </div>
          <p className="text-gray-700">{article.findings}</p>
        </div>
      </section>

      {article.abstract && (
        <section>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Abstract</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{article.abstract}</p>
          </div>
        </section>
      )}
    </div>
  );
};