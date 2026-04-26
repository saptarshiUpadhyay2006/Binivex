import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getWatchlist } from "@/lib/actions/watchlist.actions";
import { getQuote } from "@/lib/actions/finnhub.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TrendingUp, TrendingDown, Trash2, ArrowRight } from "lucide-react";
import WatchlistButton from "@/components/WatchListButton";

export default async function WatchlistPage() {
    const auth = await getAuth();
    // Correct session fetching pattern for Better Auth in Next.js Server Components
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.email) {
        redirect("/sign-in");
    }

    const watchlistItems = await getWatchlist(session.user.email);

    // Fetch quotes for all items
    const itemsWithQuotes = await Promise.all(
        watchlistItems.map(async (item) => {
            const quote = await getQuote(item.symbol);
            return {
                ...item,
                price: quote.c,
                change: quote.dp,
            };
        })
    );

    return (
        <div className="home-wrapper">
            <header className="flex flex-col gap-1 mb-8 border-b border-white/5 pb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <TrendingUp className="text-yellow-500" size={24} />
                    My Watchlist
                </h1>
                <p className="text-gray-500 text-xs md:text-sm max-w-2xl font-medium uppercase tracking-widest">
                    Track your favorite assets and monitor performance
                </p>
            </header>

            {itemsWithQuotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-gray-900/50 p-6 rounded-full mb-6">
                        <TrendingUp className="text-gray-700" size={48} />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-xs">
                        Start adding stocks to your watchlist to track their performance here.
                    </p>
                    <Link href="/">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
                            Explore Stocks <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div className="overflow-x-auto rounded-xl border border-white/5 bg-gray-900/20 backdrop-blur-sm">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-500 text-xs uppercase tracking-widest font-bold">
                                <tr>
                                    <th className="px-6 py-4">Symbol</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4 text-right">Price</th>
                                    <th className="px-6 py-4 text-right">Change</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {itemsWithQuotes.map((item) => (
                                    <tr key={item.symbol} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-5">
                                            <Link href={`/stocks/${item.symbol}`} className="font-bold text-white hover:text-yellow-500 transition-colors">
                                                {item.symbol}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-5 text-gray-400 font-medium">
                                            {item.company}
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono text-white">
                                            ${item.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '---'}
                                        </td>
                                        <td className={`px-6 py-5 text-right font-medium ${(item.change || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            <div className="flex items-center justify-end gap-1">
                                                {(item.change || 0) >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                {item.change ? `${item.change.toFixed(2)}%` : '0.00%'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <WatchlistButton
                                                    symbol={item.symbol}
                                                    company={item.company}
                                                    isInWatchlist={true}
                                                    showTrashIcon={true}
                                                    type="icon"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
