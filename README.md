# Rest-Express Based Website 

A modern web application built with Express.js for the backend and React for the frontend. This project uses TypeScript, Vite, and TailwindCSS for a streamlined development experience.

## Features

- **Backend**: Express.js with TypeScript for RESTful APIs.
- **Frontend**: React with Vite for fast builds and development.
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries.
- **Authentication**: Passport.js for user authentication.
- **Validation**: Zod for schema validation.
- **Styling**: TailwindCSS for utility-first CSS.
- **Radix UI**: Accessible and customizable UI components.
- **State Management**: React Query for server-state management.

## Project Structure

```
.
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main React component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend code
│   ├── auth.ts            # Authentication setup
│   ├── db.ts              # Database connection
│   ├── index.ts           # Main server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage logic
│   └── vite.ts            # Vite middleware for SSR
├── shared/                # Shared code between client and server
│   ├── schema.ts          # Zod schemas
│   └── types.ts           # Shared TypeScript types
├── attached_assets/       # Project assets
├── .replit                # Replit configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Project dependencies and scripts
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Installation

### Install dependencies:

```bash
npm install
```

### Configure the database:

1. Update the database connection settings in `server/db.ts`.
2. Make sure PostgreSQL is running on your system.

### Push database schema:

```bash
npm run db:push
```

## Development

Start the development server:

```bash
npm run dev
```

This will start:
- Backend: Runs on http://localhost:5000
- Frontend: Runs on http://localhost:5173

During development, any changes to the code will trigger automatic reloading.

## Build

To build the project for production:

```bash
npm run build
```

This creates optimized production bundles for both the client and server.

## Deployment

Run the production build:

```bash
npm run start
```

This will start the application in production mode, serving the optimized frontend assets.

## Detailed Local Development Setup

### Prerequisites

- **Node.js**: Version 16.x or higher (LTS recommended)
- **npm**: Version 8.x or higher
- **PostgreSQL**: Version 13.x or higher
- **Git**: Latest version recommended

### Environment Setup

1. Create a `.env` file in the project root with the following variables:

```
# Server configuration
PORT=5000
NODE_ENV=development

# Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret
```

2. Adjust the values according to your local environment.

### Database Setup

1. Create a new PostgreSQL database:

```bash
createdb database_name
```

2. Update the database connection settings in both:
   - `.env` file
   - `server/db.ts` file 

3. Initialize the database schema:

```bash
npm run db:push
```

### Common Local Development Issues

- **Database Connection Errors**: 
  - Ensure PostgreSQL service is running
  - Verify database credentials are correct
  - Check database name exists

- **Port Conflicts**: 
  - If port 5000 or 5173 is already in use, change the port in the configuration files

- **Node Version Issues**: 
  - Use nvm (Node Version Manager) to switch to the correct Node.js version

## Production Deployment

### Server Requirements

- **Operating System**: Ubuntu 20.04 LTS or higher (recommended)
- **CPU**: Minimum 2 cores
- **RAM**: Minimum 2GB
- **Storage**: Minimum 20GB SSD
- **Node.js**: Version 16.x or higher (LTS recommended)
- **PostgreSQL**: Version 13.x or higher
- **Nginx**: Latest stable version (for reverse proxy)

### Environment Configuration

1. Create a `.env.production` file with production-specific values:

```
# Server configuration
PORT=8080
NODE_ENV=production

# Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Authentication and security
JWT_SECRET=your_secure_production_jwt_secret
SESSION_SECRET=your_secure_production_session_secret
COOKIE_SECURE=true
```

2. Set up environment variables on your server.

### Database Migration and Backup

#### Database Migration

Push schema changes to the production database:

```bash
NODE_ENV=production npm run db:push
```

#### Database Backup

Set up automated daily backups:

```bash
# Example cron job (add to /etc/crontab)
0 2 * * * postgres pg_dump -U username database_name | gzip > /backups/db_backup_$(date +\%Y\%m\%d).sql.gz
```

### Deployment Strategies

#### Manual Deployment

1. Clone the repository on your server:
   ```bash
   git clone https://github.com/deannos/solutions-company-website.git
   cd solutions-company-website
   ```

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm run start
   ```

#### CI/CD Pipeline (GitHub Actions Example)

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/app
            git pull
            npm ci --production
            npm run build
            pm2 restart app
```

### Process Management

Use PM2 to manage your Node.js processes:

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "solutions-website" -- start

# Enable startup script
pm2 startup
pm2 save
```

### Security Best Practices

1. **Keep dependencies updated**:
   ```bash
   npm audit
   npm update
   ```

2. **Set up rate limiting**:
   - Add `express-rate-limit` to the server configuration

3. **Configure CORS properly**:
   - Restrict to specific domains in production

4. **Use secure HTTP headers**:
   - Add `helmet` package to Express configuration

5. **Implement input validation**:
   - Already using Zod for schema validation

