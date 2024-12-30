import React from 'react';
import { Article } from '../types';
import { FileText, Users, Calendar, Star, Flask, Microscope } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      onClick={() => onClick(article)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">{article.title}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {article.equipmentType}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{article.abstract}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">{article.authors.length} Authors</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{article.publishedDate}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Star className="w-4 h-4 mr-2" />
          <span className="text-sm">Effect Score: {article.effectScore}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FileText className="w-4 h-4 mr-2" />
          <span className="text-sm">{article.journal}</span>
        </div>
      </div>
    </div>
  );
};