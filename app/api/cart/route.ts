import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).populate('cart.items.product');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.cart);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching cart' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const { productId, quantity } = await request.json();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const cartItem = user.cart.items.find(
      (item: any) => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.items.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate('cart.items.product');

    return NextResponse.json(user.cart);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating cart' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const { productId } = await request.json();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.cart.items = user.cart.items.filter(
      (item: any) => item.product.toString() !== productId
    );

    await user.save();
    await user.populate('cart.items.product');

    return NextResponse.json(user.cart);
  } catch (error) {
    return NextResponse.json({ error: 'Error removing item from cart' }, { status: 500 });
  }
} 