### Performance Optimization

1. **Enable compression**:
   - Add `compression` middleware to Express

2. **Implement caching**:
   - Add cache headers for static assets
   - Consider Redis for API response caching

3. **Optimize frontend assets**:
   - Ensure code splitting is configured in Vite

### Monitoring and Logging

1. **Application Monitoring**:
   - Set up PM2 monitoring: `pm2 monitor`
   - Consider services like New Relic or Datadog

2. **Logging**:
   - Implement structured logging with Winston or Pino
   - Set up log rotation

3. **Error tracking**:
   - Integrate Sentry for error tracking

### SSL/HTTPS Setup

1. **Obtain SSL Certificate**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

2. **Nginx Configuration**:

   Create an Nginx config file at `/etc/nginx/sites-available/solutions-website`:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
       
       location / {
           proxy_pass http://localhost:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the config**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/solutions-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Environment Variables

The application uses the following environment variables:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Port the server will run on | `5000` | No |
| `NODE_ENV` | Environment (development/production) | `development` | No |
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `JWT_SECRET` | Secret for JWT token generation | - | Yes |
| `SESSION_SECRET` | Secret for session management | - | Yes |
| `COOKIE_SECURE` | Whether cookies require HTTPS | `false` | No |
| `COOKIE_MAX_AGE` | Max age for cookies in milliseconds | `86400000` (1 day) | No |
| `CORS_ORIGIN` | Allowed CORS origins | `*` | No |

## Troubleshooting Guide

### Common Issues and Solutions

#### Application Won't Start

1. **Error: EADDRINUSE**
   - Port is already in use
   - Solution: Change the port in `.env` or kill the process using the port

2. **Database Connection Issues**
   - Check database connection string
   - Verify PostgreSQL is running
   - Ensure database user has correct permissions

3. **Missing Dependencies**
   - Run `npm ci` to ensure all dependencies are installed correctly

#### Build Errors

1. **TypeScript Errors**
   - Run `npm run check` to identify and fix type issues
   - Fix any identified type errors in the codebase

2. **Vite Build Fails**
   - Check for syntax errors in React components
   - Verify all imported modules exist

#### Authentication Issues

1. **Login Not Working**
   - Verify JWT_SECRET is set
   - Check database for user records
   - Ensure passwords are correctly hashed

#### Performance Problems

1. **Slow API Responses**
   - Check database query performance
   - Implement caching for frequent queries
   - Add database indexes for common lookups

2. **Frontend Performance**
   - Analyze bundle size: `npm run build -- --analyze`
   - Optimize large dependencies
   - Implement code splitting for routes

### Debugging Tools

1. **Server-side debugging**
   ```bash
   NODE_ENV=development DEBUG=app:* npm run dev
   ```

2. **Database query debugging**
   ```bash
   # Add to .env
   DEBUG_SQL=true
   ```

3. **Client-side debugging**
   - Use React DevTools
   - Enable source maps in development

## Scripts

The project includes various npm scripts for development, testing, building, and deployment. Here's a comprehensive list grouped by purpose:

### Development Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run dev` | Starts both frontend and backend in development mode with hot-reloading | `npm run dev` |
| `npm run dev:client` | Starts only the frontend development server | `npm run dev:client` |
| `npm run dev:server` | Starts only the backend development server | `npm run dev:server` |
| `npm run watch` | Runs TypeScript in watch mode for automatic recompilation | `npm run watch` |

### Build Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run build` | Builds the entire application for production | `npm run build` |
| `npm run build:client` | Builds only the frontend for production | `npm run build:client` |
| `npm run build:server` | Builds only the backend for production | `npm run build:server` |
| `npm run clean` | Removes all build artifacts and caches | `npm run clean` |

### Testing Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run test` | Runs all tests | `npm run test` |
| `npm run test:unit` | Runs only unit tests | `npm run test:unit` |
| `npm run test:integration` | Runs only integration tests | `npm run test:integration` |
| `npm run test:e2e` | Runs end-to-end tests | `npm run test:e2e` |
| `npm run test:coverage` | Runs tests with coverage reporting | `npm run test:coverage` |
| `npm run test:watch` | Runs tests in watch mode | `npm run test:watch` |

### Code Quality Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run lint` | Runs ESLint to check code quality | `npm run lint` |
| `npm run lint:fix` | Fixes automatically fixable linting issues | `npm run lint:fix` |
| `npm run format` | Formats code using Prettier | `npm run format` |
| `npm run check` | Runs TypeScript type checking | `npm run check` |
| `npm run validate` | Runs linting, formatting, and type checking in sequence | `npm run validate` |

### Database Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run db:push` | Pushes schema changes to the database | `npm run db:push` |
| `npm run db:pull` | Pulls database schema into your codebase | `npm run db:pull` |
| `npm run db:generate` | Generates migration files based on schema changes | `npm run db:generate
