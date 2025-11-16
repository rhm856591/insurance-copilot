// import { PrismaClient } from '@prisma/client';
// import * as dotenv from 'dotenv';

// // Load environment variables
// dotenv.config({ path: '.env.local' });

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Starting database seed...');

//   // Clear existing data
//   console.log('🧹 Clearing existing data...');
//   await prisma.lead.deleteMany();
//   await prisma.customer.deleteMany();
//   await prisma.policy.deleteMany();
//   await prisma.premiumTable.deleteMany();

//   // Seed Policies
//   console.log('📋 Seeding policies...');
//   const policies = await Promise.all([
//     prisma.policy.create({
//       data: {
//         policyName: 'Term Life Pro',
//         policyType: 'Term Life Insurance',
//         description: 'Pure protection plan with high coverage at affordable premiums',
//         benefits: [
//           'Death benefit payout',
//           'Tax benefits under Section 80C',
//           'Optional critical illness rider',
//           'Flexible premium payment terms',
//         ],
//         premiumRange: '₹500 - ₹5,000/month',
//         coverageAmount: '₹10 Lakh - ₹2 Crore',
//         termYears: '10-40 years',
//         taxBenefits: 'Section 80C & 10(10D)',
//         ridersAvailable: ['Critical Illness', 'Accidental Death', 'Waiver of Premium'],
//       },
//     }),
//     prisma.policy.create({
//       data: {
//         policyName: 'ULIP Wealth Plus',
//         policyType: 'ULIP',
//         description: 'Investment + Insurance in one plan',
//         benefits: [
//           'Market-linked returns',
//           'Life insurance coverage',
//           'Tax benefits',
//           'Flexible fund switching',
//         ],
//         premiumRange: '₹2,000 - ₹10,000/month',
//         coverageAmount: '₹5 Lakh - ₹50 Lakh',
//         termYears: '10-30 years',
//         taxBenefits: 'Section 80C & 10(10D)',
//         ridersAvailable: ['Accidental Death', 'Critical Illness'],
//       },
//     }),
//     prisma.policy.create({
//       data: {
//         policyName: 'Child Future Plan',
//         policyType: 'Child Plan',
//         description: 'Secure your child\'s education and future',
//         benefits: [
//           'Education milestone payouts',
//           'Waiver of premium on parent death',
//           'Maturity benefit',
//           'Tax benefits',
//         ],
//         premiumRange: '₹1,500 - ₹8,000/month',
//         coverageAmount: '₹10 Lakh - ₹1 Crore',
//         termYears: '10-25 years',
//         taxBenefits: 'Section 80C & 10(10D)',
//         ridersAvailable: ['Waiver of Premium', 'Critical Illness'],
//       },
//     }),
//     prisma.policy.create({
//       data: {
//         policyName: 'Health Shield',
//         policyType: 'Health Insurance',
//         description: 'Comprehensive health coverage for you and family',
//         benefits: [
//           'Cashless hospitalization',
//           'Pre and post hospitalization',
//           'Day care procedures',
//           'No claim bonus',
//         ],
//         premiumRange: '₹800 - ₹5,000/month',
//         coverageAmount: '₹3 Lakh - ₹50 Lakh',
//         termYears: '1-3 years',
//         taxBenefits: 'Section 80D',
//         ridersAvailable: ['Critical Illness', 'Personal Accident'],
//       },
//     }),
//     prisma.policy.create({
//       data: {
//         policyName: 'Pension Plus',
//         policyType: 'Pension Plan',
//         description: 'Retirement planning with guaranteed income',
//         benefits: [
//           'Regular pension income',
//           'Lump sum on retirement',
//           'Tax benefits',
//           'Spouse pension option',
//         ],
//         premiumRange: '₹3,000 - ₹15,000/month',
//         coverageAmount: '₹20 Lakh - ₹2 Crore',
//         termYears: '10-40 years',
//         taxBenefits: 'Section 80CCC & 10(10A)',
//         ridersAvailable: ['Life Cover', 'Critical Illness'],
//       },
//     }),
//   ]);

//   console.log(`✅ Created ${policies.length} policies`);

//   // Seed Customers
//   console.log('👥 Seeding customers...');
//   const customers = await Promise.all([
//     prisma.customer.create({
//       data: {
//         name: 'Rajesh Kumar',
//         email: 'rajesh.kumar@email.com',
//         phone: '+91 98765 43210',
//         age: 35,
//         policies: ['Term Life Pro'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Priya Sharma',
//         email: 'priya.sharma@email.com',
//         phone: '+91 98765 43211',
//         age: 32,
//         policies: ['ULIP Wealth Plus', 'Child Future Plan'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Amit Patel',
//         email: 'amit.patel@email.com',
//         phone: '+91 98765 43212',
//         age: 38,
//         policies: ['Term Life Pro'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Sunita Desai',
//         email: 'sunita.desai@email.com',
//         phone: '+91 98765 43213',
//         age: 45,
//         policies: ['Pension Plus'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Vikram Singh',
//         email: 'vikram.singh@email.com',
//         phone: '+91 98765 43214',
//         age: 29,
//         policies: ['Term Life Pro'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Sneha Reddy',
//         email: 'sneha.reddy@email.com',
//         phone: '+91 98765 43215',
//         age: 35,
//         policies: ['Child Future Plan'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Karthik Iyer',
//         email: 'karthik.iyer@email.com',
//         phone: '+91 98765 43216',
//         age: 42,
//         policies: ['Health Shield', 'Term Life Pro'],
//       },
//     }),
//     prisma.customer.create({
//       data: {
//         name: 'Anita Verma',
//         email: 'anita.verma@email.com',
//         phone: '+91 98765 43217',
//         age: 28,
//         policies: ['ULIP Wealth Plus'],
//       },
//     }),
//   ]);

