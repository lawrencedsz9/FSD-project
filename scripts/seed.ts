import 'dotenv/config';
import { MongoClient } from 'mongodb';
import Product from '../models/Product';
import connectDB from '../lib/mongodb';

const sampleProducts = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 24999,
    category: "electronics",
    stock: 50,
    images: ["/products/headphones.jpg"],
    featured: true,
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
    price: 16999,
    category: "electronics",
    stock: 75,
    images: ["/products/smartwatch.jpg"],
    featured: true,
  },
  {
    name: "Designer Leather Backpack",
    description: "Handcrafted leather backpack with multiple compartments and laptop sleeve.",
    price: 12999,
    category: "fashion",
    stock: 30,
    images: ["/products/backpack.jpg"],
    featured: true,
  },
  {
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality and smart home integration.",
    price: 10999,
    category: "electronics",
    stock: 100,
    images: ["/products/speaker.jpg"],
    featured: true,
  },
  {
    name: "Modern Coffee Table",
    description: "Sleek and modern coffee table with storage space and durable construction.",
    price: 19999,
    category: "home-living",
    stock: 20,
    images: ["/products/coffee-table.jpg"],
    featured: false,
  },
  {
    name: "Premium Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation and premium sound quality.",
    price: 14999,
    category: "electronics",
    stock: 60,
    images: ["/products/earbuds.jpg"],
    featured: false,
  },
  {
    name: "Designer Sunglasses",
    description: "Stylish sunglasses with UV protection and polarized lenses.",
    price: 7999,
    category: "fashion",
    stock: 40,
    images: ["/products/sunglasses.jpg"],
    featured: false,
  },
  {
    name: "Smart LED TV",
    description: "4K Ultra HD Smart TV with built-in streaming apps and voice control.",
    price: 59999,
    category: "electronics",
    stock: 25,
    images: ["/products/tv.jpg"],
    featured: false,
  }
];

async function seed() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(sampleProducts);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 