import React from 'react';
import { CompanyType } from '../../../types/company';

interface CompanyFormData {
  name: string;
  email: string;
  company_type: CompanyType;
}

interface CompanyFormProps {
  initialData?: Partial<CompanyFormData>;
  onSubmit: (data: CompanyFormData) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  error: string | null;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({
  initialData,
  onSubmit,
  submitLabel,
  isSubmitting,
  error
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company_type: formData.get('company_type') as CompanyType
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={initialData?.name}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter company name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Company Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={initialData?.email || ''}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter company email"
        />
      </div>

      <div>
        <label htmlFor="company_type" className="block text-sm font-medium text-gray-700">
          Company Type
        </label>
        <select
          id="company_type"
          name="company_type"
          defaultValue={initialData?.company_type || 'manufacturer'}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="manufacturer">Manufacturer</option>
          <option value="notified_body">Notified Body</option>
        </select>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};