//   console.log(`✅ Created ${customers.length} customers`);

//   // Seed Leads
//   console.log('🎯 Seeding leads...');
//   const leads = await Promise.all([
//     prisma.lead.create({
//       data: {
//         name: 'Meera Kapoor',
//         email: 'meera.kapoor@email.com',
//         phone: '+91 98765 43220',
//         age: 34,
//         status: 'hot',
//         sentiment: 0.85,
//         lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
//         policyInterest: 'Term Life Insurance',
//         notes: 'Interested in 1 Cr coverage, follow up on premium calculation. Ready to proceed.',
//         location: 'Mumbai',
//         source: 'Website',
//         conversionProbability: 0.88,
//         priorityReason: 'High engagement score, requested premium quote, budget confirmed',
//         bestContactTime: '6:00 PM - 8:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Arjun Malhotra',
//         email: 'arjun.malhotra@email.com',
//         phone: '+91 98765 43221',
//         age: 29,
//         status: 'hot',
//         sentiment: 0.82,
//         lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
//         policyInterest: 'ULIP Wealth Plus',
//         notes: 'Young professional, interested in investment + insurance combo. Comparing plans.',
//         location: 'Bangalore',
//         source: 'Referral',
//         conversionProbability: 0.75,
//         priorityReason: 'Referred by existing customer, high income potential',
//         bestContactTime: '12:00 PM - 2:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Divya Nair',
//         email: 'divya.nair@email.com',
//         phone: '+91 98765 43222',
//         age: 36,
//         status: 'warm',
//         sentiment: 0.68,
//         lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
//         policyInterest: 'Child Future Plan',
//         notes: 'Looking for education planning for 2 children. Needs detailed benefit explanation.',
//         location: 'Delhi',
//         source: 'Social Media',
//         conversionProbability: 0.62,
//         priorityReason: 'Strong intent for child education, needs tenure clarification',
//         bestContactTime: '7:00 PM - 9:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Rohan Gupta',
//         email: 'rohan.gupta@email.com',
//         phone: '+91 98765 43223',
//         age: 42,
//         status: 'warm',
//         sentiment: 0.58,
//         lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//         policyInterest: 'Health Shield',
//         notes: 'Interested in family floater plan. Comparing with other providers.',
//         location: 'Pune',
//         source: 'Website',
//         conversionProbability: 0.55,
//         priorityReason: 'Active comparison phase, responded positively to last email',
//         bestContactTime: '10:00 AM - 12:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Kavita Reddy',
//         email: 'kavita.reddy@email.com',
//         phone: '+91 98765 43224',
//         age: 38,
//         status: 'warm',
//         sentiment: 0.52,
//         lastContact: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
//         policyInterest: 'Pension Plus',
//         notes: 'Planning for retirement. Needs information on tax benefits.',
//         location: 'Hyderabad',
//         source: 'Referral',
//         conversionProbability: 0.48,
//         priorityReason: 'Good retirement planning candidate, needs detailed proposal',
//         bestContactTime: '11:00 AM - 1:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Sanjay Mehta',
//         email: 'sanjay.mehta@email.com',
//         phone: '+91 98765 43225',
//         age: 45,
//         status: 'cold',
//         sentiment: 0.28,
//         lastContact: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
//         policyInterest: 'Term Life Insurance',
//         notes: 'Not responding to follow-ups. May need different approach or channel.',
//         location: 'Ahmedabad',
//         source: 'Cold Call',
//         conversionProbability: 0.22,
//         priorityReason: 'Low engagement, multiple follow-ups missed, consider re-engagement strategy',
//         bestContactTime: '4:00 PM - 6:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Pooja Sharma',
//         email: 'pooja.sharma@email.com',
//         phone: '+91 98765 43226',
//         age: 31,
//         status: 'hot',
//         sentiment: 0.79,
//         lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
//         policyInterest: 'Child Future Plan',
//         notes: 'Recently married, planning for future. Very interested in child plans.',
//         location: 'Chennai',
//         source: 'Website',
//         conversionProbability: 0.72,
//         priorityReason: 'Life stage transition, high intent, quick decision maker',
//         bestContactTime: '8:00 PM - 10:00 PM',
//       },
//     }),
//     prisma.lead.create({
//       data: {
//         name: 'Aditya Singh',
//         email: 'aditya.singh@email.com',
//         phone: '+91 98765 43227',
//         age: 27,
//         status: 'warm',
//         sentiment: 0.61,
//         lastContact: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
//         policyInterest: 'ULIP Wealth Plus',
//         notes: 'First-time insurance buyer. Needs education on policy benefits.',
//         location: 'Kolkata',
//         source: 'Social Media',
//         conversionProbability: 0.58,
//         priorityReason: 'Young professional, good long-term customer potential',
//         bestContactTime: '9:00 AM - 11:00 AM',
//       },
//     }),
//   ]);

