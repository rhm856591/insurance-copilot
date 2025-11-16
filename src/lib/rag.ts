import { supabaseAdmin } from './supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple in-memory cache for embeddings
const embeddingCache = new Map<string, number[]>();

// Generate embeddings for text using Gemini
export async function generateEmbedding(text: string): Promise<number[]> {
  // Check cache first
  const cacheKey = text.substring(0, 100); // Use first 100 chars as key
  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey)!;
  }

  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  const embedding = result.embedding.values;
  
  // Cache the result
  embeddingCache.set(cacheKey, embedding);
  
  return embedding;
}

// Search knowledge base using vector similarity
export async function searchKnowledgeBase(query: string, limit = 5) {
  try {
    const embedding = await generateEmbedding(query);
    
    const { data, error } = await supabaseAdmin.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
    });

    if (error) {
      console.error('Knowledge base search error:', error);
      // Fallback to simple text search
      return await fallbackTextSearch(query, limit);
    }

    return data;
  } catch (error) {
    console.error('Embedding generation error:', error);
    // Fallback to simple text search
    return await fallbackTextSearch(query, limit);
  }
}

// Fallback text search when embeddings fail
async function fallbackTextSearch(query: string, limit = 5) {
  try {
    const { data, error } = await supabaseAdmin
      .from('knowledge_base')
      .select('id, content, metadata')
      .textSearch('content', query, { type: 'websearch' })
      .limit(limit);

    if (error) {
      console.error('Fallback search error:', error);
      // Return all knowledge base entries as last resort
      const { data: allData } = await supabaseAdmin
        .from('knowledge_base')
        .select('id, content, metadata')
        .limit(limit);
      return allData || [];
    }

    return data || [];
  } catch (error) {
    console.error('Fallback search failed:', error);
    return [];
  }
}

// Get policy details
export async function getPolicyDetails(policyType: string) {
  const { data, error } = await supabaseAdmin
    .from('policies')
    .select('*')
    .ilike('policy_type', `%${policyType}%`)
    .limit(1)
    .single();

  if (error) {
    console.error('Policy fetch error:', error);
    return null;
  }

  return data;
}

// Get customer details
export async function getCustomerDetails(identifier: string) {
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('*')
    .or(`email.eq.${identifier},phone.eq.${identifier}`)
    .limit(1)
    .single();

  if (error) {
    console.error('Customer fetch error:', error);
    return null;
  }

  return data;
}

// Get premium calculation
export async function calculatePremium(
  policyType: string,
  age: number,
  coverageAmount: number,
  termYears: number
) {
  const { data, error } = await supabaseAdmin
    .from('premium_tables')
    .select('*')
    .eq('policy_type', policyType)
    .gte('age_group', `${Math.floor(age / 5) * 5}`)
    .lte('age_group', `${Math.floor(age / 5) * 5 + 4}`)
    .eq('coverage_amount', coverageAmount)
    .eq('term_years', termYears)
    .limit(1)
    .single();

  if (error) {
    console.error('Premium calculation error:', error);
    return null;
  }

  return data;
}
