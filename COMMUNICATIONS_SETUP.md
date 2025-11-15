# Communications Integration Setup Guide

## Overview

The Insurance AI Copilot now supports direct message sending via:
- 📱 **WhatsApp Business API**
- 📧 **Email (Gmail/SendGrid)**
- 💬 **SMS (Twilio)**

Messages are AI-generated and compliance-checked before sending.

---

## Features

### ✨ AI-Powered Message Generation
- Generate professional messages using AI
- Context-aware content based on recipient and situation
- IRDAI compliance built-in
- Customizable before sending

### 📤 Direct Send Integration
- One-click send after generation
- Real-time delivery status
- Message tracking and audit trail
- Multi-channel support

### 🎯 Use Cases
1. **Policy Renewal Reminders** - Automated WhatsApp/Email/SMS
2. **Lead Follow-ups** - Personalized outreach
3. **Policy Information** - Quick responses to inquiries
4. **Compliance Notifications** - Important updates

---

## Setup Instructions

### 1. WhatsApp Business API Setup

#### Prerequisites:
- Meta Business Account
- WhatsApp Business Account
- Verified Business Phone Number

#### Steps:

1. **Create Meta Business Account**
   - Go to [business.facebook.com](https://business.facebook.com)
   - Create or select your business

2. **Set up WhatsApp Business API**
   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create an app → Select "Business" type
   - Add WhatsApp product

3. **Get Credentials**
   ```env
   WHATSAPP_API_URL=https://graph.facebook.com/v18.0
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
   ```

4. **Test Configuration**
   ```bash
   curl -X POST \
     "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages" \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "messaging_product": "whatsapp",
       "to": "919876543210",
       "type": "text",
       "text": { "body": "Test message" }
     }'
   ```

#### Message Templates:
WhatsApp requires pre-approved templates for initial messages:

1. Go to WhatsApp Manager
2. Create message templates
3. Submit for approval
4. Use template IDs in the app

---

### 2. Email Setup (SendGrid)

#### Prerequisites:
- SendGrid account
- Verified sender email

#### Steps:

1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up for free tier (100 emails/day)

2. **Create API Key**
   - Settings → API Keys
   - Create API Key with "Full Access"
   - Copy the key (shown only once)

3. **Verify Sender Email**
   - Settings → Sender Authentication
   - Verify your email address
   - Or set up domain authentication

4. **Configure Environment**
   ```env
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@yourcompany.com
   FROM_NAME=Insurance AI Copilot
   ```

5. **Test Configuration**
   ```bash
   curl -X POST \
     "https://api.sendgrid.com/v3/mail/send" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "personalizations": [{"to": [{"email": "test@example.com"}]}],
       "from": {"email": "noreply@yourcompany.com"},
       "subject": "Test Email",
       "content": [{"type": "text/plain", "value": "Test message"}]
     }'
   ```

---

### 3. Email Setup (Gmail API - Alternative)

#### Prerequisites:
- Google Cloud Project
- Gmail account

#### Steps:

1. **Create Google Cloud Project**
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project

2. **Enable Gmail API**
   - APIs & Services → Library
   - Search "Gmail API"
   - Enable it

3. **Create OAuth Credentials**
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web application
   - Add authorized redirect URIs

4. **Get Access Token**
   - Use OAuth 2.0 Playground or implement OAuth flow
   - Get refresh token for long-term access

5. **Configure Environment**
   ```env
   EMAIL_SERVICE=gmail
   GMAIL_ACCESS_TOKEN=ya29.xxxxxxxxxxxxx
   GMAIL_REFRESH_TOKEN=1//xxxxxxxxxxxxx
   GMAIL_CLIENT_ID=your_client_id
   GMAIL_CLIENT_SECRET=your_client_secret
   FROM_EMAIL=your@gmail.com
   ```

---

### 4. SMS Setup (Twilio)

#### Prerequisites:
- Twilio account
- Phone number

#### Steps:

1. **Create Twilio Account**
   - Go to [twilio.com](https://twilio.com)
   - Sign up for free trial ($15 credit)

2. **Get Phone Number**
   - Phone Numbers → Buy a Number
   - Select a number with SMS capability

3. **Get Credentials**
   - Dashboard → Account Info
   - Copy Account SID and Auth Token

4. **Configure Environment**
   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

5. **Test Configuration**
   ```bash
   curl -X POST \
     "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json" \
     --data-urlencode "To=+919876543210" \
     --data-urlencode "From=YOUR_TWILIO_NUMBER" \
     --data-urlencode "Body=Test message" \
     -u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
   ```

---

## Usage in Application

### From Leads Page:

1. Click "Send Message" on any lead card
2. Select channel (WhatsApp/Email/SMS)
3. Enter prompt: "Send a follow-up about ULIP inquiry"
4. Click "Generate Message with AI"
5. Review and edit the generated message
6. Click "Send Now"

### From Customers Page:

1. Click "Send Message" on any customer
2. Select channel
3. Enter prompt: "Send policy renewal reminder"
4. Generate and send

### Programmatic Usage:

```typescript
import { generateAndSend } from '@/lib/communications';

// Generate and send in one call
const result = await generateAndSend(
  'whatsapp',
  'Send a policy renewal reminder',
  {
    name: 'Rajesh Kumar',
    phone: '+919876543210',
    email: 'rajesh@example.com'
  }
);

if (result.success) {
  console.log('Message sent!', result.messageId);
}
```

---

## API Endpoints

### Generate Message
```
POST /api/communications/generate
Body: {
  prompt: string,
  recipient: { name, phone?, email? },
  channel: 'whatsapp' | 'email' | 'sms'
}
Response: {
  subject?: string,
  message: string,
  channel: string
}
```

### Send WhatsApp
```
POST /api/communications/whatsapp
Body: {
  to: string,
  body: string,
  templateId?: string,
  variables?: object
}
Response: {
  success: boolean,
  messageId: string
}
```

### Send Email
```
POST /api/communications/email
Body: {
  to: string,
  subject: string,
  body: string
}
Response: {
  success: boolean,
  messageId: string
}
```

### Send SMS
```
POST /api/communications/sms
Body: {
  to: string,
  body: string
}
Response: {
  success: boolean,
  messageId: string,
  status: string
}
```

---

## Compliance & Security

### Built-in Compliance:
- ✅ Prohibited terms detection
- ✅ IRDAI guideline enforcement
- ✅ Message audit trail
- ✅ Compliance checking before send

### Security Features:
- ✅ API keys stored in environment variables
- ✅ Secure HTTPS communication
- ✅ Rate limiting (implement in production)
- ✅ Message logging for audit

### Best Practices:
1. Never commit API keys to git
2. Use environment variables
3. Implement rate limiting
4. Log all communications
5. Get user consent before messaging
6. Follow TRAI/IRDAI guidelines

---

## Testing

### Mock Mode (No API Keys):
The application works in mock mode without API keys:
- Messages are logged to console
- Mock message IDs are generated
- No actual messages are sent

### Development Testing:
1. Use test phone numbers/emails
2. Check Twilio/SendGrid dashboards
3. Monitor WhatsApp Business Manager
4. Review application logs

### Production Checklist:
- [ ] All API keys configured
- [ ] Sender emails verified
- [ ] WhatsApp templates approved
- [ ] Rate limits configured
- [ ] Audit logging enabled
- [ ] Error handling tested
- [ ] Compliance rules active

---

## Troubleshooting

### WhatsApp Issues:

**Error: "Phone number not registered"**
- Solution: Recipient must have WhatsApp installed

**Error: "Template not found"**
- Solution: Create and approve templates in WhatsApp Manager

**Error: "Rate limit exceeded"**
- Solution: Implement rate limiting, upgrade tier

### Email Issues:

**Error: "Sender not verified"**
- Solution: Verify sender email in SendGrid/Gmail

**Error: "Daily limit exceeded"**
- Solution: Upgrade SendGrid plan or use Gmail API

**Error: "Invalid API key"**
- Solution: Regenerate API key, check environment variables

### SMS Issues:

**Error: "Unverified number"**
- Solution: Verify recipient number in Twilio (trial mode)

**Error: "Insufficient balance"**
- Solution: Add credits to Twilio account

**Error: "Invalid phone format"**
- Solution: Use E.164 format (+919876543210)

---

## Cost Estimates

### WhatsApp Business API:
- **Free Tier**: 1,000 conversations/month
- **Paid**: $0.005 - $0.09 per conversation (varies by country)

### SendGrid:
- **Free Tier**: 100 emails/day
- **Essentials**: $19.95/month (50,000 emails)
- **Pro**: $89.95/month (1.5M emails)

### Gmail API:
- **Free**: 1 billion quota units/day
- **Cost**: Free for most use cases

### Twilio SMS:
- **Trial**: $15 credit
- **India**: ₹0.35 per SMS
- **International**: Varies by country

---

## Support & Resources

### Documentation:
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [SendGrid API Docs](https://docs.sendgrid.com)
- [Gmail API Docs](https://developers.google.com/gmail/api)
- [Twilio SMS Docs](https://www.twilio.com/docs/sms)

### Support:
- WhatsApp: Meta Business Support
- SendGrid: support@sendgrid.com
- Gmail: Google Cloud Support
- Twilio: support.twilio.com

---

## Next Steps

1. **Set up API accounts** for your preferred services
2. **Configure environment variables** in `.env.local`
3. **Test in development** with test numbers/emails
4. **Deploy to production** with proper monitoring
5. **Monitor usage** and costs
6. **Implement rate limiting** for production
7. **Set up alerts** for failures

---

**Ready to send messages!** 🚀

The application now supports full communication integration with AI-powered message generation and direct sending capabilities.
