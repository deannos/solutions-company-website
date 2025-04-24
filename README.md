| `npm run db:generate` | Generates migration files based on schema changes | `npm run db:generate` |
| `npm run db:migrate` | Applies pending migrations to the database | `npm run db:migrate` |
| `npm run db:reset` | Resets the database (drops all tables and recreates them) | `npm run db:reset` |

### Deployment Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm run start` | Starts the production server | `npm run start` |
| `npm run deploy` | Builds and deploys the application (requires additional configuration) | `npm run deploy` |
| `npm run deploy:prod` | Deploys to the production environment | `npm run deploy:prod` |
| `npm run preview` | Runs a local preview of the production build | `npm run preview` |

### Combined Script Examples

Run multiple scripts in sequence:

```bash
# Full validation, build, and test sequence
npm run validate && npm run build && npm run test

# Database reset and seeding
npm run db:reset && npm run db:push

# Complete CI pipeline simulation
npm run lint && npm run test && npm run build
```

### Environment-Specific Commands

```bash
# Run with specific environment variables
NODE_ENV=production npm run start

# Debug mode
DEBUG=app:* npm run dev:server

# Test with specific configuration
TEST_ENV=ci npm run test:integration
```

For more details about each script, refer to the package.json file.
