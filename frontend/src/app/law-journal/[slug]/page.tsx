'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/${slug}`)
    if (response.ok) {
      const data = await response.json()
      return data.success ? data.data : null
    }
    return null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getRelatedPosts(category: string, currentPostId: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/blog?category=${category}&limit=3`)
    if (response.ok) {
      const data = await response.json()
      return data.success ? data.data.posts.filter((post: BlogPost) => post.id !== currentPostId) : []
    }
    return []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

export default function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        const postData = await getBlogPost(slug)
        if (!postData) {
          notFound()
          return
        }
        
        setPost(postData)
        
        const related = await getRelatedPosts(postData.category, postData.id)
        setRelatedPosts(related)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const categories = [
    { value: 'criminal-law', label: 'Criminal Law' },
    { value: 'family-law', label: 'Family Law' },
    { value: 'civil-law', label: 'Civil Law' },
    { value: 'corporate-law', label: 'Corporate Law' },
    { value: 'consumer-protection', label: 'Consumer Protection' },
    { value: 'legal-news', label: 'Legal News' },
    { value: 'case-studies', label: 'Case Studies' }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col">
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link href="/law-journal">
              <Button variant="ghost" className="text-white hover:text-yellow-600 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Law Journal
              </Button>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {post.featured && (
                  <Badge className="bg-yellow-600 text-white">
                    Featured
                  </Badge>
                )}
                <Badge variant="outline" className="text-white border-white">
                  {categories.find(c => c.value === post.category)?.label}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-300">
                {post.excerpt}
              </p>
              
              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-blockquote:text-gray-600 prose-code:text-gray-900">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h3>,
                  p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>,
                  li: ({children}) => <li className="mb-2">{children}</li>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-yellow-600 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
                  code: ({inline, children}) => 
                    inline 
                      ? <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
                      : <code className="block bg-gray-100 p-4 rounded text-sm overflow-x-auto">{children}</code>,
                  strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  a: ({href, children}) => <a href={href} className="text-yellow-600 hover:text-yellow-700 underline">{children}</a>,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {post.tags && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300">
                    {relatedPost.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline">
                          {categories.find(c => c.value === relatedPost.category)?.label}
                        </Badge>
                        {relatedPost.featured && (
                          <Badge variant="secondary" className="bg-yellow-600 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedPost.excerpt || relatedPost.content.substring(0, 150) + (relatedPost.content.length > 150 ? '...' : '')}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(relatedPost.createdAt)}</span>
                        </div>
                        <Link href={`/law-journal/${relatedPost.slug}`}>
                          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 p-0">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-yellow-600">Need Legal Assistance?</h2>
            <p className="text-xl text-gray-300">
              Get expert legal advice from our experienced team. Schedule a consultation today.
            </p>
            <Link href="/contact">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}