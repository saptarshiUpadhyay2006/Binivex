'use client'

import {NAV_ITEMS} from "@/lib/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";
import SearchCommand from "@/components/SearchCommand";

const NavItems = ({initialStocks, watchlistCount, watchlistSymbols}: { initialStocks: StockWithWatchlistStatus[], watchlistCount?: number, watchlistSymbols?: string[]}) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';

        return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(href);

                if(href === '/search') return (
                    <li key="search-trigger" className="flex items-center">
                        <SearchCommand
                            renderAs="text"
                            label="Search"
                            initialStocks={initialStocks}
                            watchlistSymbols={watchlistSymbols}
                        />
                    </li>
                )

                return (
                    <li key={href} className="relative flex items-center h-full">
                        <Link 
                            href={href} 
                            className={`relative py-1 transition-all duration-300 hover:text-yellow-500 ${
                                active ? 'text-gray-100' : 'text-gray-400'
                            }`}
                        >
                            {label}
                            {label === 'Watchlist' && typeof watchlistCount === 'number' && watchlistCount > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-yellow-500 text-black font-bold rounded-full">
                                    {watchlistCount}
                                </span>
                            )}
                            {active && (
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(232,186,64,0.6)]" />
                            )}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
export default NavItems