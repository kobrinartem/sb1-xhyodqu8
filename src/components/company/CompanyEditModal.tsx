import React, { useState } from 'react';
import { Company } from '../../types/company';
import { updateCompany } from '../../services/companyService';
import { BaseModal } from './modals/BaseModal';
import { CompanyForm } from './forms/CompanyForm';

interface CompanyEditModalProps {
  company: Company;
  onClose: () => void;
  onCompanyUpdated: () => void;
}

export const CompanyEditModal: React.FC<CompanyEditModalProps> = ({ 
  company, 
  onClose, 
  onCompanyUpdated 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: { name: string; email: string; company_type: Company['company_type'] }) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateCompany(company.id, formData);
      onCompanyUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update company');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal title="Edit Company" onClose={onClose}>
      <CompanyForm
        initialData={company}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
        error={error}
      />
    </BaseModal>
  );
};