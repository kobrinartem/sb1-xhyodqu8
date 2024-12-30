import React, { useState } from 'react';
import { createCompany } from '../../services/companyService';
import { CompanyType } from '../../types/company';
import { BaseModal } from './modals/BaseModal';
import { CompanyForm } from './forms/CompanyForm';

interface CompanyCreateModalProps {
  onClose: () => void;
  onCompanyCreated: () => void;
}

export const CompanyCreateModal: React.FC<CompanyCreateModalProps> = ({ 
  onClose, 
  onCompanyCreated 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: { name: string; email: string; company_type: CompanyType }) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createCompany(formData);
      onCompanyCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal title="Add New Company" onClose={onClose}>
      <CompanyForm
        onSubmit={handleSubmit}
        submitLabel="Create Company"
        isSubmitting={isSubmitting}
        error={error}
      />
    </BaseModal>
  );
};