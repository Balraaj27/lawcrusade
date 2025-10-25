import { NextRequest, NextResponse } from 'next/server'

// Mock blog posts data (same as in the main route)
const mockBlogPosts = [
  {
    id: '1',
    title: 'Understanding Criminal Law Basics',
    slug: 'understanding-criminal-law-basics',
    excerpt: 'A comprehensive guide to criminal law fundamentals for citizens.',
    content: `# Understanding Criminal Law Basics

Criminal law is a complex field that governs actions deemed harmful to society. It encompasses various types of offenses, from minor infractions to serious felonies. Understanding your rights and legal obligations is crucial when facing criminal charges.

## Types of Criminal Offenses

### 1. Cognizable Offenses
These are serious offenses where police can make arrests without warrants:
- Murder
- Rape
- Robbery
- Theft

### 2. Non-Cognizable Offenses
Less serious offenses where police need warrants for arrests:
- Simple assault
- Defamation
- Cheating

## Legal Procedures

### First Information Report (FIR)
An FIR is the first step in any criminal investigation. It's important to:
- File the FIR immediately after the incident
- Provide accurate and detailed information
- Keep a copy of the FIR for your records

### Investigation Process
The police investigation includes:
- Evidence collection
- Witness statements
- Forensic analysis
- Charge sheet filing

## Defense Strategies

### Common Defense Approaches
1. **Alibi Defense** - Proving you were elsewhere when the crime occurred
2. **Self-Defense** - Acting to protect yourself from harm
3. **Lack of Intent** - Proving there was no criminal intent
4. **Mistaken Identity** - Wrong identification by witnesses

## Your Rights

### Fundamental Rights
- Right to remain silent
- Right to legal counsel
- Right to bail (for bailable offenses)
- Right to a fair trial

### Important Legal Provisions
- Section 161 CrPC: Examination of witnesses
- Section 167 CrPC: Remand of accused
- Section 436 CrPC: Bail in bailable offenses

## When to Seek Legal Help

Contact a criminal lawyer immediately when:
- You're accused of a crime
- Police want to question you
- You receive a court summons
- Your property is attached

## Conclusion

Understanding criminal law basics is essential for protecting your rights. If you or someone you know faces criminal charges, seeking immediate legal assistance is crucial for building a strong defense strategy.`,
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
    content: `# Family Law: Navigating Divorce Proceedings

Divorce proceedings can be emotionally challenging and legally complex. Understanding the legal process, your rights, and obligations is essential for navigating this difficult time.

## Grounds for Divorce

### Mutual Consent
Both parties agree to the divorce:
- One-year separation period
- Mutual agreement on terms
- Faster process (6-18 months)

### Contested Divorce
One party files without consent:
- Adultery
- Cruelty
- Desertion
- Conversion
- Mental disorder
- Virulent disease

## Legal Process

### Step 1: Filing the Petition
- Draft divorce petition
- File in appropriate family court
- Serve notice to spouse

### Step 2: Response
Spouse has 30 days to respond:
- Accept or contest
- File written statement
- Counter-claims if any

### Step 3: Counseling
Court-mandated counseling:
- Attempt reconciliation
- Understand implications
- Child welfare focus

### Step 4: Trial
Evidence and arguments:
- Witness examination
- Document submission
- Legal arguments

## Key Issues

### Child Custody
Best interests of the child:
- Primary caregiver
- Financial stability
- Emotional environment
- Child's preference (if above 5 years)

### Alimony/Maintenance
Financial support considerations:
- Income of both parties
- Standard of living
- Duration of marriage
- Child's needs

### Property Division
Asset distribution:
- Marital property
- Individual assets
- Debts and liabilities
- Future financial security

## Documents Required

### Essential Papers
- Marriage certificate
- Birth certificates (children)
- Income proof
- Property documents
- Bank statements
- Photographs

### Supporting Evidence
- Communication records
- Witness statements
- Medical reports
- Financial records

## Timeline

### Average Duration
- Mutual consent: 6-18 months
- Contested divorce: 3-5 years
- Varies by case complexity

### Factors Affecting Timeline
- Court workload
- Cooperation level
- Evidence complexity
- Interim applications

## Legal Assistance

### Why You Need a Lawyer
- Legal expertise
- Documentation support
- Negotiation skills
- Court representation

### Choosing the Right Lawyer
- Experience in family law
- Success rate
- Communication skills
- Fee structure

## Emotional Support

### Coping Strategies
- Seek counseling
- Support groups
- Focus on children
- Self-care routine

### Children's Well-being
- Maintain routine
- Professional counseling
- Co-parenting communication
- Minimize conflict

## Conclusion

Divorce is a life-changing event that requires careful navigation. Understanding the legal process and having proper legal representation can help ensure a smoother transition and protect your rights and interests.`,
    category: 'family-law',
    tags: 'family law, divorce, legal proceedings, custody',
    published: true,
    featured: false,
    imageUrl: '',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // Find the blog post by slug
    const post = mockBlogPosts.find(post => post.slug === slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Only return published posts for public view
    if (!post.published) {
      return NextResponse.json(
        { error: 'Blog post not available' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        post
      }
    })

  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}