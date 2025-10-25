import { NextRequest, NextResponse } from 'next/server'

// Mock blog posts data
let mockBlogPosts = [
  {
    id: '1',
    title: 'Understanding Criminal Law Basics',
    slug: 'understanding-criminal-law-basics',
    excerpt: 'A comprehensive guide to criminal law fundamentals for citizens.',
    content: 'Criminal law is a complex field that governs actions deemed harmful to society...',
    category: 'criminal-law',
    tags: 'criminal law, legal basics, defense',
    published: true,
    featured: true,
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Family Law: Navigating Divorce Proceedings',
    slug: 'family-law-divorce-proceedings',
    excerpt: 'Essential information about divorce processes and family legal matters.',
    content: 'Divorce proceedings can be emotionally challenging and legally complex...',
    category: 'family-law',
    tags: 'family law, divorce, legal proceedings',
    published: true,
    featured: false,
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        posts: mockBlogPosts
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { title, content, slug } = body
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, slug' },
        { status: 400 }
      )
    }

    // Create new blog post
    const newPost = {
      id: Date.now().toString(),
      ...body,
      published: body.published || false,
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockBlogPosts.unshift(newPost)

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    })

  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}