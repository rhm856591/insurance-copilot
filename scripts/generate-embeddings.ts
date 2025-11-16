import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const geminiKey = process.env.GEMINI_API_KEY!;

if (!supabaseUrl || !supabaseKey || !geminiKey) {
  console.error('Missing required environment variables!');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = new GoogleGenerativeAI(geminiKey);

async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function generateEmbeddings() {
  console.log('🚀 Starting embedding generation...\n');

  // Fetch all knowledge base entries without embeddings
  const { data: entries, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .is('embedding', null);

  if (error) {
    console.error('❌ Error fetching knowledge base entries:', error);
    return;
  }

  if (!entries || entries.length === 0) {
    console.log('✅ All entries already have embeddings!');
    return;
  }

  console.log(`📝 Found ${entries.length} entries without embeddings\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const entry of entries) {
    try {
      console.log(`Processing: ${entry.content.substring(0, 50)}...`);
      
      const embedding = await generateEmbedding(entry.content);
      
      const { error: updateError } = await supabase
        .from('knowledge_base')
        .update({ embedding })
        .eq('id', entry.id);

      if (updateError) {
        console.error(`❌ Error updating entry ${entry.id}:`, updateError);
        errorCount++;
      } else {
        console.log(`✅ Generated embedding for entry ${entry.id}`);
        successCount++;
      }

      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error processing entry ${entry.id}:`, error);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📝 Total: ${entries.length}`);
}

// Run the script
generateEmbeddings()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
