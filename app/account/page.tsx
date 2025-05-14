"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, LogOut, Edit2 } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Trust St, Digital City'
  });

  // Mock orders data
  const orders: Order[] = [
    {
      _id: '1',
      orderNumber: 'TRC-2024-001',
      date: '2024-03-15',
      total: 24999,
      status: 'delivered',
      items: [
        {
          name: 'Wireless Noise-Cancelling Headphones',
          quantity: 1,
          price: 24999
        }
      ]
    },
    {
      _id: '2',
      orderNumber: 'TRC-2024-002',
      date: '2024-03-10',
      total: 16999,
      status: 'shipped',
      items: [
        {
          name: 'Smart Fitness Watch',
          quantity: 1,
          price: 16999
        }
      ]
    }
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add profile update logic here
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold">{profile.name}</h2>
                  <p className="text-sm text-gray-400">{profile.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                    activeTab === 'orders'
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="glass-button-sm"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="glass-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="glass-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="glass-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Address
                      </label>
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="glass-input w-full"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="glass-button">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="glass-button-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Name</h3>
                      <p>{profile.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Email</h3>
                      <p>{profile.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Phone</h3>
                      <p>{profile.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Address</h3>
                      <p>{profile.address}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Order History</h2>
                {orders.map((order) => (
                  <div key={order._id} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Order {order.orderNumber}</h3>
                        <p className="text-sm text-gray-400">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'delivered'
                            ? 'bg-green-500/10 text-green-400'
                            : order.status === 'shipped'
                            ? 'bg-blue-500/10 text-blue-400'
                            : order.status === 'processing'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-gray-500/10 text-gray-400'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">₹{item.price}</p>
                        </div>
                      ))}
                      <div className="border-t border-gray-800 pt-4 mt-4">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
