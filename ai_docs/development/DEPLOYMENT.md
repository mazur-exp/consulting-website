# Deployment Guide — Delivery Booster

Complete guide for deploying the consulting website to production.

**Last Updated:** 2025-12-05
**Version:** 1.0

---

## Production Server Info

### Hosting
- **Provider:** Hetzner Cloud
- **Server IP:** 46.62.195.19
- **Server Location:** `/var/www/booster.delivery`
- **OS:** Ubuntu 24.04.3 LTS (ARM64)

### SSH Access
```bash
ssh -p 2222 root@46.62.195.19
# Port: 2222 (non-standard)
# User: root
# Auth: SSH key (id_ed25519)
```

### Server Setup
- **Multiple Projects:** Server hosts several projects (Ruby on Rails + Node.js)
- **Process Manager:** pm2 (for Node.js applications)
- **Web Server:** Likely nginx (reverse proxy)
- **Node.js Version:** Check with `node --version` on server

---

## Deployment Process

### Quick Deploy (Standard)

```bash
# 1. Connect to server
ssh -p 2222 root@46.62.195.19

# 2. Navigate to project
cd /var/www/booster.delivery

# 3. Pull latest changes
git pull origin main

# 4. Install dependencies (if package.json changed)
npm install

# 5. Build project
npm run build

# 6. Restart server
pm2 restart all
# or specifically:
# pm2 restart booster.delivery
```

### Full Deploy (With Checks)

```bash
# 1. Connect and navigate
ssh -p 2222 root@46.62.195.19
cd /var/www/booster.delivery

# 2. Check current status
git status
pm2 list

# 3. Pull changes
git pull origin main

# 4. Check if dependencies changed
git diff HEAD@{1} package.json package-lock.json

# 5. Install if needed
npm install

# 6. Build project
npm run build

# 7. Check pm2 process
pm2 list
pm2 logs booster.delivery --lines 50

# 8. Restart
pm2 restart booster.delivery

# 9. Verify deployment
curl -I https://booster.delivery/
pm2 logs booster.delivery --lines 20
```

---

## Build Process

### Local Build (for testing)
```bash
npm run build
```

**Output:**
- `dist/public/` - Client-side files (React + Vite)
- `dist/index.js` - Server bundle (Express)

### What Gets Built
1. **Client (Vite):**
   - Bundles React app
   - Minifies JavaScript/CSS
   - Optimizes images
   - Generates `dist/public/`

2. **Server (esbuild):**
   - Bundles Express server
   - Outputs `dist/index.js`
   - External packages (node_modules not bundled)

---

## Git Workflow

### Deployment Branch
- **Production Branch:** `main`
- **Development:** Local branches, then merge to `main`

### Standard Git Flow

```bash
# On local machine:
git add .
git commit -m "Description

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main

# On server:
ssh -p 2222 root@46.62.195.19
cd /var/www/booster.delivery
git pull origin main
npm run build
pm2 restart booster.delivery
```

---

## Process Management (pm2)

### Common pm2 Commands

```bash
# List all processes
pm2 list

# Restart specific app
pm2 restart booster.delivery

# Restart all
pm2 restart all

# View logs
pm2 logs booster.delivery

# View last 50 lines
pm2 logs booster.delivery --lines 50

# Monitor
pm2 monit

# Stop app
pm2 stop booster.delivery

# Delete from pm2
pm2 delete booster.delivery
```

### pm2 Configuration
Check if `ecosystem.config.js` exists:
```bash
cat /var/www/booster.delivery/ecosystem.config.js
```

If not, app likely started with:
```bash
pm2 start dist/index.js --name booster.delivery
pm2 save
```

---

## Troubleshooting

### Deployment Fails

**Problem:** `git pull` fails
```bash
# Solution: Reset local changes
git fetch origin
git reset --hard origin/main
```

**Problem:** Build fails
```bash
# Check Node.js version
node --version

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Problem:** Server won't restart
```bash
# Check pm2 status
pm2 list

# Force restart
pm2 restart booster.delivery --update-env

# Or stop and start
pm2 stop booster.delivery
pm2 start dist/index.js --name booster.delivery
```

### Application Errors

**Check logs:**
```bash
# pm2 logs
pm2 logs booster.delivery --lines 100

# Server logs (if using systemd/nginx)
tail -f /var/log/nginx/error.log
```

**Port issues:**
```bash
# Check what's running on port
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

---

## Environment Variables

### Check .env file
```bash
cat /var/www/booster.delivery/.env
```

### Required Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
```

**Note:** Never commit `.env` to git! Keep secrets on server only.

---

## Nginx Configuration

### Check nginx config
```bash
cat /etc/nginx/sites-available/booster.delivery
```

### Typical config:
```nginx
server {
    listen 80;
    server_name booster.delivery www.booster.delivery;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Reload nginx after changes
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Rollback Procedure

If deployment breaks production:

```bash
# 1. Check recent commits
git log --oneline -5

# 2. Rollback to previous commit
git reset --hard HEAD~1

# 3. Rebuild and restart
npm run build
pm2 restart booster.delivery

# 4. Verify
curl -I https://booster.delivery/
```

---

## Monitoring

### Health Checks
```bash
# Check if site is up
curl -I https://booster.delivery/

# Check server response time
time curl -I https://booster.delivery/

# Check pm2 status
pm2 list

# Check memory usage
free -h

# Check disk space
df -h
```

### Performance Monitoring
```bash
# pm2 monitoring
pm2 monit

# Server load
htop
```

---

## Recent Changes (Change Log)

### 2025-12-05: URL Language Parameter Support
**Commit:** `13c669a`
**Files Changed:** `client/src/hooks/useLanguage.tsx`

**What Changed:**
Added URL parameter support for language selection: `?lang=en` or `?lang=ru`

**Priority:**
1. URL parameter (`?lang=en`)
2. localStorage (user's saved choice)
3. Browser language (auto-detect)

**Usage:**
- Force English: `https://booster.delivery/?lang=en`
- Force Russian: `https://booster.delivery/?lang=ru`

**Deployment Steps:**
```bash
cd /var/www/booster.delivery
git pull origin main
npm run build
pm2 restart booster.delivery
```

**Testing:**
- Visit `https://booster.delivery/?lang=en` → Should show English
- Visit `https://booster.delivery/?lang=ru` → Should show Russian
- Language persists in localStorage after URL parameter is used

---

## CI/CD (Future)

Currently **manual deployment** via SSH.

**Potential Improvements:**
- GitHub Actions for auto-deploy on push to `main`
- Automated tests before deployment
- Slack/Telegram notifications on deploy
- Blue-green deployment for zero downtime

---

## Checklist Before Deploy

- [ ] Changes committed and pushed to GitHub
- [ ] Local build successful (`npm run build`)
- [ ] No TypeScript errors (`npm run check`)
- [ ] Tested locally (if possible)
- [ ] SSH access to server available
- [ ] Backup current version (if critical change)

---

## Emergency Contacts

**Server Provider:** Hetzner Cloud
**DNS Provider:** (Check domain registrar)
**Server Admin:** root@46.62.195.19:2222

---

**Created:** 2025-12-05
**Maintainer:** Development Team
