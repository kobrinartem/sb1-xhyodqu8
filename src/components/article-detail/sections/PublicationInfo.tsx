import React from 'react';
import { Calendar, BookOpen, Hash, FileText, Globe, Clock } from 'lucide-react';
import { Article } from '../../../types/article';
import { formatFullDate } from '../../../utils/dateUtils'; // Add this import


interface PublicationInfoProps {
  article: Article;
}

export const PublicationInfo: React.FC<PublicationInfoProps> = ({ article }) => {
  return (
    <section className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Publication Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <div>
            <span className="text-sm font-medium text-gray-500">Journal</span>
            <p className="text-gray-900">{article.publication_name}</p>
            {article.journal_iso && (
              <p className="text-sm text-gray-500">({article.journal_iso})</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div>
            <span className="text-sm font-medium text-gray-500">Published</span>
            <p className="text-gray-900">
              {formatFullDate(article.publication_date)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <span className="text-sm font-medium text-gray-500">Received</span>
            <p className="text-gray-900">{formatFullDate(article.received_date)}</p>
          </div>
        </div>

        {(article.volume || article.issue) && (
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Volume/Issue</span>
              <p className="text-gray-900">
                {article.volume && `Volume ${article.volume}`}
                {article.volume && article.issue && ', '}
                {article.issue && `Issue ${article.issue}`}
              </p>
            </div>
          </div>
        )}

        {article.pages && (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Pages</span>
              <p className="text-gray-900">{article.pages}</p>
            </div>
          </div>
        )}

        {article.language && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm font-medium text-gray-500">Language</span>
              <p className="text-gray-900">{article.language}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
