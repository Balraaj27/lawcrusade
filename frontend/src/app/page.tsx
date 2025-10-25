'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale, Users, BookOpen, Shield, ArrowRight, Phone, Mail, MapPin, Star } from 'lucide-react'

export default function Home() {
  const services = [
    {
      icon: Shield,
      title: "Criminal Law",
      description: "Expert defense in criminal cases, anticipatory bail, cyber crime, and more.",
      features: ["Criminal Defense", "Anticipatory Bail", "Cyber Crime", "PMLA Cases"]
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Compassionate legal guidance for family matters and disputes.",
      features: ["Divorce Proceedings", "Child Custody", "Court Marriage", "Domestic Violence"]
    },
    {
      icon: Scale,
      title: "Civil Law & Litigation",
      description: "Strategic legal solutions for civil disputes and litigation.",
      features: ["Civil Litigation", "Contract Disputes", "Property Disputes", "Recovery Suits"]
    },
    {
      icon: BookOpen,
      title: "Consumer Protection",
      description: "Protecting consumer rights and ensuring regulatory compliance.",
      features: ["Consumer Protection", "RERA Matters", "Regulatory Compliance", "Documentation"]
    }
  ]

  const stats = [
    { number: "500+", label: "Cases Won" },
    { number: "10+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black to-gray-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-yellow-600/10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Justice Prevails When
                <span className="text-yellow-600"> Courage Leads</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                At Law Crusade, we stand as your unwavering advocates, delivering exceptional legal solutions with integrity, excellence, and determination.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                <Link href="/contact">
                  Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Practice Areas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal services tailored to your specific needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-700 transition-colors">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Law Crusade?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Legal Team</h3>
                    <p className="text-gray-600">Highly experienced attorneys specializing in diverse areas of law.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Client-Centric Approach</h3>
                    <p className="text-gray-600">Your interests are our priority, with personalized attention to every case.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">Successful outcomes in numerous complex legal matters.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-yellow-600">Ready to Fight for Your Rights?</h3>
              <p className="text-gray-300 mb-8">
                Schedule a free consultation with our legal experts today. Let us be your voice in the pursuit of justice.
              </p>
              <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our dedicated team is here to provide you with expert legal guidance and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
              <Link href="/tel:+9198XXXXXXX">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/contact">Send Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}