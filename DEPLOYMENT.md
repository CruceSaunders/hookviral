# HookViral Deployment Guide
## Quick Setup for Cruce 🚀

### Prerequisites
- Node.js 18+
- npm
- Supabase account (free tier works)
- Vercel account (free tier works)
- OpenAI API key
- Stripe account (optional, for payments)

---

## Step 1: Supabase Setup (10 minutes)

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Name it "hookviral"
4. Choose a region close to you
5. Wait for project to initialize

### 1.2 Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/schema.sql`
3. Paste and run
4. This creates all tables, indexes, and security policies

### 1.3 Enable Google OAuth (Optional)
1. Go to Authentication → Providers
2. Enable Google
3. Add your Google OAuth credentials
4. Set redirect URL to your domain

### 1.4 Get Your Keys
From Supabase Settings → API:
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (keep secret!)

---

## Step 2: OpenAI Setup (2 minutes)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key
3. Copy as `OPENAI_API_KEY`

---

## Step 3: Local Development

```bash
# Clone the project
cd ~/clawd/projects/hookviral-app

# Install dependencies
npm install

# Create env file
cp .env.example .env.local

# Edit .env.local with your keys
nano .env.local
# Add:
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
# SUPABASE_SERVICE_ROLE_KEY=your-key
# OPENAI_API_KEY=your-key
# NEXT_PUBLIC_APP_URL=http://localhost:3000

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## Step 4: Deploy to Vercel (5 minutes)

### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Add environment variables when asked
```

### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import from Git or drag the folder
3. Add environment variables in Settings
4. Deploy

### Environment Variables for Vercel
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## Step 5: Custom Domain (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains → Add
3. Update DNS records as shown
4. SSL automatically configured

Suggested domains:
- hookviral.com
- hookviral.ai
- gethookviral.com

---

## Step 6: Stripe Setup (For Payments)

### 6.1 Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create account
3. Complete verification

### 6.2 Create Products
In Stripe Dashboard → Products:

**Product 1: Pro Monthly**
- Price: $12/month
- Recurring

**Product 2: Pro Yearly**
- Price: $99/year
- Recurring

**Product 3: Lifetime**
- Price: $79
- One-time

### 6.3 Get Keys
From Developers → API keys:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 6.4 Webhook Setup
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`
4. Get `STRIPE_WEBHOOK_SECRET`

---

## Post-Launch Checklist

- [ ] Domain configured
- [ ] SSL working (https)
- [ ] Auth working (signup/login)
- [ ] Hook generation working
- [ ] Database saving hooks
- [ ] Payments processing (if enabled)
- [ ] Analytics added (Plausible/PostHog)
- [ ] Error tracking (Sentry)

---

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## Troubleshooting

### "Invalid API key" error
- Check OPENAI_API_KEY is correct
- Ensure you have credits on OpenAI

### Auth not working
- Verify Supabase URL and keys
- Check redirect URLs in Supabase Auth settings

### Build fails
- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all env vars are set

---

## Need Help?

Check the files:
- `TECH_SPEC.md` - Full technical documentation
- `README.md` - Project overview
- `supabase/schema.sql` - Database schema

Or ask Beru! 🐜
