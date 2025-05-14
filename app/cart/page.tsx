"use client"

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CartContent = dynamic(() => import('@/components/cart-content'), {
  ssr: false,
  loading: () => (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-500/10 mb-4">
            <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    </div>
  ),
});

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-500/10 mb-4">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            </div>
          </div>
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
