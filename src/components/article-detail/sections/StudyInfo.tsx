import React from 'react';
import { Users, Clock, FileType } from 'lucide-react';
import { Article } from '../../../types/article';

interface StudyInfoProps {
  article: Article;
}

export const StudyInfo: React.FC<StudyInfoProps> = ({ article }) => {
  if (!article.study_type && !article.sample_size && !article.study_period) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Study Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
        {article.study_type && (
          <div className="flex items-center gap-2">
            <FileType className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Study Type</span>
              <p className="text-gray-900">{article.study_type}</p>
            </div>
          </div>
        )}

        {article.sample_size && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Sample Size</span>
              <p className="text-gray-900">{article.sample_size.toLocaleString()}</p>
            </div>
          </div>
        )}

        {article.study_period && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Study Period</span>
              <p className="text-gray-900">
                {new Date(article.study_period.begin).toLocaleDateString()} - {' '}
                {new Date(article.study_period.end).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};