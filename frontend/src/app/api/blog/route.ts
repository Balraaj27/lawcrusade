import { NextRequest, NextResponse } from 'next/server'

// Mock blog posts data
let mockBlogPosts = [
  {
    id: '1',
    title: 'Understanding Criminal Law Basics',
    slug: 'understanding-criminal-law-basics',
    excerpt: 'A comprehensive guide to criminal law fundamentals for citizens.',
    content: 'Criminal law is a complex field that governs actions deemed harmful to society. It encompasses various types of offenses, from minor infractions to serious felonies. Understanding your rights and legal obligations is crucial when facing criminal charges. This guide covers the basics of criminal law, including types of crimes, legal procedures, and defense strategies that can help protect your rights.',
    category: 'criminal-law',
    tags: 'criminal law, legal basics, defense, rights',
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
    content: 'Divorce proceedings can be emotionally challenging and legally complex. Understanding the legal process, your rights, and obligations is essential for navigating this difficult time. This article covers key aspects of divorce law, including property division, child custody considerations, alimony, and the importance of legal representation to protect your interests throughout the process.',
    category: 'family-law',
    tags: 'family law, divorce, legal proceedings, custody',
    published: true,
    featured: false,
    imageUrl: '',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Civil Litigation: Understanding the Process',
    slug: 'civil-litigation-understanding-process',
    excerpt: 'A step-by-step guide to civil litigation procedures in India.',
    content: 'Civil litigation involves legal disputes between individuals or organizations where monetary damages or specific performance are sought. This comprehensive guide explains the entire civil litigation process, from filing a complaint to final judgment. Learn about the different stages, documentation requirements, and strategies for building a strong civil case.',
    category: 'civil-law',
    tags: 'civil litigation, legal process, court procedures',
    published: true,
    featured: false,
    imageUrl: '',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Consumer Rights and Protection Laws',
    slug: 'consumer-rights-protection-laws',
    excerpt: 'Know your rights as a consumer and how to protect them effectively.',
    content: 'Consumer protection laws are designed to safeguard consumers from unfair practices and ensure they receive value for their money. This article explores key consumer rights, the Consumer Protection Act, and steps you can take when faced with defective products or poor services. Understanding these rights empowers consumers to seek justice and hold businesses accountable.',
    category: 'consumer-protection',
    tags: 'consumer rights, protection laws, legal remedies',
    published: false,
    featured: false,
    imageUrl: '',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    // Return only published posts for public view
    const publishedPosts = mockBlogPosts.filter(post => post.published)
    
    return NextResponse.json({
      success: true,
      data: {
        posts: publishedPosts
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