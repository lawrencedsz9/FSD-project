'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyPayment = async () => {
      // TODO: Implement payment verification
      try {
        // Simulate payment verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearCart();
        setVerificationStatus('success');
      } catch (error) {
        console.error('Payment verification failed:', error);
        setVerificationStatus('error');
      }
    };

    verifyPayment();
  }, [clearCart]);

  if (verificationStatus === 'loading') {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-500/10 mb-4">
              <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Verifying Payment...</h2>
            <p className="text-gray-400">
              Please wait while we verify your payment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Verification Failed</h2>
            <p className="text-gray-400 mb-8">
              We couldn't verify your payment. Please contact support if you've been charged.
            </p>
            <div className="space-x-4">
              <Link href="/cart" className="glass-button">
                Return to Cart
              </Link>
              <Link href="/products" className="glass-button-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="space-x-4">
            <Link href="/account" className="glass-button">
              View Orders
            </Link>
            <Link href="/products" className="glass-button-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 