import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const geminiKey = process.env.GEMINI_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);

async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

console.log('🚀 Populating Database with Dummy Data...\n');

// Dummy Policies
const policies = [
  {
    policy_name: 'Term Life Pro',
    policy_type: 'Term Life',
    description: 'Pure life coverage with high sum assured at affordable premiums',
    benefits: ['Death benefit', 'Tax benefits', 'Flexible term options', 'Optional riders'],
    premium_range: '₹500 - ₹5,000/month',
    coverage_amount: '₹25 Lakh - ₹2 Crore',
    term_years: '10-40 years',
    tax_benefits: 'Section 80C (premium) and 10(10D) (maturity)',
    riders_available: ['Critical illness', 'Accidental death', 'Waiver of premium']
  },
  {
    policy_name: 'ULIP Wealth Plus',
    policy_type: 'ULIP',
    description: 'Unit Linked Insurance Plan with investment and insurance benefits',
    benefits: ['Life cover', 'Market-linked returns', 'Fund switching', 'Tax benefits', 'Partial withdrawals'],
    premium_range: '₹2,000 - ₹20,000/month',
    coverage_amount: '₹10 Lakh - ₹1 Crore',
    term_years: '10-30 years',
    tax_benefits: 'Section 80C (premium) and 10(10D) (maturity)',
    riders_available: ['Top-up facility', 'Premium holiday']
  },
  {
    policy_name: 'Health Shield',
    policy_type: 'Health Insurance',
    description: 'Comprehensive health coverage for individuals and families',
    benefits: ['Hospitalization cover', 'Pre and post hospitalization', 'Cashless treatment', 'No claim bonus'],
    premium_range: '₹500 - ₹3,000/month',
    coverage_amount: '₹5 Lakh - ₹50 Lakh',
    term_years: 'Annual renewal',
    tax_benefits: 'Section 80D',
    riders_available: ['Critical illness', 'Maternity cover', 'OPD cover']
  },
  {
    policy_name: 'Endowment Plus',
    policy_type: 'Endowment',
    description: 'Guaranteed returns with life cover and maturity benefits',
    benefits: ['Life cover', 'Guaranteed maturity benefit', 'Bonus additions', 'Loan facility'],
    premium_range: '₹3,000 - ₹15,000/month',
    coverage_amount: '₹5 Lakh - ₹50 Lakh',
    term_years: '10-25 years',
    tax_benefits: 'Section 80C and 10(10D)',
    riders_available: ['Accidental death', 'Critical illness']
  },
  {
    policy_name: 'Child Future Plan',
    policy_type: 'Child Plan',
    description: 'Secure your child\'s future with education and marriage benefits',
    benefits: ['Education benefits', 'Marriage benefits', 'Waiver of premium', 'Maturity benefit'],
    premium_range: '₹2,000 - ₹10,000/month',
    coverage_amount: '₹10 Lakh - ₹1 Crore',
    term_years: '10-25 years',
    tax_benefits: 'Section 80C and 10(10D)',
    riders_available: ['Premium waiver on parent death', 'Critical illness']
  }
];

// Dummy Customers
const customers = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91-9876543210',
    age: 32,
    policies: ['Term Life Pro', 'Health Shield']
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543211',
    age: 28,
    policies: ['ULIP Wealth Plus']
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91-9876543212',
    age: 45,
    policies: ['Term Life Pro', 'Health Shield', 'Endowment Plus']
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '+91-9876543213',
    age: 35,
    policies: ['Child Future Plan', 'Health Shield']
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91-9876543214',
    age: 40,
    policies: ['Term Life Pro', 'ULIP Wealth Plus']
  }
];