//   console.log(`✅ Created ${leads.length} leads`);

//   // Seed Premium Tables
//   console.log('💰 Seeding premium tables...');
//   const premiumData = [
//     // Term Life Insurance
//     { policyType: 'Term Life Insurance', ageGroup: '25-30', coverageAmount: 5000000, termYears: 20, monthlyPremium: 500, annualPremium: 6000 },
//     { policyType: 'Term Life Insurance', ageGroup: '25-30', coverageAmount: 10000000, termYears: 20, monthlyPremium: 800, annualPremium: 9600 },
//     { policyType: 'Term Life Insurance', ageGroup: '31-35', coverageAmount: 5000000, termYears: 20, monthlyPremium: 650, annualPremium: 7800 },
//     { policyType: 'Term Life Insurance', ageGroup: '31-35', coverageAmount: 10000000, termYears: 20, monthlyPremium: 1100, annualPremium: 13200 },
//     { policyType: 'Term Life Insurance', ageGroup: '36-40', coverageAmount: 5000000, termYears: 20, monthlyPremium: 900, annualPremium: 10800 },
//     { policyType: 'Term Life Insurance', ageGroup: '36-40', coverageAmount: 10000000, termYears: 20, monthlyPremium: 1600, annualPremium: 19200 },
    
//     // ULIP
//     { policyType: 'ULIP', ageGroup: '25-30', coverageAmount: 2500000, termYears: 15, monthlyPremium: 2000, annualPremium: 24000 },
//     { policyType: 'ULIP', ageGroup: '25-30', coverageAmount: 5000000, termYears: 15, monthlyPremium: 3500, annualPremium: 42000 },
//     { policyType: 'ULIP', ageGroup: '31-35', coverageAmount: 2500000, termYears: 15, monthlyPremium: 2200, annualPremium: 26400 },
//     { policyType: 'ULIP', ageGroup: '31-35', coverageAmount: 5000000, termYears: 15, monthlyPremium: 3800, annualPremium: 45600 },
    
//     // Child Plan
//     { policyType: 'Child Plan', ageGroup: '25-35', coverageAmount: 1000000, termYears: 15, monthlyPremium: 1500, annualPremium: 18000 },
//     { policyType: 'Child Plan', ageGroup: '25-35', coverageAmount: 2000000, termYears: 15, monthlyPremium: 2800, annualPremium: 33600 },
//     { policyType: 'Child Plan', ageGroup: '36-45', coverageAmount: 1000000, termYears: 15, monthlyPremium: 1800, annualPremium: 21600 },
//     { policyType: 'Child Plan', ageGroup: '36-45', coverageAmount: 2000000, termYears: 15, monthlyPremium: 3200, annualPremium: 38400 },
    
//     // Health Insurance
//     { policyType: 'Health Insurance', ageGroup: '25-30', coverageAmount: 500000, termYears: 1, monthlyPremium: 800, annualPremium: 9600 },
//     { policyType: 'Health Insurance', ageGroup: '25-30', coverageAmount: 1000000, termYears: 1, monthlyPremium: 1400, annualPremium: 16800 },
//     { policyType: 'Health Insurance', ageGroup: '31-40', coverageAmount: 500000, termYears: 1, monthlyPremium: 1100, annualPremium: 13200 },
//     { policyType: 'Health Insurance', ageGroup: '31-40', coverageAmount: 1000000, termYears: 1, monthlyPremium: 1900, annualPremium: 22800 },
    
//     // Pension Plan
//     { policyType: 'Pension Plan', ageGroup: '30-40', coverageAmount: 5000000, termYears: 25, monthlyPremium: 3000, annualPremium: 36000 },
//     { policyType: 'Pension Plan', ageGroup: '30-40', coverageAmount: 10000000, termYears: 25, monthlyPremium: 5500, annualPremium: 66000 },
//     { policyType: 'Pension Plan', ageGroup: '41-50', coverageAmount: 5000000, termYears: 20, monthlyPremium: 4000, annualPremium: 48000 },
//     { policyType: 'Pension Plan', ageGroup: '41-50', coverageAmount: 10000000, termYears: 20, monthlyPremium: 7500, annualPremium: 90000 },
//   ];

//   for (const premium of premiumData) {
//     await prisma.premiumTable.create({
//       data: premium,
//     });
//   }

//   console.log(`✅ Created ${premiumData.length} premium table entries`);

//   console.log('✨ Database seeded successfully!');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Error seeding database:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
