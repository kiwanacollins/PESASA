#!/bin/bash

echo "🐳 Building and starting PESASA application for production deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Production environment variables
JWT_SECRET=change-this-to-a-secure-random-string-in-production
NODE_ENV=production
DATABASE_URL=file:./dev.db
PORT=3001
EOF
    echo "⚠️  Please update the JWT_SECRET in .env with your production value!"
fi

# Build and start the application
echo "🏗️  Building Docker images..."
docker-compose build

echo "🚀 Starting the production application..."
docker-compose up -d

echo "✅ Production application is starting up!"
echo "📍 Frontend: http://localhost"
echo "📍 Backend API: http://localhost:3001"
echo "📍 To view logs: docker-compose logs -f"
echo "📍 To stop: docker-compose down"

# Setup database if needed
echo ""
echo "🔧 Setting up database..."
sleep 5
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npx prisma generate

# Wait a moment and check if containers are running
sleep 3
echo ""
echo "📊 Container status:"
docker-compose ps
