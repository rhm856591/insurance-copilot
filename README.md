# Insurance AI Copilot

Communication AI Copilot for Life Insurance Agents - A comprehensive Next.js application that assists agents with client interactions, policy explanations, lead nurturing, and compliance monitoring.

## Features

### 🏠 Agentic Home Interface
- Conversational command center powered by AI
- Voice and text input support
- Dynamic insights and daily summaries
- Quick action cards for common tasks
- Context-aware AI responses

### 🔐 Secure Authentication
- Email & Password authentication
- SSO integration (Azure AD, Okta)
- Multi-Factor Authentication support
- Smart session management

### 🤖 AI Chat Assistant
- Real-time suggestions for client queries
- Auto-generation of personalized messages and emails
- Policy explanations in simple language (Term Life, ULIP, Endowment, etc.)
- Context-aware response generation
- Multi-modal interface support

### 👥 Lead Management
- AI-driven prioritization with explainability
- Sentiment analysis to prioritize hot leads
- Lead status tracking (Hot, Warm, Cold) with reasoning
- Conversion probability scoring
- AI heatmap visualization
- Best contact time recommendations
- Enriched lead profiles (age, income, location, source)
- Smart search and filtering

### 👤 Customer Management
- Comprehensive customer search (name, policy, phone, email, PAN)
- Customer detail view with full interaction history
- Policy portfolio overview
- AI-powered next best action recommendations
- Renewal tracking with visual indicators
- Communication timeline with sentiment markers
- Scheduled follow-ups management

### ✅ Compliance & Governance
- Real-time compliance checking
- Flagging of prohibited terms (guaranteed returns, risk-free, etc.)
- IRDAI guideline adherence
- Tone and sentiment analysis
- Audit trail of communications
- Risk level assessment

### 📝 Draft Editor
- Generate email/chat drafts from short prompts
- Analyze drafts for sentiment and tone
- Compliance validation before sending
- Template generation for common scenarios
- Real-time suggestions for improvement

### 🔔 Notifications & Reminders
- Smart categorization (Renewals, Follow-ups, Compliance, Upsells)
- Interactive timeline view
- AI-based reminder rescheduling
- Priority-based alerts

### ⚙️ Admin Panel (Web Only)
- Communications dashboard with filtering
- Template management with approval workflow
- Immutable audit log
- Guardrails management for compliance
- Analytics and compliance trends
- Role-based access control

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard overview
│   ├── chat/              # AI chat interface
│   ├── leads/             # Lead management
│   ├── compliance/        # Compliance monitoring
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── chat/             # Chat-related components
│   ├── leads/            # Lead management components
│   ├── compliance/       # Compliance components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Compliance Features

The application actively monitors and prevents:
- Guaranteed returns claims
- Risk-free investment promises
- Unlicensed financial advice
- Missing IRDAI disclaimers
- Non-compliant terminology

## Future Enhancements

- Integration with actual AI/LLM services (OpenAI, Anthropic, etc.)
- Voice-to-text and text-to-voice capabilities
- Multi-lingual support (Hindi, Tamil, Telugu, Marathi)
- Integration with CRM systems
- WhatsApp and email integration
- Advanced analytics and reporting
- Mobile app version

## License

Proprietary - For internal use only