// Dummy Premium Tables
const premiumTables = [
  { policy_type: 'Term Life', age_group: '25-30', coverage_amount: 2500000, term_years: 20, monthly_premium: 500, annual_premium: 6000 },
  { policy_type: 'Term Life', age_group: '25-30', coverage_amount: 5000000, term_years: 20, monthly_premium: 650, annual_premium: 7500 },
  { policy_type: 'Term Life', age_group: '25-30', coverage_amount: 10000000, term_years: 20, monthly_premium: 1200, annual_premium: 14000 },
  { policy_type: 'Term Life', age_group: '31-35', coverage_amount: 2500000, term_years: 20, monthly_premium: 650, annual_premium: 7500 },
  { policy_type: 'Term Life', age_group: '31-35', coverage_amount: 5000000, term_years: 20, monthly_premium: 850, annual_premium: 10000 },
  { policy_type: 'Term Life', age_group: '31-35', coverage_amount: 10000000, term_years: 20, monthly_premium: 1600, annual_premium: 19000 },
  { policy_type: 'Term Life', age_group: '36-40', coverage_amount: 5000000, term_years: 20, monthly_premium: 1100, annual_premium: 13000 },
  { policy_type: 'Term Life', age_group: '36-40', coverage_amount: 10000000, term_years: 20, monthly_premium: 2100, annual_premium: 25000 },
  { policy_type: 'ULIP', age_group: '25-30', coverage_amount: 1000000, term_years: 15, monthly_premium: 2500, annual_premium: 30000 },
  { policy_type: 'ULIP', age_group: '31-35', coverage_amount: 1000000, term_years: 15, monthly_premium: 3000, annual_premium: 36000 },
  { policy_type: 'ULIP', age_group: '36-40', coverage_amount: 1000000, term_years: 15, monthly_premium: 3500, annual_premium: 42000 },
  { policy_type: 'Health Insurance', age_group: '25-30', coverage_amount: 500000, term_years: 1, monthly_premium: 500, annual_premium: 6000 },
  { policy_type: 'Health Insurance', age_group: '31-35', coverage_amount: 500000, term_years: 1, monthly_premium: 650, annual_premium: 7800 },
  { policy_type: 'Health Insurance', age_group: '36-40', coverage_amount: 500000, term_years: 1, monthly_premium: 800, annual_premium: 9600 },
  { policy_type: 'Health Insurance', age_group: '25-30', coverage_amount: 1000000, term_years: 1, monthly_premium: 900, annual_premium: 10800 },
  { policy_type: 'Endowment', age_group: '25-30', coverage_amount: 1000000, term_years: 15, monthly_premium: 5000, annual_premium: 60000 },
  { policy_type: 'Endowment', age_group: '31-35', coverage_amount: 1000000, term_years: 15, monthly_premium: 5500, annual_premium: 66000 },
  { policy_type: 'Child Plan', age_group: '25-30', coverage_amount: 1000000, term_years: 18, monthly_premium: 3000, annual_premium: 36000 },
  { policy_type: 'Child Plan', age_group: '31-35', coverage_amount: 1000000, term_years: 18, monthly_premium: 3500, annual_premium: 42000 }
];

