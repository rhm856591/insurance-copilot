# AI Database Integration ✅

## Overview

The Gemini AI agent now has **full access to your database** and can search for leads, customers, and provide real-time information.

## What Was Added

### 1. Database Search Functions (`src/lib/database-queries.ts`)

#### New Functions:

```typescript
// Search for a lead by name (fuzzy search)
searchLeadByName(name: string)

// Search for a customer by name (fuzzy search)
searchCustomerByName(name: string)

// Get all leads
getAllLeads()

// Get all customers
getAllCustomers()

// Search both leads and customers by name
searchPersonByName(name: string)
```

### 2. AI Agent Intelligence (`src/lib/ai-agent.ts`)

#### Enhanced Intent Detection:

The AI now detects when you're asking about a specific person:

**Patterns Recognized:**
- "Tell me about Meera Kapoor"
- "Show information for Rajesh Kumar"
- "Find Priya Sharma"
- "Search for Amit Patel"
- "Meera Kapoor" (direct name)
- Names in quotes: "Meera Kapoor"

#### New Intent Type: `person_search`

When the AI detects a person's name, it:
1. Searches the **leads** table
2. Searches the **customers** table
3. Returns all matching records with full details

## How It Works

### Example Query: "Tell me about Meera Kapoor"

**Step 1: Intent Analysis**
```typescript
{
  type: 'person_search',
  entities: { name: 'Meera Kapoor' }
}
```

**Step 2: Database Search**
```typescript
const results = await searchPersonByName('Meera Kapoor');
// Searches both leads and customers tables
```

**Step 3: Context Building**
```
Search Results for "Meera Kapoor":

LEADS (1 found):
- Meera Kapoor
  Status: hot
  Email: meera.kapoor@email.com
  Phone: +91 98765 43220
  Age: 34
  Policy Interest: Term Life Insurance
  Sentiment: 85%
  Conversion Probability: 88%
  Last Contact: [date]
  Notes: Interested in 1 Cr coverage...
  Location: Mumbai
  Source: Website
  Best Contact Time: 6:00 PM - 8:00 PM
```

**Step 4: AI Response**
Gemini uses this data to generate a helpful response with:
- Agent reply (detailed info)
- WhatsApp message
- Email template
- Voice text

## What Information Is Available

### For Leads:
- ✅ Name, email, phone, age
- ✅ Status (hot/warm/cold)
- ✅ Sentiment score
- ✅ Conversion probability
- ✅ Policy interest
- ✅ Last contact date
- ✅ Notes and priority reason
- ✅ Location and source
- ✅ Best contact time

### For Customers:
- ✅ Name, email, phone, age
- ✅ Current policies (array)
- ✅ Customer since date
- ✅ All policy details

## Example Queries That Now Work

### 1. Search for a Specific Person
```
"Tell me about Meera Kapoor"
"Find Rajesh Kumar"
"Show information for Priya Sharma"
"Meera Kapoor"
```

**AI Response:**
- Full lead/customer details from database
- Current status and sentiment
- Contact information
- Policy interests or holdings
- Recommended next actions

### 2. List All Leads
```
"Show me all leads"
"List current leads"
"What leads do we have?"
```

**AI Response:**
- Summary of all leads
- Top 3 leads by conversion probability
- Total count

### 3. List All Customers
```
"Show me all customers"
"List our customers"
"How many customers do we have?"
```

**AI Response:**
- Summary of all customers
- Total count
- Recent customers

### 4. Cross-Sell Report (Already Working)
```
"Generate cross-sell report"
"Show customers with single policies"
```

**AI Response:**
- Customers with one policy
- Recommended complementary policies
- Priority ranking

## Testing

### Test 1: Search for a Lead
**Query:** "Tell me about Meera Kapoor"

**Expected Response:**
```
Meera Kapoor is a hot lead with an 88% conversion probability!

Details:
- Status: Hot Lead 🔥
- Policy Interest: Term Life Insurance (1 Cr coverage)
- Contact: meera.kapoor@email.com, +91 98765 43220
- Location: Mumbai
- Source: Website
- Sentiment: Very Positive (85%)
- Last Contact: [date]
- Best Time to Contact: 6:00 PM - 8:00 PM

Notes: Interested in 1 Cr coverage, follow up on premium calculation. Ready to proceed.

Recommendation: This is a high-priority lead. Contact today during evening hours for best results.
```

### Test 2: Search for Non-Existent Person
**Query:** "Tell me about John Doe"

**Expected Response:**
```
I cannot find any information about 'John Doe' in my current records.

To help you, please provide more details like:
- Is this person a policyholder, potential customer, or beneficiary?
- Do you have a policy number, contact number, or application ID?
- What specific information are you looking for?

Alternatively, I can:
- Show you all current leads
- Show you all customers
- Search by phone number or email
```

### Test 3: Fuzzy Search
**Query:** "Find Meera" (partial name)

**Expected Response:**
- Returns all leads/customers with "Meera" in their name
- Shows full details for each match

## Database Tables Accessed

### 1. Leads Table
```sql
SELECT * FROM leads WHERE name ILIKE '%search_term%'
```

### 2. Customers Table
```sql
SELECT * FROM customers WHERE name ILIKE '%search_term%'
```

### 3. Policies Table
```sql
SELECT * FROM policies ORDER BY policy_name
```

## Benefits

✅ **Real-Time Data**: AI always has latest database information
✅ **Accurate Responses**: No hallucination - uses actual data
✅ **Fuzzy Search**: Finds partial name matches
✅ **Multi-Table Search**: Searches both leads and customers
✅ **Rich Context**: Provides all relevant details
✅ **Smart Recommendations**: AI suggests next actions based on data

## Future Enhancements

### 1. Search by Email/Phone
```typescript
searchPersonByEmail(email: string)
searchPersonByPhone(phone: string)
```

### 2. Search by Policy Type
```typescript
getLeadsByPolicyInterest(policyType: string)
getCustomersByPolicy(policyType: string)
```

### 3. Advanced Filters
```typescript
getLeadsByStatus(status: 'hot' | 'warm' | 'cold')
getLeadsByConversionProbability(minProbability: number)
getCustomersByPolicyCount(count: number)
```

### 4. Update Operations
```typescript
updateLeadStatus(leadId: string, status: string)
addLeadNote(leadId: string, note: string)
updateLastContact(leadId: string, date: Date)
```

## Summary

✅ **AI now has database access**
✅ **Can search for any lead or customer by name**
✅ **Returns complete, accurate information**
✅ **No more "I cannot find" errors for existing records**
✅ **Fuzzy search works for partial names**
✅ **Searches both leads and customers tables**

Try asking: **"Tell me about Meera Kapoor"** and see the magic! 🎯
