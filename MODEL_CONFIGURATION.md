# Model Configuration

## Current Gemini Models in Use

### Text Generation Model
**Model**: `gemini-2.5-flash`

**Used in**:
- `src/lib/ai-agent.ts` - Chat responses
- `src/lib/ai-suggestions.ts` - AI suggestions (4 functions)
- `scripts/test-setup.ts` - Setup testing

**Features**:
- Fast response times
- Cost-effective
- Good quality outputs
- Supports long context

### Embedding Model
**Model**: `text-embedding-004`

**Used in**:
- `src/lib/rag.ts` - Vector search
- `scripts/generate-embeddings.ts` - Embedding generation
- `scripts/populate-dummy-data.ts` - Initial data population

**Features**:
- 768-dimensional vectors
- Semantic similarity search
- Efficient for RAG systems

## Model Usage by Feature

### AI Chat (`/api/chat`)
- **Model**: gemini-2.5-flash
- **Purpose**: Generate conversational responses
- **Fallback**: Intent-based responses

### AI Suggestions (`/api/ai/suggestions`)
- **Model**: gemini-2.5-flash
- **Purpose**: Generate contextual suggestions
- **Fallback**: Default suggestions

### Message Generator (`/api/ai/generate-message`)
- **Model**: gemini-2.5-flash
- **Purpose**: Create WhatsApp, Email, SMS messages
- **Fallback**: Template messages

### Customer Analysis (`/api/ai/analyze-customer`)
- **Model**: gemini-2.5-flash
- **Purpose**: Analyze customer data
- **Fallback**: Basic analysis

### Smart Replies (`/api/ai/smart-replies`)
- **Model**: gemini-2.5-flash
- **Purpose**: Generate quick reply suggestions
- **Fallback**: Default replies

### Vector Search (RAG)
- **Model**: text-embedding-004
- **Purpose**: Semantic search in knowledge base
- **Fallback**: PostgreSQL text search

## Configuration Files

All model configurations are in:
```
src/lib/ai-agent.ts
src/lib/ai-suggestions.ts
src/lib/rag.ts
scripts/test-setup.ts
scripts/generate-embeddings.ts
scripts/populate-dummy-data.ts
```

## Changing Models

To change the text generation model:
```bash
sed -i '' "s/'gemini-2.5-flash'/'your-model-name'/g" src/lib/ai-agent.ts src/lib/ai-suggestions.ts scripts/test-setup.ts
```

To change the embedding model:
```bash
sed -i '' "s/'text-embedding-004'/'your-embedding-model'/g" src/lib/rag.ts scripts/generate-embeddings.ts scripts/populate-dummy-data.ts
```

Then restart the server:
```bash
npm run dev
```

## Model Comparison

### gemini-2.5-flash
- **Speed**: Very Fast ⚡
- **Cost**: Low 💰
- **Quality**: High ✨
- **Context**: 1M tokens
- **Best for**: Real-time responses, suggestions

### text-embedding-004
- **Dimensions**: 768
- **Speed**: Fast
- **Cost**: Low
- **Quality**: High
- **Best for**: Semantic search, RAG

## Rate Limits

### Free Tier (Current)
- **Text Generation**: 15 RPM (requests per minute)
- **Embeddings**: 1,500 per day
- **Total**: Varies by usage

### Paid Tier
- Higher limits available
- Pay-as-you-go pricing
- Better for production

## Monitoring

Check your usage at:
https://ai.dev/usage?tab=rate-limit

## Best Practices

1. **Cache responses** when possible
2. **Batch requests** for embeddings
3. **Use fallbacks** for reliability
4. **Monitor usage** regularly
5. **Implement rate limiting** in production

## Troubleshooting

### Model Not Found (404)
- Verify model name is correct
- Check API version compatibility
- Ensure API key has access

### Rate Limit (429)
- Wait for quota reset
- Use fallback responses
- Consider upgrading tier

### Slow Responses
- Check network latency
- Optimize prompt length
- Use faster model variant

## Status

✅ **All models configured correctly**
✅ **Using gemini-2.5-flash for text generation**
✅ **Using text-embedding-004 for embeddings**
✅ **Fallbacks in place**
✅ **Production ready**
