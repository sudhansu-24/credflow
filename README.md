# 💶Credflow

**Monetize your digital content with AI-powered creation and blockchain payments.**
<div align="center">
  
![Landing Page](public/screenshots/banner.png)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://credflow-self.vercel.app)
[![Demo Video](https://img.shields.io/badge/Watch%20Demo-Video-red?style=for-the-badge&logo=youtube)](https://youtu.be/)

</div>

Credflow is a comprehensive digital marketplace and cloud storage platform that enables creators to monetize their content through crypto micropayments (x402 protocol), powered by AI content generation and blockchain technology.

---

## 📋 Table of Contents

- [What is Credflow?](#what-is-credflow)
- [Screenshots](#-screenshots)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Guide](#-setup-guide)
- [Environment Variables](#-environment-variables)
- [Workflows & Flows](#-workflows--flows)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Cost Breakdown](#-cost-breakdown)

---

## What is Credflow?

Credflow solves a critical problem in the digital creator economy: **How do creators get paid fairly when AI systems use their work?**

The platform combines:
- **Cloud Storage** - Like Google Drive, but for monetization
- **AI Content Generation** - GPT-4 powered content creation
- **Blockchain Payments** - x402 protocol for instant micropayments
- **Marketplace** - Sell digital products with crypto
- **AI Agent Integration** - Other AI bots can discover and purchase your content

### The Problem It Solves

When ChatGPT generates content inspired by Miyazaki's art style, the legendary creator never sees a penny. Credflow ensures creators are properly compensated when:
- AI systems train on their content
- AI agents generate content inspired by their work
- Other users purchase their digital files

---

## 📸 Screenshots

### Homepage - Landing Experience

![Credflow Homepage](public/screenshots/Home.png)

The landing page introduces Credflow with a bold, modern design featuring the electric blue and black theme. Users can learn about the platform's features and get started with signup.

### Dashboard - Your Command Center

![Credflow Dashboard](public/screenshots/Dashboard.png)

The main dashboard provides a comprehensive overview of your files, storage, and activities. Navigate your file explorer, access AI features, and manage your content all from one central location.

### Affiliate System - Monetize Your Network

![Affiliate Management](public/screenshots/Affiliates.png)

Manage your affiliate programs with ease. Set commission rates, track referrals, and monitor earnings. The affiliate system enables you to grow your revenue through your network.

### Platform in Action

![Credflow Working](public/screenshots/Working.png)

See Credflow in action with real-time file management, AI-powered content generation, and seamless blockchain payments. The platform combines powerful features with an intuitive interface.

---

## ✨ Key Features

### 1. **Cloud File Storage** 📁
- Hierarchical folder structure (like a file explorer)
- Upload any file type (PDFs, images, documents, etc.)
- Client-direct uploads to Supabase Storage (fast & efficient)
- Automatic file organization
- Search and filter capabilities

### 2. **AI-Powered Content Generation** 🤖
- Generate articles, reports, and documents using GPT-4o-mini
- Semantic search across all your files (RAG - Retrieval Augmented Generation)
- AI processes your uploaded files to create searchable knowledge base
- Chat interface with AI assistant
- Content generation based on your existing files
- Automatic PDF generation with professional formatting

### 3. **Marketplace & Monetization** 💰
- Create listings for any digital product
- Set custom pricing in USDC (crypto currency)
- Automatic payment processing via x402 protocol
- Track sales and earnings
- Transaction history
- Purchase verification

### 4. **Shared Links** 🔗
- Create monetized or free share links
- Share files without marketplace listing
- Direct payment links
- Access control and permissions

### 5. **Affiliate System** 👥
- Enable affiliate programs for your products
- Unique referral codes
- Commission tracking
- Automatic payout distribution

### 6. **Auto Wallet Creation** 🔐
- Blockchain wallet created automatically on signup
- Powered by Coinbase CDP (Developer Platform)
- No crypto knowledge required
- Secure wallet management

### 7. **MCP (Model Context Protocol) Integration** 🌐
- AI agents can discover your content
- Autonomous purchasing via x402
- No human intervention needed
- Open protocol for AI interoperability

### 8. **Multiple Storage Options** ☁️
- **Supabase Storage** (Recommended - FREE, no card required!)
- **Cloudflare R2** (S3-compatible, free tier available)
- **AWS S3** (Backward compatibility)

---

## 🔄 How It Works

### For Creators:

1. **Sign Up** → Account created + blockchain wallet auto-generated
2. **Upload Files** → Files stored in Supabase/Cloudflare R2
3. **AI Processing** → Text files processed for semantic search
4. **Create Listings** → Set prices and sell on marketplace
5. **Generate Content** → Use AI to create new content from your files
6. **Share & Earn** → Share links or list on marketplace
7. **Get Paid** → Receive USDC payments instantly via x402

### For Buyers:

1. **Browse Marketplace** → Discover digital products
2. **Purchase** → Pay with USDC via x402 protocol
3. **Instant Access** → Download files immediately
4. **Transaction Record** → All purchases tracked

### For AI Agents:

1. **Discover** → Search marketplace via MCP protocol
2. **Evaluate** → AI determines if content is relevant
3. **Purchase** → Autonomous payment via x402
4. **Access** → Content available for AI processing

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling (Neo-Brutalism design)
- **NextAuth.js** - Authentication

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Session management

### Storage
- **Supabase Storage** - Primary storage (FREE tier, no card!)
- **Cloudflare R2** - Alternative S3-compatible storage
- **AWS S3** - Backward compatibility option

### AI & Machine Learning
- **OpenAI GPT-4o-mini** - Content generation
- **OpenAI Text Embeddings** - Semantic search (RAG)
- **Model Context Protocol (MCP)** - AI agent interoperability

### Blockchain & Payments
- **Coinbase CDP** - Wallet creation and management
- **x402 Protocol** - Micropayment standard
- **Ethers.js** - Ethereum interaction
- **USDC on Base Sepolia** - Testnet payments

### Development Tools
- **Winston** - Logging (planned)
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## 📁 Project Structure

```
credflow/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── ai/                   # AI endpoints (chat, generate, discover)
│   │   ├── affiliates/           # Affiliate management
│   │   ├── auth/                 # Authentication (NextAuth)
│   │   ├── items/                # File/folder operations
│   │   ├── listings/             # Marketplace listings
│   │   ├── shared-links/         # Shared link management
│   │   └── transactions/         # Payment tracking
│   │
│   ├── components/              # React Components
│   │   ├── AI/                   # AI chat, content preview
│   │   ├── Affiliates/           # Affiliate UI
│   │   ├── FileExplorer/         # File browser UI
│   │   ├── auth/                 # Login/signup forms
│   │   └── global/               # Navbar, footer, etc.
│   │
│   ├── lib/                      # Core Libraries
│   │   ├── ai/                   # AI services (OpenAI, embeddings)
│   │   ├── backend/              # Server utilities (auth config)
│   │   ├── frontend/             # Client utilities (explorer, marketplace)
│   │   ├── models.ts             # Mongoose models
│   │   ├── config.ts             # Environment config
│   │   ├── s3.ts                 # Unified storage service
│   │   └── supabase-storage.ts   # Supabase storage implementation
│   │
│   ├── models/                   # MongoDB Schemas
│   │   ├── User.ts              # User model
│   │   ├── Item.ts               # File/folder model
│   │   ├── Listing.ts           # Marketplace listing
│   │   ├── Transaction.ts        # Payment transaction
│   │   ├── SharedLink.ts         # Shared link model
│   │   ├── Affiliate.ts          # Affiliate program
│   │   └── AIChunk.ts            # AI embeddings/chunks
│   │
│   ├── dashboard/                # Dashboard page
│   ├── marketplace/              # Marketplace pages
│   ├── shared-links/             # Shared links page
│   ├── transactions/            # Transaction history
│   ├── auth/                      # Login/signup pages
│   └── page.tsx                   # Landing page
│
├── scripts/                      # Utility Scripts
│   └── verify-env.js            # Environment variable verification
│
├── mcp.mjs                       # MCP Server for AI agents
├── package.json                  # Dependencies
├── env.template                   # Environment variables template
└── README.md                     # This file
```

---

## 🚀 Setup Guide

### Prerequisites

- **Node.js 18.17.0+** - [Download](https://nodejs.org/)
- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (FREE tier)
- **Supabase Account** - [Sign up](https://supabase.com) (FREE, no card!)
- **Coinbase CDP Account** - [Portal](https://portal.cdp.coinbase.com/) (FREE for testnet)
- **OpenAI API Key** - [Get API Key](https://platform.openai.com/api-keys) (Paid, ~$2-5/month)

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd credflow

# Install dependencies
npm install
```

### Step 2: Set Up Services

#### MongoDB Setup

**Option A: Local MongoDB**
```bash
# Download and install MongoDB Community Edition
# https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (FREE tier)
4. Get connection string

#### Supabase Storage Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (FREE tier)
3. Go to **Storage** section
4. Create a bucket named `credflow-files`
5. Set bucket to **Public** (for public file access)
6. Go to **Settings** → **API** to get:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Important:** Enable Row-Level Security (RLS) policies for uploads:

```sql
-- Run this in Supabase SQL Editor
CREATE POLICY "Allow anonymous uploads" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'credflow-files');
```

#### Coinbase CDP Setup

1. Go to [Coinbase CDP Portal](https://portal.cdp.coinbase.com/)
2. Create account (FREE)
3. Create API keys:
   - `CDP_API_KEY_ID`
   - `CDP_API_KEY_SECRET`
   - `CDP_WALLET_SECRET` (for wallet operations)

#### OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account and add billing
3. Go to **API Keys** section
4. Create new API key
5. Add credits (minimum $5 recommended)

### Step 3: Configure Environment Variables

```bash
# Copy the template
cp env.template .env.local

# Edit .env.local with your values
```

Fill in all required variables (see [Environment Variables](#-environment-variables) section below).

### Step 4: Verify Setup

```bash
# Run verification script
node scripts/verify-env.js
```

This will check:
- ✅ All environment variables are set
- ✅ MongoDB connection
- ✅ Storage configuration (Supabase/R2/S3)
- ✅ Coinbase CDP credentials
- ✅ OpenAI API key

### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 6: Create Your First Account

1. Click **Sign Up** on the homepage
2. Enter your name, email, and password
3. A blockchain wallet will be automatically created
4. You'll be redirected to the dashboard

---

## 🔑 Environment Variables

### Required Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/credflow

# Authentication
NEXTAUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Supabase Storage (RECOMMENDED - FREE, no card!)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=credflow-files

# Coinbase CDP (Wallet & Payments)
CDP_API_KEY_ID=your-api-key-id
CDP_API_KEY_SECRET=your-api-key-secret
CDP_WALLET_SECRET=your-wallet-secret

# OpenAI (AI Features)
OPENAI_API_KEY=sk-your-api-key-here

# Application
NEXT_PUBLIC_HOST_NAME=http://localhost:3000
NODE_ENV=development
```

### Optional Variables (Alternative Storage)

```env
# Cloudflare R2 (Alternative to Supabase)
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_R2_BUCKET_NAME=credflow-storage
CLOUDFLARE_R2_REGION=auto
CLOUDFLARE_R2_PUBLIC_URL=

# AWS S3 (Backward compatibility)
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET_NAME=credflow-bucket
```

### Generating NEXTAUTH_SECRET

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use online generator
# https://generate-secret.vercel.app/32
```

---

## 🔄 Workflows & Flows

### User Registration Flow

```
1. User fills signup form (name, email, password)
   ↓
2. NextAuth receives registration request
   ↓
3. System checks if email exists
   ↓
4. Coinbase CDP creates blockchain wallet
   ↓
5. User record created in MongoDB
   ↓
6. Root folder created for user
   ↓
7. User logged in automatically
   ↓
8. Redirect to dashboard
```

### File Upload Flow

```
1. User selects file in File Explorer
   ↓
2. Frontend uploads directly to Supabase Storage (client-direct)
   ↓
3. Supabase returns public URL
   ↓
4. Frontend sends URL + metadata to backend API
   ↓
5. Backend creates Item record in MongoDB
   ↓
6. If file is text/PDF/DOCX:
   - Queue for AI processing
   - Extract text content
   - Generate embeddings
   - Store in AIChunk collection
   ↓
7. File appears in user's drive
```

### AI Content Generation Flow

```
1. User opens AI chat interface
   ↓
2. User asks question or requests content
   ↓
3. AI searches user's processed files (semantic search)
   ↓
4. AI finds relevant context from user's files
   ↓
5. AI generates content using:
   - User's prompt
   - Context from files
   - GPT-4o-mini model
   ↓
6. Content preview shown to user
   ↓
7. User confirms generation
   ↓
8. PDF generated from content
   ↓
9. PDF uploaded to Supabase Storage
   ↓
10. Item record created in MongoDB
    ↓
11. File appears in "AI Generated" folder
```

### Marketplace Purchase Flow

```
1. Buyer browses marketplace
   ↓
2. Buyer clicks on listing
   ↓
3. Buyer clicks "Purchase"
   ↓
4. Frontend initiates x402 payment
   ↓
5. Coinbase CDP processes payment
   ↓
6. Transaction recorded in MongoDB
   ↓
7. Buyer receives access to file
   ↓
8. Seller receives USDC payment
   ↓
9. If affiliate code used:
   - Commission calculated
   - Commission recorded
   - Affiliate credited
```

### Shared Link Flow

```
1. User selects file
   ↓
2. User clicks "Create Shared Link"
   ↓
3. User sets price (or free)
   ↓
4. Unique link generated
   ↓
5. Link stored in MongoDB
   ↓
6. User shares link
   ↓
7. Visitor clicks link
   ↓
8. If monetized:
   - Visitor pays via x402
   - Transaction recorded
   ↓
9. Visitor gets access to file
```

### AI Agent Discovery Flow (MCP)

```
1. AI agent queries MCP server
   ↓
2. MCP server searches marketplace listings
   ↓
3. Semantic search finds relevant content
   ↓
4. AI agent evaluates content
   ↓
5. AI agent decides to purchase
   ↓
6. Payment processed via x402
   ↓
7. AI agent receives content
   ↓
8. Creator earns payment
```

---

## 📖 Usage Guide

### For Creators

#### Uploading Files

1. Go to **Dashboard**
2. Click **File Explorer**
3. Navigate to desired folder (or stay in root)
4. Click **Upload** button
5. Select file(s)
6. File uploads automatically

#### Creating Marketplace Listings

1. Select a file in File Explorer
2. Click **Create Listing**
3. Fill in:
   - Title
   - Description
   - Price (in USDC)
   - Tags (optional)
4. Click **Create Listing**
5. File appears on marketplace

#### Generating AI Content

1. Click **AI Assistant** (floating bot or sidebar)
2. Type your request (e.g., "Write an article about AI")
3. AI searches your files for context
4. Preview generated content
5. Click **Generate** to save as PDF
6. Content appears in "AI Generated" folder

#### Setting Up Affiliate Programs

1. Select a listing or shared link
2. Click **Enable Affiliates**
3. Set commission percentage
4. Get unique affiliate code
5. Share code with affiliates

### For Buyers

#### Purchasing from Marketplace

1. Go to **Marketplace**
2. Browse or search listings
3. Click on a listing
4. Click **Purchase**
5. Confirm payment (x402)
6. Access file immediately

#### Using Shared Links

1. Click shared link
2. If monetized, pay via x402
3. Access file after payment

### For Affiliates

1. Get affiliate code from creator
2. Share link with affiliate code
3. When someone purchases:
   - Creator gets sale price
   - You get commission
   - Track earnings in dashboard

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel Dashboard
   - Project → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Production Checklist:**
   - [ ] Switch to production MongoDB cluster
   - [ ] Use mainnet for payments (not testnet)
   - [ ] Set up custom domain for Supabase/R2 bucket
   - [ ] Enable CORS for storage bucket
   - [ ] Set OpenAI usage limits
   - [ ] Rotate all API keys
   - [ ] Update `NEXTAUTH_URL` to production URL
   - [ ] Update `NEXT_PUBLIC_HOST_NAME` to production URL

### Other Deployment Options

- **Netlify** - Similar to Vercel
- **Railway** - Full-stack hosting
- **DigitalOcean** - VPS deployment
- **AWS** - EC2 or Lambda

---

## 🔧 Troubleshooting

### Common Issues

#### "No storage provider configured"
- **Solution:** Set up Supabase Storage (recommended) or Cloudflare R2
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

#### "MongoDB connection failed"
- **Solution:** Check `MONGODB_URI` is correct
- Ensure MongoDB is running (local) or cluster is active (Atlas)
- Check firewall/network settings

#### "Wallet creation failed"
- **Solution:** Verify Coinbase CDP credentials
- Check `CDP_API_KEY_ID`, `CDP_API_KEY_SECRET`, `CDP_WALLET_SECRET`
- Ensure you're using testnet credentials (for development)

#### "OpenAI API error"
- **Solution:** Check `OPENAI_API_KEY` is valid
- Ensure you have credits in your OpenAI account
- Check API usage limits

#### "File upload stuck"
- **Solution:** Check Supabase bucket permissions
- Verify RLS policies are set correctly
- Check browser console for errors

#### "AI processing not working"
- **Solution:** Check OpenAI API key
- Verify file is supported format (PDF, DOCX, TXT)
- Check MongoDB connection

### Debug Mode

Enable verbose logging by setting:
```env
NODE_ENV=development
```

Check server logs in terminal for detailed error messages.

---

## 💰 Cost Breakdown

### Free Tier Services

| Service | Free Tier | Notes |
|---------|-----------|-------|
| **Supabase Storage** | 1GB storage | No credit card required! |
| **MongoDB Atlas** | 512MB database | Free forever |
| **Coinbase CDP** | Testnet free | Mainnet requires funding |
| **Vercel** | 100GB bandwidth | Free for hobby projects |

### Paid Services

| Service | Cost | Notes |
|---------|------|-------|
| **OpenAI API** | ~$2-5/month | Pay per use, very affordable |
| **Supabase Pro** | $25/month | Only if you exceed 1GB |
| **Coinbase CDP Mainnet** | Gas fees only | Minimal (~$0.01-0.10 per transaction) |

### Total Development Cost

**~$2-5/month** (just OpenAI API for development)

### Production Cost Estimate

**~$25-50/month** (with Supabase Pro + OpenAI usage)

---

## 🎯 Project Goals

### Phase 1: Foundations ✅ (Completed)
- [x] File storage and organization
- [x] User authentication
- [x] Wallet creation
- [x] Marketplace UI
- [x] x402 payment integration

### Phase 2: Core Infrastructure (In Progress)
- [ ] MCP server deployment
- [ ] Public AI API access
- [ ] Auto-responder agents
- [ ] Scalable infrastructure

### Phase 3: Network Expansion (Planned)
- [ ] Resale and royalties
- [ ] Collections with dynamic pricing
- [ ] Curator leaderboards

### Phase 4: Agent-Powered (Future)
- [ ] Open MCP-wide search API
- [ ] Autonomous curator bots
- [ ] Training-as-a-Service

### Phase 5: Protocol Era (Future)
- [ ] Credflow SDK
- [ ] Multi-drive agent ecosystem
- [ ] Enterprise expansion

---

## 🤝 Contributing

This is a private project. For issues, questions, or contributions, please contact the maintainer.

---

## 📄 License

Private License - All Rights Reserved

---

## 🆘 Support

- **Documentation:** This README
- **Issues:** Check troubleshooting section
- **Environment Verification:** Run `node scripts/verify-env.js`

---

## 🙏 Acknowledgments

- **Coinbase CDP** - Wallet infrastructure
- **OpenAI** - AI content generation
- **Supabase** - Free storage solution
- **x402 Protocol** - Micropayment standard
- **MCP** - AI agent interoperability

---

**Built with ❤️ for creators who deserve fair compensation in the AI age.**
