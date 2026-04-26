import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NavItems from './NavItems';
import UserDropdown from './UserDropdown';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { getWatchlist } from '@/lib/actions/watchlist.actions';


const Header =async ({user}:{user:User}) => {

  const initialStocks=await searchStocks();
  const watchlist = user?.email ? await getWatchlist(user.email) : [];
  const watchlistCount = watchlist.length;
  const watchlistSymbols = watchlist.map(i => i.symbol);
  return (
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
          <Link href="/">
            <Image src="/assets/icons/logo.svg" alt="Binivex Logo" width={60}
    height={60}
    className="h-10 md:h-12 w-auto cursor-pointer transition-transform hover:scale-105 active:scale-95"/>
          </Link>
          <nav className='hidden sm:block'>
            {/*nav items*/}
            <NavItems initialStocks={initialStocks} watchlistCount={watchlistCount} watchlistSymbols={watchlistSymbols}/>
          </nav>
          <UserDropdown user={user} initialStocks={initialStocks} watchlistCount={watchlistCount} watchlistSymbols={watchlistSymbols}/>
      </div>
    </header>
  )
}

export default Header