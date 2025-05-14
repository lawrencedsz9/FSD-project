'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = (type: 'category' | 'sort', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`/products?${params.toString()}`);
  };

  if (!mounted) {
    return (
      <div className="flex gap-4">
        <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
        <div className="h-10 w-40 bg-white/10 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <select
        className="glass-select"
        value={searchParams.get('category') || ''}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home-living">Home & Living</option>
      </select>

      <select
        className="glass-select"
        value={searchParams.get('sort') || ''}
        onChange={(e) => handleFilterChange('sort', e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
} 