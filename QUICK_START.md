# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Application
Navigate to `http://localhost:3000` in your browser

## Application Flow

### Login Flow
1. Start at `/login`
2. Enter credentials (any email/password for demo)
3. Click "Sign In"
4. Redirects to `/home` (Agentic Command Center)

### Main Navigation

#### 🏠 Home (`/home`)
**Agentic Command Center** - Your conversational workspace
- Type commands like:
  - "Show me today's top leads"
  - "Show upcoming renewals"
  - "Show my reminders"
  - "Draft a renewal reminder"
- AI responds with contextual information
- Quick action cards for common tasks

#### 📊 Dashboard (`/dashboard`)
- Overview statistics
- Recent activities
- Upcoming tasks
- Performance metrics

#### 💬 AI Chat (`/chat`)
- Real-time policy explanations
- Draft message generator
- Compliance checker
- Sentiment analysis
- Try asking:
  - "Explain term life insurance"
  - "Compare ULIP vs traditional endowment"
  - "Draft a policy renewal reminder"

#### 👥 Leads (`/leads`)
- AI-prioritized lead list
- Two views: List and Heatmap
- Each lead shows:
  - Conversion probability
  - Priority reasoning
  - Best contact time
  - Sentiment score
- Click "Follow Up" or "Draft Message"

#### 👤 Customers (`/customers`)
- Search by name, policy, phone, email
- Customer cards with renewal status
- Click "View Details" for:
  - Full policy portfolio
  - Communication history
  - AI recommendations
  - Scheduled follow-ups

#### ✅ Compliance (`/compliance`)
- Compliance statistics
- Recent checks with status
- Tone analysis charts
- Compliance alerts
- Flagged communications

#### 🔔 Notifications (`/notifications`)
- Categorized notifications
- Priority-based display
- Interactive timeline
- AI recommendations
- Snooze/reschedule options

#### ⚙️ Admin (`/admin`)
**Four tabs:**
1. **Communications**: View all agent-client messages
2. **Templates**: Manage pre-approved templates
3. **Audit Log**: Immutable action history
4. **Guardrails**: Prohibited terms management

## Key Features to Try

### 1. Lead Prioritization
1. Go to `/leads`
2. Toggle between "List View" and "Heatmap View"
3. Notice AI priority reasoning for each lead
4. Check conversion probability scores

### 2. Draft Message with Compliance Check
1. Go to `/chat`
2. In the right panel "Draft Message"
3. Type a message (try including "guaranteed returns")
4. Click "Analyze Draft"
5. See compliance issues flagged

### 3. Customer Detail View
1. Go to `/customers`
2. Click "View Details" on any customer
3. Explore:
   - Policy portfolio
   - Communication timeline
   - AI recommendations
   - Scheduled follow-ups

### 4. Admin Compliance Monitoring
1. Go to `/admin`
2. Click "Communications" tab
3. See flagged messages with issues
4. Click "Guardrails" tab
5. View prohibited terms and block counts

## Sample Commands for Home Screen

Try these in the Home (`/home`) chat interface:

```
Show me today's top leads
Show upcoming renewals
Show my reminders
Draft a WhatsApp for renewal
Show details for policy #LIC8921
What are my tasks for today?
```

## Understanding the UI

### Color Codes

**Lead Status:**
- 🔴 Red = Hot (high priority)
- 🟡 Yellow = Warm (medium priority)
- 🔵 Blue = Cold (low priority)

**Sentiment:**
- 🟢 Green = Positive (60%+)
- 🟡 Yellow = Neutral (30-60%)
- 🔴 Red = Negative (<30%)

**Renewal Urgency:**
- 🔴 Red = <15 days
- 🟡 Amber = 15-30 days
- 🟢 Green = >30 days

**Compliance:**
- ✅ Green = Passed
- ⚠️ Yellow = Warning
- ❌ Red = Failed

### Badges

- **Hot/Warm/Cold**: Lead temperature
- **Sentiment %**: Customer sentiment score
- **Conv. %**: Conversion probability
- **High Value**: Important customer tag
- **At Risk**: Needs attention

## Mock Data

All data is currently mocked for demonstration:

**Sample Leads:**
- Rajesh Kumar (Hot, 82% conversion)
- Priya Sharma (Warm, 58% conversion)
- Amit Patel (Warm, 52% conversion)
- Sunita Desai (Cold, 18% conversion)
- Vikram Singh (Hot, 88% conversion)

**Sample Customers:**
- Rajesh Kumar (Policy: LIC8921, Renewal in 5 days)
- Priya Sharma (2 policies, Renewal in 20 days)
- Sunita Desai (Policy: LIC6543, Renewal in 3 days - Urgent!)

## Compliance Testing

### Prohibited Terms (Will be flagged):
- "guaranteed returns"
- "risk-free"
- "no risk"
- "assured profit"
- "tax-free"
- "best investment"

### Test Compliance:
1. Go to `/chat`
2. In Draft Editor, type: "Our ULIP offers guaranteed returns of 12%"
3. Click "Analyze Draft"
4. See compliance issues flagged

## Mobile View

The app is fully responsive:
- Resize browser to mobile width
- Bottom navigation appears
- Touch-friendly buttons
- Optimized layouts

## Navigation Tips

### Keyboard Shortcuts (in chat):
- `Enter` = Send message
- `Shift + Enter` = New line

### Quick Navigation:
- Click logo to return to Home
- Use sidebar for main navigation
- Mobile: Use bottom nav bar

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Dependencies Issue
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run build
```

## Next Steps

1. **Explore all screens** to understand the full workflow
2. **Try different commands** in the Home screen
3. **Test compliance checking** with prohibited terms
4. **Review the code** to understand implementation
5. **Read IMPLEMENTATION_GUIDE.md** for integration details
6. **Check APPENDIX_POLICY_ATTRIBUTES.md** for data structures

## Production Deployment

For production deployment, see:
- `IMPLEMENTATION_GUIDE.md` - Integration details
- `.env.example` - Environment variables needed
- `README.md` - Full documentation

## Support

For questions or issues:
1. Check `IMPLEMENTATION_GUIDE.md`
2. Review `PROJECT_SUMMARY.md`
3. Examine code comments
4. Check TypeScript types in `src/types/index.ts`

---

**Happy Exploring! 🚀**

The application demonstrates a complete Insurance AI Copilot with all major features implemented and ready for AI/database integration.
