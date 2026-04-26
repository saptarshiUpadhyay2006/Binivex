"use client";
import React, { useMemo, useState } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { toggleWatchlistItem } from "@/lib/actions/watchlist.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Star, Trash2 } from "lucide-react";

// Minimal WatchlistButton implementation to satisfy page requirements.
// This component focuses on UI contract only. It toggles local state and
// calls onWatchlistChange if provided. Styling hooks match globals.css.

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const label = useMemo(() => {
    if (type === "icon") return added ? "" : "";
    return added ? "Remove from Watchlist" : "Add to Watchlist";
  }, [added, type]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please sign in to manage your watchlist");
      return;
    }

    setLoading(true);
    const next = !added;
    
    try {
      const res = await toggleWatchlistItem({
        email: session.user.email,
        symbol,
        company,
        isAdd: next
      });

      if (res?.success) {
        setAdded(next);
        toast.success(next ? `Added ${symbol} to watchlist` : `Removed ${symbol} from watchlist`);
        onWatchlistChange?.(symbol, next);
        router.refresh();
      } else {
        toast.error(res?.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to update watchlist");
    } finally {
      setLoading(false);
    }
  };

  if (type === "icon") {
    return (
      <button
        title={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
        aria-label={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
        className={`watchlist-icon-btn group relative transition-all duration-300 ${added ? "watchlist-icon-added bg-yellow-500/10" : "bg-white/5 hover:bg-white/10"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
        ) : showTrashIcon && added ? (
            <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-500 transition-colors" />
        ) : (
            <Star 
              className={`h-4 w-4 transition-all duration-300 ${added ? "fill-yellow-500 text-yellow-500 scale-110" : "text-gray-500 group-hover:text-yellow-500"}`}
            />
        )}
      </button>
    );
  }

  return (
    <button 
      className={`watchlist-btn flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
        added ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" : "bg-yellow-500 text-black hover:bg-yellow-400"
      } ${loading ? "opacity-70 cursor-not-allowed" : ""}`} 
      onClick={handleClick} 
      disabled={loading}
    >
      {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
      ) : showTrashIcon && added ? (
        <Trash2 className="w-4 h-4" />
      ) : (
        <Star className={`w-4 h-4 ${added ? "fill-red-400" : "fill-transparent"}`} />
      )}
      <span className="text-sm">{loading ? "Processing..." : label}</span>
    </button>
  );
};

export default WatchlistButton;