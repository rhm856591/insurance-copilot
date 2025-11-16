# AI Integration Guide

## Overview

AI is now integrated throughout the entire application to provide intelligent suggestions, generate personalized messages, and analyze customer data.

## AI Features

### 1. AI Suggestions (`AISuggestions` Component)
**Location**: Every major page (Home, Leads, Customers, Chat)

**Features**:
- Context-aware suggestions based on current page
- Actionable recommendations
- Priority-based sorting (high, medium, low)
- Auto-refresh capability

**Usage**:
```tsx
<AISuggestions
  page="home" // or "leads", "customers", "chat"
  data={{ /* optional context data */ }}
  onActionClick={(suggestion) => {
    // Handle action
  }}
/>
```

### 2. AI Message Generator (`AIMessageGenerator` Component)
**Location**: Lead details, Customer details

**Features**:
- Generates personalized messages for WhatsApp, Email, and SMS
- Context-aware based on recipient type and purpose
- Copy to clipboard functionality
- Direct send integration

**Usage**:
```tsx
<AIMessageGenerator
  recipientName="John Doe"
  recipientType="lead" // or "customer"
  context="Lead interested in Term Life Insurance"
  purpose="follow-up" // or "policy-info", "renewal", "claim", "general"
  policyType="Term Life"
  onSend={(channel, message) => {
    // Handle sending
  }}
/>
```

### 3. AI Insights (`AIInsights` Component)
**Location**: Lead details, Customer details

**Features**:
- Analyzes customer/lead data
- Provides key insights
- Recommends next best actions
- Priority assessment

**Usage**:
```tsx
<AIInsights
  customerData={{
    name: "John Doe",
    age: 35,
    policies: ["Term Life"],
    lastContact: new Date(),
    sentiment: 0.85,
    notes: "Interested in coverage"
  }}
/>
```

### 4. Smart Replies (API)
**Endpoint**: `/api/ai/smart-replies`

**Features**:
- Generates quick reply suggestions based on conversation
- Context-aware responses
- 3 suggested replies per request

**Usage**:
```typescript
const response = await fetch('/api/ai/smart-replies', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    conversationHistory: "Previous messages...",
    lastMessage: "Customer's last message"
  })
});

const { replies } = await response.json();
// replies: ["Reply 1", "Reply 2", "Reply 3"]
```

## API Endpoints

### 1. Generate Suggestions
```
POST /api/ai/suggestions
Body: {
  page: "home" | "leads" | "customers" | "chat",
  data?: any
}
Response: {
  success: true,
  suggestions: [
    {
      title: string,
      description: string,
      action: string,
      priority: "high" | "medium" | "low"
    }
  ]
}
```

### 2. Generate Personalized Message
```
POST /api/ai/generate-message
Body: {
  recipientName: string,
  recipientType: "lead" | "customer",
  context: string,
  purpose: "follow-up" | "policy-info" | "renewal" | "claim" | "general",
  policyType?: string,
  additionalInfo?: string
}
Response: {
  success: true,
  messages: {
    whatsapp: string,
    email: string,
    sms: string
  }
}
```

### 3. Analyze Customer
```
POST /api/ai/analyze-customer
Body: {
  name: string,
  age?: number,
  policies?: string[],
  lastContact?: Date,
  sentiment?: number,
  notes?: string
}
Response: {
  success: true,
  analysis: {
    insights: string[],
    recommendations: string[],
    nextBestAction: string,
    priority: "high" | "medium" | "low"
  }
}
```

### 4. Smart Replies
```
POST /api/ai/smart-replies
Body: {
  conversationHistory: string,
  lastMessage: string
}
Response: {
  success: true,
  replies: string[]
}
```

## Integration Points

### Home Page
- ✅ AI Suggestions for daily tasks
- ✅ Quick actions based on AI recommendations
- ✅ Context-aware chat responses

### Leads Page
- ✅ AI Suggestions for lead management
- ✅ AI Insights in lead details
- ✅ AI Message Generator for follow-ups
- ✅ Priority-based lead sorting

### Customers Page
- ✅ AI Suggestions for customer engagement
- ✅ AI Insights for customer analysis
- ✅ AI Message Generator for communications
- ✅ Cross-sell recommendations

### Chat Page
- ✅ AI-powered responses
- ✅ Smart reply suggestions
- ✅ Context-aware conversations
- ✅ Multi-channel message generation

## Customization

### Modify AI Prompts
Edit `src/lib/ai-suggestions.ts` to customize:
- Suggestion generation logic
- Message templates
- Analysis criteria
- Smart reply behavior

### Add New AI Features
1. Create new function in `src/lib/ai-suggestions.ts`
2. Create API endpoint in `src/app/api/ai/`
3. Create component in `src/components/ai/`
4. Integrate into pages

## Best Practices

1. **Always provide context**: More context = better AI responses
2. **Handle errors gracefully**: AI can fail, have fallbacks
3. **Show loading states**: AI takes time, keep users informed
4. **Allow user control**: Let users regenerate or edit AI content
5. **Respect rate limits**: Cache responses when possible

## Performance Tips

1. **Debounce AI calls**: Don't call on every keystroke
2. **Cache suggestions**: Refresh periodically, not constantly
3. **Lazy load components**: Load AI features when needed
4. **Use loading skeletons**: Better UX during AI processing

## Future Enhancements

- [ ] Voice input/output integration
- [ ] Multilingual support
- [ ] Sentiment analysis in real-time
- [ ] Predictive analytics dashboard
- [ ] Automated workflow triggers
- [ ] A/B testing for AI suggestions

## Troubleshooting

### AI not responding
- Check Gemini API key in `.env.local`
- Verify API quota/limits
- Check network connectivity

### Poor quality suggestions
- Provide more context in API calls
- Adjust prompts in `ai-suggestions.ts`
- Fine-tune temperature settings

### Slow responses
- Implement caching
- Use smaller models for simple tasks
- Optimize prompts for brevity

## Support

For issues or questions:
1. Check console for errors
2. Verify API keys are correct
3. Review API response format
4. Check Gemini API status
