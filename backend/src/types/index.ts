export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags?: string;
  published: boolean;
  featured: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags?: string;
  published?: boolean;
  featured?: boolean;
  imageUrl?: string;
}

export interface UpdateBlogPost {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string;
  published?: boolean;
  featured?: boolean;
  imageUrl?: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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
  user: Omit<Admin, 'password'>;
  token: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
}