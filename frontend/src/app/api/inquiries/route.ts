import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message } = body
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would typically save to a database
    // For now, we'll just log the inquiry
    console.log('New inquiry received:', {
      ...body,
      timestamp: new Date().toISOString()
    })

    // In a real implementation, you might also:
    // - Save to database
    // - Send email notification
    // - Create a ticket in a CRM system

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: {
        id: Date.now().toString(),
        ...body,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error processing inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return mock inquiries for now
    const mockInquiries = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 98XXX XXXXX',
        subject: 'Legal consultation needed',
        message: 'I need help with a family law matter.',
        service: 'family-law',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ]

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