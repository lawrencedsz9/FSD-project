'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, ShieldCheck, RotateCcw, ChevronRight, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product-card';
import { useParams } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  features?: string[];
}

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating?: number;
}

const relatedProducts: RelatedProduct[] = [
  {
    _id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 24999,
    images: ['/images/headphones.jpg'],
    rating: 4.5
  },
  {
    _id: '2',
    name: 'Smart Fitness Watch',
    price: 16999,
    images: ['/images/watch.jpg'],
    rating: 4.2
  },
  {
    _id: '3',
    name: 'Designer Leather Backpack',
    price: 12999,
    images: ['/images/backpack.jpg'],
    rating: 4.8
  },
  {
    _id: '4',
    name: 'Smart Home Speaker',
    price: 10999,
    images: ['/images/speaker.jpg'],
    rating: 4.3
  }
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="relative h-[500px] rounded-lg overflow-hidden bg-white/10 animate-pulse" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden bg-white/10 animate-pulse" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-6 w-1/4 bg-white/10 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/10 rounded animate-pulse" />
              </div>
              <div className="h-12 w-48 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Error loading product</h3>
            <p className="text-gray-400">{error || 'Product not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden glass-card">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden glass-card ${
                    selectedImage === index ? 'ring-2 ring-purple-400' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="glass-card p-6 space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">₹{product.price}</span>
              <span className="text-sm text-gray-400">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <p className="text-gray-400">{product.description}</p>
            <div className="flex items-center gap-4">
              <button 
                className="glass-button flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="glass-button-sm">
                <Heart className="w-5 h-5" />
              </button>
              <button className="glass-button-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock} units</li>
                <li>SKU: {product._id}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-gray-800">
            {['description', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && product.reviewCount ? ` (${product.reviewCount})` : ''}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === 'description' && (
              <div className="glass-card p-6">
                <p className="text-gray-400">{product.description}</p>
                <p className="text-gray-400 mt-4">
                  The sleek, lightweight design ensures comfort during extended use, while the premium materials
                  provide durability for everyday wear. With intuitive touch controls, you can easily manage your
                  music, calls, and voice assistant without reaching for your device.
                </p>
                <p className="text-gray-400 mt-4">
                  Our advanced battery technology offers up to 20 hours of listening time on a single charge, and the
                  included fast-charging capability gives you 3 hours of playback with just 10 minutes of charging.
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                {product.features && (
                  <div className="glass-card p-6">
                    <ul className="space-y-2">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">
                            <svg
                              className="h-3 w-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="glass-card p-6">
                  <h4 className="font-medium text-lg mb-4">Technical Specifications</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Model</dt>
                      <dd className="text-gray-300 font-medium">HD-X1000</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Connectivity</dt>
                      <dd className="text-gray-300 font-medium">Bluetooth 5.0</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Battery Life</dt>
                      <dd className="text-gray-300 font-medium">Up to 20 hours</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Weight</dt>
                      <dd className="text-gray-300 font-medium">250g</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Charging</dt>
                      <dd className="text-gray-300 font-medium">USB-C</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <dt className="text-gray-400">Warranty</dt>
                      <dd className="text-gray-300 font-medium">2 Years</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <button className="glass-button">Write a Review</button>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">JD</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">John Doe</h4>
                        <span className="text-sm text-gray-400">2 weeks ago</span>
                      </div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-current" : "fill-gray-800 text-gray-800"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        These headphones are amazing! The sound quality is exceptional, and the noise cancellation
                        works perfectly in noisy environments. Battery life is impressive too - I've been using them
                        for a week with only one charge.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">AS</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Alice Smith</h4>
                        <span className="text-sm text-gray-400">1 month ago</span>
                      </div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-current" : "fill-gray-800 text-gray-800"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-400">
                        Very comfortable headphones with great sound quality. The noise cancellation is good but not
                        perfect. I can still hear some background noise in very loud environments. The build quality
                        is excellent though, and they look very stylish.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="glass-button w-full">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">You May Also Like</h2>
              <Link href="/products" className="text-purple-400 hover:text-purple-300 transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
}
