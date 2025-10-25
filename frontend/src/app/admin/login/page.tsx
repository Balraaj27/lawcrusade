'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Scale, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminAuthPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    password: ''
  })

  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
!isRegister? delete formData["name"]:""
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const data = response.data

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('adminEmail', data.data.user.email)

        toast({
          title: isRegister ? "Registration successful!" : "Login successful!",
          description: isRegister ? "Your admin account is now active." : "Welcome back!",
        })

        router.push('/admin/dashboard')
      } else {
        throw new Error(data.message || "Authentication failed")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-12 w-12 text-yellow-600" />
            <span className="text-2xl font-bold text-white">Law Crusade</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">{isRegister ? "Create an admin account" : "Sign in to manage your website"}</p>
        </div>

        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">{isRegister ? "Create Account" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-gray-300">
              {isRegister ? "Register new admin account" : "Enter your credentials to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      required={isRegister}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold"
              >
                {isLoading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                className="text-yellow-500 hover:text-yellow-400"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
              </button>
            </div>

          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">© 2024 Law Crusade. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}