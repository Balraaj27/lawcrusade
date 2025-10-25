'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  FileText, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Clock
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  published: boolean
  featured: boolean
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  service: string
  status: string // UI uses: 'pending' | 'in-progress' | 'resolved'
  createdAt: string
  updatedAt: string
}

const API = process.env.NEXT_PUBLIC_API_URL

// axios client
const api = axios.create({
  baseURL: API,
})

// ---- helpers (invisible to UI) ----
// blog: map snake_case rows -> camelCase expected by UI
function mapPost(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    category: row.category ?? 'criminal-law',
    // backend column is TEXT[]; UI expects comma string
    tags: Array.isArray(row.tags) ? row.tags.join(',') : (row.tags ?? ''),
    published: !!row.published,
    featured: !!row.featured,
    imageUrl: row.image_url ?? row.imageUrl ?? '',
    createdAt: row.created_at ?? row.createdAt ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? row.updatedAt ?? new Date().toISOString(),
  }
}

// convert UI post -> backend payload
function toPostPayload(p: any) {
  const tagsArr =
    typeof p.tags === 'string'
      ? p.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(p.tags)
      ? p.tags
      : []
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? '',
    content: p.content,
    category: p.category ?? 'criminal-law',
    tags: tagsArr, // backend expects TEXT[]
    published: !!p.published,
    featured: !!p.featured,
    imageUrl: p.imageUrl ?? '',
  }
}

// inquiry: map snake_case rows -> camelCase and normalize status name
function mapInquiry(row: any): Inquiry {
  const rawStatus: string = row.status
  // backend uses: 'pending' | 'in-progress' | 'completed'
  // UI shows:     'pending' | 'in-progress' | 'resolved'
  const uiStatus = rawStatus === 'completed' ? 'resolved' : rawStatus
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? '',
    phone: row.phone ?? '',
    subject: row.subject ?? '',
    message: row.message ?? '',
    service: row.service ?? '',
    status: uiStatus,
    createdAt: row.created_at ?? new Date().toISOString(),
    updatedAt: row.updated_at ?? new Date().toISOString(),
  }
}

