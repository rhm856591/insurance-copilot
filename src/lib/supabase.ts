import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (has elevated permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Database types
export interface Policy {
  id: string;
  policy_name: string;
  policy_type: string;
  description: string;
  benefits: string[];
  premium_range: string;
  coverage_amount: string;
  term_years: string;
  tax_benefits: string;
  riders_available: string[];
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  policies: string[];
  created_at: string;
}

export interface PremiumTable {
  id: string;
  policy_type: string;
  age_group: string;
  coverage_amount: number;
  term_years: number;
  monthly_premium: number;
  annual_premium: number;
}

export interface KnowledgeBase {
  id: string;
  content: string;
  metadata: Record<string, any>;
  embedding: number[];
  created_at: string;
}
