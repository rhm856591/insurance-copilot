# Database Setup Guide

This guide explains how to set up and populate the database with dynamic data.

## Prerequisites

- PostgreSQL database (Supabase is already configured)
- DATABASE_URL in `.env.local` file

## Database Schema

The application uses the following tables:

### 1. Policies
Stores insurance policy information:
- Policy name, type, description
- Benefits, premium range, coverage amount
- Term years, tax benefits, available riders

### 2. Customers
Stores existing customer information:
- Name, email, phone, age
- Array of policy names they own
- Created timestamp

### 3. Leads
Stores potential customer leads:
- Name, email, phone, age
- Status (hot/warm/cold), sentiment score
- Policy interest, notes, location, source
- Conversion probability, priority reason
- Best contact time, last contact date

### 4. Premium Tables
Stores premium calculation data:
- Policy type, age group
- Coverage amount, term years
- Monthly and annual premiums

### 5. Knowledge Base
Stores AI knowledge base with vector embeddings for RAG

## Setup Steps

### 1. Push Schema to Database

```bash
npm run db:push
```

This creates all tables in your PostgreSQL database based on the Prisma schema.

### 2. Seed the Database

```bash
npm run db:seed
```

This populates the database with:
- **5 insurance policies** (Term Life, ULIP, Child Plan, Health Shield, Pension Plan)
- **8 customers** with various policy combinations
- **8 leads** with different statuses and conversion probabilities
- **22 premium table entries** for different age groups and coverage amounts

### 3. Verify Data

You can verify the data using Prisma Studio:

```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can browse and edit your database.

## API Endpoints

The application now uses these dynamic API endpoints:

### GET /api/policies
Returns all insurance policies from the database.

### GET /api/customers
Returns all customers with their policy information.

### GET /api/leads
Returns all leads from the database.
- Sorted by conversion probability and last contact date
- Includes status, sentiment, and AI insights
- Each lead has priority reason and best contact time

### GET /api/reports/cross-sell
Generates a cross-sell opportunities report:
- Identifies customers with only one policy
- Recommends complementary policies
- Calculates potential additional premium

## Data Flow

1. **Seed Script** → Populates database with realistic data
2. **API Routes** → Fetch data from database
3. **Pages** → Display dynamic data from APIs

## Removing Dummy Data

All dummy/mock data has been removed from:
- ✅ Leads page - now uses `/api/leads`
- ✅ Customers page - now uses `/api/customers`
- ✅ Home page reports - now uses `/api/reports/cross-sell`
- ✅ Notifications page - uses dynamic customer data

## Adding More Data

To add more customers or policies, you can either:

1. **Use Prisma Studio** (recommended for manual additions)
   ```bash
   npm run db:studio
   ```

2. **Modify the seed script** (`scripts/seed.ts`) and re-run:
   ```bash
   npm run db:seed
   ```

3. **Use the Prisma Client** in your code:
   ```typescript
   import { PrismaClient } from '@prisma/client';
   const prisma = new PrismaClient();
   
   await prisma.customer.create({
     data: {
       name: 'New Customer',
       email: 'customer@example.com',
       phone: '+91 98765 43210',
       age: 30,
       policies: ['Term Life Pro'],
     },
   });
   ```

## Troubleshooting

### Error: Environment variable not found: DATABASE_URL

Make sure `.env.local` exists and contains:
```
DATABASE_URL=postgresql://postgres:password@host:5432/database
```

### Error: Table does not exist

Run the schema push command:
```bash
npm run db:push
```

### No data showing in the app

Run the seed script:
```bash
npm run db:seed
```

## Next Steps

- The database is now populated with realistic data
- All pages use dynamic data from the database
- You can add more customers/policies as needed
- The AI agent will use this real data for insights and recommendations
