import { NextRequest, NextResponse } from 'next/server'

// Mock blog posts data (same as in the main route)
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Find the blog post
    const postIndex = mockBlogPosts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Update the blog post
    mockBlogPosts[postIndex] = {
      ...mockBlogPosts[postIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
      data: mockBlogPosts[postIndex]
    })

  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Find and delete the blog post
    const postIndex = mockBlogPosts.findIndex(post => post.id === id)
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    mockBlogPosts.splice(postIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}