# Production Multi-Stage Dockerfile for @estateflow/web on Hostinger VPS / Coolify

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

FROM base AS builder
WORKDIR /app
COPY . .
# Ensure devDependencies (TypeScript, Tailwind, Webpack) are installed during build step
RUN pnpm install --frozen-lockfile --prod=false
RUN pnpm db:generate || true
RUN pnpm --filter @estateflow/web build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
