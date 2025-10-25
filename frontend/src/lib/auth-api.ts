import api from '@/lib/api';

export interface Admin {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: Admin;
    token: string;
  };
}

export const authApi = {
  // Login admin
  login: async (credentials: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register admin
  register: async (userData: RegisterRequest) => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await api.get<{ success: boolean; data: Admin }>('/auth/verify');
    return response.data;
  },
};

// Store auth token
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};