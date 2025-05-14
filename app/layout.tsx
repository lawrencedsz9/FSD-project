import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustCart",
  description: "A minimalist and futuristic e-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
                  >
                    TRUSTCART
                  </Link>
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/" className="nav-link">
                      Home
                    </Link>
                    <Link href="/products" className="nav-link">
                      Products
                    </Link>
                    <Link href="/category" className="nav-link">
                      Categories
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Link href="/cart" className="nav-link">
                    <ShoppingCart className="w-6 h-6" />
                  </Link>
                  <Link href="/account" className="nav-link">
                    <User className="w-6 h-6" />
                  </Link>
                  <button className="md:hidden nav-link">
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="pt-16 min-h-screen">
            {children}
          </main>

          <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Us</h3>
                  <p className="text-gray-400">
                    A minimalist and futuristic e-commerce platform built with modern technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/products" className="text-gray-400 hover:text-white">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/category" className="text-gray-400 hover:text-white">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="/account" className="text-gray-400 hover:text-white">
                        Account
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>Email: support@trustcart.com</li>
                    <li>Phone: +1 234 567 890</li>
                    <li>Address: 123 Trust St, Digital City</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} TrustCart. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
