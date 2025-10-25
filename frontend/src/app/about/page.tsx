import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Scale, Users, Award, Shield, BookOpen, Target } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Scale,
      title: "Integrity",
      description: "We uphold the highest ethical standards in every case we handle."
    },
    {
      icon: Shield,
      title: "Excellence",
      description: "Our commitment to delivering outstanding legal representation."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your needs and objectives are at the heart of our practice."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on achieving the best possible outcomes for our clients."
    }
  ]

  const milestones = [
    { year: "2014", title: "Foundation", description: "Law Crusade was established with a vision to provide accessible legal services." },
    { year: "2017", title: "Expansion", description: "Opened our second office and expanded our practice areas." },
    { year: "2020", title: "Digital Transformation", description: "Embraced technology to enhance client service and case management." },
    { year: "2024", title: "Excellence Recognized", description: "Recognized as one of the leading law firms in the region." }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-yellow-600">Law Crusade</span>
            </h1>
            <p className="text-xl text-gray-300">
              A legacy of legal excellence built on trust, integrity, and unwavering commitment to justice
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  Founded in 2014, Law Crusade emerged from a simple yet powerful vision: to make quality legal services accessible to everyone who needs them. Our journey began with a small team of passionate lawyers dedicated to fighting for justice.
                </p>
                <p>
                  Over the years, we have grown into a full-service law firm, but our core values remain unchanged. We believe that every client deserves personalized attention, strategic legal counsel, and unwavering support throughout their legal journey.
                </p>
                <p>
                  Today, Law Crusade stands as a testament to what can be achieved when expertise meets empathy, and when legal excellence is combined with genuine care for clients' wellbeing.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-yellow-600 mb-2">10+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                    <div className="text-sm text-gray-600">Cases Won</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black text-white rounded-lg p-8 md:p-12">
              <div className="text-center space-y-6">
                <Award className="h-16 w-16 text-yellow-600 mx-auto" />
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  To provide exceptional legal services that protect our clients' rights and interests, 
                  while upholding the highest standards of professional ethics and contributing to 
                  the advancement of justice in society.
                </p>
                <div className="pt-6">
                  <h3 className="text-2xl font-semibold text-yellow-600 mb-4">Our Vision</h3>
                  <p className="text-gray-300">
                    To be the most trusted and respected law firm, known for our unwavering commitment 
                    to justice, client success, and legal excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our pursuit of legal excellence
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-yellow-600 text-white">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Legal Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">Senior Partners</h3>
                <p className="text-gray-600">15+ years of experience in corporate and criminal law</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">Legal Associates</h3>
                <p className="text-gray-600">Specialized expertise in family and civil litigation</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">Support Staff</h3>
                <p className="text-gray-600">Dedicated administrative and research team</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}