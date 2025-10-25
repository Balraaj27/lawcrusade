import { NextRequest, NextResponse } from 'next/server'

// Mock inquiries data (same as in the main route)
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Find the inquiry
    const inquiryIndex = mockInquiries.findIndex(inquiry => inquiry.id === id)
    if (inquiryIndex === -1) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    // Update the inquiry status
    mockInquiries[inquiryIndex] = {
      ...mockInquiries[inquiryIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: mockInquiries[inquiryIndex]
    })

  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}