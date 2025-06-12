# PESASA

A full-stack web application with separate frontend and backend architecture.

## Project Structure

```
PESASA/
├── frontend/           # React frontend application
├── backend/            # Express.js backend API
├── package.json        # Root package.json for managing both apps
└── README.md          # This is a documentation file
```

## Quick Start

1. Install all dependencies:
```bash
npm run install:all
```

2. Start both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001
- Frontend application on http://localhost:5173

## Individual Commands

### Frontend only:
```bash
npm run frontend:dev    # Start frontend dev server
npm run frontend:build  # Build frontend for production
npm run frontend:preview # Preview frontend production build
```

### Backend only:
```bash
npm run backend:dev     # Start backend dev server
npm run backend:start   # Start backend production server
```

## Setup Instructions

### First Time Setup

1. Clone the repository
2. Run `npm run install:all` to install all dependencies
3. Set up the backend environment (see backend/README.md)
4. Set up the database (see backend/README.md)
5. Start development with `npm run dev`

### Environment Variables

Create a `.env` file in the `backend/` directory with:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3001
```

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Mantine UI components
- Zod for validation

### Backend
- Express.js with TypeScript support
- Prisma ORM
- JWT authentication
- bcryptjs for password hashing

## Development

The application uses concurrently to run both frontend and backend simultaneously during development. The frontend is configured to proxy API requests to the backend running on port 3001.

For detailed information about each part of the application, see:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
