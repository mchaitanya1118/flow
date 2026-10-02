# EstateFlow Platform Architecture & Technical Reference

## Overview

EstateFlow is designed as a multi-sided real estate marketplace platform powered by a high-performance pnpm monorepo.

### Monorepo Structure

```
property/
├── apps/
│   ├── web/            # Public Marketplace Portal & User/Agent/Developer Dashboards (Next.js 14+)
│   └── admin/          # Moderation Queue, Operations & System Control Panel (Next.js 14+)
├── packages/
│   ├── database/       # Prisma ORM Schema, PostgreSQL Client & Seed Scripts
│   ├── ui/             # EstateFlow Design System (50+ accessible Tailwind/React components)
│   ├── validation/     # Zod API & Payload Schemas
│   ├── auth/           # RBAC Authorization & JWT Session Handlers
│   ├── search/         # OpenSearch Indexing Adapter & Natural Language Parser
│   └── types/          # Shared TypeScript Domain Types
├── tests/              # Vitest Unit & Integration Test Suites
├── infrastructure/     # Terraform & Docker Deployment Configs
├── docker-compose.yml  # Local Environment (PostgreSQL, Redis, OpenSearch)
└── README.md           # Setup & Quickstart Guide
```

---

## Technical Stack

1. **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion.
2. **Backend Services**: Next.js API Routes / Modular Server Architecture.
3. **Database**: PostgreSQL 16 + Prisma ORM.
4. **Search Engine**: OpenSearch (Fulltext, Faceted, Geospatial Map Indexing).
5. **Caching & Queue**: Redis + BullMQ.
6. **Payments**: Razorpay Gateway (Signature verification + Webhooks).
7. **Storage & CDN**: AWS S3 + CloudFront.
8. **Testing**: Vitest + React Testing Library.
