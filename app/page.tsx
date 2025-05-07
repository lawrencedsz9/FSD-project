import { ShoppingCart, Search, User, Heart, Menu, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import CategoryCard from "@/components/category-card"
import TestimonialCard from "@/components/testimonial-card"
import NewsletterForm from "@/components/newsletter-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-gray-700"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">
                  SHOP<span className="text-rose-600">HUB</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex md:flex-1 md:justify-center md:px-6">
              <div className="relative w-full max-w-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-10 py-2 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/account"
                className="hidden sm:flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <User className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline-block">Account</span>
              </Link>
              <Link
                href="/wishlist"
                className="hidden sm:flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Heart className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline-block">Wishlist</span>
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="hidden lg:inline-block">Cart</span>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-xs text-white">
                  3
                </span>
              </Link>
            </div>
          </div>

          <div className="flex md:hidden mt-2 pb-4">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 py-2 border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-24 items-center">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-rose-600 bg-rose-100 rounded-full">
                  New Arrival
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Summer Collection 2024
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Elevate your style with our latest collection. Quality materials, stunning designs, unbeatable prices.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
                    Shop Now
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Collection
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-600">Browse our wide range of products by category</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              <CategoryCard
                title="Electronics"
                image="/placeholder.svg?height=200&width=200"
                href="/category/electronics"
                icon="laptop"
              />
              <CategoryCard
                title="Clothing"
                image="/placeholder.svg?height=200&width=200"
                href="/category/clothing"
                icon="shirt"
              />
              <CategoryCard
                title="Home Decor"
                image="/placeholder.svg?height=200&width=200"
                href="/category/home-decor"
                icon="lamp"
              />
              <CategoryCard
                title="Beauty"
                image="/placeholder.svg?height=200&width=200"
                href="/category/beauty"
                icon="sparkles"
              />
              <CategoryCard
                title="Sports"
                image="/placeholder.svg?height=200&width=200"
                href="/category/sports"
                icon="dumbbell"
              />
              <CategoryCard
                title="Accessories"
                image="/placeholder.svg?height=200&width=200"
                href="/category/accessories"
                icon="watch"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="mt-2 text-gray-600">Handpicked products for you</p>
              </div>
              <Link href="/products" className="text-rose-600 font-medium hover:text-rose-700">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductCard
                id="1"
                title="Wireless Noise-Cancelling Headphones"
                price={129.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.5}
              />
              <ProductCard
                id="2"
                title="Premium Cotton T-Shirt"
                price={29.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.8}
              />
              <ProductCard
                id="3"
                title="Minimalist Desk Lamp"
                price={49.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.2}
              />
              <ProductCard
                id="4"
                title="Smart Fitness Watch"
                price={89.99}
                image="/placeholder.svg?height=300&width=300"
                rating={4.7}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="mt-2 text-gray-600">Don't just take our word for it</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                name="Sarah Johnson"
                role="Verified Buyer"
                image="/placeholder.svg?height=100&width=100"
                rating={5}
                content="I'm absolutely in love with my purchase! The quality exceeded my expectations and the shipping was incredibly fast. Will definitely be shopping here again."
              />
              <TestimonialCard
                name="Michael Chen"
                role="Verified Buyer"
                image="/placeholder.svg?height=100&width=100"
                rating={4}
                content="Great products and excellent customer service. When I had an issue with my order, the team resolved it immediately. Very satisfied with my experience."
              />
              <TestimonialCard
                name="Emma Rodriguez"
                role="Verified Buyer"
                image="/placeholder.svg?height=100&width=100"
                rating={5}
                content="The attention to detail in the products is amazing. Everything from the packaging to the product itself shows quality. Highly recommend!"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-rose-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900">Join Our Newsletter</h2>
              <p className="mt-2 text-gray-600 mb-6">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                SHOP<span className="text-rose-500">HUB</span>
              </h3>
              <p className="text-gray-400 mb-4">Your one-stop destination for quality products at affordable prices.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/new-arrivals" className="text-gray-400 hover:text-white">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/bestsellers" className="text-gray-400 hover:text-white">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="text-gray-400 hover:text-white">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-white">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-400 hover:text-white">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="text-gray-400 hover:text-white">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 SHOPHUB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
