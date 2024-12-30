import React, { useState } from 'react';
import { Building2, Edit2, Trash2, Mail, Tag } from 'lucide-react';
import { Company } from '../../types/company';
import { CompanyEditModal } from './CompanyEditModal';
import { CompanyDeleteModal } from './CompanyDeleteModal';

interface CompanyInfoProps {
  company: Company;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ company }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{company.name}</h2>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{company.email || 'No email provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span className="capitalize">{company.company_type.replace('_', ' ')}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Created on {new Date(company.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <CompanyEditModal
          company={company}
          onClose={() => setEditModalOpen(false)}
          onCompanyUpdated={() => {
            setEditModalOpen(false);
            window.location.reload();
          }}
        />
      )}

      {isDeleteModalOpen && (
        <CompanyDeleteModal
          company={company}
          onClose={() => setDeleteModalOpen(false)}
          onCompanyDeleted={() => {
            setDeleteModalOpen(false);
            window.location.href = '/companies';
          }}
        />
      )}
    </>
  );
};