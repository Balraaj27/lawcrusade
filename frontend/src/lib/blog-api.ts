import api from '@/lib/api';

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
  createdAt: string;
  updatedAt: string;
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

export interface BlogResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Public API calls
export const blogApi = {
  // Get all published blog posts
  getPosts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => {
    const response = await api.get<BlogResponse>('/blog', { params });
    return response.data;
  },

  // Get single blog post by slug
  getPost: async (slug: string) => {
    const response = await api.get<{ success: boolean; data: BlogPost }>(`/blog/${slug}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get<{ success: boolean; data: { category: string; count: number }[] }>('/blog/categories/list');
    return response.data;
  },

  // Admin API calls (require authentication)
  admin: {
    // Get all posts (including unpublished)
    getAllPosts: async (params?: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
    }) => {
      const response = await api.get<BlogResponse>('/blog/admin/all', { params });
      return response.data;
    },

    // Create new blog post
    createPost: async (postData: CreateBlogPost) => {
      const response = await api.post<{ success: boolean; data: BlogPost }>('/blog', postData);
      return response.data;
    },

    // Update blog post
    updatePost: async (id: string, postData: Partial<CreateBlogPost>) => {
      const response = await api.put<{ success: boolean; data: BlogPost }>(`/blog/${id}`, postData);
      return response.data;
    },

    // Delete blog post
    deletePost: async (id: string) => {
      const response = await api.delete<{ success: boolean }>(`/blog/${id}`);
      return response.data;
    },
  },
};