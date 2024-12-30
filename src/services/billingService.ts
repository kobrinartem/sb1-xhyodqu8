import { supabase } from '../lib/supabase';
import { CostSettings } from '../types/cost';
import { MonthlyBill } from '../types/billing';
import { DEFAULT_COST_SETTINGS } from '../utils/cost/constants';
import { mapDatabaseToCostSettings, mapSettingsToDatabase } from './billing/mappers';

export async function updateCostSettings(
  companyId: string,
  settings: CostSettings
): Promise<void> {
  const { error } = await supabase
    .from('cost_settings')
    .upsert(
      {
        company_id: companyId,
        ...mapSettingsToDatabase(settings),
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'company_id'
      }
    );

  if (error) {
    console.error('Failed to update cost settings:', error);
    throw new Error(`Failed to update cost settings: ${error.message}`);
  }
}

export async function getCostSettings(companyId: string): Promise<CostSettings> {
  try {
    const { data: existingSettings, error: fetchError } = await supabase
      .from('cost_settings')
      .select('*')
      .eq('company_id', companyId)
      .maybeSingle();

    if (fetchError) {
      throw new Error(`Failed to fetch cost settings: ${fetchError.message}`);
    }

    if (existingSettings) {
      return mapDatabaseToCostSettings(existingSettings);
    }

    // Create new settings with defaults
    const { data: newSettings, error: createError } = await supabase
      .from('cost_settings')
      .insert([{
        company_id: companyId,
        ...mapSettingsToDatabase(DEFAULT_COST_SETTINGS)
      }])
      .select()
      .single();

    if (createError) {
      throw new Error(`Failed to create cost settings: ${createError.message}`);
    }

    return mapDatabaseToCostSettings(newSettings);
  } catch (error) {
    console.error('Cost settings error:', error);
    throw error;
  }
}

export async function getMonthlyBills(companyId: string): Promise<MonthlyBill[]> {
  const { data, error } = await supabase
    .from('monthly_bills')
    .select('*')
    .eq('company_id', companyId)
    .order('period_start', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch monthly bills: ${error.message}`);
  }

  return (data || []).map(bill => ({
    id: bill.id,
    companyId: bill.company_id,
    period: {
      startDate: new Date(bill.period_start),
      endDate: new Date(bill.period_end)
    },
    costs: {
      totalDeviceFees: bill.total_device_fees,
      totalArticleCosts: bill.total_article_costs,
      totalMonthlyCost: bill.total_amount
    },
    status: bill.status,
    dueDate: new Date(bill.due_date),
    paidDate: bill.paid_date ? new Date(bill.paid_date) : undefined
  }));
}