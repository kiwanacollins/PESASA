# PESASA Frontend

This is the frontend application for PESASA built with React, TypeScript, Vite, and Mantine UI.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will run on http://localhost:5173

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Features

- User authentication (login/register)
- Dashboard interface
- Industry selection
- Modern UI with Mantine components
- TypeScript support
- Form validation with Zod

## Tech Stack

- React 19 - UI library
- TypeScript - Type safety
- Vite - Build tool
- Mantine - UI components
- Zod - Schema validation
- ESLint - Code linting

## Project Structure

```
src/
├── components/           # React components
│   ├── AuthenticationForm.tsx
│   └── Dashboard.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom hooks
│   └── useAuth.ts
├── schemas/            # Zod schemas
│   └── authSchemas.ts
├── services/           # API services
│   └── authService.ts
├── assets/             # Static assets
├── App.tsx             # Main app component
├── AppMain.tsx         # App main layout
└── main.tsx           # Entry point
```
