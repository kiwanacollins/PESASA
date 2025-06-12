import { z } from 'zod';

export const IndustrySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3),
  name: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  location: z.string().optional(),
  industry: z.string().optional(), // Will be industry ID
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type Industry = z.infer<typeof IndustrySchema>;
export type User = z.infer<typeof UserSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
