'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Calendar, Clock, Search, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'

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

export default function LawJournalPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'criminal-law', label: 'Criminal Law' },
    { value: 'family-law', label: 'Family Law' },
    { value: 'civil-law', label: 'Civil Law' },
    { value: 'corporate-law', label: 'Corporate Law' },
    { value: 'consumer-protection', label: 'Consumer Protection' },
    { value: 'legal-news', label: 'Legal News' },
    { value: 'case-studies', label: 'Case Studies' }
  ]

  useEffect(() => {
    // Fetch blog posts from external API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setPosts(data.data.posts)
            setFilteredPosts(data.data.posts)
          }
        } else {
          console.error('Failed to fetch blog posts')
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, posts])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="py-20">
          <div className="container">
            <div className="text-center space-y-4">
              <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
              <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <BookOpen className="h-12 w-12 text-yellow-600" />
              <h1 className="text-4xl md:text-5xl font-bold">Law Journal</h1>
            </div>
            <p className="text-xl text-gray-300">
              Stay informed with the latest legal insights, case studies, and news from our expert legal team
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.map(post => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {post.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-yellow-600 text-white">
                        Featured
                      </Badge>
                      <Badge variant="outline">
                        {categories.find(c => c.value === post.category)?.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-yellow-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {post.excerpt || post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>5 min read</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                        <Link href={`/law-journal/${post.slug}`} className="flex items-center">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12">
        <div className="container">
          {regularPosts.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map(post => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                    {post.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline">
                          {categories.find(c => c.value === post.category)?.label}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                        <Link href={`/law-journal/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      {post.tags && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {post.tags.split(',').map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-yellow-600">Stay Updated</h2>
            <p className="text-xl text-gray-300">
              Subscribe to our newsletter for the latest legal insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}