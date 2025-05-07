"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  rating: number
}

export default function ProductCard({ id, title, price, image, rating }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-64 overflow-hidden">
        <Link href={`/products/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm z-10"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-rose-600 text-rose-600" : "text-gray-600"}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-current" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">{rating.toFixed(1)}</span>
        </div>
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{title}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
