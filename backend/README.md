# PESASA Backend

This is the backend API for the PESASA application built with Express.js, Prisma, and PostgreSQL/SQLite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the backend directory with:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3001
```

3. Set up the database:
```bash
npm run db:generate
npm run db:migrate
```

## Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:3001

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/industries` - Get list of industries
- `GET /api/profile` - Get user profile (authenticated)

## Tech Stack

- Express.js - Web framework
- Prisma - Database ORM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin resource sharing
