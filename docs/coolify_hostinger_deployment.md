# ⚡ Coolify Hostinger VPS 1-Click Deployment Guide

Deploying **EstateFlow** on **Hostinger VPS** using **Coolify** provides a Vercel/Netlify-like self-hosted dashboard with automatic SSL (Let's Encrypt), containerized database persistence, zero-downtime deployments, and GitHub integration.

---

## 📋 Repository URL
```
https://github.com/mchaitanya1118/flow.git
```

---

## 🛠️ Step 1: Install Coolify on Hostinger VPS

1. Connect to your Hostinger VPS via SSH:
   ```bash
   ssh root@YOUR_HOSTINGER_VPS_IP
   ```

2. Run the official 1-line Coolify installation script:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

3. Once completed, open your browser and navigate to:
   ```
   http://YOUR_HOSTINGER_VPS_IP:8000
   ```
4. Register your admin user account on the Coolify onboarding page.

---

## 🚀 Step 2: Add Project in Coolify

1. Go to **Projects** → **+ Add Project** → **Default Environment**.
2. Click **+ Add New Resource** → Select **Public Repository** (or GitHub App if private).
3. Paste Repository URL:
   ```
   https://github.com/mchaitanya1118/flow.git
   ```
4. Select **Branch**: `master`
5. Select **Build Pack**: **Docker Compose**
6. Select **Docker Compose File**: `docker-compose.yml`

---

## 🌐 Step 3: Configure Domains & SSL (Automatic)

In the Coolify project settings, configure the domain routing for the services:

### A. Entry Marketplace Web App (`web`)
- **Service Name**: `web`
- **Domain (FQDN)**: `https://yourdomain.com,https://www.yourdomain.com`
- **Container Port**: `3000`

### B. Master Admin Portal (`admin`)
- **Service Name**: `admin`
- **Domain (FQDN)**: `https://admin.yourdomain.com`
- **Container Port**: `3001`

> 🔒 **Coolify Traefik Reverse Proxy** will automatically generate and renew free SSL certificates via Let's Encrypt for all configured domains!

---

## 🔑 Step 4: Environment Variables (Coolify Dashboard)

In Coolify's **Environment Variables** tab, paste the following key-value pairs:

```env
NODE_ENV=production
DATABASE_URL=postgresql://estateflow:estateflow_password@postgres:5432/estateflow_db?schema=public
REDIS_URL=redis://redis:6379
JWT_SECRET=your_secure_jwt_secret_key_2026
NEXTAUTH_SECRET=your_nextauth_secret_key_2026
NEXT_PUBLIC_ENABLE_AI_SEARCH=true
```

---

## 🗄️ Step 5: Deploy & Run Database Migrations

1. Click **Deploy** in the top right corner of the Coolify dashboard.
2. Coolify will build the Docker containers (`postgres`, `redis`, `web`, `admin`) and start the stack.
3. Once deployed, run initial Prisma schema push & database seeding:

Open terminal inside Coolify or SSH into your VPS:
```bash
docker exec -it estateflow-web pnpm db:push
docker exec -it estateflow-web pnpm db:seed
```

---

## 🔄 Automatic Continuous Deployment (CI/CD)

Whenever you push new code to `https://github.com/mchaitanya1118/flow.git` on branch `master`, Coolify will automatically rebuild and deploy the updated application with zero downtime!
