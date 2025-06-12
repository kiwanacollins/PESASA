## Quick Deploy

```bash
./docker-start.sh              # Auto-creates .env if needed
```

**Endpoints:**
- Frontend: http://localhost
- Backend API: http://localhost:3001

## Scripts

```bash
./docker-start.sh              # Deploy with auto DB setup
npm run docker:up              # Start containers
npm run docker:down            # Stop containers
npm run docker:logs            # View logs
npm run docker:clean           # Cleanup
```

## Database

Auto-configured via deployment script. Manual operations:
```bash
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma studio
```


## Environment Variables

```bash
NODE_ENV=production
PORT=3001
JWT_SECRET=your-production-secret
DATABASE_URL=file:./dev.db
```