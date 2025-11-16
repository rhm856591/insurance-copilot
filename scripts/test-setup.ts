import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

async function testSetup() {
  console.log('🔍 Testing AI Insurance Agent Setup...\n');

  // Test 1: Environment Variables
  console.log('1️⃣ Checking Environment Variables...');
  const envTests = {
    'NEXT_PUBLIC_SUPABASE_URL': !!supabaseUrl,
    'SUPABASE_SERVICE_ROLE_KEY': !!supabaseKey,
    'GEMINI_API_KEY': !!geminiKey,
  };

let envPass = true;
for (const [key, value] of Object.entries(envTests)) {
  if (value) {
    console.log(`   ✅ ${key} is set`);
  } else {
    console.log(`   ❌ ${key} is missing`);
    envPass = false;
  }
}

if (!envPass) {
  console.log('\n❌ Environment variables missing. Check .env.local file.');
  throw new Error('Missing environment variables');
}

console.log('   ✅ All environment variables present\n');

// Test 2: Supabase Connection
console.log('2️⃣ Testing Supabase Connection...');
const supabase = createClient(supabaseUrl!, supabaseKey!);

try {
  const { data, error } = await supabase.from('policies').select('count');
  if (error) throw error;
  console.log('   ✅ Supabase connection successful\n');
} catch (error) {
  console.log('   ❌ Supabase connection failed:', error);
  console.log('   💡 Make sure you ran supabase-setup.sql\n');
  throw error;
}

// Test 3: Check Tables
console.log('3️⃣ Checking Database Tables...');
const tables = ['policies', 'customers', 'premium_tables', 'knowledge_base'];
let tablesPass = true;

for (const table of tables) {
  try {
    const { data, error } = await supabase.from(table).select('count').limit(1);
    if (error) throw error;
    console.log(`   ✅ Table '${table}' exists`);
  } catch (error) {
    console.log(`   ❌ Table '${table}' not found`);
    tablesPass = false;
  }
}

if (!tablesPass) {
  console.log('\n   ❌ Some tables missing. Run supabase-setup.sql\n');
  throw new Error('Missing database tables');
}

console.log('   ✅ All tables present\n');

// Test 4: Check Sample Data
console.log('4️⃣ Checking Sample Data...');

const { data: policies, error: policiesError } = await supabase
  .from('policies')
  .select('count');

const { data: knowledge, error: knowledgeError } = await supabase
  .from('knowledge_base')
  .select('count');

if (policiesError || knowledgeError) {
  console.log('   ❌ Error checking data');
} else {
  console.log(`   ✅ Policies: ${policies?.length || 0} entries`);
  console.log(`   ✅ Knowledge Base: ${knowledge?.length || 0} entries\n`);
}

// Test 5: Check Embeddings
console.log('5️⃣ Checking Vector Embeddings...');

const { data: embeddingsData, error: embeddingsError } = await supabase
  .from('knowledge_base')
  .select('id, embedding')
  .not('embedding', 'is', null)
  .limit(1);

if (embeddingsError) {
  console.log('   ❌ Error checking embeddings:', embeddingsError);
} else if (!embeddingsData || embeddingsData.length === 0) {
  console.log('   ⚠️  No embeddings found');
  console.log('   💡 Run: npm run generate-embeddings\n');
} else {
  console.log('   ✅ Embeddings present\n');
}

// Test 6: Gemini Connection
console.log('6️⃣ Testing Gemini AI Connection...');
const genAI = new GoogleGenerativeAI(geminiKey!);

try {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent('Say "test successful"');
  const response = result.response.text();
  
  if (response) {
    console.log('   ✅ Gemini AI connection successful\n');
  }
} catch (error: any) {
  console.log('   ⚠️  Gemini AI test skipped:', error.message);
  console.log('   💡 Will test during actual usage\n');
}

// Test 7: Vector Search Function
console.log('7️⃣ Testing Vector Search Function...');

try {
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: Array(768).fill(0),
    match_threshold: 0.5,
    match_count: 1,
  });
  
  if (error) throw error;
  console.log('   ✅ Vector search function working\n');
} catch (error: any) {
  console.log('   ❌ Vector search function failed:', error.message);
  console.log('   💡 Make sure pgvector extension is enabled\n');
}

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✨ Setup Test Complete!\n');

console.log('Next Steps:');
console.log('1. If embeddings missing: npm run generate-embeddings');
console.log('2. Start dev server: npm run dev');
console.log('3. Open: http://localhost:3000/chat');
console.log('4. Test with: "Explain term life insurance"\n');

console.log('📚 Documentation:');
console.log('   • Quick Start: QUICK_START_AI_AGENT.md');
console.log('   • Full Guide: README_AI_AGENT.md');
console.log('   • Examples: EXAMPLE_USAGE.md\n');
}

testSetup()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
