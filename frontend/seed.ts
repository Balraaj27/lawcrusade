import { db } from './src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await db.admin.upsert({
    where: { email: 'admin@lawcrusade.com' },
    update: {},
    create: {
      email: 'admin@lawcrusade.com',
      password: hashedPassword,
      name: 'Admin User'
    }
  })
  console.log('Created admin user:', admin.email)

  // Create sample blog posts
  const posts = [
    {
      title: 'Understanding Cyber Crime Laws in India: A Comprehensive Guide',
      slug: 'understanding-cyber-crime-laws-india',
      excerpt: 'Explore the evolving landscape of cyber crime legislation in India and understand your digital rights and protections.',
      content: `# Understanding Cyber Crime Laws in India

Cyber crime has become one of the most significant challenges in the digital age. With the increasing reliance on technology and the internet, the need for robust cyber crime legislation has never been more critical.

## The Information Technology Act, 2000

The primary legislation governing cyber crimes in India is the Information Technology Act, 2000, which was amended in 2008 to address emerging challenges in cyberspace.

## Types of Cyber Crimes

1. **Hacking**: Unauthorized access to computer systems
2. **Phishing**: Deceptive attempts to obtain sensitive information
3. **Identity Theft**: Stealing personal information for fraudulent purposes
4. **Online Fraud**: Various forms of financial scams conducted online

## Legal Remedies

If you become a victim of cyber crime, you can:
- File a complaint with the Cyber Crime Cell
- Seek legal recourse under the IT Act
- Apply for compensation for damages

## Prevention is Better Than Cure

Always use strong passwords, enable two-factor authentication, and be cautious about sharing personal information online.

*This article is for informational purposes only and does not constitute legal advice.*`,
      category: 'criminal-law',
      tags: 'cyber crime, digital rights, IT Act, online safety',
      published: true,
      featured: true
    },
    {
      title: 'Recent Changes in Family Law: What You Need to Know',
      slug: 'recent-changes-family-law',
      excerpt: 'Stay updated with the latest amendments in family law legislation and their impact on divorce and custody proceedings.',
      content: `# Recent Changes in Family Law

Family law in India has undergone significant changes in recent years, reflecting evolving social norms and the need for more progressive legislation.

## Key Amendments

1. **Triple Talaq Ban**: The Muslim Women (Protection of Rights on Marriage) Act, 2019
2. **Transgender Rights**: The Transgender Persons (Protection of Rights) Act, 2019
3. **Live-in Relationships**: Recognition and legal framework

## Impact on Divorce Proceedings

The amendments have streamlined divorce procedures and provided better protection for women's rights.

## Child Custody Considerations

Courts now prioritize the child's welfare above all else, considering factors like:
- Emotional and physical well-being
- Educational needs
- Financial stability of parents

## Way Forward

These changes represent a step towards more equitable family laws that balance traditional values with modern needs.

*Consult with a qualified family law attorney for personalized advice.*`,
      category: 'family-law',
      tags: 'family law, divorce, custody, legal amendments',
      published: true,
      featured: false
    }
  ]

  for (const post of posts) {
    await db.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    })
    console.log('Created blog post:', post.title)
  }

  // Create sample inquiries
  const inquiries = [
    {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
      subject: 'Legal consultation for property dispute',
      message: 'I have a property dispute with my neighbor regarding boundary walls. The matter has been ongoing for 6 months and we need legal intervention to resolve it.',
      service: 'civil-law',
      status: 'pending'
    },
    {
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 87654 32109',
      subject: 'Divorce proceedings consultation',
      message: 'I would like to understand the divorce process and my rights regarding child custody and alimony. Married for 8 years with one child.',
      service: 'family-law',
      status: 'in-progress'
    }
  ]

  for (const inquiry of inquiries) {
    await db.inquiry.create({
      data: inquiry
    })
    console.log('Created inquiry from:', inquiry.name)
  }

  // Create page content
  const pages = [
    {
      page: 'about',
      title: 'About Law Crusade',
      content: 'Law Crusade is a premier law firm dedicated to providing exceptional legal services with integrity and excellence. Founded in 2014, we have grown into a full-service law firm serving clients across various practice areas.'
    },
    {
      page: 'contact',
      title: 'Contact Law Crusade',
      content: 'Get in touch with Law Crusade for expert legal advice and representation. Our team of experienced attorneys is here to help you navigate your legal challenges.'
    }
  ]

  for (const page of pages) {
    await db.pageContent.upsert({
      where: { page: page.page },
      update: page,
      create: page
    })
    console.log('Created page content for:', page.page)
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })