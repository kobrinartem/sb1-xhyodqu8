import React from 'react';
import { Tag, Hash } from 'lucide-react';
import { Article } from '../../../types/article';

interface KeywordsAndTermsProps {
  article: Article;
}

export const KeywordsAndTerms: React.FC<KeywordsAndTermsProps> = ({ article }) => {
  if (!article.keywords?.length && !article.mesh_terms?.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Keywords & Terms</h4>
      <div className="space-y-4 bg-gray-50 rounded-lg p-4">
        {article.keywords?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {article.mesh_terms?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">MeSH Terms</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.mesh_terms.map((term, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};