import { supabase } from '../../lib/supabase';
import type { CostSettings } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from '../../utils/cost/constants';
import { mapDatabaseToCostSettings } from './mappers';

export async function getCostSettings(companyId: string): Promise<CostSettings> {
  try {
    // First try to get existing settings
    const { data: existingSettings, error: fetchError } = await supabase
      .from('cost_settings')
      .select('*')
      .eq('company_id', companyId)
      .maybeSingle();

    if (fetchError) {
      throw new Error(`Failed to fetch cost settings: ${fetchError.message}`);
    }

    // If settings exist, return them
    if (existingSettings) {
      return mapDatabaseToCostSettings(existingSettings);
    }

    // If no settings exist, create new ones with defaults
    const { data: newSettings, error: createError } = await supabase
      .from('cost_settings')
      .insert([{
        company_id: companyId,
        baseline_device_price: DEFAULT_COST_SETTINGS.baselineDevicePrice,
        multiplier_iii: DEFAULT_COST_SETTINGS.multipliers.III,
        multiplier_iib: DEFAULT_COST_SETTINGS.multipliers.IIb,
        multiplier_iia: DEFAULT_COST_SETTINGS.multipliers.IIa,
        multiplier_i: DEFAULT_COST_SETTINGS.multipliers.I,
        multiplier_notbod: DEFAULT_COST_SETTINGS.multipliers.NotBod,
        full_text_cost: DEFAULT_COST_SETTINGS.articleCosts.fullText,
        abstract_cost: DEFAULT_COST_SETTINGS.articleCosts.abstract
      }])
      .select()
      .single();

    if (createError) {
      console.error('Failed to create cost settings:', createError);
      return DEFAULT_COST_SETTINGS;
    }

    return mapDatabaseToCostSettings(newSettings);
  } catch (error) {
    console.error('Cost settings error:', error);
    return DEFAULT_COST_SETTINGS;
  }
}