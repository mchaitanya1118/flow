# 🚀 Comprehensive Hostinger VPS Deployment Guide (EstateFlow Monorepo)

This step-by-step guide walks you through deploying the complete **EstateFlow Real Estate Platform** (`@estateflow/web` on port 3000 & `@estateflow/admin` on port 3001) along with the **PostgreSQL Database**, **Redis Cache**, and **Nginx Reverse Proxy** onto a **Hostinger VPS** running Ubuntu 22.04 LTS or 24.04 LTS.

---

## 📋 Table of Contents
1. [Initial VPS Provisioning & System Hardening](#1-initial-vps-provisioning--system-hardening)
2. [Database & Redis Infrastructure](#2-database--redis-infrastructure)
3. [Codebase Setup & Environment Variables](#3-codebase-setup--environment-variables)
4. [Method A: PM2 Bare-Metal Deployment (Recommended)](#4-method-a-pm2-bare-metal-deployment-recommended)
5. [Method B: 1-Click Docker Compose Deployment](#5-method-b-1-click-docker-compose-deployment)
6. [Nginx Reverse Proxy & Domain Routing](#6-nginx-reverse-proxy--domain-routing)
7. [SSL Certificate Setup (Let's Encrypt / Certbot)](#7-ssl-certificate-setup-lets-encrypt--certbot)
8. [Automated 1-Click Maintenance & Upgrades](#8-automated-1-click-maintenance--upgrades)
9. [Troubleshooting & Log Commands](#9-troubleshooting--log-commands)

---

## 1. Initial VPS Provisioning & System Hardening

Connect to your Hostinger VPS via SSH:
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### A. Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip htop ufw ca-certificates gnupg
```

### B. Add 2GB SWAP Space (Prevents Build Memory Exhaustion)
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### C. Configure UFW Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 2. Database & Redis Infrastructure

### A. Install PostgreSQL 16
```bash
sudo apt install -y postgresql postgresql-contrib redis-server
sudo systemctl enable postgresql redis-server
sudo systemctl start postgresql redis-server
```

### B. Create Database User & Database
```bash
sudo -u postgres psql -c "CREATE USER estateflow WITH PASSWORD 'estateflow_password';"
sudo -u postgres psql -c "CREATE DATABASE estateflow_db OWNER estateflow;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE estateflow_db TO estateflow;"
```

---

## 3. Codebase Setup & Environment Variables

### A. Clone Repository to `/var/www/property`
```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/YOUR_ORGANIZATION/property.git
cd property
```

### B. Configure `.env` File
Create your production `.env` file in `/var/www/property`:
```bash
cp .env.example .env
nano .env
```

Ensure the `.env` file has your production values:
```env
NODE_ENV=production
PORT=3000

# PostgreSQL Database Connection
DATABASE_URL="postgresql://estateflow:estateflow_password@localhost:5432/estateflow_db?schema=public"

# Redis Cache
REDIS_URL="redis://localhost:6379"

# Auth & Secrets
JWT_SECRET="YOUR_RANDOM_LONG_SECRET_KEY_HERE_2026"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_HERE_2026"
NEXTAUTH_URL="https://estateflow.io"

# Features & Support
NEXT_PUBLIC_MAP_PROVIDER="mapbox"
NEXT_PUBLIC_ENABLE_AI_SEARCH="true"
```

---

## 4. Method A: PM2 Bare-Metal Deployment (Recommended)

### A. Install Node.js 20, pnpm & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx

sudo corepack enable
sudo corepack prepare pnpm@10.33.0 --activate
sudo npm install -g pm2
```

### B. Install Dependencies & Deploy Database Schema
```bash
cd /var/www/property
pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### C. Build Next.js Web & Admin Apps
```bash
pnpm run build
```

### D. Start Apps with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Verify PM2 status:
```bash
pm2 status
```

---

## 5. Method B: 1-Click Docker Compose Deployment

If you prefer using Docker and Docker Compose on Hostinger VPS:

```bash
# 1. Install Docker & Docker Compose Plugin
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable docker --now

# 2. Build & Launch Containers
cd /var/www/property
docker compose up -d --build

# 3. Apply Database Migrations inside container
docker compose exec web pnpm db:push
docker compose exec web pnpm db:seed
```

---

## 6. Nginx Reverse Proxy & Domain Routing

Copy the provided Nginx configuration to `/etc/nginx/sites-available/estateflow.conf`:

```bash
sudo nano /etc/nginx/sites-available/estateflow.conf
```

Paste the following Nginx block (replace `estateflow.io` with your domain):

```nginx
# Web Application Marketplace
server {
    listen 80;
    listen [::]:80;
    server_name estateflow.io www.estateflow.io;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Admin Portal & CMS Suite
server {
    listen 80;
    listen [::]:80;
    server_name admin.estateflow.io;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/estateflow.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. SSL Certificate Setup (Let's Encrypt / Certbot)

Install Certbot and request free SSL certificates for your domains:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d estateflow.io -d www.estateflow.io -d admin.estateflow.io
```

Certbot will automatically modify your Nginx config to enforce HTTPS with auto-renewing Let's Encrypt SSL.

---

## 8. Automated 1-Click Maintenance & Upgrades

Whenever you push code updates to Git, execute the 1-click deployment script on your VPS:

```bash
cd /var/www/property
chmod +x deploy_vps.sh
./deploy_vps.sh
```

---

## 9. Troubleshooting & Log Commands

| Task | Command |
|---|---|
| Check PM2 Status | `pm2 status` |
| View Web App Logs | `pm2 logs estateflow-web` |
| View Admin App Logs | `pm2 logs estateflow-admin` |
| Check Nginx Logs | `sudo tail -f /var/log/nginx/error.log` |
| Check PostgreSQL Status | `sudo systemctl status postgresql` |
| Test Nginx Syntax | `sudo nginx -t` |
| Restart All Daemons | `pm2 restart all && sudo systemctl restart nginx` |
