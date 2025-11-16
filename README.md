# AI Insurance Agent - RAG System

AI-powered insurance agent assistant with multi-channel message generation (WhatsApp, Email, Voice) using Google Gemini and Supabase.

## Features

- 🤖 AI-powered responses using Google Gemini
- 🔍 RAG (Retrieval Augmented Generation) with vector search
- 📱 Multi-channel message generation (WhatsApp, Email, Voice)
- 🗣️ Text-to-speech support
- 💾 Supabase database with pgvector
- 🇮🇳 Indian insurance market focus (₹, tax sections)

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Google Gemini API key

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
Copy `.env.example` to `.env.local` and add your keys:
```env
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

3. **Setup database**
```bash
npm run db:push
```

4. **Populate with dummy data**
```bash
npm run populate-db
```

5. **Start development server**
```bash
npm run dev
```

Open http://localhost:3000/chat

## Test Queries

- "Explain term life insurance"
- "What are ULIP benefits?"
- "Calculate premium for 50 lakh coverage"
- "How to file a claim?"

## Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run db:push          # Push Prisma schema to database
npm run db:studio        # Open Prisma Studio
npm run populate-db      # Populate database with dummy data
npm run test-setup       # Test configuration
```

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: Google Gemini (gemini-1.5-pro, text-embedding-004)
- **Database**: Supabase (PostgreSQL + pgvector)
- **ORM**: Prisma
- **Vector Search**: pgvector extension

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts       # Chat API endpoint
│   └── chat/page.tsx           # Chat interface page
├── components/chat/
│   ├── ChatInterface.tsx       # Main chat UI
│   ├── MessageBubble.tsx       # Message display
│   └── MessageActions.tsx      # Multi-channel templates
└── lib/
    ├── ai-agent.ts             # AI agent logic
    ├── rag.ts                  # RAG functions
    └── supabase.ts             # Database client

prisma/
└── schema.prisma               # Database schema

scripts/
├── populate-dummy-data.ts      # Populate database
├── generate-embeddings.ts      # Generate embeddings
└── test-setup.ts               # Test configuration
```

## Database Schema

- **policies** - Insurance policy information
- **customers** - Customer data
- **premium_tables** - Premium calculations
- **knowledge_base** - RAG knowledge with vector embeddings

## API Response Format

```json
{
  "success": true,
  "data": {
    "agent_reply": "Detailed response...",
    "whatsapp": "Short WhatsApp message...",
    "email": "Professional email...",
    "voice_text": "Audio-ready text..."
  }
}
```

## License

MIT
