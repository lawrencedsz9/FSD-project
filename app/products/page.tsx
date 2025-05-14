'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Filters from './filters';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
        setProducts(data);
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
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-4 md:mb-0" />
            <div className="flex gap-4">
              <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-4">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Error loading products</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="section-title mb-4 md:mb-0">All Products</h1>
          <Filters />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="product-card group"
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
                  <span className="text-sm text-gray-400">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-400">
              Try adjusting your filters or check back later for new products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 