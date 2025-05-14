"use client"
import { ShoppingCart, Search, User, Heart, Menu, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import TestimonialCard from "@/components/testimonial-card"
import NewsletterForm from "@/components/newsletter-form"
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  featured: boolean;
}

const categories = [
  {
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    image: '/categories/electronics.jpg',
    slug: 'electronics'
  },
  {
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: '/categories/fashion.jpg',
    slug: 'fashion'
  },
  {
    name: 'Home & Living',
    description: 'Make your home beautiful',
    image: '/categories/home-living.jpg',
    slug: 'home-living'
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch('/api/products?featured=true')
        if (!res.ok) {
          throw new Error('Failed to fetch featured products')
        }
        const data = await res.json()
        setFeaturedProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="animate-fade-in">
        {/* Hero Section Skeleton */}
        <div className="relative h-[600px] bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-6 w-1/2 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Featured Categories Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card p-6">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-4">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Error loading featured products</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Discover Your Style
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our curated collection of premium products designed to elevate your lifestyle.
            </p>
            <Link
              href="/products"
              className="glass-button inline-flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="glass-card p-6 group"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-400">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product._id} className="glass-card p-4">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-400 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold">₹{product.price}</span>
                  <button className="glass-button-sm">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="glass-input flex-1"
              />
              <button className="glass-button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
