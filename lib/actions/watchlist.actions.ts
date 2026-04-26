'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { revalidatePath } from 'next/cache';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function toggleWatchlistItem(params: {
  email: string;
  symbol: string;
  company: string;
  isAdd: boolean;
}) {
  const { email, symbol, company, isAdd } = params;
  if (!email) return { error: 'Not authenticated' };

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ id?: string; _id?: any }>({ email });
    if (!user) throw new Error('User not found');
    const userId = user.id || String(user._id);

    if (isAdd) {
      await Watchlist.findOneAndUpdate(
        { userId, symbol: symbol.toUpperCase() },
        { userId, symbol: symbol.toUpperCase(), company, addedAt: new Date() },
        { upsert: true }
      );
    } else {
      await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() });
    }

    revalidatePath('/watchlist');
    revalidatePath(`/stocks/${symbol}`);
    revalidatePath('/'); // Dashboard might show it too
    return { success: true };
  } catch (err) {
    console.error('toggleWatchlistItem error:', err);
    return { error: 'Action failed' };
  }
}

export async function getWatchlist(email: string): Promise<any[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.error('getWatchlist error:', err);
    return [];
  }
}