// when sending status to backend, map UI 'resolved' -> 'completed'
function toApiStatus(uiStatus: string) {
  return uiStatus === 'resolved' ? 'completed' : uiStatus
}

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  // Data states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  // Form states
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'criminal-law',
    tags: '',
    published: false,
    featured: false,
    imageUrl: ''
  })

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    // No token logic as requested
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsRes, inquiriesRes] = await Promise.all([
        api.get('/api/blog'),
        // api.get('/api/inquiry'),
      ])

      if (postsRes.data?.success) {
        const mapped = (postsRes.data.data?.posts || []).map(mapPost)
        console.log(mapped,"mapped")
        setBlogPosts(mapped)
      }
      // if (inquiriesRes.data?.success) {
      //   const mapped = (inquiriesRes.data.data?.inquiries || []).map(mapInquiry)
      //   setInquiries(mapped)
      // }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to fetch data from server",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "Dashboard data has been updated.",
    })
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const form = new FormData()
      form.append('image', file)

      const res = await api.post('/api/upload/image', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data?.success) {
        const relativeUrl: string = res.data.data?.url // e.g. /uploads/filename.jpg
        // make it absolute to ensure image shows in admin
        const fullUrl = `${API}${relativeUrl}`
        return fullUrl
      }
      throw new Error(res.data?.message || 'Failed to upload image')
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('adminEmail')
    router.push('/admin/login')
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin portal.",
    })
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      })
      return
    }

    // Generate slug from title
    const slug = newPost.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const payload = toPostPayload({
      ...newPost,
      slug
    })

    try {
      const res = await api.post('/api/blog', payload)
      const data = res.data

      if (data.success) {
        const added = mapPost(data.data)
        setBlogPosts(prev => [added, ...prev])
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: 'criminal-law',
          tags: '',
          published: false,
          featured: false,
          imageUrl: ''
        })
        
        toast({
          title: "Post created successfully",
          description: `Your blog post "${added.title}" has been created.`,
        })
        setActiveTab('blog')
      } else {
        throw new Error(data.message || 'Failed to create post')
      }
    } catch (error: any) {
      console.error('Create post error:', error)
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePost = async () => {
    if (!editingPost || !editingPost.title || !editingPost.content) {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      })
      return
    }

    const payload = toPostPayload(editingPost)

    try {
      const res = await api.put(`/api/blog/${editingPost.id}`, payload)
      const data = res.data

      if (data.success) {
        const updated = mapPost(data.data)
        setBlogPosts(prev => prev.map(p => (p.id === updated.id ? updated : p)))
        setEditingPost(null)
        
        toast({
          title: "Post updated successfully",
          description: "Your blog post has been updated.",
        })
      } else {
        throw new Error(data.message || 'Failed to update post')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to update blog post",
        variant: "destructive",
      })
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await api.delete(`/api/blog/${id}`)
      const data = res.data

      if (data.success) {
        setBlogPosts(prev => prev.filter(post => post.id !== id))
        toast({
          title: "Post deleted",
          description: "The blog post has been deleted.",
        })
      } else {
        throw new Error(data.message || 'Failed to delete post')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to delete blog post",
        variant: "destructive",
      })
    }
  }

  const handleUpdateInquiryStatus = async (id: string, newStatusUI: string) => {
    try {
      const statusForApi = toApiStatus(newStatusUI)
      const res = await api.patch(`/api/inquiry/${id}/status`, { status: statusForApi })
      const data = res.data

      if (data.success) {
        setInquiries(prev => 
          prev.map(inq => 
            inq.id === id 
              ? { ...inq, status: newStatusUI, updatedAt: new Date().toISOString() }
              : inq
          )
        )
        toast({
          title: "Status updated",
          description: `Inquiry status changed to ${newStatusUI}.`,
        })
      } else {
        throw new Error(data.message || 'Failed to update status')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to update inquiry status",
        variant: "destructive",
      })
    }
  }

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inquiry => {
      const matchesSearch =
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [inquiries, searchTerm, statusFilter])

  const stats = {
    totalPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.published).length,
    totalInquiries: inquiries.length,
    pendingInquiries: inquiries.filter(i => i.status === 'pending').length
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                disabled={isRefreshing}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <span className="text-sm text-gray-600">
                {typeof window !== 'undefined' ? localStorage.getItem('adminEmail') : ''}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="create-post">Create Post</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.publishedPosts} published
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingInquiries} pending
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.publishedPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalPosts - stats.publishedPosts} drafts
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
                  <p className="text-xs text-muted-foreground">
                    Need attention
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map(post => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 3).map(inquiry => (
                      <div key={inquiry.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-gray-500">{inquiry.subject}</p>
                        </div>
                        <Badge variant={
                          inquiry.status === 'pending' ? 'destructive' : 
                          inquiry.status === 'resolved' ? 'default' : 'secondary'
                        }>
                          {inquiry.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Button onClick={() => setActiveTab('create-post')}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="grid gap-4">
              {blogPosts.map(post => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Category: {post.category}</span>
                          <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline">Featured</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Blog Post</DialogTitle>
                              <DialogDescription>
                                Make changes to your blog post here.
                              </DialogDescription>
                            </DialogHeader>
                            {editingPost && (
                              <div className="space-y-4">
                                <Input
                                  placeholder="Post title"
                                  value={editingPost.title}
                                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                                />
                                <Textarea
                                  placeholder="Post excerpt"
                                  value={editingPost.excerpt}
                                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                                />
                                
                                {/* Image Upload in Edit Dialog */}
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium">Featured Image</label>
                                  <div className="flex items-center space-x-4">
                                    {editingPost.imageUrl && (
                                      <div className="relative">
                                        <img 
                                          src={editingPost.imageUrl} 
                                          alt="Featured image" 
                                          className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="sm"
                                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                          onClick={() => setEditingPost({...editingPost, imageUrl: ''})}
                                        >
                                          ×
                                        </Button>
                                      </div>
                                    )}
                                    <div className="flex-1">
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0]
                                          if (file) {
                                            const imageUrl = await handleImageUpload(file)
                                            if (imageUrl) {
                                              setEditingPost({...editingPost, imageUrl})
                                            }
                                          }
                                        }}
                                        disabled={uploadingImage}
                                      />
                                      {uploadingImage && (
                                        <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <Textarea
                                  placeholder="Post content"
                                  value={editingPost.content}
                                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                                  rows={10}
                                />
                                <Select 
                                  value={editingPost.category} 
                                  onValueChange={(value) => setEditingPost({...editingPost, category: value})}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="criminal-law">Criminal Law</SelectItem>
                                    <SelectItem value="civil-law">Civil Law</SelectItem>
                                    <SelectItem value="family-law">Family Law</SelectItem>
                                    <SelectItem value="corporate-law">Corporate Law</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  placeholder="Tags (comma separated)"
                                  value={editingPost.tags}
                                  onChange={(e) => setEditingPost({...editingPost, tags: e.target.value})}
                                />
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={editingPost.published}
                                      onChange={(e) => setEditingPost({...editingPost, published: e.target.checked})}
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="font-medium">Published</span>
                                  </label>
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={editingPost.featured}
                                      onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="font-medium">Featured</span>
                                  </label>
                                  {editingPost.published ? (
                                    <Badge variant="default" className="bg-green-100 text-green-800">
                                      Published
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                      Draft
                                    </Badge>
                                  )}
                                </div>
                                <Button 
                                  onClick={handleUpdatePost} 
                                  className="w-full"
                                  variant={editingPost.published ? "default" : "secondary"}
                                >
                                  {editingPost.published ? "Update & Publish" : "Update Draft"}
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Post Tab */}
          <TabsContent value="create-post" className="space-y-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Post excerpt"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    />
                    
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Featured Image</label>
                      <div className="flex items-center space-x-4">
                        {newPost.imageUrl && (
                          <div className="relative">
                            <img 
                              src={newPost.imageUrl} 
                              alt="Featured image" 
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0"
                              onClick={() => setNewPost({...newPost, imageUrl: ''})}
                            >
                              ×
                            </Button>
                          </div>
                        )}
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const imageUrl = await handleImageUpload(file)
                                if (imageUrl) {
                                  setNewPost({...newPost, imageUrl})
                                }
                              }
                            }}
                            disabled={uploadingImage}
                          />
                          {uploadingImage && (
                            <p className="text-sm text-gray-500 mt-1">Uploading image...</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder="Post content"
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={10}
                    />
                    <Select 
                      value={newPost.category} 
                      onValueChange={(value) => setNewPost({...newPost, category: value})}
                      defaultValue="criminal-law"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="criminal-law">Criminal Law</SelectItem>
                        <SelectItem value="civil-law">Civil Law</SelectItem>
                        <SelectItem value="family-law">Family Law</SelectItem>
                        <SelectItem value="corporate-law">Corporate Law</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Tags (comma separated)"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    />
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPost.published}
                          onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="font-medium">Published</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newPost.featured}
                          onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="font-medium">Featured</span>
                      </label>
                      {newPost.published ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Will be published immediately
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Will be saved as draft
                        </Badge>
                      )}
                    </div>
                    <Button 
                      onClick={handleCreatePost} 
                      className="w-full"
                      variant={newPost.published ? "default" : "secondary"}
                    >
                      {newPost.published ? "Publish Post" : "Save as Draft"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Client Inquiries</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredInquiries.map(inquiry => (
                <Card key={inquiry.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                          <Badge variant={
                            inquiry.status === 'pending' ? 'destructive' : 
                            inquiry.status === 'resolved' ? 'default' : 'secondary'
                          }>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{inquiry.subject}</p>
                        <p className="text-gray-500 mb-4">{inquiry.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Email: {inquiry.email}</span>
                          {inquiry.phone && <span>Phone: {inquiry.phone}</span>}
                          {inquiry.service && <span>Service: {inquiry.service}</span>}
                          <span>Created: {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Select 
                          value={inquiry.status} 
                          onValueChange={(value) => handleUpdateInquiryStatus(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                  <CardDescription>
                    Manage your dashboard preferences and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Auto-refresh data</h3>
                        <p className="text-sm text-gray-500">Automatically refresh dashboard data every 5 minutes</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email notifications</h3>
                        <p className="text-sm text-gray-500">Receive email notifications for new inquiries</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Backup data</h3>
                        <p className="text-sm text-gray-500">Export all blog posts and inquiries</p>
                      </div>
                      <Button variant="outline">Export</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
