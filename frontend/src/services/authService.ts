import { 
  UserSchema, 
  RegisterSchema, 
  LoginSchema, 
  IndustrySchema,
  type User, 
  type RegisterData, 
  type LoginData, 
  type Industry 
} from '../schemas/authSchemas';

const API_BASE_URL = 'http://localhost:3001/api';

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

class AuthService {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getIndustries(): Promise<Industry[]> {
    const response = await fetch(`${API_BASE_URL}/industries`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch industries');
    }

    // Validate the response with Zod
    const industries = result.map((industry: unknown) => IndustrySchema.parse(industry));
    return industries;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Validate input data with Zod
    const validatedData = RegisterSchema.parse(data);
    
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    // Validate response user data
    const validatedUser = UserSchema.parse(result.user);

    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(validatedUser));

    return { ...result, user: validatedUser };
  }

  async login(data: LoginData): Promise<AuthResponse> {
    // Validate input data with Zod
    const validatedData = LoginSchema.parse(data);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    // Validate response user data
    const validatedUser = UserSchema.parse(result.user);

    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(validatedUser));

    return { ...result, user: validatedUser };
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to get profile');
    }

    // Validate response user data
    const validatedUser = UserSchema.parse(result.user);
    return { user: validatedUser };
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      const userData = JSON.parse(userStr);
      return UserSchema.parse(userData);
    } catch {
      // If validation fails, clear invalid data
      this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
export type { User, RegisterData, LoginData, Industry };
