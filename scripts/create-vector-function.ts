import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createVectorFunction() {
  console.log('🔧 Creating vector search function...\n');

  try {
    // First, enable pgvector extension
    const { error: extError } = await supabase.rpc('query', {
      query: 'CREATE EXTENSION IF NOT EXISTS vector;'
    });

    if (extError) {
      console.log('Note: pgvector extension may already be enabled');
    }

    // Create the match_documents function
    const functionSQL = `
      CREATE OR REPLACE FUNCTION match_documents(
        query_embedding vector(768),
        match_threshold float,
        match_count int
      )
      RETURNS TABLE (
        id UUID,
        content TEXT,
        metadata JSONB,
        similarity float
      )
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          knowledge_base.id,
          knowledge_base.content,
          knowledge_base.metadata,
          1 - (knowledge_base.embedding <=> query_embedding) AS similarity
        FROM knowledge_base
        WHERE knowledge_base.embedding IS NOT NULL
          AND 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
        ORDER BY knowledge_base.embedding <=> query_embedding
        LIMIT match_count;
      END;
      $$;
    `;

    const { error: funcError } = await supabase.rpc('query', {
      query: functionSQL
    });

    if (funcError) {
      console.log('⚠️  Could not create function via RPC');
      console.log('Please run this SQL manually in Supabase SQL Editor:\n');
      console.log(functionSQL);
      console.log('\nOr the function may already exist.');
    } else {
      console.log('✅ Vector search function created successfully!');
    }

    console.log('\n✨ Setup complete!');
    console.log('You can now use vector search in your application.\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Manual Setup Required:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Run this SQL:\n');
    console.log(`
CREATE EXTENSION IF NOT EXISTS vector;

CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.content,
    knowledge_base.metadata,
    1 - (knowledge_base.embedding <=> query_embedding) AS similarity
  FROM knowledge_base
  WHERE knowledge_base.embedding IS NOT NULL
    AND 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_base.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
    `);
  }
}

createVectorFunction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
