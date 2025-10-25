import Link from 'next/link'
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Firm Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-yellow-600" />
              <span className="text-xl font-bold">Law Crusade</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted legal partner providing comprehensive legal solutions with integrity and excellence.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-yellow-600 transition-colors text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/law-journal" className="text-gray-400 hover:text-yellow-600 transition-colors text-sm">
                  Law Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-600 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-600">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 text-sm">Criminal Law</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Family Law</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Civil Law & Litigation</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Consumer Protection</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-600">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-yellow-600" />
                <span className="text-gray-400 text-sm">+91 98XXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-yellow-600" />
                <span className="text-gray-400 text-sm">info@lawcrusade.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-yellow-600 mt-1" />
                <span className="text-gray-400 text-sm">
                  123, Legal Complex<br />
                  Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Law Crusade. All rights reserved. | 
            <Link href="/privacy" className="hover:text-yellow-600 transition-colors ml-1">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-yellow-600 transition-colors ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}