// Dummy Knowledge Base
const knowledgeBase = [
  {
    content: 'Term life insurance provides pure life coverage without any investment component. It offers high sum assured at affordable premiums. The policy pays the death benefit to nominees if the insured passes away during the policy term. Premiums are eligible for tax deduction under Section 80C up to ₹1.5 lakh per year. The death benefit is completely tax-free under Section 10(10D).',
    metadata: { category: 'term_life', topic: 'basics', language: 'english' }
  },
  {
    content: 'ULIP combines insurance and investment. A portion of premium goes towards life cover and remaining is invested in equity, debt or balanced funds. Lock-in period is 5 years. Returns are market-linked and not guaranteed. Suitable for long-term wealth creation with insurance protection. Fund switching is allowed to change investment strategy.',
    metadata: { category: 'ulip', topic: 'basics', language: 'english' }
  },
  {
    content: 'Claim process: 1) Inform insurer immediately within 24-48 hours 2) Submit death certificate, policy document, claim form 3) Provide KYC of nominee - Aadhaar, PAN card 4) Medical records if required 5) FIR copy for accidental death 6) Insurer investigates and settles within 30 days if all documents are proper. Keep all documents ready and updated.',
    metadata: { category: 'claims', topic: 'process', language: 'english' }
  },
  {
    content: 'Premium calculation factors: Age, sum assured, policy term, health status, lifestyle habits (smoking/drinking), occupation risk, medical history. Younger age and good health result in lower premiums. Women typically get lower premiums than men. Non-smokers pay 20-30% less than smokers.',
    metadata: { category: 'premium', topic: 'factors', language: 'english' }
  },
  {
    content: 'Tax benefits: Section 80C - Premium deduction up to ₹1.5 lakh. Section 10(10D) - Maturity/death benefit is tax-free if premium is less than 10% of sum assured. Section 80D - Health insurance premium deduction up to ₹25,000 (₹50,000 for senior citizens). These benefits help reduce taxable income significantly.',
    metadata: { category: 'tax', topic: 'benefits', language: 'english' }
  },
  {
    content: 'Health insurance covers hospitalization expenses, pre and post hospitalization costs, daycare procedures, ambulance charges. Cashless facility available at network hospitals. No claim bonus increases coverage by 5-10% every claim-free year. Family floater plans cover entire family under one policy at lower cost.',
    metadata: { category: 'health', topic: 'coverage', language: 'english' }
  },
  {
    content: 'Riders are additional benefits that can be added to base policy for extra premium. Common riders: Critical illness rider covers 36+ critical illnesses, Accidental death benefit pays extra on accidental death, Waiver of premium waives future premiums if policyholder becomes disabled, Hospital cash provides daily cash during hospitalization.',
    metadata: { category: 'riders', topic: 'types', language: 'english' }
  },
  {
    content: 'Policy lapse happens when premium is not paid within grace period (usually 30 days). Lapsed policy loses all benefits. Revival possible within 2-5 years by paying all due premiums with interest and medical examination. Better to keep policy active by paying premiums on time.',
    metadata: { category: 'policy_management', topic: 'lapse', language: 'english' }
  },
  {
    content: 'Nominee is the person who receives policy benefits after policyholder death. Can be spouse, children, parents, or anyone. Multiple nominees allowed with percentage share. Update nominee details after major life events like marriage, childbirth. Nominee should have insurable interest in policyholder life.',
    metadata: { category: 'policy_management', topic: 'nominee', language: 'english' }
  },
  {
    content: 'Endowment plans provide guaranteed returns with life cover. Maturity benefit paid if policyholder survives policy term. Death benefit paid to nominee if policyholder dies during term. Bonus additions increase maturity amount. Loan facility available after 3 years. Suitable for conservative investors wanting guaranteed returns.',
    metadata: { category: 'endowment', topic: 'basics', language: 'english' }
  },
  {
    content: 'Child insurance plans secure child future for education and marriage. Premium waiver benefit continues policy even if parent dies. Maturity benefit paid when child reaches 18-25 years. Can be used for higher education, marriage, or starting business. Tax benefits under Section 80C and 10(10D).',
    metadata: { category: 'child_plan', topic: 'basics', language: 'english' }
  },
  {
    content: 'Free look period is 15-30 days from policy receipt. Customer can return policy if not satisfied and get full refund minus medical and stamp duty charges. Read policy document carefully during this period. Check all terms, conditions, exclusions before free look period ends.',
    metadata: { category: 'policy_management', topic: 'free_look', language: 'english' }
  }
];

async function populateData() {
  let successCount = 0;
  let errorCount = 0;

  // Insert Policies
  console.log('📋 Inserting Policies...');
  for (const policy of policies) {
    try {
      const { error } = await supabase.from('policies').insert(policy);
      if (error) throw error;
      console.log(`   ✅ Added: ${policy.policy_name}`);
      successCount++;
    } catch (error: any) {
      console.log(`   ❌ Error adding ${policy.policy_name}:`, error.message);
      errorCount++;
    }
  }

  // Insert Customers
  console.log('\n👥 Inserting Customers...');
  for (const customer of customers) {
    try {
      const { error } = await supabase.from('customers').insert(customer);
      if (error) throw error;
      console.log(`   ✅ Added: ${customer.name}`);
      successCount++;
    } catch (error: any) {
      console.log(`   ❌ Error adding ${customer.name}:`, error.message);
      errorCount++;
    }
  }

  // Insert Premium Tables
  console.log('\n💰 Inserting Premium Tables...');
  for (const premium of premiumTables) {
    try {
      const { error } = await supabase.from('premium_tables').insert(premium);
      if (error) throw error;
      successCount++;
    } catch (error: any) {
      errorCount++;
    }
  }
  console.log(`   ✅ Added ${premiumTables.length} premium entries`);

  // Insert Knowledge Base with Embeddings
  console.log('\n📚 Inserting Knowledge Base with Embeddings...');
  for (const knowledge of knowledgeBase) {
    try {
      console.log(`   Processing: ${knowledge.content.substring(0, 50)}...`);
      const embedding = await generateEmbedding(knowledge.content);
      
      const { error } = await supabase.from('knowledge_base').insert({
        content: knowledge.content,
        metadata: knowledge.metadata,
        embedding: embedding
      });
      
      if (error) throw error;
      console.log(`   ✅ Added with embedding`);
      successCount++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error: any) {
      console.log(`   ❌ Error:`, error.message);
      errorCount++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📝 Total: ${successCount + errorCount}`);
  console.log('\n✨ Database populated successfully!');
  console.log('\n🚀 Next Steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000/chat');
  console.log('3. Test with: "Explain term life insurance"\n');
}

populateData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
