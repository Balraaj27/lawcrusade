import { NextRequest, NextResponse } from 'next/server'

// Mock inquiries data
let mockInquiries = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98XXX XXXXX',
    subject: 'Legal consultation needed',
    message: 'I need help with a family law matter.',
    service: 'family-law',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 87XXX XXXXX',
    subject: 'Criminal defense inquiry',
    message: 'Need urgent legal assistance for a criminal case.',
    service: 'criminal-law',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        inquiries: mockInquiries
      }
    })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}