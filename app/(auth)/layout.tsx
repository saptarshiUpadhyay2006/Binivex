import Link from "next/link"
import Image from "next/image"
const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='min-h-screen text-gray-400'>
        <section className="auth-left-section scrollbar-hide-default">
            <Link href="/" className="auth-logo">
                <Image src="/assets/icons/logo.svg" alt="Signalist Logo" width={140} height={32} className="h-8 w-auto" />

            </Link>
            <div className="pb-6 lg:pb-8 flex-1">{children}</div>
        </section>
        <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                    Binivex completely transformed how I track the market. The live prices and lightning-fast search make it incredibly easy to use, but the real standout is the AI insights and news summaries. I can analyze trends and make decisions so much faster than before. Plus, the automated price alerts and custom watchlists mean I never miss a market move. It’s an incredibly reliable and smooth platform.
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author">-Harry Styles</cite>
                            <p className="max-md:text-xs text-gray-500">Angel Investor</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src="/assets/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src="/assets/images/dashboard.png" alt="Dashboard Preview" width={1440} height={1150} className="auth-dashboard-preview absolute top-0" />
                </div>
            </section>
    </main>
  )
}

export default Layout