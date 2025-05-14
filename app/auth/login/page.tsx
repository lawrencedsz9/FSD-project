"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Facebook, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-gray-900">
                SHOP<span className="text-rose-600">HUB</span>
              </span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/register" className="font-medium text-rose-600 hover:text-rose-700">
                Sign up
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full">
                <Facebook className="h-4 w-4 mr-2" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Facebook</span>
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="h-4 w-4 mr-2" />
                <span className="sr-only sm:not-sr-only sm:text-xs">Twitter</span>
              </Button>
              <Button variant="outline" className="w-full">
                <Github className="h-4 w-4 mr-2" />
                <span className="sr-only sm:not-sr-only sm:text-xs">GitHub</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-sm font-medium text-rose-600 hover:text-rose-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me for 30 days
                </label>
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-1/2">
        <Image src="/placeholder.svg?height=1000&width=800" alt="Login" fill className="object-cover" />
        <div className="absolute inset-0 bg-rose-600 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-xl text-white">
            <h2 className="text-4xl font-bold mb-6">Shop the latest trends with confidence</h2>
            <p className="text-lg">
              Sign in to access your account, view your order history, and enjoy a personalized shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
