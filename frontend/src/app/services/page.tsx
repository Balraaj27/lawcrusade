import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Users, Scale, BookOpen, CheckCircle, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 'criminal-law',
      icon: Shield,
      title: 'Criminal Law',
      description: 'Comprehensive legal defense and representation in all criminal matters.',
      color: 'bg-red-600',
      services: [
        'Criminal Defense',
        'Anticipatory Bail',
        'Anti-Corruption Cases',
        'Cyber Crime',
        'PMLA (Prevention of Money Laundering Act)',
        'POCSO Act Cases'
      ],
      features: [
        '24/7 emergency legal assistance',
        'Expert bail application handling',
        'Strategic defense planning',
        'Court representation at all levels'
      ]
    },
    {
      id: 'family-law',
      icon: Users,
      title: 'Family Law',
      description: 'Compassionate legal guidance for sensitive family matters and disputes.',
      color: 'bg-blue-600',
      services: [
        'Divorce Proceedings',
        'Child Custody',
        'Court Marriage',
        'Dowry Cases',
        'Domestic Violence',
        'Family Disputes'
      ],
      features: [
        'Confidential consultation',
        'Mediation and counseling',
        'Child welfare focus',
        'Quick dispute resolution'
      ]
    },
    {
      id: 'civil-law',
      icon: Scale,
      title: 'Civil Law & Litigation',
      description: 'Strategic legal solutions for civil disputes and commercial litigation.',
      color: 'bg-green-600',
      services: [
        'Civil Litigation',
        'Contract Disputes',
        'Property Disputes',
        'Motor Accident Claims',
        'Cheque Bounce Cases',
        'Recovery Suits'
      ],
      features: [
        'Thorough case analysis',
        'Efficient legal remedies',
        'Negotiation and settlement',
        'Strong courtroom representation'
      ]
    },
    {
      id: 'consumer-protection',
      icon: BookOpen,
      title: 'Consumer Protection & Regulatory Matters',
      description: 'Protecting consumer rights and ensuring regulatory compliance.',
      color: 'bg-purple-600',
      services: [
        'Consumer Protection',
        'RERA Matters',
        'Regulatory Compliance',
        'Documentation Services'
      ],
      features: [
        'Consumer rights awareness',
        'Regulatory guidance',
        'Documentation support',
        'Compliance audits'
      ]
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-yellow-600">Legal Services</span>
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive legal solutions tailored to protect your rights and interests
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-lg text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Practice Areas
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.services.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    <Button asChild className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                      <Link href="/contact">
                        Consult Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/contact?service=${service.id}`}>
                        <Phone className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Legal Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure the best legal outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Initial Consultation', description: 'Understanding your case and legal requirements' },
              { step: '02', title: 'Case Analysis', description: 'Thorough evaluation and strategy development' },
              { step: '03', title: 'Legal Action', description: 'Implementing the best legal approach' },
              { step: '04', title: 'Resolution', description: 'Achieving the best possible outcome' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="bg-black text-white rounded-lg p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-600">
                  Why Choose Law Crusade?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Expert Legal Team</h3>
                      <p className="text-gray-300">Highly qualified attorneys with specialized expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Proven Track Record</h3>
                      <p className="text-gray-300">Successful outcomes in complex legal matters</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Client-Centric Approach</h3>
                      <p className="text-gray-300">Personalized attention to every case</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-black rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4">Need Legal Help?</h3>
                  <p className="text-lg mb-6">Get expert legal advice today</p>
                  <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
                    <Link href="/contact">Free Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about our legal services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How quickly can you take up my case?",
                answer: "We offer 24/7 emergency legal assistance. For urgent matters, we can begin working on your case immediately upon consultation."
              },
              {
                question: "What are your consultation fees?",
                answer: "We offer an initial free consultation to understand your case. Subsequent fees are discussed transparently based on the complexity of your legal matter."
              },
              {
                question: "Do you handle cases outside Delhi?",
                answer: "Yes, we represent clients across various jurisdictions and can coordinate with local counsel as needed."
              },
              {
                question: "How do I know which legal service I need?",
                answer: "During the initial consultation, we'll help identify the specific legal services required for your situation."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-yellow-600">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}