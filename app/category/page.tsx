 'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

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

interface Category {
  name: string;
  description: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
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

export default function CategoryPage() {
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        
        // Group products by category
        const groupedProducts = data.reduce((acc: Record<string, Product[]>, product: Product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        
        setProducts(groupedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categories Skeleton */}
          {categories.map((_, index) => (
            <div key={index} className="mb-16">
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
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Error loading categories</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title mb-12">All Categories</h1>
        
        {categories.map((category) => (
          <div key={category.slug} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <Link
                href={`/category/${category.slug}`}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products[category.slug]?.slice(0, 4).map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="glass-card p-4 group"
                >
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold">₹{product.price}</span>
                      <button className="glass-button-sm">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}