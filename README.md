# PESASA

A full-stack web application with separate frontend and backend architecture.
i have seperated the frontend code into its folder and the backend logic in its folder for beetter maintainability and scalability.

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

## 🐳 Docker Setup (Production)

For production deployment using Docker, see our [Docker Guide](./DOCKER_README.md).

### Quick Production Deployment

```bash
# Production deployment
./docker-start.sh
```

Docker services will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3001

### Available Docker Commands

```bash
npm run docker:up          # Start production containers
npm run docker:down        # Stop containers
npm run docker:logs        # View logs
npm run docker:prod        # Start production containers (explicit)
npm run docker:clean       # Clean up containers and images
```

### Local Development (Recommended)

For local development, use the native setup without Docker:

```bash
npm run install:all        # Install all dependencies
npm run dev                # Start both frontend and backend
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
- [Docker Setup Guide](./DOCKER_README.md)
