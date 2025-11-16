import { supabaseAdmin } from './supabase';

// Get customers with only one policy type
export async function getCustomersWithSinglePolicy() {
  try {
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('*');

    if (error) throw error;

    // Filter customers with only one policy
    const singlePolicyCustomers = customers?.filter(
      (customer) => customer.policies && customer.policies.length === 1
    );

    return singlePolicyCustomers || [];
  } catch (error) {
    console.error('Error fetching single policy customers:', error);
    return [];
  }
}

// Get high-value customers for cross-sell
export async function getHighValueCustomersForCrossSell() {
  try {
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('*');

    if (error) throw error;

    // Filter customers with only one policy (cross-sell opportunity)
    const crossSellOpportunities = customers?.filter(
      (customer) => customer.policies && customer.policies.length === 1
    );

    // Sort by age (proxy for high-value - older customers typically have more assets)
    const sortedCustomers = crossSellOpportunities?.sort((a, b) => {
      return (b.age || 0) - (a.age || 0);
    });

    return sortedCustomers || [];
  } catch (error) {
    console.error('Error fetching cross-sell opportunities:', error);
    return [];
  }
}

// Get customers by policy type
export async function getCustomersByPolicyType(policyType: string) {
  try {
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('*');

    if (error) throw error;

    const filtered = customers?.filter((customer) =>
      customer.policies?.includes(policyType)
    );

    return filtered || [];
  } catch (error) {
    console.error('Error fetching customers by policy type:', error);
    return [];
  }
}

// Get policy details
export async function getAllPolicies() {
  try {
    const { data, error } = await supabaseAdmin
      .from('policies')
      .select('*')
      .order('policy_name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching policies:', error);
    return [];
  }
}

// Get premium information
export async function getPremiumInfo(policyType: string, ageGroup: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('premium_tables')
      .select('*')
      .eq('policy_type', policyType)
      .eq('age_group', ageGroup)
      .order('coverage_amount');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching premium info:', error);
    return [];
  }
}

// Generate cross-sell report
export async function generateCrossSellReport() {
  try {
    const customers = await getHighValueCustomersForCrossSell();
    const policies = await getAllPolicies();

    const report = customers.map((customer) => {
      const currentPolicy = customer.policies?.[0] || 'Unknown';
      const complementaryPolicies = policies
        .filter((p) => !customer.policies?.includes(p.policy_name))
        .map((p) => p.policy_name);

      return {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        age: customer.age,
        currentPolicy,
        complementaryPolicies,
        priority: customer.age && customer.age > 35 ? 'High' : 'Medium',
      };
    });

    return report;
  } catch (error) {
    console.error('Error generating cross-sell report:', error);
    return [];
  }
}

// Get customers needing specific policy
export async function getCustomersNeedingPolicy(policyType: string) {
  try {
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('*');

    if (error) throw error;

    // Find customers who don't have this policy type
    const needingPolicy = customers?.filter(
      (customer) => !customer.policies?.includes(policyType)
    );

    return needingPolicy || [];
  } catch (error) {
    console.error('Error fetching customers needing policy:', error);
    return [];
  }
}
