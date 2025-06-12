import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Common industries data
const INDUSTRIES = [
  { id: '1', name: 'Technology', description: 'Software, hardware, and tech services' },
  { id: '2', name: 'Healthcare', description: 'Medical services and pharmaceuticals' },
  { id: '3', name: 'Finance', description: 'Banking, insurance, and financial services' },
  { id: '4', name: 'Education', description: 'Academic institutions and training' },
  { id: '5', name: 'Manufacturing', description: 'Production and industrial services' },
  { id: '6', name: 'Retail', description: 'Consumer goods and services' },
  { id: '7', name: 'Consulting', description: 'Professional advisory services' },
  { id: '8', name: 'Marketing', description: 'Advertising and promotional services' },
  { id: '9', name: 'Real Estate', description: 'Property and construction services' },
  { id: '10', name: 'Transportation', description: 'Logistics and delivery services' },
  { id: '11', name: 'Entertainment', description: 'Media, gaming, and creative industries' },
  { id: '12', name: 'Agriculture', description: 'Farming and food production' },
  { id: '13', name: 'Energy', description: 'Oil, gas, and renewable energy' },
  { id: '14', name: 'Government', description: 'Public sector and administration' },
  { id: '15', name: 'Non-profit', description: 'Charitable and social organizations' },
];

// Get industries endpoint
app.get('/api/industries', (req, res) => {
  try {
    res.json(INDUSTRIES);
  } catch (error) {
    console.error('Industries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, username, password, name, gender, location, industry } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
      return res.status(400).json({ 
        error: 'Email, username, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: name || null,
        gender: gender || null,
        location: location || null,
        industry: industry || null,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        gender: true,
        location: true,
        industry: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile (protected route)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        gender: true,
        location: true,
        industry: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Health check endpoint for Docker
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'pesasa-backend'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
