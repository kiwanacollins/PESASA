# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create directory for database
RUN mkdir -p /app/prisma

# Expose port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
